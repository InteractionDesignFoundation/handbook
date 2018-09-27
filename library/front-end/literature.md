# Literature for frontend developer

> You are reading this [...] for two reasons. First, you are a programmer. Second, you want to be a better programmer. Good. We need better programmers.
> 
> -Robert C. Martin (from Clean Code)

We have, again and again, experienced that it's not enough to be a good developer -- let alone be a developer. We also have
experienced in our team that once a developer has studied the correct content, the code quality and the collective peace of mind
have multiplied. That's why we have curated a great deal of content for ourselves to become better.

In IDF, it is essential for developers to study the content in our library. This list is not here for a developer to ignore.
An IDF developer should have read the whole library -- **at the least**.

> The frenetic rate of change in our industry means that software developers must continue to learn copious quantities just to keep up.
Woe to the architects who stop coding—they will rapidly find themselves irrelevant. Woe to the programmers who stop learning new
languages—they will watch as the industry passes them by. Woe to the developers who fail to learn new disciplines and techniques—their
peers will excel as they decline.
> 
> -Robert C. Martin (from Clean *Coder*)

## Index

You can find all books and videos on the shared folder `IDF - Shared Reading - Library of Development literature and videos`.
_Warning for devs having small SSDs:_ The videos may take up more than 10gb on your disk. That's why
you may want to selectively sync those you want to study into your computer when you want to study them.

1. Backend Foundations
1. Frontend
    1. Foundations
    1. Subscriptions
    1. Awesome lists

# Backend

Every frontend developer should have some backend knowledge in order to have basic working skills & collaborate with backend developers.

## Foundations

1.  [Laravel Blade](https://laravel.com/docs/master/blade) - PHP template engine. Frontend developers should understand how to
    use `@extend`, `@include`, `@component`, `@section`, `@push`, `@foreach` and `@if` directives. They should also
    understand when they should use `{{ $variable }}` and `{!! $variable !!}` (display escaped/unescaped data).
1.  How to get an instance of the authenticated Member at the view layer and how to determine whether the visitor is a guest or not (see
    [Authenticated Member instance](https://github.com/InteractionDesignFoundation/IDF-web/docs/code/backend/hints/authenticated-member-instance.md)).
1.  How to
    [create a new route and a new test view for it](https://github.com/InteractionDesignFoundation/IDF-web/docs/code/backend/hints/create-test-route.md) for testing purposes.
    Sometimes it's a faster way to implement a new feature.

For more backend hints please see [backend hints dir](https://github.com/InteractionDesignFoundation/IDF-web/docs/code/backend/hints).

# Frontend

Every frontend developer should
- have a basic set of programming skills (Foundations),
- be aware of modern techniques, tools, and APIs (Subscriptions and Awesome lists).

## Foundations

1.  Classic programming skills: [Clean Code: JavaScript](clean-code-js.md):
    Software engineering principles, from Robert C. Martin's book Clean Code, adapted for JavaScript.
1.  [Eloquent JavaScript](http://eloquentjavascript.net/) (book) or use pdf version from shared library.
1.  Design Patterns (book):
    [Addy Osmani - Learning JavaScript Design Patterns - 2017](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)
1.  CSS (book): `Verou L. - CSS Secrets - 2015`.
1.  Topic: BEM CSS methodology:
    [MindBEMding](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/),
    [BEM 101](https://css-tricks.com/bem-101/).
1.  Topic:
    [KISS, YAGNI & DRY Principles](https://code.tutsplus.com/tutorials/3-key-software-principles-you-must-understand--net-25161)
1.  Optional: Network (book): [Ilya Grigorik - High Performance Browser Networking](https://hpbn.co/).

# Subscriptions

It's very effective to subscribe to some weekly newsletters or podcasts and be aware of all the events and news in the frontend world.

1.  JavaScript Weekly newsletter: http://javascriptweekly.com/issues
1.  Frontend Focus weekly newsletter: https://frontendfoc.us/issues
1.  YouTube channel: [Google Chrome Developers](https://www.youtube.com/channel/UCnUYZLuoy1rq1aVMwx4aTzw).
1.  Dev Channel by ChromiumDev @medium:
    [![RSS](http://www.maldonadonoticias.com/beta/images/headers/rss-icon.gif)](https://medium.com/feed/dev-channel)
    https://medium.com/dev-channel
1.  Optional: CSS weekly newsletter: http://css-weekly.com
1.  Optional: Inclusive Components: all about designing inclusive web interfaces:
    [![RSS](http://www.maldonadonoticias.com/beta/images/headers/rss-icon.gif)](https://inclusive-components.design/rss/)
    https://inclusive-components.design/
1.  Optional: Articles inside `Articles` directory.

# Awesome lists

Awesome lists are great starting points for any type of material you'd like to find: Documentation, articles, talks,
tools etc. All of them are community curated and always up to date 🌲.

1.  [Awesome Javascript](https://github.com/sindresorhus/awesome) - a curated list of awesome javascript lists
1.  [Awesome CSS](https://github.com/sotayamashita/awesome-css) - a curated list of awesome frameworks, style guide and
    other cool nuggets for the amazing CSS.
1.  [Awesome BEM](https://github.com/getbem/awesome-bem)
