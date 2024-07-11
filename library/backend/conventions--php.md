# IxDF's PHP conventions

[[toc]]

## Introduction

IxDF's PHP coding guidelines favor a Java-like approach: less magic, more types.
We prioritize explicit, strongly-typed code to enhance clarity, IDE support, and static analysis capabilities.

Key principles:

-   Minimize magic, maximize explicitness
-   Leverage PHP's type system
-   Optimize for IDE and static analyzer support

This guide assumes familiarity with PHP 8.x features and modern development practices.
It focuses on our specific conventions and rationale, rather than explaining basic concepts.

## Code Style and Tools

IxDF adheres to [PER Coding Style 2.0](https://www.php-fig.org/per/coding-style/),
extended with rules from [Slevomat Coding Standard](https://github.com/slevomat/coding-standard),

[PHP Coding Standards Fixer](https://github.com/PHP-CS-Fixer/PHP-CS-Fixer) and select guidelines from Spatie's Laravel PHP style guide.

### Tools

IxDF uses automated tools to check our code on CI:

-   [PHP-CS-Fixer](https://cs.symfony.com/) (fast and stable)
-   [PHPCS](https://github.com/squizlabs/PHP_CodeSniffer/wiki) (extendable and customizable)
-   [Psalm](https://psalm.dev/docs/) (`errorLevel="1"`)
-   [PHPStan](https://phpstan.org/user-guide/getting-started) (`level: 8`)
-   [Rector](https://github.com/rectorphp/rector)
-   [Deptrac](https://qossmic.github.io/deptrac/) (multiple configurations for modules and entire application)
-   [composer-dependency-analyser](https://github.com/shipmonk/composer-dependency-analyser) (checks for unused and shadow dependencies)
-   and more...

## Types

### Strict types

Use `declare(strict_types=1);` in all files. This catches type-related bugs early and promotes more thoughtful code, resulting in increased stability.

### Type declarations

-   Always specify property types (when possible)
-   Always specify parameter types (when possible)
-   Always use return types (when possible)
    -   Use `void` for methods that return nothing
    -   Use `never` for methods that always throw an exception

### Type-casting

Prefer type-casting over dedicated methods for better performance:

```php
// GOOD
$score = (int) '7';
$hasMadeAnyProgress = (bool) $this->score;

// BAD
$score = intval('7');
$hasMadeAnyProgress = boolval($this->score);
```

## Docblocks

-   Avoid docblocks for fully type-hinted methods/functions unless a description is necessary (([Visual noise is real](https://stitcher.io/blog/a-programmers-cognitive-load)))
-   Use docblocks to reveal the contents of arrays and collections
-   Write docblocks on one line when possible
-   Always use fully qualified class names in docblocks

```php
// GOOD
final class Foo
{
    /** @var list<string> */
    private array $urls;

    /** @var \Illuminate\Support\Collection<int, \App\Models\User> */
    private Collection $users;
}
```

### Inheritance and @inheritDoc

-   Use `@inheritDoc` for classes and methods to make inheritance explicit
-   For properties, copy the docblock from the parent class/interface instead of using `@inheritDoc`

### Traversable Types

Use advanced PHPDoc syntax to describe traversable types:

```php
/** @return list<string> */
/** @return array<int, Type> */
/** @return Collection<TKey, TValue> */
/** @return array{foo: string, optional?: int} */
```

<details>
<summary>Technical details</summary>

We use IxDF <a href="https://github.com/InteractionDesignFoundation/coding-standard" target="_blank">coding-standard package</a>
to enforce setting the type of the key and value in the iterable types
using phpcs with <code>SlevomatCodingStandard.TypeHints.\*</code> rules
(<a href="https://github.com/InteractionDesignFoundation/coding-standard/blob/72a43b4d4e5ffb233d4375b10690e7d55408adce/IxDFCodingStandard/ruleset.xml#L377-L419" target="_blank">config</a>)

</details>

### Generic Types and Templates

Use Psalm template annotations for generic types:

```php
/**
 * @template T of \Illuminate\Notifications\Notification
 * @param class-string<T> $notificationFQCN
 * @return T
 */
protected function initialize(string $notificationFQCN): Notification
{
    // Implementation...
}
```

### Additional Resources

1. [Union Types vs. Intersection Types](https://medium.com/@ondrejmirtes/union-types-vs-intersection-types-fd44a8eacbb)
1. [PHPDoc: Typing in Psalm](https://psalm.dev/docs/annotating_code/typing_in_psalm/)
1. [PHPDoc: Scalar types in Psalm](https://psalm.dev/docs/annotating_code/type_syntax/scalar_types/#trait-string)
1. [When to declare classes final](https://ocramius.github.io/blog/when-to-declare-classes-final/)
1. [Proposed PSR for docblocks](https://github.com/php-fig/fig-standards/blob/master/proposed/phpdoc-tags.md)

## OOP Practices

### Final by default

Use `final` for classes and `private` for methods [by default](<(https://ocramius.github.io/blog/when-to-declare-classes-final/)>).
This encourages composition, dependency injection, and interface use over inheritance.
Consider the long-term maintainability, especially for public APIs.

### Class name resolution

Use `ClassName::class` instead of hardcoded fully qualified class names.

```php
// GOOD
use App\Modules\Payment\Models\Order;
echo Order::class;

// BAD
echo 'App\Modules\Payment\Models\Order';
```

### Use `self` keyword

Prefer `self` over the class name for return type hints and instantiation within the class.

```php
public static function createFromName(string $name): self
{
    return new self($name);
}
```

### Named constructors

Use named static constructors to create objects with valid state:

```php
public static function createFromSignup(AlmostMember $almostMember): self
{
    return new self(
        $almostMember->company_name,
        $almostMember->country
    );
}
```

Reason: have a robust API that does not allow developers to create objects with invalid state (e.g. missing parameter/dependency).
A great video on this topic: [Marco Pivetta «Extremely defensive PHP»](https://youtu.be/Gl9td0zGLhw?t=1238)

### Domain-specific operations

Encapsulate domain logic in specific methods rather than using generic setters:

```php
// GOOD
public function confirmEmailAwaitingConfirmation(): void
{
    $this->email = $this->email_awaiting_confirmation;
    $this->email_awaiting_confirmation = null;
}

// BAD
public function setEmail(string $email): self;
```

This approach promotes rich domain models and thin controllers/services.

Want to learn more?

[!["Cruddy by Design" by Adam Wathan, 40 mins](https://user-images.githubusercontent.com/5278175/65231387-2cbebe80-dad8-11e9-9be7-234e0be9a740.png)](https://www.youtube.com/watch?v=MF0jFKvS4SI)
Read more about [class invariants](https://www.geeksforgeeks.org/what-is-class-invariant/)
for a better understanding of the dangers of modifying class properties from controllers/services.

### Enums

-   Use singular names
-   Use PascalCase for case names

```php
enum Suit
{
    case Hearts;
    case Diamonds;
    case Clubs;
    case Spades;
}
```

## Strings

**TL;DR**: interpolation > `sprintf` > concatenation

Prefer string interpolation above `sprintf` and the concatenation `.` operator whenever possible.
Always wrap the variables in curly-braces `{}` when using interpolation.

```php
// GOOD
$greeting = "Hi, I am {$name}.";

// BAD (hard to distinguish the variable)
$greeting = "Hi, I am $name.";
// BAD (less readable)
$greeting = 'Hi, I am '.$name.'.';
$greeting = 'Hi, I am ' . $name . '.';
```

For more complex cases when there are a lot of variables to concat or when it’s not possible to use string interpolation,
please use `sprintf` function:

```php
$debugInfo = sprintf('Current FQCN is %s. Method name is: %s', self::class, __METHOD__);
```

## Comments and Code Clarity

Comments SHOULD be avoided as much as possible by writing expressive code.
If you do need to use a comment to explain the what, then
[refactor](https://refactoring.guru/refactoring/techniques) the code.
If you need to explain the reason (why), then format the comments as follows:

```php
// There should be a space before a single line comment.

/*
 * If you need to explain a lot, you can use a comment block.
 * Notice the single * on the first line. Comment blocks don't need to be three
 * lines long or three characters shorter than the previous line.
 */
```

## Exceptions

### Exception Naming

Avoid the "Exception" suffix in exception class names. This encourages more descriptive naming.
For details, see [The "Exception" suffix](https://mnapoli.fr/approaching-coding-style-rationally/#:~:text=The%20%22Exception%22%20suffix).

::: tip Internal docs
[More info about exceptions](https://github.com/InteractionDesignFoundation/IxDF-web/blob/main/app/Exceptions/README.md).
:::

### assert() vs throw

-   Use `assert()` for conditions that should be logically impossible to be false, based on your own code's inputs.
-   Use exceptions for checks based on external inputs.
-   Treat `assert()` as a debugging tool and type specification aid, not for runtime checks.
-   Consider adding a description to `assert()` for clarity (2nd arg).

Remember: `assert()` may be disabled in production. Use exceptions for critical runtime checks.

For more information:

-   [PHP assert() documentation](https://www.php.net/manual/en/function.assert.php)
-   [Assertions and assertion libraries](https://matthiasnoback.nl/2018/09/assertions-and-assertion-libraries/)

> Assertions should be used as a debugging feature only.
> You may use them for sanity-checks that test for conditions that should always be true
> and that indicate some programming errors if not or to check for the presence of certain features
> like extension functions or certain system limits and features.

::: info Internal docs 🔒
Current status of `assert()` on production: **ENABLED** (see [infrastructure/php/8.3/production/fpm/php.ini](https://github.com/InteractionDesignFoundation/IxDF-web/blob/main/infrastructure/php/production/8.3/fpm/php.ini#L1606)), reasons: [#19772](https://github.com/InteractionDesignFoundation/IxDF-web/issues/19772).
:::

-   [assert on php.net](https://www.php.net/manual/en/function.assert.php)
-   [Should I be using assert in my PHP code?](https://stackoverflow.com/questions/4516419/should-i-be-using-assert-in-my-php-code)
-   [Assertions and assertion libraries](https://matthiasnoback.nl/2018/09/assertions-and-assertion-libraries/)

## Regular Expressions

Prioritize regex readability. For guidance, refer to [Writing better Regular Expressions in PHP](https://php.watch/articles/php-regex-readability).

Use `DEFINE` for recurring patterns and `sprintf` for reusable definitions:

```php
final class RegexHelper
{
    /** @return array<string, string> */
    public function images(string $htmlContent): array
    {
        $pattern = '
            (?'image' # Capture named group
                (?P>img) # Recurse img subpattern from definitions
            )
        ';

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

Use [Regex101](https://regex101.com/) for testing patterns.

> [!TIP]
> There is a less popular, hidden PHP germ [`sscanf`](https://www.php.net/manual/en/function.sscanf.php) function
> that can be used for parsing strings and simplify your code in some cases.

## Performance Considerations

### Functions

-   Prefer type-casting over type conversion functions (e.g., `(int)$value` instead of `intval($value)`)
-   Use `isset()` or `array_key_exists()` instead of `in_array()` for large arrays when checking for key existence
-   Leverage opcache for production environments
-   Use `stripos()` instead of `strpos()` with `strtolower()` for case-insensitive string searches
-   Consider using `array_column()` for extracting specific columns from multidimensional arrays

For in-depth performance analysis, use tools like Blackfire, XHProf, or Xdebug and Clockwork in development.

### Configs

-   Use `opcache` for production environments
-   Use PHP in worker code (FrankenPHP, RoadRunner, Swoole) for high-performance applications
-   If you use PHP-FPM: [Mateus Guimarães: Optimizing PHP applications for performance](https://mateusguimaraes.com/posts/optimizing-php-applications-for-performance)

## Testing and Quality Assurance

There is a great guide [Testing tips by Kamil Ruczyński](https://github.com/sarven/unit-testing-tips).

## Security

See [Security](./conventions--laravel#security) section from Laravel conventions.

## Dependency Management

-   Use Composer for managing PHP dependencies
-   Keep `composer.json` and `composer.lock` in version control
-   Specify exact versions or version ranges for production dependencies
-   Use `composer update` sparingly in production environments
-   Regularly update dependencies and review changelogs
-   Leverage tools to check for unused and shadow dependencies (`composer-dependency-analyser` or `composer-unused` + `composer-require-checker`)
-   Consider using [`composer-normalize`](https://github.com/ergebnis/composer-normalize) for consistent `composer.json` formatting
-   Use private repositories or artifact repositories for internal packages
-   Implement a dependency security scanning tool in your CI pipeline (e.g., Snyk, Sonatype, or GitHub's Dependabot; add `composer audit` to you CI pipeline)

🦄
