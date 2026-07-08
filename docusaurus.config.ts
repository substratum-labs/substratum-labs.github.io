import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Substratum Labs',
  tagline: 'Intelligent Infrastructure for Space Operations',
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
          blogTitle: 'Research & Technical Notes',
          blogDescription:
            'Technical notes on agent infrastructure, trusted autonomy, and the systems behind intelligent space operations.',
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
        {href: 'https://substratumlabs.ai/#argonavis', label: 'ArgoNavis', position: 'left'},
        {href: 'https://argusorb.io/', label: 'ArgusOrb', position: 'left'},
        {to: '/blog', label: 'Research', position: 'left'},
        {to: '/about', label: 'About', position: 'left'},
        {to: '/contact', label: 'Contact', position: 'left'},
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
          title: 'Products',
          items: [
            {label: 'ArgoNavis', href: 'https://substratumlabs.ai/#argonavis'},
            {label: 'ArgusOrb', href: 'https://argusorb.io/'},
          ],
        },
        {
          title: 'Research',
          items: [
            {label: 'Research & Technical Notes', to: '/blog'},
          ],
        },
        {
          title: 'Company',
          items: [
            {label: 'About', to: '/about'},
            {label: 'Contact', to: '/contact'},
          ],
        },
      ],
      copyright: `\u00a9 ${new Date().getFullYear()} Substratum Labs. All systems nominal.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'rust', 'toml', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
