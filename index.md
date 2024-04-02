---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
    name: 'IxDF Open Handbook'
    text: 'Open handbook for developers (Laravel+JS) created by IxDF tech team.'
    #  tagline:
    actions:
        - theme: brand
          text: Start here
          link: /README.md
        - theme: alt
          text: Backend dev docs
          link: /library/backend/README.md
        - theme: alt
          text: Frontend dev docs
          link: /library/backend/README.md
---

<section class="container" style="max-width: 1152px; margin: 0 auto">
    <div class="grid-container">
        <div class="grid-item">
            <h2 class="h2">Zen of coding</h2>
            <ol class="ul list-disc">
                <li>Explicit is better than implicit.</li>
                <li>Delegate work to tool when possible.</li>
                <li>Simple is better than complex.</li>
                <li>Complex is better than complicated.</li>
                <li>Flat is better than nested.</li>
                <li>Errors should never pass silently.</li>
                <li>There should be one <i>(and preferably only one)</i> obvious way to do it.</li>
                <li>It should be easy to do run popular actions.</li>
                <li>Bad stuff should be difficult to do.</li>
                <li>If the implementation is hard to explain, it's a bad idea.</li>
                <li>If the implementation is easy to explain, it may be a good idea.</li>
            </ol>
            <h2 class="h2">Quick links: Coding conventions</h2>
            <ul class="ul list-disc">
                <li><a href="/library/backend/conventions--php.html">PHP</a> and <a href="/library/backend/conventions--laravel.html">Laravel</a></li>
                <li><a href="/library/backend/conventions--sql.html">SQL</a></li>
                <li><a href="/library/frontend/conventions--js.html">JS</a> and <a href="/library/frontend/conventions--jsdoc.html">JSDoc</a></li>
                <li><a href="/library/frontend/conventions--css.html">CSS</a></li>
            </ul>
        </div>
        <div class="grid-item">
            <picture>
                <source srcset="/images/spaceship.avif" type="image/avif">
                <img src="/images/spaceship.jpg" alt="spaceship blueprints" class="levitating-man">
            </picture>
        </div>
    </div>

</section>
