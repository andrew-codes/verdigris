const doczPluginNetlify = require('docz-plugin-netlify');
const pkg = require('./package.json');

export default {
  description: pkg.description,
  plugins: [doczPluginNetlify()],
  title: 'Verdigris Component Library',
  menu: [
    {
      name: 'Getting Started',
      menu: ['Start Here', 'Customization'],
    },
    {
      name: 'Guides',
      menu: ['Contributing', 'Tour of Code Base'],
    },
    {
      name: 'Components',
    },
    {
      name: 'Other Packages',
      menu: ['StyleProvider', 'StyleContainer', 'SVG Icon Loader'],
    },
  ],
  modifyBundlerConfig: config => ({
    ...config,
    resolve: {
      ...config.resolve,
      mainFields: ['main:src', 'main'],
    },
  }),
  modifyBabelRc: config => ({
    babelrc: false,
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            esmodules: true,
          },
        },
      ],
      '@babel/preset-react',
    ],
    plugins: config.plugins.concat([
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-syntax-dynamic-import',
      'babel-plugin-transform-react-fela-display-name',
      [
        'babel-plugin-transform-react-remove-prop-types',
        {
          mode: 'wrap',
          ignoreFilenames: ['node_modules'],
        },
      ],
      'babel-plugin-dev-expression',
      [
        '@andrew-codes/babel-plugin-react-docgen',
        {
          additionalHandlers: [
            '@andrew-codes/theme-definition-handler',
            'react-docgen-deprecation-handler',
          ],
        },
      ],
    ]),
  }),
};
