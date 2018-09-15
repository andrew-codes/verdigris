#!/usr/bin/env node

const webpack = require('webpack');
const createConfig = require('../src/createConfig.js');

const HOST = 'localhost';

runDevServer()
  .catch(error => process.exit(error));

async function runDevServer() {
  const [entry] = process.argv.slice(2);
  const report = !!process.argv.find(arg => arg.startsWith('--report'));
  const env = 'production';

  const config = createConfig({
    entry,
    host: HOST,
    env,
    report,
  });
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
