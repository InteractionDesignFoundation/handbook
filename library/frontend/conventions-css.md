# IxDF's CSS conventions

[[toc]]

## PostCSS

We use `postcss-preset-env` and CSS features from [stage 3+](https://preset-env.cssdb.org/features#stage-3).

### Reduce the cognitive load

-   Use as many native CSS features as possible;
-   SHOULD not use PostCSS magic like `&` (exceptions: pseudo-elements and pseudo-classes and `@media` rules);
-   SHOULD not use nesting, because BEM names are unique enough (exceptions: pseudo-elements and pseudo-classes and `@media` rules);

## CSS Class Naming conventions

We use [ITCSS](http://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528): superset of
[BEM](http://getbem.com/introduction/) CSS methodology.

-   [ITCSS architecture](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
-   [ITCSS: Harry Roberts - Managing CSS Projects with ITCSS (video)](https://youtu.be/1OKZOV-iLj4?t=404)
-   [BEM quick-start](https://en.bem.info/methodology/quick-start)
-   [Battling BEM CSS: 10 Common Problems And How To Avoid Them](https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/)

Additionally, we prefer to use camelCase, as follows:

```css
.blockName {
}
.blockName__elementName {
}
.blockName__elementName--modifierName {
}
```

## Utility classes

Along with our BEM-based classes, we have our utility classes. For all components and page specific classes we use BEM but when it comes to utility classes we have chosen to follow [Tailwind 3](https://tailwindcss.com/). This makes it easier for any new developer to come in to our project and know classnames without even having to go through our docs. Examples of utility classes

```html
<div class="flex justify-center">
    <article class="mb-small"></article>
    <article class="mb-small"></article>
</div>
```

### Using utility classes

Whenever a function can be performed using utility classes, then the utility class should be used instead of creating custom BEM classes. One of the most common example is margin and padding utility classes that are needed in almost every page.

```html
<div class="blockName p-large">
    <section class="mb-small background-neutral-04"></section>
    <article class="mb-small">
</div>
```

### Using BEM along with utility classes

Sometimes a page will require its custom CSS, and in that case, it is good to combine utility classes along with the BEM bases classes for the page/component.

```html
<article class="card radius-lg col-md-6">
    <!-- card content -->
</article>
```

This [article](https://css-tricks.com/building-a-scalable-css-architecture-with-bem-and-utility-classes/) provides excellent guidelines for using BEM, utility classes and using them together.

## Files naming conventions

Filenames should also use BEM + camelCase notation (same naming conventions above for CSS/PostCSS). The file structure for
a CSS component would look like this:

```
/components
    /inputGroup
        inputGroup.css
        inputGroup--small.css
        inputGroup--big.css
        inputGroup.md
        . . .
```
