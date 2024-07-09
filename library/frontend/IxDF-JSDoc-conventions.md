# IxDF's JSDoc Conventions

For JavaScript code documentation, we use [JSDoc blocks](http://usejsdoc.org/).
There are a few type declarations standards in the JS ecosystem, namely:

-   [JSDoc](https://jsdoc.app/)
-   [Google Closure Compiler](https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System)
-   [TypeScript](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

We use the most compatible and least confusing options from all of them.
Most likely, your IDE and tools we use also support all of them.
This document is created to avoid confusion and increase consistency.

---

[[toc]]

## JSDoc vs. PHPDoc

Comparing with [PHPDoc](./../backend/conventions--php.md#docblocks), there are some differences:

1.  JSDoc uses`@returns` instead of `@return`;
2.  Curly brackets are used as wrappers for variable types, e.g., `{Object}`, `{Array<string>}`.
3.  `{number}` is used instead of `integer` and `float` in PHPDoc.

A good example of using JSDoc:

```js
/**
 * Sends logging information to server.
 *
 * @param {string} errorMessage Message to send.
 * @param {string} [fileName] Name of the file where the logging event was discovered
 * @param {Object} [postedData = {}] POST body data, provides some context of the logging event (optional with default value).
 * @returns {boolean} Whether it was sent.
 */
function logError(errorMessage, fileName, postedData = {}) {
    // some code
}
```

## Tags

The most used JSDoc block tags:

-   [@param](http://usejsdoc.org/tags-param.html) for describing function parameters.
-   [@returns](http://usejsdoc.org/tags-returns.html) for describing the return type of functions.
-   [@type](http://usejsdoc.org/tags-type.html) to specify the type of variable.
-   [@typedef](http://usejsdoc.org/tags-typedef.html) to define a data structure.

## Types

### Scalars

Use lowercase notation:

```js
/** @type {string} */
/** @type {number} */
/** @type {function} */
```

### Nullable types

```js
// Nullable
/** @param {?string} userName */
/** @param {?HTMLElement} element */

// Also nullable (using Type Union syntax)
/** @param {string|null} userName */
/** @param {HTMLElement|null} element */

// Not nullable (we don't use this syntax: all types are not nullable by default (except null) according to our conventions)
/** @param {!string} userName */
/** @param {!HTMLElement} element */
```

::: info
Whether a type is nullable or not nullable by default? - **Not nullable**!

There is confusion around this, both TypeScript and Closure compiler treat scalars as not nullables by default,
but Closure treats Instance Types as nullable (TypeScript doesn’t).
We have chosen the TypeScript way here.
:::

### Optional parameters

```js
// The most conventional and widely recognized. The square brackets denote that the parameter is optional.
/** @param {string} [userName] */

// Optional with default value
/** @param {string} [userName='Unknown'] */

// Also optional. Used in Google Closure Compiler (understood by most JSDoc parsers but is less commonly used)
/** @param {string=} userName */
```

### Type Union

```js
/** @type {(number|boolean)} */
/** @type {function(string|number):(string|number)} */
```

### Function type

```js
/** @type {function()} */
/** @type {function(): number} */
/** @type {function(string, number): number} */
/** @type {function(string, ...number): number} */
/** @type {function(?string=, number=): number} */
```

### Generics

```js
/**
 * Standard JS objects:
 * @type {Promise<User>}
 * @type {Array<string>}
 * @type {Array<User>}
 * @type {Set<User>}
 * @type {WeakMap<number, User>}
 */

/**
 * Custom generic:
 * @template T
 * @param {T} thing
 * @returns {Array<T>}
 */
export function wrapByArray(thing) {
    return [thing];
}
```

Note, we use TypeScript/Closure notation for generics: `{Array<string>}`.
We do not use the traditional JSDoc syntax: `{Array.<string>}` (the dot is the only difference).

[More about Generics in Google Closure compiler](https://github.com/google/closure-compiler/wiki/Generic-Types).

### Custom types

#### @typedef tag

You can specify your custom structure using **typedef** tag:

```js
/**
 * @typedef {Object} User
 * @property {string} name
 * @property {string} email
 * @property {string|null} phone
 */

/**
 * Or shorthand version:
 * @typedef {{name: string, email: string, phone: string|null}} User
 */

/**
 * @param {User} user
 */
function isAdmin(User) {
    //
}
```

This is suitable for cases when you are going to use this type within the same file only.

#### Type Definition Files

For types used in different files, the preferable option is to use TypeScript syntax
and extract the type definition into a separate `.d.ts` file.
Then you can import this type using JSDoc:

```js
/**
 * @typedef {import('./user.d.ts').User} User
 */
```

### Destructured parameters

**Flat Structures**: document each property on its own line:

```js
/**
 * @param {Object} user
 * @param {string} user.name - The name property.
 * @param {?string} user.phone - The phone property, which is nullable.
 */
function logUser({name, phone}) {
    //
}
```

**Nested Structures**:

```js
/**
 * @param {Object} config - The configuration object.
 * @param {string} config.user.name - The user's name.
 * @param {?string} config.user.phone - The user's phone number, which is nullable.
 * @param {Object} config.settings - The settings object.
 * @param {boolean} config.settings.isActive - Indicates if the settings are active.
 */
function initialize({
    config: {
        user: {name, phone},
        settings: {isActive},
    },
}) {
    // function body
}
```

**Clarity and Conciseness**: Avoid overly complex structures in function parameters.
If a function accepts numerous or deeply nested parameters,
consider refactoring the function or using a type definition to simplify the documentation and enhance code readability.

### Advanced TypeScript types and expressions

```js
/**
 * Takes any union type and excludes `null`
 * @template T
 * @param {T} thing
 * @returns {Exclude<T, null>}
 */
export function assertNonNull(thing) {
    if (thing === null) {
        throw new Error('Unexpected null.');
    }
    return thing;
}

// or the same

/**
 * Takes any union type and excludes `null`
 * @template T
 * @param {T} thing
 * @returns {NonNullable<T>}
 */
export function assertNonNull(thing) {
    if (thing === null) {
        throw new Error('Unexpected null.');
    }
    return thing;
}
```

## References

-   [JSDoc Cheatsheet](https://devhints.io/jsdoc).
-   [JSDoc Cheatsheet for TypeScript users](https://docs.joshuatz.com/cheatsheets/js/jsdoc/).
-   [Types in the Closure Type System](https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System).
-   [Overview](https://www.jetbrains.com/webstorm/help/creating-jsdoc-comments.html) for using JSDoc PHPStorm and
    WebStorm.
