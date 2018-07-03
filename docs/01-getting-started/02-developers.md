# Getting Started: Developers

## Other Developer CLI Tasks

* `yarn lint`
* `yarn test` will run all tests
* `yarn test:changed` will only run tests in packages that have changed since the branch was cut from master
* `yarn bootstrap` run after adding new internal dependencies to a package
* `yarn lerna add --scope @verdigris/package-name dependency-to-add` (see below for details on managing dependencies)
* `yarn new-comp PackageName "A description of the package."` will scaffold out a new component in `./components/packageName`

## Managing Dependencies

Packages are managed using [lerna](https://lernajs.io/). Each package has its own list of dependencies. Therefore, dependencies are not added at the project root level; rather scoped to a specific package. There are `yarn` scripts to help automate this:

> **Note**: If you run into trouble after installing a new dependency, try running `yarn && yarn bootstrap`.

* **Adding** a new dependency, use `yarn lerna add --scope @verdigris/package-name dependency-name`
* For **dev dependencies**, add the `--dev` CLI option `yarn lerna add --dev --scope @verdigris/package-name dependency-name`
* **Removing** dependencies requires deleting the item from the package's `package.json` and re-running `yarn bootstrap` in the project root.

## PR Deployment Preview Sites

In addition to running lint and tests for all open PRs via Travis, every PR will deploy a preview site. See the PR in GitHub for a link to the PR's deployed sample site.

## Additional Reading

- [Tour of the Code Base](../../guides/tour-of-the-code-base): overview of of structure and conventions used in Verdigris
- [Contributing](.../../guides/contributing): guidelines for contributors
- [Publishing](../../guides/publishing): guide to versioning and publishing
