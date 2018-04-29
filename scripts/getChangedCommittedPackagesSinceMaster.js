const path = require('path');
const packages = require('../build/packages/src');

(async () => {
  const changedPackages = await packages.getChangedPackagesSinceMaster();
  const changedPackagesRelativePaths = changedPackages.map(
    pkg => path.resolve(pkg.location),
  );

  console.log(JSON.stringify(changedPackagesRelativePaths));
})();
