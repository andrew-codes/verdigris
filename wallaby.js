process.env.NODE_ENV = 'test';

module.exports = wallaby => ({
  files: [
    'jest.config.js',
    'build/**/*.js', '!build/**/__tests__/*.js',
    'packages/**/*.js', '!packages/**/__tests__/*.js',
    'website/**/*.js', '!website/**/__tests__/*.js',
  ],
  tests: [
    'build/**/__tests__/*.js',
    'packages/**/__tests__/*.js',
    'website/**/__tests__/*.js',
  ],
  env: {
    type: 'node',
    runner: 'node',
  },
  testFramework: 'jest',
  compilers: {
    '**/*.js': wallaby.compilers.babel()
  },
  setup(w) {
    const jestConfig = require('./jest.config.js');
    w.testFramework.configure(jestConfig);
  },
});
