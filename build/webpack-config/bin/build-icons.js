#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

runDevServer()
  .catch(error => process.exit(error));

async function runDevServer() {
  const [entry] = process.argv.slice(2);
  const env = process.env.NODE_ENV;
  const cwd = process.cwd();

  const config = {
    mode: env,
    target: 'node',
    entry: path.resolve(cwd, entry),
    output: {
      filename: 'index.js',
      libraryTarget: 'commonjs',
      path: path.resolve(cwd, 'dist'),
    },
    externals: getExternals(),
    module: {
      rules: [
        {
          test: /\.icon\.svg$/,
          loaders: [
            require.resolve('babel-loader'),
            require.resolve('@verdigris/svg-icon-loader'),
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
        },
      ],
    },
  };

  const compiler = webpack(config);

  return new Promise((resolve, reject) => {
    compiler.run((error, stats) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(stats);
    })
  });
}

function getExternals() {
  // return /^[a-z\-0-9]+$/;
  return fs.readdirSync('node_modules')
    .concat(fs.readdirSync('../../node_modules'))
    .filter((x) => {
      return ['.bin'].indexOf(x) === -1;
    })
    .reduce((prev, mod) => ({
      ...prev,
      [mod]: {
        commonjs: mod,
      },
    }), {});
}
