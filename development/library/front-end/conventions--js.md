# JavaScript conventions

This document extends
[Clean code principles for JavaScript](clean-code-js.md).

[[toc]]

## Browsers

Support evergreen browsers only, usually all versions released latest 3 years (depends on info from Google Analytics).

## Code style

Our code-styling rules are based on `eslint:recommended` rules. We
also use some ESLint plugins to extend these rules. You can check all our custom rules at the
[.eslintrc.js](https://github.com/InteractionDesignFoundation/IxDF-web/blob/main/.eslintrc.js) file.

## Docblocks

Use JSDoc for type definitions and inline documentation.
Treat JSDoc as the source of truth.
It will help both your IDE and developers to check types.
For complex types feel free to use `.d.ts` files: they complement JSDoc pretty well.

We also use JSDoc directives to indicate the type of members of objects in JavaScript:
`@protected`/`@abstract`/`@override`.

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

## Strict comparisons

Always use a triple equal to do variable comparisons. If you’re unsure of the type, cast it first.

```js
// GOOD
const one = 1;
const another = "1";

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
["a", "b"].map((a) => a.toUpperCase());
```

## Object and array destructuring

Destructuring is preferred over assigning variables to the corresponding keys.

```js
// GOOD
const [hours, minutes] = "12:00".split(":");

// BAD, unnecessarily verbose, and requires an extra assignment in this case.
const time = "12:00".split(":");
const hours = time[0];
const minutes = time[1];
```

Destructuring is precious for passing around configuration-like objects.

## Promise

We actively use `async/await` in our code.
So for promises the recommended approach is to use async/await instead of `Promise.then()`.
Reason for using async/await is that its clean and has an easy-to-read syntax.

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
    .get("url")
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
const card = document.querySelector("[data-course-card]");
```

## Back-end named routes

Use `@route` annotations/comments to specify Laravel route names.

Example: `@route 'api.course.enrollment.store`.
It solves a problem when we change the URL for a route on back-end (where we use named routes)
but forget to change it in JS code (where we may hardcode it).
