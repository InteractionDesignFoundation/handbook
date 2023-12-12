# Vue.js conventions

These conventions are based on the official [Vue.js style guide](https://vuejs.org/style-guide/). Where a choice is given
between various options, this document will explicitly state which one to pick within the IxDF codebases.

[[toc]]

## Use multi-word component names

User component names should always be multi-word, except for root App components.
This prevents conflicts with existing and future HTML elements, since all HTML elements are a single word.

**Bad**

```html
<item />
```

**Good**

```html
<todo-item />
```

## Always add detailed prop definitions

Prop definitions should always be as detailed as possible.

**Bad**

```js
const props = defineProps(["status"]);
```

**Good**

```js
// With TypeScript (recommended)
const props = defineProps<{
    status: string
}>()

// Without TypeScript
const props = defineProps({
    status: {
        type: String,
        required: true,
    }
})
```

## Add a key when using `v-for`

A key with v-for is always required on components, in order to maintain internal component state down the subtree.

**Bad**

```html
<ul>
    <li v-for="todo in todos">{{ todo.text }}</li>
</ul>
```

**Good**

```html
<ul>
    <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>
</ul>
```

## Don't use `v-if` with `v-for`

Never use v-if on the same element as v-for.

**Bad**

```html
<ul>
    <li v-for="user in users" v-if="user.isActive" :key="user.id">{{ user.name }}</li>
</ul>
```

**Good**

```html
<ul>
    <template v-for="user in users" :key="user.id">
        <li v-if="user.isActive">{{ user.name }}</li>
    </template>
</ul>
```

## Component files should be named with PascalCase

**Bad**

```
components/
|- mycomponent.vue
|- myComponent.vue
```

**Good**

```
|- MyComponent.vue
```

## Append "Base" prefix to any foundational components

Foundational components, such as buttons, tables or icons that get used within more specific components should all begin with the 'Base' prefix.
This ensures they don't clash with HTML element names and also ensures that they are neatly organized together in the codebase.

**Bad**

```
components/
|- Button.vue
|- Table.vue
|- Icon.vue
```

**Good**

```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

## Tightly coupled component names

Child components that are tightly coupled with their parent should include the parent component name as a prefix.

If a component only makes sense in the context of a single parent component, that relationship should be evident in its name. Since editors typically organize files alphabetically, this also keeps these related files next to each other.

**Bad**

```
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue
```

```
components/
|- SearchSidebar.vue
|- NavigationForSearchSidebar.vue
```

**Good**

```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```

```
components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```

## Order of words in component names

Component names should start with the highest-level (often most general) words and end with descriptive modifying words. This helps make searching for specific components easier and keeps the codebase neatly organised.

**Bad**

```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

**Good**

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

## Component Name Casing

Components should always be PascalCase in both .vue and .js files. This has a few advantages over kebab-case:

-   Editors can autocomplete component names in templates, because PascalCase is also used in JavaScript.
-   `<MyComponent>` is more visually distinct from a single-word HTML element than `<my-component>`, because there are two character differences (the two capitals), rather than just one (a hyphen).
-   If you use any non-Vue custom elements in your templates, such as a web component, PascalCase ensures that your Vue components remain distinctly visible.

**Bad**

```html
<my-component />
```

**Good**

```html
<MyComponent />
```

## Full-word component names

Don't use abbreviations in component names.

**Bad**

```
components/
|- SdSettings.vue
|- UProfOpts.vue
```

**Good**

```
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```

## Prop name casing

Always use camelCase for prop declarations and within templates

```js
const props = defineProps({
    greetingText: String,
});
```

```html
<WelcomeMessage greetingText="hi" />
```

## Multi-attribute elements

Elements with multiple attributes should span multiple lines, with one attribute per line.

**Bad**

```html
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo" /> <MyComponent foo="a" bar="b" baz="c" />
```

**Good**

```html
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo" />

<MyComponent foo="a" bar="b" baz="c" />
```

## Simple expressions in templates

Component templates should only include simple expressions, with more complex expressions refactored into computed properties or methods.

**Bad**

```js
{{
    fullName.split(' ').map((word) => {
    return word[0].toUpperCase() + word.slice(1)
    }).join```(' ')
}}
```

**Good**

```js
<!-- In a template -->
{{ normalizedFullName }}

// The complex expression has been moved to a computed property
const normalizedFullName = computed(() =>
fullName.value
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
)
```

## Simple computed properties

Complex computed properties should be split into as many simpler properties as possible.

**Bad**

```js
const price = computed(() => {
    const basePrice = manufactureCost.value / (1 - profitMargin.value);
    return basePrice - basePrice * (discountPercent.value || 0);
});
```

**Good**

```js
const basePrice = computed(() => manufactureCost.value / (1 - profitMargin.value));

const discount = computed(() => basePrice.value * (discountPercent.value || 0));

const finalPrice = computed(() => basePrice.value - discount.value);
```

## Quoted attribute values

Non-empty HTML attribute values should always be inside quotes.

**Bad**

```html
<input type="text" /> <AppSidebar :style={width:sidebarWidth+'px'}>
```

**Good**

```html
<input type="text" /> <AppSidebar :style="{ width: sidebarWidth + 'px' }"></AppSidebar>
```

## Directive shorthands

Within the IxDF codebases, directive shorthands (`:` for `v-bind:`, `@` for `v-on:` and `#` for `v-slot`) should **always** be used. The rule is to either always use directive shorthands, or never - don't mix and match. We've chosen to use them.

**Bad**

```html
<input v-bind:value="newTodoText" v-bind:placeholder="newTodoInstructions" />

<input v-on:input="onInput" v-on:focus="onFocus" />

<template v-slot:header>
    <h1>Here might be a page title</h1>
</template>

<template v-slot:footer>
    <p>Here's some contact info</p>
</template>
```

**Good**

```html
<input :value="newTodoText" :placeholder="newTodoInstructions" />

<input @input="onInput" @focus="onFocus" />

<template #header>
    <h1>Here might be a page title</h1>
</template>

<template #footer>
    <p>Here's some contact info</p>
</template>
```

## Single-file component top-level element order

Single-File Components should always order `<script>`, `<template>`, and `<style>` tags consistently, with `<style>` last, because at least one of the other two is always necessary.

**Bad**

```html
<!-- ComponentA.vue -->
<template>...</template>
<script>
    /* ... */
</script>
<style>
    /* ... */
</style>
```

**Good**

```html
<!-- ComponentA.vue -->
<script>
    /* ... */
</script>
<template>...</template>
<style>
    /* ... */
</style>
```
