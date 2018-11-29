#!/usr/bin/env node

const changeCase = require('change-case');
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');
const shell = require('shelljs');
const { force, menu, name } = require('yargs').argv;

const packageName = changeCase.param(name);

const componentDirectory = path.join(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  'components',
  packageName,
);

if (fs.existsSync(componentDirectory) && !force) {
  /* eslint-disable-next-line no-console */
  console.log('Component already exists. Try using --force.');
  return;
}

const docsDirectory = path.join(componentDirectory, 'docs');
const srcDirectory = path.join(componentDirectory, 'src');
const templateDir = path.join(__dirname, '..', 'template');

const pkgSource = fs.readFileSync(
  path.join(templateDir, 'package.json.hbs'),
  'utf8',
);
const mdxSource = fs.readFileSync(path.join(templateDir, 'mdx.hbs'), 'utf8');
const indexSource = fs.readFileSync(
  path.join(templateDir, 'index.js.hbs'),
  'utf8',
);
const componentSrcSource = fs.readFileSync(
  path.join(templateDir, 'componentSrc.js.hbs'),
  'utf8',
);

const pkgTemplate = handlebars.compile(pkgSource);
const mdxTemplate = handlebars.compile(mdxSource);
const indexTemplate = handlebars.compile(indexSource);
const componentSrcTemplate = handlebars.compile(componentSrcSource);

const pkgContents = pkgTemplate({ packageName });
const mdxContents = mdxTemplate({
  ofName: `{${name}}`,
  name,
  menu: menu || 'Components',
  packageName,
});
const indexContents = indexTemplate({ name });
const componentSrcContents = componentSrcTemplate({ name });

shell.mkdir('-p', componentDirectory);
shell.mkdir('-p', docsDirectory);
shell.mkdir('-p', srcDirectory);

fs.writeFileSync(
  path.join(componentDirectory, 'package.json'),
  pkgContents,
  'utf8',
);
fs.writeFileSync(path.join(docsDirectory, `${name}.mdx`), mdxContents, 'utf8');
fs.writeFileSync(path.join(srcDirectory, 'index.js'), indexContents, 'utf8');
fs.writeFileSync(
  path.join(srcDirectory, `${name}.js`),
  componentSrcContents,
  'utf8',
);

shell.exec('yarn bootstrap');
