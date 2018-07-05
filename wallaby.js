process.env.NODE_ENV = 'test';

module.exports = wallaby => ({
  files: [
    'build/**/*.js',
    'build/*/package.json',
    '!build/**/__tests__/*.js',
    'components/*/package.json',
    'components/**/*.js',
    '!components/**/__tests__/*.js',
    'packages/*/package.json',
    'packages/**/*.js',
    '!packages/**/__tests__/*.js',
    'website/package.json',
    'website/**/*.js',
    '!website/**/__tests__/*.js',
    '!node_modules/**/*.*',
    '!website/dist',
    '!**/node_modules/**/*.js',
    '!**/dist/**/*.js',
  ],
  tests: [
    'build/**/__tests__/*.js',
    'components/**/__tests__/*.js',
    'packages/**/__tests__/*.js',
    'website/**/__tests__/*.js',
    '!website/dist',
    '!**/node_modules/**/*.js',
  ],
  filesWithNoCoverageCalculated: ['package.json', 'jest.config.js'],
  env: {
    type: 'node',
    runner: 'node',
  },
  testFramework: 'jest',
  compilers: {
    '**/*.js': wallaby.compilers.babel({
      babel: require('babel-core'),
      babelrc: true,
    }),
  },
  setup(w) {
    const globby = require('globby');
    const path = require('path');
    const createJestConfig = require('./build/jest/src/createJestConfig');
    const config = createJestConfig(process.cwd());
    const mappers = globby
      .sync([
        path.join(w.projectCacheDir, '/components/*/package.json'),
        `${w.projectCacheDir}/packages/*/package.json`,
      ])
      .reduce((prev, packageJsonPath) => ({
        ...prev,
        [`^${require(packageJsonPath).name}`]: path.dirname(
          packageJsonPath,
        )
      }), {});
    config.moduleNameMapper = {
      ...config.moduleNameMapper,
      ...mappers,
    };
    w.testFramework.configure(config);
  },
});
