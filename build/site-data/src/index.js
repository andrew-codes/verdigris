const path = require('path');
const loaderUtils = require('loader-utils');
const globby = require('globby');
const { dir, buildFs, isDirHasFiles } = require('./buildFs');
const { printDir } = require('./printFs');

function createLoaderOutput(directory, files = [], debug = false, ) {
  const output = `
    function dir(id, children) {
      return { type: 'dir', id: id, children: children };
    }

    function file(id, exports, contents, componentMetadata) {
      return { type: 'file', id: id, exports: exports, contents: contents, componentMetadata: componentMetadata };
    }

    export default ${printDir(directory)};
  `;

  if (debug) {
    const groupName = 'Site Data Debug Info';
    return `${output}
      console.groupCollapsed('${groupName}');
      console.log('Files: ', ${JSON.stringify(files)});
      console.log('Dir structure: ', ${JSON.stringify(directory)});
      console.groupEnd('${groupName}');
    `;
  }

  return output;
}

function addWebpackDependencies(directory, addContextDependency, ) {
  if (isDirHasFiles(directory)) {
    return addContextDependency(directory.path);
  }

  directory.children.forEach(child => addWebpackDependencies(child, addContextDependency));
}

module.exports = async function siteDataLoader() {
  const opts = Object.assign(
    { include: [], exclude: [], debug: false },
    loaderUtils.getOptions(this) || {},
  );

  const projectRoot = path.join(process.cwd(), '..');

  this.clearDependencies();

  if (!opts.include || !opts.include.length) {
    return createLoaderOutput(dir('root', projectRoot), [], opts.debug);
  }

  const patterns = []
    .concat(opts.include)
    .concat((opts.exclude || []).map(p => `!${p}`));
  const files = await globby(patterns, { cwd: projectRoot, });
  const result = files.reduce((prev, file) => {
    const pathSegments = file.split(path.sep);
    return buildFs(prev, pathSegments);
  }, dir('root', projectRoot));

  addWebpackDependencies(result, this.addContextDependency.bind(this));

  return createLoaderOutput(result, files, opts.debug);
};
