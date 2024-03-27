# JavaScript conventions

This document extends
[Clean code principles for JavaScript](clean-code-js.md).

[[toc]]

## Browser support

Support evergreen browsers only, usually all versions released latest 3 years (depends on info from Google Analytics).

## Code style

Our code-styling rules are based on `eslint:recommended` rules.
We also use some ESLint plugins to extend these rules.
You can check all our custom rules at the [.eslintrc.js](https://github.com/InteractionDesignFoundation/IxDF-web/blob/main/.eslintrc.js) file.

## Docblocks

[Use JSDoc](conventions--jsdoc.md) together with type definitions files.
It will help both your IDE and developers to check types.
This provides main benefits from TypeScript, but without translation cost and improved readability.

Example:

```js
// file: userAuthPolicy.js
/**
 * @typedef {import('./user.d.ts').User} User
 */

/**
 * @param {User} user
 * @returns {boolean}
 */
function isAdmin(user) {
    return user.roles.includes('admin');
}
```

```ts
// file: user.d.ts
export interface User {
    first_name: string;
    last_name: string;
    email: string;
    profil_image_url: string;
    roles: string[];
}
```

## Explicit type definitions

Use JSDoc and type checks in code to avoid errors like a null pointer: `TypeError: null is not an object`.
If a variable type described as `@param {HTMLElement} element`,
it should not contain `null` or `undefined` or other types.
If the variable can contain a `null`, please describe it explicitly: `@param {HTMLElement|null} element`.

## Variable Names

1. Variable names generally shouldn’t be abbreviated.
1. You SHOULD use camelCase to name variables.

## Variable assignment

Prefer `const` over `let`. Only use `let` to indicate that a variable will be reassigned. Never use `var`.

## Strict Comparisons

Always use a triple equal to do variable comparisons. If you’re unsure of the type, cast it first.

```js
// GOOD
const one = 1;
const another = '1';

if (one === parseInt(another)) {
    // ...
}
```

## Function keyword vs. arrow functions

Function declarations should use the function keyword.

```js
// GOOD
function scrollTo(offset) {
    // ...
}

// BAD
// Using an arrow function doesn’t provide any benefits here, while the
// `function`  keyword immediately makes it clear that this is a function.
const scrollTo = (offset) => {
    // ...
};
```

Terse, single line functions may also use the arrow syntax. There’s no hard rule here.

```js
// GOOD
function sum(a, b) {
    return a + b;
}

// It’s a short and simple method, so squashing it to a one-liner is ok.
const sum = (a, b) => a + b;
```

Higher-order functions may use arrow functions if it improves readability.

```js
function sum(a, b) {
    return a + b;
}

// GOOD
const adder = (a) => (b) => sum(a, b);

// OK, but unnecessarily noisy.
function adder(a) {
    return function (b) {
        return sum(a, b);
    };
}
```

Anonymous functions should use arrow functions (Unless they need access to `this`).

```js
['a', 'b'].map((a) => a.toUpperCase());
```

## Object and array destructuring

Destructuring is preferred over assigning variables to the corresponding keys.

```js
// GOOD
const [hours, minutes] = '12:00'.split(':');

// BAD, unnecessarily verbose, and requires an extra assignment in this case.
const time = '12:00'.split(':');
const hours = time[0];
const minutes = time[1];
```

Destructuring is precious for passing around configuration-like objects.

## Promise

We actively use `async/await` in our code.
So for promises the recommended approach is to use async/await instead of `Promise.then()`.
The Reason for using async/await is that it’s clean and has an easy-to-read syntax.

```js
try {
    const response = await promiseToResolve();
} catch (error) {
    log(error);
}
```

Or with our custom fetch promise

```js
const response = await getHttpClient()
    .get('url')
    .catch((error) => log(error));
if (response) {
    notify.success(response.message);
}
```

## Interacting with the DOM

Many times we will need to select DOM elements in our JS, there can be multiple approaches for getting the DOM element.
But for consistency and clarity purposes, we SHOULD use data attributes as selectors.

```html
<div class="card" data-course-card>...</div>
```

```js
const cards = document.querySelectorAll('[data-course-card]');
```

Unique elements should be selected by their `id` attribute:

```html
<form id="subscribe-form">...</form>
```

```js
const subscribeForm = document.getElementById('subscribe-form');
```

## Back-end named routes

Use `@route` annotations/comments to specify Laravel route names.

Example: `@route 'api.course.enrollment.store'`.
It solves a problem when we change the URL for a route on back-end (where we use named routes)
but forget to change it in JS code (where we may hardcode it).
