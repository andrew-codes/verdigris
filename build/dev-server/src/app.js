const express = require('express');
const path = require('path');
const Html = require('./Html');

const port = process.env.PORT;

const app = new express();

/* eslint-disable import/no-extraneous-dependencies */
const createWebpackCompiler = require('@verdigris/webpack-config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
/* eslint-enable import/no-extraneous-dependencies */
const publicPath = '/dist/';
const compiler = createWebpackCompiler({
  cwd: __dirname,
  entry: 'entryPoint.js',
  env: 'development',
  projectRoot: path.join(__dirname, '..', '..', '..'),
  publicPath,
});
app.use(
  webpackDevMiddleware(compiler, {
    publicPath,
    watch: true,
    watchOptions: {
      poll: true,
      aggregateTimeout: 300,
    },
  }),
);
app.use(webpackHotMiddleware(compiler));

app.get(`${publicPath}*`, (req, res) => {
  res.sendFile(path.join(__dirname, '..', req.url));
});

app.get('/*', (req, res, next) => {
  res.send(Html({ scripts: ['/dist/vendor.js', '/dist/main.js'] }));
});

app.listen(port, () => console.log(`App running on port ${port}`));
