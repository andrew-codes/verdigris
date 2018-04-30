
jest.mock('lerna-get-packages', () => jest.fn());

const packages = require('../');
const getLernaPackages = require('lerna-get-packages');

const arrayOfPackages = [
  {
    location: 'path/to/package1',
  }, {
    location: 'path/to/package2',
  },
];

test('getting all packages returns all lerna packages from the current working directory', () => {
  when(getLernaPackages).calledWith(process.cwd()).mockReturnValue(arrayOfPackages);
  const actual = packages.getAll();
  expect(actual).toEqual(arrayOfPackages);
});

test('getting all packages from a specific directory returns all lerna packages from the specified directory', () => {
  when(getLernaPackages).calledWith('path/to/some/packages').mockReturnValue(arrayOfPackages);
  const actual = packages.getAll('path/to/some/packages');
  expect(actual).toEqual(arrayOfPackages);
});
