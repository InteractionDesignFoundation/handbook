# IxDF's Laravel conventions

[[toc]]

## Introduction

These conventions aim to standardize our Laravel development practices, focusing on:

1. Reducing ambiguity
1. Enhancing consistency
1. Optimizing tool integration (IDEs, static analyzers, etc.)

### Strategy

1. **Consistency is Key**: When Laravel offers multiple approaches, we define a single, consistent method in these conventions.
1. **Performance and Scalability**: Adopt patterns that enhance application performance and maintainability as it scales.
1. **Security-First Mindset**: Incorporate security best practices throughout the development process.
1. **Leverage Laravel's Intentions**: Maximize the use of native Laravel features and official packages. Deviate only with clear justification.

This guide assumes familiarity with the latest Laravel version and modern PHP development practices.
It focuses on our specific conventions and rationales rather than explaining basic concepts.

## Project Structure

For large projects (> 100 Models), use modules to separate the codebase into smaller parts.
Use the standard Laravel structure for each module:

```
Modules/
    ...
    Course/
        Actions/
        Event/
        Exceptions/
        Console
            Commands/
        Http/
            Controllers/
                CourseEnrollmentStoreController.php
                CourseEnrollmentStoreRequest.php
            Middleware/
            Resources/
        Jobs/
        Listeners/
        Models/
        Policies/
        Providers/
        Rules/
        View/
    ...
    ...other modules
```

Exception: Do not create a separate directory for Request classes.
They are not reusable and often have the same reason for change as the Controller, so they should be in the same directory (Controllers).

Modules are relatively independent parts of the application that can be developed and tested separately.
Of course, modules should communicate with each other, but they should not depend on each other.
Such communication possible using:

