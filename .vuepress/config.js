/**
 * This is a config to build html docs from our markdown files.
 * @see https://vuepress.vuejs.org/
 *
 * We use a default theme:
 * @see https://vuepress.vuejs.org/theme/default-theme-config.html
 */

module.exports = {
    dest: ".vuepress/dist",
    theme: "@interaction_design_foundation/ixdf",
    title: "IxDF System",
    description: "Handbook and guidelines for IxDF.",
    head: [
        [
            "link",
            {
                rel: "icon",
                href:
                    "https://user-images.githubusercontent.com/5278175/66738821-0d694600-ee78-11e9-9fb3-ee57370ce242.png"
            }
        ],
        [
            "link",
            {
                rel: "stylesheet",
                href:
                    "https://fonts.googleapis.com/css?family=Merriweather:400,400i,700|Source+Code+Pro|Source+Sans+Pro:400,400i,700&display=swap"
            }
        ]
    ],

    plugins: [
        "mermaidjs", // @see https://vuepress-plugin-mermaidjs.efrane.com/ and @see https://mermaid-js.github.io/mermaid/#/
        "@vuepress/medium-zoom", // @see https://v1.vuepress.vuejs.org/plugin/official/plugin-medium-zoom.html
        '@vuepress/plugin-back-to-top', // @see https://vuepress.vuejs.org/plugin/official/plugin-back-to-top.html,
        'vuepress-plugin-child-toc', // @see https://github.com/tchiotludo/vuepress-plugin-child-toc,
        'vuepress-plugin-global-toc', // @see https://github.com/sylvainpolletvillard/vuepress-plugin-global-toc
    ],

    // https://vuepress.vuejs.org/theme/default-theme-config.html#homepage
    themeConfig: {
        repo: "InteractionDesignFoundation/handbook",
        docsBranch: "main",
        editLinks: true,
        editLinkText: "Improve this page",
        lastUpdated: "Last Updated", // string | boolean
        smoothScroll: true,
        logo: '/hydrogenlogo.svg',
        nav: [
            {text: 'Our Purpose', link: '/about/purpose/',},
            {
                text: 'IxDF Process',
                items: [
                    {text: 'Our Process', link: '/process/ixdf-process.md'},
                    {text: 'About OKRs', link: '/process/about-okrs.md'},
                    {text: 'OKR Process', link: '/process/okr-process.md'}
                ]
            },
            {
                text: 'Product',
                items: [
                    {text: 'Product Process', link: '/product/product-process.md'},
                    {text: 'Design Principles', link: '/product/design-principles.md'},
                    // {text: 'Design Process', link: '/product/design-process.md'},
                    {text: 'Delivery Process', link: '/product/delivery-process.md'},
                ]
            },
            {text: 'Development', link: '/development/',},
            {text: 'IxDF UI Kit', link: 'https://design-system.interaction-design.org/'},
            // {text: 'Resources', link: '/resources/',},
            {text: "🔒Internal Docs", link: "https://docs.information-architecture.org"}
        ],

        sidebarDepth: 0,

        sidebar: [
            "/company/about",
            {
                title: "Guides",
                collapsable: false,
                children: [
                    "/development/guides/expectations",
                    {
                        title: "Onboarding",
                        children: [
                            "/development/guides/onboarding/",
                            "/development/guides/onboarding/onboarding--domain-knowledge",
                            "/development/guides/onboarding/onboarding--mentorGuide",
                            "/development/guides/onboarding/onboarding__forge"
                        ]
                    },
                    "/development/guides/credentials",
                    "/development/guides/collaboration-tools",
                    "/development/guides/scrum/",
                ]
            },
            {
                title: "Back end",
                collapsable: false,
                children: [
                    "/development/library/back-end/clean-code-php",
                    "/development/library/back-end/conventions--php",
                    "/development/library/back-end/conventions--laravel",
                    "/development/library/back-end/SOLID",
                    "/development/library/back-end/literature"
                ]
            },
            {
                title: "Front end",
                collapsable: false,
                children: [
                    "/development/library/front-end/clean-code-js",
                    "/development/library/front-end/conventions--js",
                    "/development/library/front-end/conventions--css",
                    "/development/library/front-end/literature"
                ]
            },
        ],
        displayAllHeaders: true
    },

    markdown: {
        lineNumbers: false,
        anchor: {permalink: false}
    },

    evergreen: true
};
