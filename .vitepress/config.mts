import {defineConfig} from 'vitepress';
import {withMermaid} from 'vitepress-plugin-mermaid';
import {generateSidebar} from 'vitepress-sidebar';

// https://vitepress.dev/reference/site-config
const config = defineConfig({
    lang: 'en-US',
    title: 'IxDF Open Handbook',
    description: 'Handbook and guidelines for IxDF technical staff.',
    head: [
        ['link', {rel: 'icon', href: '/favicons/favicon.ico'}],
        ['link', {rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon.png'}],
        ['link', {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Merriweather:400,400i,700|Source+Code+Pro|Source+Sans+Pro:400,400i,700&display=swap'}],
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        siteTitle: 'IxDF Open Handbook',
        editLink: {
            pattern: 'https://github.com/InteractionDesignFoundation/handbook/edit/main/:path',
            text: 'Edit this page on GitHub',
        },
        lastUpdated: {text: 'Last Updated'},
        search: {
            provider: 'local',
        },
        logo: '/assets/images/ixdf-logo.svg',
        nav: [
            {text: 'IxDF Handbook', link: '/'},
            {text: "🔐 Development Docs", link: "https://docs.information-architecture.org"},
            {text: 'UI Kit', link: 'https://ui-kit.interaction-design.org/'},
            {text: 'IxDF Courses', link: 'https://www.interaction-design.org/'},
        ],

        // see https://github.com/jooy2/vitepress-sidebar
        sidebar: generateSidebar({
            useTitleFromFileHeading: true,
            capitalizeFirst: true,
            hyphenToSpace: true,
            collapseDepth: 1,
            excludeFiles: [
                'README.md',
                'CONTRIBUTING.md',
            ],
            excludeFolders: [
                'node_modules',
                'development',
                'outdated',
            ],
        }),
    },

    markdown: {
        lineNumbers: false,

        // options for @mdit-vue/plugin-toc
        // https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
        toc: {level: [2, 3]},
    },

    ignoreDeadLinks: [
        /\.neon/,
        /\.php/,
        /ocramius/,
    ],
    appearance: false // This disables the dark mode toggle
});

// eslint-disable-next-line import/no-default-export
export default withMermaid({
    ...config,
    // optionally, you can pass MermaidConfig
    mermaid: {
        // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
    },
});
