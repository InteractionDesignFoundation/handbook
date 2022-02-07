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
            {text: 'IxDF Home Page', link: 'https://www.interaction-design.org/'},
            {text: "Development Docs", link: "https://docs.information-architecture.org"}
        ],

        //config for single sidebar

        sidebarDepth: 0,
        sidebar: [
            {
                collapsable: true,
                title: "Achieve Our Purpose",
                children: [
                    ["achieve-purpose/", 'Start here'],
                    ["achieve-purpose/mission", 'Our Mission'],
                    ["achieve-purpose/vision", 'Our Vision'],
                ]
            },
            {
                collapsable: true,
                title: "Coordinate Efforts",
                children: [
                    ["/coordinate-efforts/", 'Start here'],
                    ["/coordinate-efforts/why-okrs", 'About OKRs'],
                    ["/coordinate-efforts/benefits-of-okrs", 'Benefits of OKRs'],
                    ["/coordinate-efforts/okr-cadence", 'Our OKR cadence'],
                    ["/coordinate-efforts/cascading-okrs", 'Cascading OKRs'],
                    ["/coordinate-efforts/create-your-okrs", 'Create your OKRs'],
                    ["/coordinate-efforts/stay-aligned-as-a-team", 'Stay aligned as a team'],
                    ["/coordinate-efforts/assess-your-okrs", 'Assess your OKRs'],
                    ["/coordinate-efforts/history-of-okrs", 'History of OKRs'],
                ]
            },
            {
                collapsable: true,
                title: "Design Products",
                children: [
                    ["/design-products/", 'Start here'],
                    ["/design-products/design-principles", 'Design Principles'],
                    // ["/design-products/design-process", 'Design Process'],
                    ["/design-products/delivery-process", 'Delivery Process'],
                ]
            },
            {
                collapsable: true,
                title: "Develop Software",
                children: [
                    ["/development/", "Start Here"],
                    {
                        title: "Guides",
                        collapsable: false,
                        sidebarDepth: 2,
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
                        sidebarDepth: 0,
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
                        sidebarDepth: 0,
                        children: [
                            "/development/library/front-end/clean-code-js",
                            "/development/library/front-end/conventions--js",
                            "/development/library/front-end/conventions--css",
                            "/development/library/front-end/literature"
                        ]
                    },
                ]
            },
            {
                collapsable: true,
                title: "IxDF UI Kit",
                children: [
                    ["https://ui-kit.interaction-design.org/", 'About'],
                    ["https://ui-kit.interaction-design.org/components", 'Components'],
                    ["https://ui-kit.interaction-design.org/design", 'Design'],
                    ["https://ui-kit.interaction-design.org/css", 'CSS'],
                    ["https://ui-kit.interaction-design.org/brand", 'Brand']
                ]
            },

        ],

        //config for multiple sidebars
        /*        sidebar: {

                    // sidebar only appears in /coordinate section
                    '/coordinate/': [

                        "/coordinate/okr-process"

                        ,
                        {
                            title: "Meet and Align",
                            collapsable: true,
                            sidebarDepth: 1,
                            children: [

                                "/coordinate/okr-meetings",
                                "/coordinate/how-we-use-okrs",
                            ]
                        },
                        {
                            title: "OKRs and their Benefits",
                            collapsable: true,
                            sidebarDepth: 1,
                            children: [
                                "/coordinate/about-okrs",
                                "/coordinate/benefits-of-okrs"
                            ]
                        },
                    ],

                    // sidebar only appears in /development section
                    '/development': [
                        {
                            title: "Guides",
                            collapsable: false,
                            sidebarDepth: 0,
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
                            sidebarDepth: 0,
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
                            sidebarDepth: 0,
                            children: [
                                "/development/library/front-end/clean-code-js",
                                "/development/library/front-end/conventions--js",
                                "/development/library/front-end/conventions--css",
                                "/development/library/front-end/literature"
                            ]
                        },

                    ],

                },*/

        displayAllHeaders: true,
    },

    markdown: {
        lineNumbers: false,
        anchor: {permalink: false}
    },

    evergreen: true
};
