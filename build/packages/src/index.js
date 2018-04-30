const lernaGetPackages = require('lerna-get-packages');
const path = require('path');
const git = require('../../git/src');

module.exports = {
  getAll,
  getChangedPackagesSinceMaster,
}

function getAll(cwd = process.cwd()) {
  return lernaGetPackages(cwd);
};

async function getChangedPackagesSinceMaster() {
  const masterRef = await git.getMasterRef();
  return getChangedPackagesSinceCommit(masterRef);
};

async function getChangedPackagesSinceCommit(ref) {
  const changedFiles = await git.getChangedFilesSince(ref);
  const allPackages = getAll();

  const fileNameToPackage = fileName =>
    allPackages.find(pkg => fileName.startsWith(`${pkg.location}${path.sep}`));
  const fileExistsInPackage = fileName => !!fileNameToPackage(fileName);

  return changedFiles
    .filter(fileName => fileExistsInPackage(fileName))
    .map(fileName => fileNameToPackage(fileName))
    .filter((pkg, pkgIndex, packages) => packages.indexOf(pkg) === pkgIndex);
}
