const {
  CHANGED_PACKAGES,
  PARALLELIZE_TESTS,
  STEP_INDEX,
  STEPS,
} = process.env;

const config = {
  testMatch: [`${__dirname}/**/__tests__/**/*.js`],
  testPathIgnorePatterns: [
    // ignore files that are under a directory starting with "_" at the root of __tests__
    '/__tests__\\/_.*?',
    // ignore files under __tests__ that start with an "_"
    '/__tests__\\/.*?\\/_.*?',
  ],
  modulePathIgnorePatterns: ['./node_modules'],
  transformIgnorePatterns: ['\\/node_modules\\/(?!@verdigris)'],
  resolver: `${__dirname}/build/jest-config/src/resolver.js`,
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/build/jest-config/src/fileMock.js',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['./build/jest-config/src/setupFile.js'],
  // setupTestFrameworkScriptFile: `${__dirname}/build/jest-config/src/frameworkSetup.js`,
};

// Only run tests for changed packages.
if (CHANGED_PACKAGES) {
  const changedPackages = JSON.parse(CHANGED_PACKAGES);
  const changedPackagesTestGlobs = changedPackages
    .map(
      pkgPath => `${pkgPath}/**/__tests__/**/*.js`,
  );

  config.testMatch = changedPackagesTestGlobs;
}

// Run tests in parallel for CI.
if (PARALLELIZE_TESTS) {
  let allTests;
  try {
    allTests = JSON.parse(PARALLELIZE_TESTS);
  }
  catch (e) {
    allTests = PARALLELIZE_TESTS.split('\n');
  }
  const filesPerJob = Math.ceil(allTests.length / Number(STEPS));
  const startIdx = filesPerJob * Number(STEP_INDEX);
  const endIdx = startIdx + filesPerJob;
  config.testMatch = allTests.slice(startIdx, startIdx + filesPerJob);

  console.log('Running jest tests in parallel.');
  console.log(`Parallel step ${String(STEP_INDEX)} of ${String(STEPS)}`);
  console.log('Total test files', allTests.length);
  console.log(`Running files: ${startIdx}-${endIdx}`);
}

if (config.testMatch.length === 0) {
  config.testMatch = ['DONT-RUN-ANYTHING'];
  if (process.stdout.isTTY) {
    console.log('No packages were changed, so no tests should be run.');
  }
}

module.exports = config;
