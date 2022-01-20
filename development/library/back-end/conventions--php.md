# PHP conventions

## tl;dr

There are main approaches to use modern PHP: like Ruby or like Java. We prefer Java-way: less magic, more types.

We strive to minimize magic and help IDE and static code analyzers to help us.

We use [PSR-12](<(https://github.com/php-fig/fig-standards/blob/master/proposed/extended-coding-style-guide.md)>)
extended by other rules (mostly by powerful [Slevomat Coding Standard](https://github.com/slevomat/coding-standard)).
Additionally, we like [Spatie’s code guidelines](https://guidelines.spatie.be/) and borrow some rules from them.

We generally observe the standards from the [PHP FIG](http://www.php-fig.org/).
We use automated tools to check our code on CI:

-   [phpcs](https://github.com/squizlabs/PHP_CodeSniffer/wiki) ([🔒 config](https://github.com/InteractionDesignFoundation/IxDF-web/blob/develop/.phpcs/IxDFCodingStandard/ruleset.xml))
-   [PHP-CS-Fixer](https://cs.symfony.com/) (([🔒 config](https://github.com/InteractionDesignFoundation/IxDF-web/blob/develop/.php_cs))
-   [psalm](https://psalm.dev/docs/) ([🔒 config](https://github.com/InteractionDesignFoundation/IxDF-web/blob/develop/psalm.xml))
-   [rector](https://github.com/rectorphp/rector) ([🔒 config](https://github.com/InteractionDesignFoundation/IxDF-web/blob/develop/rector.php))

⚠️ Our codebase has some legacy code that do not fully follow our standards, please tread this document as the main source of truth.
Main legacy parts:

1.  Setters. We SHOULD use [domain-specific](conventions--php.md#use-domain-logic-methods-instead-of-setters) methods to change model’s state.
1.  Getters (deprecation is not approved yet, please keep using them).

---

[[toc]]

## Final by default

When? — [whenever possible](https://ocramius.github.io/blog/when-to-declare-classes-final/). Try to keep the "O" of SOLID in your mind: code should be open for extension, but closed for modification.
That’s why you should use private as the default visibility modifier, and `final` keyword as the default for classes.

This way you’re encouraged to think before opening up your classes to the outside world.
You should take a moment to think about possible other ways to solve a problem instead of opening up classes.
You could for example rely more on composition, dependency injection and interfaces; instead of extending classes.

Especially in the context of open source packages, you’re encouraged to think twice about making a method public or protected, or opening a class for extension.
Every entry point in your code that is open for the public to use, is an entry point you’ll have to maintain with backwards compatibility in mind.

## Strict types

We do use `declare(strict_types=1);` by default.
[Strict typing](https://www.php.net/manual/en/functions.arguments.php#functions.arguments.type-declaration.strict) applies to function calls made from within the file with strict typing enabled.
It helps us to catch some tricky bugs. On other hand, it requires a developer to think more possible variable types,
but at the end of the day they have more stable code.

## Typed properties

You should specify property types whenever possible. Don’t use a docblock when you can use typed properties.

## Void return types

If a method return nothing, it SHOULD be indicated with void. This makes it more clear to the users of your code what your intention was when writing it.

## Docblocks

Don’t use docblocks for methods and functions that can be fully type hinted (unless you need a description).

Only add a description when it provides more context than the method signature itself ([Visual noise is real](https://stitcher.io/blog/a-programmers-cognitive-load)).
Use full sentences for descriptions.

Good example: reveal what your arrays and collections contain:

```php
// GOOD
final class Foo
{
    /** @var string[] */
    private array $urls;

    /** @var \Illuminate\Database\Eloquent\Collection<\App\Models\User> */
    private Collection $users;
}

// BAD
final class Foo
{
    private array $urls;
    private Collection $users;
}
```

When possible, docblocks SHOULD be written on one line.

Always use fully qualified class names in docblocks.

```php
// Good
/** @return \App\Models\Post */

// Bad
/** @return Post */
```

### Make inheritance explicit using the `@inheritDoc` tag

Because inheritance is implicit it may happen that it is not necessary to include a PHPDoc for an element.
In order to avoid any confusion, please always use the `@inheritDoc` tag for classes and methods.

Don’t use `@inheritDoc` for class properties, instead copy the docblock from the parent class or interface.

```php
// GOOD
final class Tag extends BaseTag
{
    /** @var string[] The attributes that are mass assignable. */
    protected $fillable = [
        'name',
    ];
}

// BAD
final class Tag extends BaseTag
{
    /** @inheritDoc  */
    protected $fillable = [
        'name',
    ];
}
```

### Describe traversable types

Use [Psalm syntax](https://psalm.dev/docs/annotating_code/type_syntax/array_types) to describe traversable types:

#### Lists / Ordered maps

```php
/** @return Type[] */
/** @return array<int, Type> */
/** @return array<TKey, TValue> */
/** @return Collection<TKey, TValue> */
```

#### Key-value store

You may know it as a structure / dictionary / hash / map / hashmap, what is [the same](https://en.wikibooks.org/wiki/A-level_Computing/AQA/Paper_1/Fundamentals_of_data_structures/Dictionaries).

```php
/** @return array{foo: string, bar: int} */
/** @return array{optional?: string, bar: int} */
```

## Generic types and templates

PHP doesn't support generic types out of the box, but there's a workaround that helps us
have a cleaner type interface, and therefore less bugs, which is
[psalm template annotations](https://psalm.dev/docs/annotating_code/templated_annotations/).
Here's an example:

```php
    /**
     * @template T of \Illuminate\Notifications\Notification
     * @param class-string<T> $notificationFQCN
     * @return T
     */
    protected function initialize(string $notificationFQCN): Notification
    {
        $reflectionClass = new \ReflectionClass($notificationFQCN);
        $constructor = $reflectionClass->getConstructor();

        // Checks to make sure we can instantiate the object

        return $reflectionClass->newInstance();
    }
```

## Strings

Prefer string interpolation above `sprintf` and the concatenation `.` operator whenever possible.
Always wrap the variables in curly-braces `{}` when using interpolation.

```php
// GOOD
$greeting = "Hi, I am {$name}.";
```

```php
// BAD (hard to distinguish the variable)
$greeting = "Hi, I am $name.";
// BAD (less readable)
$greeting = 'Hi, I am '.$name.'.';
```

For more complex cases when there are a lot of variable to concat or when it’s not possible to use string interpolation,
please use `sprintf` function:

```php
$greeting = sprintf('Hello, my name is %s', ucfirst(auth()->user()->name));
```

## Comments

Comments SHOULD be avoided as much as possible by writing expressive code.
If you do need to use a comment to explain the what, then
[refactor](https://refactoring.guru/refactoring/techniques) the code.
Ig you need to explain the reason (why), then format the comments as follows:

```
// There should be a space before a single line comment.

/*
 * If you need to explain a lot you can use a comment block. Notice the
 * single * on the first line. Comment blocks don’t need to be three
 * lines long or three characters shorter than the previous line.
 */
```

## Class name resolution

Do not use hardcoded fully-qualified class names in code.
Instead, use resolution via ClassName[`::class`](http://php.net/manual/en/language.oop5.basic.php#language.oop5.basic.class.class) keyword.

```php
// GOOD
use App\Models\Billing\Invoice;
echo Invoice::class;

// BAD
echo 'App\Models\Billing\Invoice';
```

## Use the class name instead of the self keyword

Use the class name instead of the `self` keyword for return type hints and when creating an instance of the class.

```php
// GOOD
public function createFromName(string $name): Tag
{
    $tag = new Tag();
    $tag->name = $name;

    return $tag;
}

// BAD
public function createFromName(string $name): self
{
    $tag = new self();
    $tag->name = $name;

    return $tag;
}
```

return self/new self() vs return ClassName/new ClassName() - we can of course use both, but it would be good to be consistent

## Exceptions

### Don’t use "Exception" suffix

That forces developers to write better exception class-names.
Details: [The "Exception" suffix](https://mnapoli.fr/approaching-coding-style-rationally/#:~:text=The%20%22Exception%22%20suffix)

### Be explicit about error

```php
// GOOD
abort(404, "The course with the ID {$courseId} could not be found.");

// BAD
abort(404);
```

## Type-casting

When converting the type of variable, use type-casting instead of dedicated methods. Reason: [better performance](http://tonyshowoff.com/articles/casting-int-faster-than-intval-in-php/).

```php
// GOOD
$score = (int) '7';
$hasMadeAnyProgress = (bool) $this->score;

// BAD
$score = intval('7');
$hasMadeAnyProgress = boolval($this->score);
```

## Use named constructors

Use named static constructors (aka "static factories") to encapsulate logic and data and create valid entities:

```php
// GOOD

// Models\Team.php
public static function createFromSignup(AlmostMember $almostMember): Team
{
    $team = new Team();
    $team->name = $almostMember->company_name;
    $team->country = $almostMember->country;
    $team->save();

    return $team;
}
```

Reason: have robust API that do not allow developers to create objects with invalid state (e.g. missing parameter/dependency).
A great video on this topic: [Marco Pivetta «Extremely defensive PHP»](https://youtu.be/Gl9td0zGLhw?t=1238)

## Use domain-specific operations

Similar to the previous rule, instead of creating setters to modify model properties
or directly modifying public properties, encapsulate the logic in domain-specific methods.
This way you can make sure that your models have valid/consistent state at all times.

```php
// GOOD

// Models\Member.php
public function confirmEmailWaitingConfirmation(): void
{
    $this->email = $this->email_waiting_confirmation;
    $this->email_waiting_confirmation = null;
}

// Controllers\MemberEmailConfirmationController.php
public function store(): void
{
    $member = Auth::user();
    $member->confirmEmailWaitingConfirmation();
    $member->save();
}

// BAD =====================================

// Controllers\MemberEmailConfirmationController.php
public function store(): void
{
    $member = Auth::user();
    $member->email = $member->emailWaitingConfirmation;
    $member->emailWaitingConfirmation = null;
    $member->save();
}
```

Note that this convention aligns with the idea of putting domain logic into models and not into controllers,
hence having rich domain models and thin controllers/services.

Want to learn more?

[!["Cruddy by Design" by Adam Wathan, 40 mins](https://user-images.githubusercontent.com/5278175/65231387-2cbebe80-dad8-11e9-9be7-234e0be9a740.png)](https://www.youtube.com/watch?v=MF0jFKvS4SI)
Read more about [class invariants](https://www.geeksforgeeks.org/what-is-class-invariant/)
for a better understanding of dangers of modifying class properties from controllers/services.

## assert() vs throw

Assertions should only be used to verify conditions that should be logically impossible to be false.
These conditions should only be based on inputs generated by your own code.
Any checks based on external inputs should use exceptions.

The best use case of `assert()` is to treat it as a docblock to specify types (great to nullables and polymorphic types).
`assert()` may be disabled on production, so please do not rely on it in a runtime, prefer Exceptions instead if you need
to check an expression in a runtime.

Make sure you add a description to `assert` so that it's easy to reason about the code when
a failure occurs.

From [official documentation](https://www.php.net/manual/en/function.assert.php):

> Assertions should be used as a debugging feature only.
> You may use them for sanity-checks that test for conditions that should always be true
> and that indicate some programming errors if not or to check for the presence of certain features
> like extension functions or certain system limits and features.

-   [assert on php.net](https://www.php.net/manual/en/function.assert.php)
-   [Should I be using assert in my PHP code?](https://stackoverflow.com/questions/4516419/should-i-be-using-assert-in-my-php-code)
-   [Assertions and assertion libraries](https://matthiasnoback.nl/2018/09/assertions-and-assertion-libraries/)

## regex

The biggest problem of regex is readability.
Please read a perfect article [Writing better Regular Expressions in PHP](https://php.watch/articles/php-regex-readability) on this topic. There is nothing to add.

You can also use `DEFINE` to declare recurring patterns in you regex. Here's an example regex that
declares `attr`, which captures HTML attributes and its use-case in declaring an image tag.
It also uses `sprintf` to create reusable regex definitions.

```php
class RegexHelper
{
    /** @return array<string, string> */
    public function images(string $htmlContent): array
    {
        $pattern = '
            (?'image' # Capture named group
                (?P>img) # Recurse img subpattern from definitions
            )
        '

        preg_match_all($this->createRegex($pattern), $htmlContent, $matches);

        return $matches['image'];
    }

    private function createRegex(string $pattern): string
    {
        return sprintf($this->getDefinitions(), preg_quote($pattern, '~'));
    }

    private function getDefinitions(): string
    {
        return "~
            (?(DEFINE) # Allows defining reusable patterns
                (?'attr'(?:\s[^>]++)?) # Capture HTML attributes
                (?'img'<img(?P>params)>) # Capture HTML img tag with its attributes
            )
            %s #Allows adding dynamic regex using sprintf
            ~ix";
    }
}

```

You can use [Regex101](https://regex101.com/) to test your patterns.

## Materials

1. [Union Types vs. Intersection Types](https://medium.com/@ondrejmirtes/union-types-vs-intersection-types-fd44a8eacbb)
1. [PHPDoc: Typing in Psalm](https://psalm.dev/docs/annotating_code/typing_in_psalm/)
1. [PHPDoc: Scalar types in Psalm](https://psalm.dev/docs/annotating_code/type_syntax/scalar_types/#trait-string)
1. [When to declare classes final](https://ocramius.github.io/blog/when-to-declare-classes-final/)
1. [Proposed PSR for docblocks](https://github.com/php-fig/fig-standards/blob/master/proposed/phpdoc-tags.md)

🦄
