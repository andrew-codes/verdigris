const doczPluginNetlify = require('docz-plugin-netlify');
const pkg = require('./package.json');

export default {
  description: pkg.description,
  plugins: [doczPluginNetlify()],
  title: 'Verdigris Component Library',
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
                    '@babel/plugin-syntax-dynamic-import',
                  ],
                },
              },
              { loader: require.resolve('@verdigris/svg-icon-loader') },
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
