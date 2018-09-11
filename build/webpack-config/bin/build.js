#!/usr/bin/env node

const path = require('path');
const webpack = require('webpack');
const createConfig = require('../src/createConfig.js');

runDevServer().catch(error => process.exit(error));

async function runDevServer() {
  const [entry] = process.argv.slice(2);
  const report = !!process.argv.find(arg => arg.startsWith('--report'));
  const env = 'production';

  const config = createConfig({
    entry,
    env,
    report,
    projectRoot: path.join(__dirname, '..', '..', '..'),
  });
  const compiler = webpack(config);

  return new Promise((resolve, reject) => {
    compiler.run((error, stats) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stats);
    });
  });
}
