process.env.NODE_ENV = 'test';

module.exports = wallaby => ({
  files: [
    'jest.config.js',
    'build/**/*.js',
    '!build/**/__tests__/*.js',
    'components/**/*.js',
    '!components/**/__tests__/*.js',
    'packages/**/*.js',
    '!packages/**/__tests__/*.js',
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
    const jestConfig = require('./jest.config.js');
    w.testFramework.configure(jestConfig);
  },
});
