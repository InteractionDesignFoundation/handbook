/**
 * This is a config to build html docs from our markdown files.
 * @see https://vuepress.vuejs.org/
 */

module.exports = {
    dest: "public/docs",

    title: "IxDF dev handbook",
    description: "Handbook and guidelines for 🦄 developers.",
    head: [
        [
            "link",
            {
                rel: "icon",
                href:
                    "https://user-images.githubusercontent.com/5278175/66738821-0d694600-ee78-11e9-9fb3-ee57370ce242.png"
            }
        ]
    ],

    plugins: [
        "mermaidjs" // @see https://vuepress-plugin-mermaidjs.efrane.com/ and @see https://mermaid-js.github.io/mermaid/#/
    ],

    // https://vuepress.vuejs.org/theme/default-theme-config.html#homepage
    themeConfig: {
        repo: "InteractionDesignFoundation/handbook",
        docsBranch: "master",
        editLinks: true,
        editLinkText: "Improve this page 🔒",
        lastUpdated: "Last Updated", // string | boolean
        nav: [
            { text: "Home", link: "/" },
            // {text: 'Guides', link: '/guides/'},
            // {text: 'Library', link: '/library/'},
            { text: "Design System", link: "https://www.interaction-design.org/admin/design-system" }
        ],

        sidebarDepth: 0,
        sidebar: [
            {
                title: "Guides",
                children: [
                    "/guides/onboarding/onboarding"
                    // '/servers/CI-CD-pipelines',
                    // '/servers/CI-CD-pipelines--advanced',
                    // '/servers/production-emergency-protocol',
                ]
            },
            {
                title: "Back end",
                children: [
                    "/library/back-end/clean-code-php",
                    "/library/back-end/conventions--laravel",
                    "/library/back-end/conventions--php",
                    "/library/back-end/SOLID",
                    "/library/back-end/literature"
                ]
            },
            {
                title: "Front end",
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
        lineNumbers: false
    },

    evergreen: true
};
