# Laravel conventions

## Strategy

First and foremost, Laravel provides the most value when you **write things the way Laravel intended you to write**.
It means better and more extensive use of native laravel features or Laravel “products” like Nova.
Whenever you do something differently, make sure you have a justification for why you didn’t follow the defaults.

Secondary, Laravel often provides few ways/APIs to achieve your goals, in this document
we try to list all our conventions to keep our code more consistent and use only one way.

[[toc]]

## Facades vs Facade aliases vs. helper functions

Facades SHOULD be used in PHP code, helpers SHOULD be used in Blade views. Don’t use Facade root aliases (it’s extra magic that’s easy to avoid).

## Eloquent Models

### Use Model::query()

We generally don’t use short and magic syntax for queries:

```php
// GOOD
Member::query()->firstWhere('id', 42);

// BAD
Member::firstWhere('id', 42);
```

### Don’t use mass assignment

Mass assignment SHOULD not be used when it’s easily possible. When it's used in a wrong way,
it can add security vulnerabilities, it also allows creating Models with a wrong state.

The preferred way to create or update models is to assign attributes line by line and call `save()` at the end:

```php
// PREFERRED WAY
$member = new Member();
$member->name = $request->input('name');
$member->email = $request->input('email');
$member->save();

// TRY TO AVOID
$member->forceFill([
    'name' => $request->input('name'),
    'email' => $request->input('email'),
])->save();
```

### Minimize magic

Don’t use magic `where{Something}` methods.

### Document all magic using PHPDoc

When you add a relationship or scope, add appropriate PHPDoc block to the Model:

```php
// Models/Member.php
/**
 * @property-read \Illuminate\Database\Eloquent\Collection<\App\Models\Permission\Role> $roles Member’s Roles  (added by a Member::roles() relationship)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member\Member canceled() Cancelled Member state (added by a Member::scopeCanceled())
 */
```

### Use safe defaults for attributes

Model’s attributes should not rely on DB’s default values.
Instead, we should duplicate defaults in the model by filling the `$attributes` array.
It helps us to be more independent of the DB and simplifies Model’s Factories as well as testing.

## Artisan commands

### Names

The names given to artisan commands SHOULD all be kebab-cased.

```bash
# GOOD
php artisan delete-old-records

# BAD
php artisan deleteOldRecords

# BAD
php artisan delete_old_records
```

### Constructors

Inject any dependencies in the `handle()` method instead of in the constructor.
Laravel initiates **ALL** console commands on **every** `artisan` call, for this reason
console command class constructors should be fast and not contain any heavy logic.

### Output

#### Use verbosity levels

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
1. `default` mode: errors, all warnings and general feedback like `All OK, processed XX records!`.
1. `v`, `vv`, `vvv` modes: errors, warnings and any additional info.

The idea behind it is to send email with console command outputs only when output is present (not empty).

## Controllers

### Singular resource name

Controllers that control a resource must use the singular resource name.

```php
// GOOD
final class CourseController {}

// BAD
final class CoursesController {}
```

### Use default action names

Try to keep controllers simple and stick to the default CRUD keywords (`index`, `create`, `store`, `show`, `edit`, `update` and `destroy`).
Extract a new controller if you need other actions.

