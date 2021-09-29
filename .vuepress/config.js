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
    description: "Handbook and guidelines for 🦄 developers.",
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
        'vuepress-plugin-child-toc', // @see https://github.com/tchiotludo/vuepress-plugin-child-toc
        'vuepress-plugin-global-toc' // @see https://github.com/sylvainpolletvillard/vuepress-plugin-global-toc
    ],

    // https://vuepress.vuejs.org/theme/default-theme-config.html#homepage
    themeConfig: {
        repo: "InteractionDesignFoundation/handbook",
        docsBranch: "master",
        editLinks: true,
        editLinkText: "Improve this page",
        lastUpdated: "Last Updated", // string | boolean
        smoothScroll: true,
        logo: '/hydrogenlogo.svg',
        nav: [
            { text: 'Purpose', link: '/purpose/',},
            { text: 'Process', link: '/process/',},
            { text: 'Product', link: '/product/',},
            { text: 'Dev Handbook', link: '/dev-handbook/',},
            { text: 'Design System', link: 'https://design-system.interaction-design.org/'},
            { text: 'Resources', link: '/resources/',},
            { text: "🔒Internal Docs", link: "https://docs.information-architecture.org" }
        ],

        sidebarDepth: 1,
        sidebar: [
            "/company/about",
            {
                title: "Guides",
                collapsable: false,
                children: [
                    "/guides/expectations",
                    {
                        title: "Onboarding",
                        children: [
                            "/guides/onboarding/",
                            "/guides/onboarding/onboarding--domain-knowledge",
                            "/guides/onboarding/onboarding--mentorGuide",
                            "/guides/onboarding/onboarding__forge"
                        ]
                    },
                    "/guides/credentials",
                    "/guides/collaboration-tools",
                    {
                        title: "Scrum",
                        children: [
                            "/guides/scrum/",
                            "/guides/scrum/scrumTeam",
                            "/guides/scrum/productOwner",
                            "/guides/scrum/scrumMaster",
                            "/guides/scrum/backlog"
                        ]
                    }
                ]
            },
            {
                title: "Back end",
                collapsable: false,
                children: [
                    "/dev-handbook/back-end/clean-code-php",
                    "/dev-handbook/back-end/conventions--php",
                    "/dev-handbook/back-end/conventions--laravel",
                    "/dev-handbook/back-end/SOLID",
                    "/dev-handbook/back-end/literature"
                ]
            },
            {
                title: "Front end",
                collapsable: false,
                children: [
                    "/dev-handbook/front-end/clean-code-js",
                    "/dev-handbook/front-end/conventions--js",
                    "/dev-handbook/front-end/literature"
                ]
            }
        ],
        displayAllHeaders: true
    },

    markdown: {
        lineNumbers: false,
        anchor: { permalink: false }
    },

    evergreen: true
};
