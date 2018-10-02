const docgen = require('react-docgen');
const { resolver } = require('react-docgen');
const themeDefinitionHandler = require('./themeDefinitionHandler');

module.exports = function themeDefinitionDocGenLoader(source) {
  if (this.cacheable) {
    this.cacheable();
  }

  let value = {};
  try {
    value = docgen.parse(source, resolver.findAllExportedComponentDefinitions, [
      themeDefinitionHandler,
    ]);
  } catch (e) {
    console.log('ERROR in docgen-loader', e);
  }

  return `module.exports = ${JSON.stringify(value, undefined, '\t')}`;
};
