# Getting Started: Developers

## Other Developer CLI Tasks

* `yarn lint`
* `yarn test` will run all tests
* `yarn test:changed` will only run tests in packages that have changed since the branch was cut from master
* `yarn bootstrap` run after adding new internal dependencies to a package
* `yarn lerna add --scope @verdigris/package-name dependency-to-add` (see below for details on managing dependencies)
* `yarn new-component ComponentName "A description of the component."` will scaffold out a new component in `./packages`

## Managing Dependencies

Packages are managed using [lerna](https://lernajs.io/). However, there are `yarn` scripts to help automate this.

> **Note**: Upon changing a dependency, you will likely want to run `yarn` again. This will automatically bootstrap internal dependencies. `yarn` is automatically run before running locally (`yarn start`), but not run automatically before building or deploying.

* **Adding** a new dependency, use `yarn lerna add --scope @verdigris/package-name dependency-name`
* For **dev dependencies**, add the `--dev` CLI option `yarn lerna add --dev --scope @verdigris/package-name dependency-name`
* **Removing** dependencies requires deleting the item from the package's `package.json` and re-running `yarn bootstrap` in the root of Verdigris.

## Previewing PRs

In addition to running lint and tests for all open PRs via Travis, an example published site is also deployed via Netlify. See the PR in GitHub for a link to the PR's deployed sample site.

## Additional Reading

- [Tour of the Code Base](../guides/tour-of-the-code-base): overview of of structure and conventions used in Verdigris
- [Publishing](../guides/publishing): guide to versioning and publishing
