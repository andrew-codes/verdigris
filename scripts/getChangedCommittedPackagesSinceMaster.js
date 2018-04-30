const path = require('path');
const packages = require('../build/packages/src');

const { log } = console;

(async () => {
  const changedPackages = await packages.getChangedPackagesSinceMaster();
  const changedPackagesRelativePaths = changedPackages.map(
    pkg => path.resolve(pkg.location),
  );

  log(JSON.stringify(changedPackagesRelativePaths));
})();
