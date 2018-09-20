const path = require('path');
const pkg = require('./package.json');

module.exports = {
  description: pkg.description,
  files: '!(node_modules)/**/!(node_modules)/*.mdx',
  src: path.join(__dirname, '..'),
  title: 'Verdigris Component Library',
};
