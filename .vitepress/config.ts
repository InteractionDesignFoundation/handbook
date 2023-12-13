import {defineConfig} from 'vitepress';
import {withMermaid} from 'vitepress-plugin-mermaid';
import {generateSidebar} from 'vitepress-sidebar';

// https://vitepress.dev/reference/site-config
const config = defineConfig({
    lang: 'en-US',
    title: 'IxDF Employee Handbook"',
    description: 'Handbook and guidelines for IxDF.',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        siteTitle: 'IxDF Employee Handbook',
        editLink: {
            pattern: 'https://github.com/InteractionDesignFoundation/handbook/edit/main/:path',
            text: 'Edit this page on GitHub',
        },
        lastUpdated: {text: 'Last Updated'},
        search: {
            provider: 'local',
        },
        logo: '/hydrogenlogo.svg',
        nav: [
            {text: 'Home', link: '/'},
            {text: "Development Docs", link: "https://docs.information-architecture.org"},
            {text: 'UI Kit', link: 'https://ui-kit.interaction-design.org/'},
            {text: 'IxDF Home Page', link: 'https://www.interaction-design.org/'},
        ],

        sidebar: generateSidebar({
            useTitleFromFileHeading: true,
            capitalizeFirst: true,
            hyphenToSpace: true,
            collapseDepth: 1,
            excludeFolders: [
                'node_modules',
            ],
            excludeFiles: [
                'README.md',
                'CONTRIBUTING.md',
            ],
        }),
/*
        sidebar: [
            {
                items: [
                    {text: 'Start here', link: '/achieve-purpose/README.md'},
                    {text: 'Our Mission', link: '/achieve-purpose/mission.md'},
                    {text: 'Our Vision', link: '/achieve-purpose/vision.md'},
                ],
            },
        ],*/
    },

    markdown: {
        lineNumbers: true,

        // options for @mdit-vue/plugin-toc
        // https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
        toc: {level: [1, 2]},
    },

    ignoreDeadLinks: true, // @todo use false
});

// eslint-disable-next-line import/no-default-export
export default withMermaid({
    ...config,
    // optionally, you can pass MermaidConfig
    mermaid: {
        // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
    },
});
