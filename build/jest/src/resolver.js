/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const resolveFrom = require('resolve-from');

const wpResolver = require('enhanced-resolve').ResolverFactory.createResolver({
  fileSystem: fs,
  useSyncFileSystemCalls: true,
  mainFields: ['verdigris:src', 'main'],
  extensions: ['.js'],
});

module.exports = function resolver(
  modulePath,
  params,
) {
  try {
    if (!(modulePath.startsWith('.') || modulePath.startsWith(path.sep))) {
      return require.resolve(modulePath);
    }
    if (modulePath.startsWith('.') || modulePath.startsWith(path.sep)) {
      try {
        return resolveFrom(params.basedir, modulePath);
      } catch (e) {
        // eslint-disable-line
      }
    }
  }
  catch (error) {
    // eslint-disable-line
    console.log(`Resorting to enhanced-resolve for module resolution of ${modulePath}`);
  }
  let result = wpResolver.resolveSync({}, params.basedir, modulePath);
  if (result) {
    result = fs.realpathSync(result);
  }

  return result;
};
