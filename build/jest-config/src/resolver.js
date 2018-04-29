/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const resolveFrom = require('resolve-from');

/** This file is used to resolve imports in jest.
 *  This is used to make sure that packages resolve using the same algorithm as our webpack config
 *  (checking for "atlaskit:src", etc) meaning that we dont need the old root index.js hack anymore
 */

// This is the resolver used by webpack, which we configure similarly
// to AK website (see ./website/webpack.config.js - "resolve" field)
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
  if (modulePath.startsWith('.') || modulePath.startsWith(path.sep)) {
    try {
      return resolveFrom(params.basedir, modulePath);
    } catch (e) { } // eslint-disable-line
  }

  let result = wpResolver.resolveSync({}, params.basedir, modulePath);

  if (result) {
    result = fs.realpathSync(result);
  }

  return result;
};