![image](https://cloud.githubusercontent.com/assets/5278175/24997630/f8a11bc0-203f-11e7-8276-cc59330a09c1.png)

This is a loose guideline that doesn’t need to be enforced.

### Use method injection for Request and other dependencies

```php
// GOOD
public function update(Request $request, Course $course)
{
    $this->validate($request, ['email' => ['email']);
    $name = $request->input('name');
}

// BAD
public function update(Course $course)
{
    $this->validate(request(), ['email' => ['email']);
    $name = request('name');
}
```

### Inject route params, then other dependencies

```php
// GOOD
public function update(Team $team, Request $request, DetachFromTeamToIndividualGracePeriodAction $detachAction)
{
    ...
}

// BAD
public function update(Request $request, Team $team, DetachFromTeamToIndividualGracePeriodAction $detachAction)
{
    ...
}
```

The same for scalar GET params (good example: `public function update(int $teamId, Request $request`).

## Requests

### Use $request->input() instead of $request->get()

For the sake of consistency, we use `$request->input()` only.

```php
// GOOD
public function store(Request $request)
{
    $email = $request->input('email');
}

// BAD
public function store(Request $request)
{
    $email = $request->get('email');
}
```

## Responses

### Less magic

```php
// GOOD
return redirect()->route('home');
return redirect()->to($url);

// BAD
return redirect(route('home')); // mixed return type (RedirectResponse|Redirector)
return redirect($url); // mixed return type (RedirectResponse|Redirector)
```

### Status Codes

See [HTTP response status codes](/docs/code/http-response-status-codes.md).

## Routing

### URLs

Public-facing urls must use kebab-case.

```
https://www.interaction-design.org/about/people-behind
https://www.interaction-design.org/my-private-profile
```

### Route names

Routes MUST have names, please use `route()` helper to generate URLs from named routes. Route names MUST use camelCase.

```php
Route::get('about', [AboutPageController::class, 'index'])->name('about.index');
```

```blade
<a href="{{ route('about.index') }}">About</a>
```

Route names SHOULD include the plural form of the resource name and the action: `paymentMethods.show`, `paymentMethods.delete`.

### route()

There are few valid options on how to use `route()` helper for named routes:

```php
// route: '/meetups/{meetupId}'
$meetup = \App\Models\LocalGroup\Meetup::query()->find($meetupId);

route('meetups.show', $meetup); // GOOD (RECOMMENDED) for routes with a single parameter
route('meetups.show', $meetupId); // GOOD for cases when you don’t have Meetup object but have an ID/key
route('meetups.show', [$meetup]); // BAD, please don’t use array syntax for a single param routes or use array keys
route('meetups.show', ['id' => $meetup]); // GOOD (RECOMMENDED)
route('meetups.show', ['id' => $meetupId]); // GOOD
route('meetups.show', ['meetupId' => $meetup->id]); // ERROR: Missing required parameter "id"
```

2+ required parameters:

```php
// route: '/master-classes/{masterclass}/registrations/{registration}'
$registration = \App\Models\Masterclass\Registration::query()->first();

route('masterclasses.registrations.show', [$registration->masterclass, $registration]);
route('masterclasses.registrations.show', ['masterclass' => $registration->masterclass, 'registration' => $registration]); // GOOD, RECOMMENDED
route('masterclasses.registrations.show', ['registration' => $registration, 'masterclass' => $registration->masterclass]); // BAD, params mixed up (but still working as expected)
route('masterclasses.registrations.show', [$registration->masterclass, 'registration' => $registration]); // BAD: missing first key (Inconsistency)
route('masterclasses.registrations.show', ['masterclass' => $registration->masterclass, $registration]); // BAD: missing second key (Inconsistency)
```

### Use Method Chaining

When defining routes, use method chaining instead of array of params:

```php
// GOOD:
Route::get('about', [AboutPageController::class, 'index'])->name('about.index')->middleware(['cache:1day']);

// BAD:
Route::get('about', ['as' => 'about.index', 'uses' => [AboutPageController::class, 'index']])->middleware(['cache:1day']);
```

### Use array syntax for Route::middleware()

```php
// GOOD
Route::get('about', [AboutPageController::class, 'index'])->middleware(['cache:1day']);
Route::get('about', [AboutPageController::class, 'index'])->middleware(['cache:1day', 'CORS']);

// BAD
Route::get('about', [AboutPageController::class, 'index'])->middleware('cache:1day', 'CORS');
Route::get('about', [AboutPageController::class, 'index'])->middleware('cache:1day');
```

### Controller + action notation

Tuple notation MUST be used to declare a route (when it’s possible):

```php
// GOOD
Route::get('about', [AboutPageController::class, 'index']);

// BAD
Route::get('about', 'AboutPageController@index');
```

### Route parameters

Route parameters SHOULD use camelCase.

```php
Route::get('members/{memberId}', [MembersController::class, 'show']);
```

### Verbs

All routes have a http verb, that’s why we put the verb first when defining a route.
It makes a group of routes very readable. Any other route options MUST come after it.

```php
// GOOD: all http verbs come first
Route::get('/', [HomeController::class, 'index'])->name('home');

// BAD: http verbs not easily scannable
Route::name('home')->get('/', [HomeController::class, 'index']);
```

## Authorization

1. Policies MUST use camelCase. Example: `@can('editPost', $post)` ([Laravel does it under the hood](https://github.com/illuminate/auth/blob/09d82d3a2966e6673495456f340855186a1962f5/Access/Gate.php#L718))
1. Try to name abilities using default CRUD words. One exception: replace `show` with `view`. A server shows a resource, a user views it.

## Validation

Avoid using `|` as separator for validation rules, always use array notation.
Using an array notation will make it easier to apply custom rule classes to a field.

```php
// GOOD
public function rules(): array
{
    return [
        'email' => ['required', 'email'],
    ];
}

// BAD
public function rules(): array
{
    return [
        'email' => 'required|email',
    ];
}
```

All custom validation rules must use snake_case:

```php
Validator::extend('is_null', fn ($attribute, $value, $parameters, $validator) => $value === null);
```

## Views

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

### Explicitly pass variables to partials and components

```blade
{{-- GOOD --}}
{{ $user->name }}
@include('welcome', ['user' => $user])

{{-- BAD --}}
{{ $user->name }}
@include('welcome')
```

### Help your IDE

You SHOULD create and maintain PHPDoc blocks at the top of every view file.
You MUST create and maintain PHPDoc blocks for components.

Add PHP injection using `<?php` and `?>`. The `@php` and `@endphp` Blade directives pair looks better, but the tools we use (Psalm, Rector, PHPCS, PHP-CS-Fixer) can’t parse Blade syntax.

## Translations

### Use \_\_

Translations MUST be rendered with the `__()` function.
We prefer using this over the `@lang` directive in Blade views because `__()` can be used in both Blade views and regular PHP code. Here’s an example:

```blade
{{-- GOOD --}}
{{ __('newsletter.form.title') }}

{{-- BAD --}}
@lang('newsletter.form.title')
```

```php
// GOOD
__('newsletter.form.title')

// BAD
trans('newsletter.form.title')
```

### Use camelCase for translation parameters

```php
__('app.message', ['firstName' => 'Peter', 'productName' => 'Bananas']);
```

## Exceptions

### Be explicit about error

```php
// GOOD
abort(404, "The course with the ID $courseId could not be found.");

// BAD
abort(404);
```

## Jobs

There are few characteristics, our Jobs should follow:

-   **Reentrancy**. If a task is interrupted, it can be restarted and completed successfully.
-   **Idempotence**. A task can be called multiple times, without changing the side effects.
-   **Concurrence**. More than one of a task can be run at the same time.
-   **Sequence Independence**. The order of the tasks doesn’t matter.

You can find more details on awesome talk: [Matt Stauffer - Patterns That Pay Off](https://youtu.be/enTb2E4vEos?t=1891)

### Dispatching

You SHOULD use `Bus::dispatch()` instead of `YourJobClass::dispatch()` magic to make code readable for static analyzers:

```php
// GOOD
use Illuminate\Support\Facades\Bus;
Bus::dispatch(new YouJob($parameter));

// BAD
YouJob::dispatch($parameter)
```

## Migrations

We write `down()` methods because we should be able to rollback failed releases (see `deploy:rollback` deployer’s task).

## Configs

We use `ixdf_` prefix for our custom config files to separate our config vars from Laravel’s and 3rd party packages ones.
It also helps us to migrate to new Laravel versions: we have fewer conflicts.

Usually we have one config file per system.

## Security

### SQL injection

Laravel provides a robust [Query Builder](https://laravel.com/docs/queries) and [Eloquent ORM](https://laravel.com/docs/eloquent).
And thanks to them most of the queries are protected in Laravel applications by default, so for example a query like

```php
Product::query()->where('category_id', $request->input('categoryId'))->get();
```

will be automatically protected, since under the hood Laravel will translate the code into a prepared statement and execute.

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

But important to mention since using unique we are able to provide both custom column name
and values (values are not going through PDO parameter binding) possibilities of SQL injection here could be not limited
to just a simple attack vector that is mentioned above.
For more details, check out Laravel Blog’s post "[Unique Rule SQL Injection Warning](https://blog.laravel.com/unique-rule-sql-injection-warning)".

Resume: The best prevention here is to not use user-provided data to create a validation rule.

#### SQL Injection via raw queries

`DB::raw` function is dangerous when developers don’t escape passed data.
If you have to use `DB::raw` function for some custom query, make sure you escape the passed data via `DB::getPdo()->quote()` method.

### XSS in Laravel Blade

Cross-Site Scripting can be very dangerous, for example an XSS attack in the admin panel can allow an attacker to inject a code like this:

```html
Some text
<input
    onfocus='$.post("/admin/users", {name:"hacker", email:"hacker@example.com", password: "test123", });'
    autofocus
/>
test
```

Which will allow an attacker to create an admin user with his credentials and take over the admin panel.

Laravel Blade protects from most XSS attacks, so for example an attack like this will not work:

```html
// $name = 'John Doe
<script>
    alert("xss");
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
<div>{{$ $htmlDescription }}</div>
```

In this case Laravel can’t do anything for you and if the \$userBio contains JavaScript code, it will be executed as-is and we will get an XSS attack.

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

### Mass Assignment Vulnerabilities

Example: a `User` model with:

```php
protected $fillable = ['name', 'email', 'password', 'role'];
```

If in a Controller a developer uses something like `$user->fill($request->all());` or `$user->update($request->all());`,
a user/attacker can add an input with a `role` name and submit the form ans thus, set a role, e.g. to "administrator".

Prevention tips:

1. Don’t use Mass Assignment
1. Pass to Model only fields that have been validated: `$user->update($validator->validated());`
1. Use whitelisting instead of blacklisting (prefer `$fillable` over `$guarded`, because it’s easy to forget to add a new column to `$guarded` when you add it to a Model)
1. Use `$model->forceFill($data)` method with caution, make sure passed data cannot be manipulated by the user

## Materials

1. [Spatie guidelines](https://github.com/spatie/guidelines.spatie.be/blob/master/content/code-style/laravel-php.md)
1. [Common Security Mistakes in Laravel Applications](https://cyberpanda.la/ebooks/download/laravel-security)

🦄
