# Contributing
Please submit contributions via a PR.

## Creating a New Component Package
`yarn new-component ComponentName "a description of the component"` will scaffold out a new component in `./packages`.

## Managing Dependencies
Packages are managed using [lerna](https://lernajs.io/). However, there are `yarn` scripts to help automate this.

- **Adding** a new dependency, use `yarn lerna add --scope @verdigris/package-name dependency-name`
- For **dev dependencies**, add the `--dev` CLI option `yarn lerna add --dev --scope @verdigris/package-name dependency-name`
- **Removing** dependencies requires deleting the item from the package's `package.json` and re-running `yarn` in the root of Verdigris.

> **Note**: Upon changing a dependency, you will likely want to run `yarn` again. This will automatically bootstrap internal dependencies. `yarn` is automatically run before running locally (`yarn start`), but not run automatically before building or deploying.

## Linting and Tests
- `yarn lint`
- `yarn test` will run all tests
- `yarn test:changed` will only run tests in packages that have changed since the branch was cut from master

## Viewing a Published PR
In addition to running lint and tests for all open PRs via Travis, an example published site is also deployed via Netlify. See the PR in GitHub for a link to the PR's deployed sample site.
