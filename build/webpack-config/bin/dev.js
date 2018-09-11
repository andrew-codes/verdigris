#!/usr/bin/env node

const historyApiFallback = require('connect-history-api-fallback');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const createConfig = require('../src/createConfig.js');

const HOST = 'localhost';
const PORT = +process.env.PORT || 9000;
const { log } = console;

runDevServer().catch(error => process.exit(error));

async function runDevServer() {
  const [entry] = process.argv.slice(2);
  const report = !!process.argv.find(arg => arg.startsWith('--report'));
  const env = 'development';

  const config = createConfig({
    entry,
    env,
    report,
  });
  const compiler = webpack(config);
  const server = new WebpackDevServer(compiler, {
    compress: true,
    historyApiFallback: true,
    hot: true,
    overlay: true,
    stats: {
      colors: true,
      assets: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: true,
    },
  });
  return new Promise((resolve, reject) => {
    server.listen(PORT, HOST, err => {
      if (err) {
        log(err.stack || err);
        return reject(1);
      }

      server.use(
        historyApiFallback({
          disableDotRule: true,
          htmlAcceptHeaders: ['text/html'],
        }),
      );
    });
  });
}
