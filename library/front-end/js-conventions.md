# JavaScript conventions

This document extends
[Clean code principles for JavaScript](https://interactiondesignfoundation.github.io/handbook/library/front-end/clean-code-js.html).

## Functional approach

In our JS we prefer to write functional code whenever possible instead of object oriented. Functional programming can be understood by the following:

`Functional programming (often abbreviated FP) is the process of building software by composing pure functions, avoiding shared state, mutable data,and side-effects. Functional programming is declarative rather than imperative, and application state flows through pure functions. Contrast with object oriented programming, where application state is usually shared and colocated with methods in objects.`

To get a deeper understanding of how to write effective functional JS explore this [article](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0) and the series this article is a part of.

## Code style

Our code-styling rules are based on [prettier](https://github.com/prettier/prettier) and `eslint:recommended` rules. We
also use some ESLint plugins to extend these rules. You can check all our custom rules at the
[.eslintrc.js](https://github.com/InteractionDesignFoundation/IDF-web/blob/develop/.eslintrc.js) file.

We try to stick to Prettier’s defaults, but have a few overrides to keep our JavaScript code style consistent with PHP.

The first two rules are actually configured with `.editorconfig` and connected to each other:

1.  `tabWidth` is 4 spaces (`indent_size` EditorConfig’s property)
1.  `printWidth` is 120 (`max_line_length` EditorConfig’s property)

We also prefer single quotes over double quotes for consistency with PHP:

```json
{
    "singleQuote": true
}
```

We don’t add spacing inside `{}` for consistency with PHP:

```json
{
    "bracketSpacing": false
}
```

## Docblocks

[Use JSDoc](./hints/jsdoc.md) to for type definitions and inline documentation. It will help both your IDE and
developers to check types. It will also simplify our work on migrating to TypeScript.

We also use JSDoc directives to indicate the type of members of objects in JavaScript:
`@private`/`@protected`/`@abstract`/`@override`.
Though JavaScript doesn’t have truly private members by default, this
convention served both as a warning and a hint.

## Variable Names

1. Variable names generally shouldn’t be abbreviated.
1. You SHOULD use camelCase to name variables.

## Variable assignment

Prefer `const` over `let`. Only use `let` to indicate that a variable will be reassigned. Never use `var`.

## Comparisons

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
// Using an arrow function doesn't provide any benefits here, while the
// `function`  keyword immediately makes it clear that this is a function.
const scrollTo = (offset) => {
    // ...
};
```

Terse, single line functions may also use the arrow syntax. There's no hard rule here.
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

Destructuring is very valuable for passing around configuration-like objects.

## Promise

We actively use `async/await` in our code. So for promises the recommended approach is to use async/await instead of `Promise.then()`. Reason for using async/await is that its clean and has an easy to read syntax.

```js
try {
    const response = await promiseToResolve();
} catch(error) {
    log(error);
}
```

Or with our custom fetch promise

```js
const response = await getHttpClient().get('url').catch(error => log(error));
if (response) {
    notify.success(response.message);
}
```

## Interacting with the DOM

Many times we will need to select DOM elements in our JS, there can be multiple approaches for getting the DOM element. But for consistency and clarity purposes we SHOULD use data attributes as selectors.

```html
<div class="card" data-course-card> ... </div>
```

```js
const card = document.querySelector('[data-course-card]');
```

## Back-end named routes

Use `@route` annotations/comments to specify Laravel route names.

Example: `@route 'api.course.enrollment.store`.
It solves a problem when we change the URL for a route on back-end (where we use named routes)
but forget to change it in JS code (where we may hardcode it).
