/**
 * This is a config to build html docs from our markdown files.
 * @see https://vuepress.vuejs.org/
 *
 * We use a default theme:
 * @see https://vuepress.vuejs.org/theme/default-theme-config.html
 */

module.exports = {
    dest: ".vuepress/dist",

    title: "IxDF Dev handbook",
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
        "@vuepress/medium-zoom" // @see https://v1.vuepress.vuejs.org/plugin/official/plugin-medium-zoom.html
    ],

    // https://vuepress.vuejs.org/theme/default-theme-config.html#homepage
    themeConfig: {
        repo: "InteractionDesignFoundation/handbook",
        docsBranch: "master",
        editLinks: true,
        editLinkText: "Improve this page",
        lastUpdated: "Last Updated", // string | boolean
        nav: [
            { text: "Home", link: "/" },
            { text: "Internal Docs", link: "https://docs.information-architecture.org" },
            { text: "Design System", link: "https://www.interaction-design.org/admin/design-system" }
        ],

        sidebarDepth: 0,
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
                    "/library/back-end/clean-code-php",
                    "/library/back-end/conventions--php",
                    "/library/back-end/conventions--laravel",
                    "/library/back-end/SOLID",
                    "/library/back-end/literature"
                ]
            },
            {
                title: "Front end",
                collapsable: false,
                children: [
                    "/library/front-end/clean-code-js",
                    "/library/front-end/conventions--js",
                    "/library/front-end/literature"
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
