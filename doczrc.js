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
      menu: [
        'Analytics',
        'Chip',
        'CodeBlock',
        'InlineCode',
        'SvgIcon',
        'Icons',
        'Switch',
      ],
    },
    {
      name: 'Other Packages',
      menu: ['SVG Icon Loader', 'StyleProvider', 'StyleContainer'],
    },
  ],
  wrapper: '@andrew-codes/verdigris-style-provider',
  modifyBundlerConfig: config => ({
    ...config,
    module: {
      ...config.module,
      rules: config.module.rules
        .filter(rule => !'icon.svg'.match(rule.test))
        .concat([
          {
            test: /\.icon\.svg$/,
            use: [
              {
                loader: require.resolve('babel-loader'),
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                  plugins: [
                    '@babel/plugin-proposal-object-rest-spread',
                    [
                      'babel-plugin-transform-react-remove-prop-types',
                      {
                        mode: 'wrap',
                        ignoreFilenames: ['node_modules'],
                      },
                    ],
                  ],
                },
              },
              {
                loader: require.resolve(
                  '@andrew-codes/verdigris-svg-icon-loader',
                ),
              },
            ],
          },
        ]),
    },
    resolve: {
      ...config.resolve,
      mainFields: ['verdigris:src', 'main'],
    },
  }),
  modifyBabelRc: babelrc => ({
    ...babelrc,
    babelrc: true,
  }),
};