-   [Dependency injection](https://laravel.com/docs/master/controllers#dependency-injection-and-controllers) using interfaces (it's ok to use **interfaces** from other modules)
-   [Events and Listeners](https://laravel.com/docs/events)

## DI vs. Facades vs. Facade aliases vs. helper functions

**DI** and **Facade**s SHOULD be used in PHP code, helpers SHOULD be used in Blade views.

Don’t use Facade root aliases (comment out `Facade::defaultAliases()->merge([...])`): it’s extra magic that’s easy to avoid.
Exceptions:

-   `\Vite` alias for `\Illuminate\Support\Facades\Vite` (why: there are no short alternatives for `Vite::asset()` that is commonly used in Blade views)

## Eloquent and Database

### Models

1. Use `Model::query()` instead of direct static calls:

    ```php
    // GOOD
    Member::query()->firstWhere('id', 42);

    // BAD
    Member::firstWhere('id', 42);
    ```

1. Avoid mass assignment when possible:

    ```php
    // PREFERRED
    $member = new Member();
    $member->name = $request->input('name');
    $member->email = $request->input('email');

    // AVOID
    $member->forceFill([
        'name' => $request->input('name'),
        'email' => $request->input('email'),
    ]);

    // NEVER DO
    $member->forceFill($request->all());
    ```

1. Don't use `where{Attribute}` magic methods. Use the `where` method to reduce magic.
1. Document all magic using PHPDoc:
    ```php
    /**
     * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Modules\Permission\Models\Role> $roles
     * @method static \Illuminate\Database\Eloquent\Builder|\App\Modules\Member\Models\Member canceled()
     */
    ```
1. Use safe defaults for attributes:
    ```php
    final class CourseEnrollment extends Model
    {
        /** @var array<string, scalar|bool|null> Default values for Eloquent attributes */
        protected $attributes = [
            'graded_score' => 0,
            'ungraded_score' => 0,
            'completed_time_in_seconds' => 0,
        ];
    }
    ```
1. Use custom EloquentBuilder classes for models with 3+ query scopes:

    ```php
    class User extends Model
    {
        #[\Override]
        public function newEloquentBuilder($query): UserEloquentBuilder
        {
            return new UserEloquentBuilder($query);
        }
    }

    /** @extends \Illuminate\Database\Eloquent\Builder<\App\Models\User> */
    final class UserEloquentBuilder extends Builder
    {
        public function confirmed(): self
        {
            return $this->whereNotNull('confirmed_at');
        }
    }
    ```

1. Use invokable classes for reusable scopes:

    ```php
    $unverifiedUsers = User::query()
        ->tap(new UnverifiedScore())
        ->get();

    final class UnverifiedScore
    {
        public function __invoke(Builder $builder): void
        {
            $builder->whereNull('email_verified_at');
        }
    }
    ```

### Factories

1. Use Eloquent Factories only for tests.
1. Keep factories in the `tests/Factories` directory.
1. Don't use the `HasFactory` trait in Model classes.
1. Call Factory classes directly in tests: `$user = UserFactory::new()->create([...]);`
1. `Factory::definition()` should set a valid default state (if possible) or not set any valid state.
1. For states, implement separate methods:

    ```php
    final class ArticleFactory extends Factory
    {
        /** @inheritDoc */
        public function definition(): array
        {
            return [
                'title' => $this->faker->sentence,
                'body' => $this->faker->paragraph,
            ];
        }

        public function draft(): self
        {
            return $this->state(['published_at' => null]);
        }

        public function published(): self
        {
            return $this->state([
                'published_at' => today(),
                'meta_description' => $this->faker->sentence,
            ]);
        }

        public function ofAnyValidState(): self
        {
            return $this->draft(); // or return a (random) valid state
        }
    }
    ```

### Migrations

Write `down()` methods because:

-   it should be possible to rollback failed releases
-   developer experience: simplify switching between branches

### Query Optimization

1. Eager load relationships to avoid N+1 queries:
    ```php
    $users = User::query()->with(['posts'])->get();
    ```
1. Use chunking for large datasets:
    ```php
    User::query()->chunk(100, function (Collection $users) {
        foreach ($users as $user) {
            // Process user
        }
    });
    ```
1. Utilize database indexes for frequently queried columns.
1. Use query caching for expensive, frequently run queries:
    ```php
    $users = Cache::remember('all_users', now()->addMinutes(10), static function (): Collection {
        return User::all();
    });
    ```
1. Consider using Laravel's Query Builder for complex queries instead of Eloquent when performance is critical.

## Artisan commands

### Names: use kebab-case

The names given to artisan commands SHOULD all be kebab-cased.

```diff
-php artisan deleteOldRecords
-php artisan delete_old_records
+php artisan delete-old-records
```

### Use `handle()` method dependency injection

Inject any dependencies in the `handle()` method instead of in the constructor.
Laravel initiates **ALL** console commands on **every** `artisan` call, for this reason
console command class constructors should be fast and not contain any heavy logic (incl. DI).

### Output: use verbosity levels

Use different verbosity levels.

```php
$this->info('Updating Articles...', 'v');
// ...
foreach($articles as $article) {
    // ...
    $this->info("\t Article #{$article->id} has been updated", 'vvv');
}

$this->info("{$articles->count()} Articles has been updated");
```

1. `quiet` mode: only errors and important warnings.
1. `normal` mode: errors, all warnings and general feedback like `All OK, processed XX records!`.
1. `v`, `vv`, `vvv` modes: errors, warnings and any additional info.

The idea behind it is to send email with console command outputs only when output is present (not empty).

### Exit with proper code

Use non-zero exit codes if a command execution failed
(alternatively, throw an exception — the script will also exit with code 1).
This allows using global on-error handlers, e.g. for automated reporting about failed console commands, please see
`\Illuminate\Console\Scheduling\Event::emailOutputOnFailure` as an example.

## Controllers

### Prefer Single Action Controllers

One of the main goals of classes in OOPs is to encapsulate data and behavior.
For controllers, there is usually nothing to encapsulate and reuses between actions (public methods);
for this reason, we prefer to have one action per controller.

```php
final class ShowMemberProfileController
{
    public function __invoke(Request $request)
    {
        // ...
    }
}
```

### Controllers Should Not Extend/Inherit

Controllers SHOULD NOT extend any base class: there are usually no reasons to do it.
Prefer composition (using DI) instead of inheritance.
Also, often common logic can be extracted into Middleware.

### Singular resource name

Controllers that control a resource must use the singular resource name.

```diff
-final class CoursesController
+final class CourseController
```

### Stick to default CRUD action names

Stick to default CRUD action names when possible: `index`, `create`, `store`, `show`, `edit`, `update`, and `destroy`.

This is a loose guideline that doesn’t need to be enforced.

### Inject route params, then Request, then other dependencies

Order of controller action parameters:

1. Route params or bound Models
2. Request instance
3. Other dependencies

```php
public function __invoke(User $user, Request $request, DetachUserFromTeamAction $detachAction)
{
    ...
}
```

The same for scalar GET params (good example: `public function __invoke(int $teamId, Request $request`).

[Why?](https://masteringlaravel.io/daily/2024-06-12-our-rule-for-ordering-controller-action-parameters)

### Use Action classes

Actions are classes that take care of one specific task.
Controllers (HTML/JSON/XML/etc.), Console Commands, Nova Actions are just a thin layer that calls Action classes.
Such Controller classes have access to the application context (Request, Cache, Session, etc.),
extract the data from the context, validate it and pass to the Action class.
On this layer, you can do validation, authorization, get session data and some cache, and then pass the data to the Action(s).

You can read everything about actions in the [Blogpost by Freek Van der Herten](https://freek.dev/1371-refactoring-to-actions).

Some notes on our implementation:

-   Action classes are final and readonly
-   Action classes do not extend any base class
-   Action classes have only one public method: `execute(...)`

```php
final class DetachTeamMemberController
{
    public function __invoke(Team $team, Member $member, DetachTeamMemberAction $detachAction): RedirectResponse
    {
        $this->authorize('update', $team);
        $detachAction->execute($team, $member);
        return redirect()->route('teams.show', [$team]);
    }
}
```

## Requests

1. Do not use the `authorize()` method in Form Request classes. Handle authorization in controllers or dedicated classes.
1. Use `$request->input(...)` instead of `$request->get(...)`

## Responses

1. Prefer explicit response methods:

    ```php
     // Good
     return redirect()->route('home');
     return redirect()->to($url);

     // Bad (mixed return types)
     return redirect(route('home'));
     return redirect($url);
    ```

1. Use consistent HTTP status codes. Limit the number of codes the app can return and process them consistently.

## Routing and API Design

### URL Structure

1. Use kebab-case for URLs:
    ```
    https://www.example.com/about-us
    https://www.example.com/user-profile
    ```
1. Use camelCase for route parameters:
    ```php
    Route::get('users/{user}', UserProfileShowController::class);
    ```

### Route Definition

1. Do not use `Route::resource`. Define routes explicitly to avoid unnecessary routes and simplify full text search by the project.
1. Use array syntax for multiple middleware:
    ```php
    Route::get('about', AboutPageController::class)
        ->middleware(['cache:1day', 'auth']);
    ```

### Route Naming

1. Always name your routes (for HTML endpoints) and use the `route()` helper to generate URLs:
    ```php
    Route::get('about', AboutPageController::class)->name('about.index');
    ```
    ```blade
    <a href="{{ route('about.index') }}">About</a>
    ```
1. Use camelCase for route names:
    ```php
    Route::get('users/{user}', UserProfileShowController::class)->name('userProfiles.show');
    ```

### Using route()

There are few valid options on how to use `route()` helper for named routes:

```php
// route: '/meetups/{meetupId}'
$meetup = \App\Modules\LocalGroup\Models\Meetup::query()->find($meetupId);

route('meetups.show', $meetup); // GOOD (RECOMMENDED) for routes with a single parameter
route('meetups.show', $meetupId); // GOOD for cases when you don’t have Meetup object but have an ID/key
route('meetups.show', [$meetup]); // BAD, please don’t use array syntax for a single param routes or use array keys
route('meetups.show', ['meetupId' => $meetup]); // GOOD (RECOMMENDED)
route('meetups.show', ['meetupId' => $meetupId]); // GOOD
route('meetups.show', ['id' => $meetup->id]); // ERROR: Missing required parameter "meetupId"
```

2+ required parameters:

```php
// route: '/teams/{team}/members/{member}'
$member = \App\Models\Member::query()->with(['team'])->first();

route('teams.members.show', ['team' => $member->team, 'registration' => $member]); // GOOD, RECOMMENDED
route('teams.members.show', ['team' => $member->team_id, 'registration' => $member->id]); // GOOD, RECOMMENDED (when you don’t have a model object but have an id/key)
route('teams.members.show', [$member->team, $member]); // NOT RECOMMENDED
route('teams.members.show', ['member' => $member, 'team' => $member->team]); // BAD, params mixed up (but still working as expected)
// other options are not recommended also
```

### API Design

1. Use versioning for your API:
    ```php
    Route::prefix('api/v1')->group(function () {
        // API routes
    });
    ```
1. Use plural nouns for resource endpoints:
    ```
    GET /api/v1/articles
    POST /api/v1/articles
    GET /api/v1/articles/{article}
    ```
1. Use nested resources for representing relationships:
    ```
    GET /api/v1/articles/{article}/comments
    POST /api/v1/articles/{article}/comments
    ```
1. Use query parameters for filtering, sorting, and pagination:
    ```
    GET /api/v1/articles?sort=created_at&order=desc&page=2
    ```
1. Use Laravel API [Resources](https://laravel.com/docs/master/responses) for transforming your models into JSON responses.

### Controller + action notation

Tuple notation MUST be used to declare a route (when it’s possible):

```php
// GOOD
Route::get('about', AboutPageController::class); // invokable single action controller
Route::get('about', [AboutPageController::class, 'index']);

// BAD
Route::get('about', 'AboutPageController@index');
```

### Route parameters

Route parameters SHOULD use camelCase.

```php
Route::get('members/{memberId}', MemberProfileShowController::class);
```

### Verbs

All routes have an HTTP verb; that’s why we put the verb first when defining a route.
It makes a group of routes very readable. Any other route options MUST come after it.

```php
// GOOD: all http verbs come first
Route::get('/', HomeController::class)->name('home');

// BAD: http verbs not easily scannable
Route::name('home')->get('/', HomeController::class);
```

## Authorization

1. [Policy class](https://laravel.com/docs/master/authorization#creating-policies) methods MUST use camelCase. Example: `@can('editPost', $post)` ([Laravel does it under the hood](https://github.com/illuminate/auth/blob/09d82d3a2966e6673495456f340855186a1962f5/Access/Gate.php#L718))
1. Try to name abilities using default CRUD words. One exception: replace `show` with `view`. A server shows a resource, a user views it.
1. Some other packages may use Policies (example: [Nova](https://nova.laravel.com/docs/resources/authorization.html)). Build your method naming strategy accordingly.

## Validation

Always use array notation (avoid using `|` as separator for validation rules).
Using an array notation will make it easier to apply custom rule classes to a field.

```diff
public function rules(): array
{
    return [
-       'email' => 'required|email',
+       'email' => ['required', 'email'],
    ];
}
```

### Custom rules

1. Prefer class-based custom `Rule`s.
1. Consider extract repeatable validation rules to a separate class (there is a great [validation-composite](https://github.com/illuminatech/validation-composite) package for that).

## Blade Templates

### Use camelCase

View files and directories MUST use camelCase.

```
resources/
    views/
        pages/
            localGroups/
                show.blade.php
                createDiscussion.blade.php
```

### Explicitly pass variables to partials

When you Blade partials (`@include` directive), always pass the variables explicitly.

```diff
-@include('welcome')
+@include('welcome', ['user' => $user])
```

### Help your IDE

You SHOULD create and maintain PHPDoc blocks at the top of every view file.
You MUST create and maintain PHPDoc blocks for components.

```blade
<?php
/**
 * @var \App\Models\User $user
 * @var \Illuminate\Support\Collection<int, \App\Models\Post> $posts
 */
?>
@extends('layouts.app')
...
```

### PHP in Blade

Add PHP injection using `<?php` and `?>` tags.
The `@php` and `@endphp` Blade directive pair looks good and does the same job,
but doesn't provide any benefits.
Also, some tools and IDEs can’t parse Blade syntax.

## Translations

### Use \_\_

Translations MUST be rendered with the `__()` function.
It's preferable over the `@lang` directive in Blade views
because `__()` can be used in both Blade views and regular PHP code.
Here’s an example:

```diff
-@lang('newsletter.form.title')
+{{ __('newsletter.form.title') }}
```

```diff
-trans('newsletter.form.title')
+__('newsletter.form.title')
```

### Use camelCase for translation parameters

```php
__('app.message', ['firstName' => 'Peter', 'productName' => 'Bananas']);
```

## Asset Management

Use `@vite` Blade directive for `.js` and `.css` files (as it adds preloading and other stuff on the top).
Use `Vite::asset()` helper for other assets.

## Exceptions

### Be explicit about error

```diff
-abort(404);
+abort(404, "The course with the ID $courseId could not be found.");
```

## Jobs

Jobs should follow these characteristics:

-   **Reentrancy**. If interrupted, a job can be restarted and completed successfully.
-   **Idempotence**. A job can be called multiple times without changing the side effects.
-   **Concurrence**. More than one instance of a job can run simultaneously (or use `ShouldBeUnique`).
-   **Sequence Independence**. The order of the jobs doesn't matter (or use `Bus::chain()`).

You can find more details on awesome talk: [Matt Stauffer - Patterns That Pay Off](https://youtu.be/enTb2E4vEos?t=1891)

### Dispatching

You SHOULD use `dispatch()` helper instead of Facade or DI,
as they have different functionality (e.g., only `dispatch()` respects `ShouldBeUnique` interface).
and you may face some limitations or even bugs.
[See details](https://github.com/laravel/framework/issues/45781#issuecomment-2154342909).

```php
// GOOD
dispatch(new YouJob($argument));

// BAD
YouJob::dispatch($argument); // \Illuminate\Foundation\Bus\Dispatchable trait

// BAD
use Illuminate\Support\Facades\Bus;
Bus::dispatch(new YouJob($argument));
```

## Events

### Minimize the number of traits

By default, Laravel adds few traits to a new Event class, even if it’s not needed in your particular case.
We fixed it in our custom stub file for Event, but it’s still better to control traits more explicitly.

```diff
-use Dispatchable, InteractsWithSockets, SerializesModels;
+use SerializesModels; // only if the Event will be used with Queued Event Listeners
```

-   `Dispatchable` is to add static methods to simplify event dispatching, like `YourEvent::dispatch()`. We do not use this syntax, so we don’t need this trait. Please use `\Illuminate\Support\Facades\Event` facade instead, e.g. `Event::dispatch(new YourEvent())`.
-   `SerializesModels` is to gracefully serialize any Eloquent models if the event object contains Eloquent models and going to be serialized using PHP's `serialize` function, such as when utilizing queued listeners.
-   `InteractsWithSockets` is for broadcasting only, e.g. using Laravel Echo.

Best Practices:

-   Tailor Event class traits based on specific needs rather than using the default set.
-   Understand the implications of each trait to avoid unnecessary overhead or missing functionality.
-   Event classes should be `final` and `readonly`

## Configs

Use custom config files with your brand prefix (like `ixdf_`) to separate custom config vars from Laravel’s and 3rd party packages ones.
It will also help you to migrate to new Laravel versions by having fewer conflicts/customizations.

Usually we have one config file per Module.

## Security

Regularly scan your app and codebase for security vulnerabilities:

-   [Observatory by Mozilla](https://observatory.mozilla.org/) (headers, certificates)
-   [SSL test by SSLLabs](https://www.ssllabs.com/ssltest)

### SQL injection

Laravel provides a robust [Query Builder](https://laravel.com/docs/queries) and [Eloquent ORM](https://laravel.com/docs/eloquent).
And thanks to them, most of the queries are protected in Laravel applications by default, so for example, a query like

```php
Product::query()->where('category_id', $request->input('categoryId'))->get();
```

will be automatically protected: under the hood, Laravel will translate the code into a prepared statement and execute.

But developers usually make mistakes by assuming Laravel protects from all SQL injections, while there are some attack vectors that Laravel can’t protect, here are the most common causes of SQL injections.

#### SQL Injection via column name

It’s not safe to pass user-controlled column names to the query builder.
Here is a warning fromLaravel’s documentation.
![image](https://user-images.githubusercontent.com/5278175/97222695-d3978300-17df-11eb-8012-c810ae4c23dc.png)

So the following code will be vulnerable to an SQL injection:

```php
$categoryId = $request->input('categoryId');
$orderBy = $request->input('orderBy');
Product::query()
    ->where('category_id', $categoryId)
    ->orderBy($orderBy)
    ->get();
```

This way, someone can use a query like `http://example.com/users?orderBy=id->test"' ASC, IF((SELECT count (*) FROM users ) < 10, SLEEP(20), SLEEP(0)) DESC -- "'`

Resume: **Do not pass user-controlled column names to Query Builder without whitelisting**.

#### SQL Injection via validation rules

Let’s look at the following simplified validation code

```php
$userId = $request->input('id');
Validator::make($request->post(), [
    'username' => ['required', "unique:users,name,$userId"],
]);
```

Since Laravel uses `$userId` here to query that database and `$userId` is not escaped, it will allow an attacker to perform an SQL injection.

##### Case 1: Making the validation rule optional

The simplest thing that we can do here is to send a request with ID = `10|sometimes`,
which will alter the validation rule to`required|unique:users,username,10|sometimes` and will allow us to not skip the username in the request data,
depending on your application business logic, a bypass like this might create a security issue.

##### Case 2: DDOS the server by creating an evil REGEX validation rule

Another attack vector here could be to create an evil Regex validation,
that is vulnerable to ReDoS attack and DDOS the app.
For example, the following request would consume a lot of CPU and if multiple requests sent concurrently can cause a big CPU spike on the server.

```
PUT /api/users/1,id,name,444|regex:%23(.*a){100}%23
```

```json
{
    "username": "aaaaa.....ALOT_OF_REPETED_As_aaaaaaaaaa"
}
```

##### Case 3: SQL Injection

The simplest SQL injection here would be to just add an extra validation rule that is querying the database, for example

```
PUT /api/users/1,id,name,444|unique:users,secret_col_name_here
```

```json
{
    "username": "secret_value_to_check"
}
```

But important to mention, since using unique, we are able to provide both custom column name
and values (values are not going through PDO parameter binding), the possibilities of SQL injection here could be not limited
to just a simple attack vector mentioned above.
For more details, check out Laravel Blog’s post "[Unique Rule SQL Injection Warning](https://blog.laravel.com/unique-rule-sql-injection-warning)".

Resume: The best prevention here is to not use user-provided data to create a validation rule.

#### SQL Injection via raw queries

`DB::raw` function is dangerous when developers don’t escape passed data.
If you have to use `DB::raw` function for some custom query, make sure you escape the passed data via `DB::getPdo()->quote()` method.

### XSS Prevention

Cross-Site Scripting can be very dangerous, for example an XSS attack in the admin panel can allow an attacker to inject a code like this:

```html
Some text
<input onfocus='$.post("/admin/users", {name:"hacker", email:"hacker@example.com", password: "test123", });' autofocus />
test
```

Which will allow an attacker to create an admin user with his credentials and take over the admin panel.

Laravel Blade protects from most XSS attacks, so for example an attack like this will not work:

```html
// $name = 'John Doe
<script>
    alert('xss');
</script>
';
<div>{{ $name }}</div>
```

::: v-pre
Blade’s `{{ }}` statement automatically encodes the output. So the server will send the following properly encoded code to the browser (which will prevent the XSS attack):
:::

```html
<div>John Doe&lt;script&gt;alert(&quot;xss&quot;);&lt;/script&gt;</div>
```

But frameworks can’t handle all cases for developers.

#### Case 1: XSS via `{!! $variable !!}` Statement

Sometimes you need to output a text that contains HTML, and for it you will use `{!! !!}`:

```blade
<div>{!! $htmlDescription !!}</div>
```

In this case Laravel can’t do anything for you and if the `$htmlDescription` contains JavaScript code, it will be executed as-is and we will get an XSS attack.

Prevention tips:

1. If you can, avoid outputting user supplied data without html encoding.
1. If in some cases you know that the data can contain HTML, use [HTML Purifier](http://htmlpurifier.org/) to clean the HTML from JS and unwanted tags before outputting the content.

#### Case 2: XSS via a.href Attribute

If you are outputting user provided value as a link, here are some examples on how it can turn into an XSS attack.

```blade
// $user->website = "javascript:alert('Hacked!');";
<a href="{{ $user->website }}">My Website</a>
```

The `alert(‘Hacked!’)` code will get executed when a user clicks on the link.

Prevention tips:

1. Validate user provided links, in most cases, you need only to allow http/https schemas
1. As an extra layer of security, before outputting you can replace any link that is not starting with http/https schema with some “#broken-link” value.

#### Case 3: XSS via Custom Directive

When you write a custom directive, don’t forget to use Laravel’s `e` function to escape any code that is user provided.
An example of vulnerable code:

```php
// Registering the directive code
Blade::directive('hello', function ($name) {
    return "<?php echo 'Hello ' . $name; ?>";
});

// user.blade.php file
// $name = 'John Doe <script>alert("xss");</script>';
@hello($name);
```

### CSRF Protection

By default, use [CSRF protection](https://laravel.com/docs/master/csrf)
for [all POST, PUT, DELETE, and PATCH requests](https://masteringlaravel.io/daily/2024-06-05-does-this-page-really-need-csrf-protection).
However, there are some cases when you don’t need CSRF protection, for example, when you are building an API.

For HTML endpoints ("pages), there are cases when a user can spend a lot of time on a page and the CSRF token can expire.
Examples: a form that user fills in for a long time (online courses, contact form, etc.).
For such cases, you can use the `VerifyCsrfToken` middleware to exclude some routes from CSRF protection,
but it's strictly recommended to use security headers (`Content Security Policy (CSP)`, `X-Frame-Options`, etc.)
to mitigate the risk of CSRF and XSS attacks.

### Mass Assignment Vulnerabilities

Example: a `User` model with:

```php
protected $fillable = ['name', 'email', 'password', 'role'];
```

If in a Controller a developer uses something like `$user->fill($request->all());` or `$user->update($request->all());`,
a user/attacker can add an input with a `role` name and submit the form and thus, set a role, e.g. to "administrator".

Prevention tips:

1. Don’t use Mass Assignment
1. Pass to Model only fields that have been validated: `$user->update($validator->validated());`
1. Use whitelisting instead of blacklisting (prefer `$fillable` over `$guarded`, because it’s easy to forget to add a new column to `$guarded` when you add it to a Model)
1. Use `$model->forceFill($data)` method with caution, make sure passed data cannot be manipulated by the user

## Materials

1. [Matthias Noback: Recipes for Decoupling](https://matthiasnoback.nl/book/recipes-for-decoupling/)
1. [Adel Faizrakhmanov: Architecture of Complex Web Applications](https://github.com/adelf/acwa_book_en)
1. [Spatie guidelines](https://github.com/spatie/guidelines.spatie.be/blob/master/content/code-style/laravel-php.md)
1. [XSS Attack Vectors in Laravel Blade](https://medium.com/cyberpanda/xss-and-laravel-blade-4b471c09d189)
1. [Testing tips by Kamil Ruczyński](https://github.com/sarven/unit-testing-tips)

🦄
