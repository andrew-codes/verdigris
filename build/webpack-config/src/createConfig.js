const os = require('os');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = (
  {
    entry,
    host,
    port,
    includePatterns = false,
    env = 'development',
    cwd = process.cwd(),
    noMinimize = false,
    report = false,
  },
) => ({
  mode: env,
  entry: {
    main:
      env === 'development' && host && port
        ? [
          `${require.resolve(
            'webpack-dev-server/client',
          )}?http://${host}:${port}/`,
          path.join(process.cwd(), entry),
        ]
        : path.join(cwd, entry),
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(cwd, 'dist'),
    publicPath: '/',
  },
  devtool: env === 'production' ? false : 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.md$/,
        exclude: /node_modules/,
        loader: ['babel-loader', '@mdx-js/loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        loader: 'url-loader?limit=10000',
      },
    ],
  },
  resolve: {
    mainFields: ['verdigris:src', 'main'],
    extensions: ['.js', '.jsx'],
  },
  plugins: plugins({ cwd, env, noMinimize, report }),
});
function plugins(
  {
    cwd,
    env,
    noMinimize,
    report,
  },
) {
  const plugins = [
    new webpack.NamedChunksPlugin(
      chunk =>
        chunk.name && path.isAbsolute(chunk.name) ? chunk.id : chunk.name,
    ),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(cwd, 'public/index.html.ejs'),
      title: `Verdigris Component Library${env === 'development' ? ' - DEV' : ''}`,
      // favicon: path.join(
      //   cwd,
      //   `public/favicon${env === 'development' ? '-dev' : ''}.ico`,
      // ),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${env}"`,
    }),
  ];

  if (report) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: true,
        generateStatsFile: true,
        logLevel: 'error',
      }),
    );
  }

  if (env === 'production' && !noMinimize) {
    plugins.push(uglify());
  }

  return plugins;
}

const uglify = () => {
  return new UglifyJsPlugin({
    parallel: Math.max(os.cpus().length - 1, 1),
    uglifyOptions: {
      compress: {
        arrows: false,
        booleans: false,
        collapse_vars: false,
        comparisons: false,
        computed_props: false,
        hoist_funs: false,
        hoist_props: false,
        hoist_vars: false,
        if_return: false,
        inline: false,
        join_vars: false,
        keep_infinity: true,
        loops: false,
        negate_iife: false,
        properties: false,
        reduce_funcs: false,
        reduce_vars: false,
        sequences: false,
        side_effects: false,
        switches: false,
        top_retain: false,
        toplevel: false,
        typeofs: false,
        unused: false,
        conditionals: true,
        dead_code: true,
        evaluate: true,
      },
      mangle: true,
    },
  });
};
