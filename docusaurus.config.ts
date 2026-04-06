import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Substratum Labs',
  tagline: 'The Infrastructure Beneath Intelligence',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://substratumlabs.ai',
  baseUrl: '/',

  organizationName: 'substratum-labs',
  projectName: 'substratum-labs.github.io',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: {
          showReadingTime: true,
          blogTitle: 'Substratum Labs Blog',
          blogDescription: 'Technical deep-dives from the Substratum Labs team',
          postsPerPage: 5,
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/substratum-labs/substratum-labs.github.io/edit/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Substratum Labs',
      items: [
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/substratum-labs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Projects',
          items: [
            {label: 'Castor', href: 'https://github.com/substratum-labs/castor'},
            {label: 'Roche', href: 'https://github.com/substratum-labs/roche'},
            {label: 'Mneme (soon)', href: 'https://github.com/substratum-labs'},
          ],
        },
        {
          title: 'Docs',
          items: [
            {label: 'Castor Docs', href: 'https://substratum-labs.github.io/castor-docs/'},
            {label: 'Roche Docs', href: 'https://substratum-labs.github.io/roche-docs/'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'Blog', to: '/blog'},
            {label: 'GitHub', href: 'https://github.com/substratum-labs'},
          ],
        },
      ],
      copyright: `\u00a9 ${new Date().getFullYear()} Substratum Labs. All Systems Nominal.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'rust', 'toml', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
