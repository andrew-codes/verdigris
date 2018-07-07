# Tour of the Code Base

This document will outline the general structure of the code, the standards, and norms employed for the library.

## Structure

This code base is a mono-repo and leverages [lerna](https://lernajs.io/) to manage dependencies. There are a few top-level concerns that will be detailed:

* **`build`**: contains a collection of private, un-publishable packages related to the configuration or build process in general. This includes things like the webpack configuration, jest configuration, etc.
* **`docs`**: collection of Markdown files, such as this one, which contain relevant documentation on the repo itself.
* **`components`**: directory of component packages; most of which will be publishable. See below for more details.
* **`cypress`**: directory of e2e tests run via [Cypress](https://cypress.io).
* **`packages`**: directory of non-component packages; most of which will be publishable.
* **`scripts`**: miscellaneous utility scripts, such ads a shell script for creating a new component package.
* **`website`**: web application containing help, documentation, and examples of this library; currently published to [verdigris.andrew.codes](http://verdigris.andrew.codes).

### Anatomy of a Component Package

Component packages all follow the same directory structure and general guidelines:

* The package name (directory) is camel case
* `package.json` contains a `verdigris` key with the value containing metadata about the component
* `src` directory contains all source files
* `package.json` contains a `main` key that points to the distribution index file (`dist/index.js`)
* `package.json` contains a `verdigris:src` file pointing to the source index file (`src/index.js`)
* `docs` directory houses documentation about package; including the (required) `intro.js` which will display as the landing page of the docs website
  * additional key pages are `docs/usage.md` and `docs/style.md`
  * additional sub-pages are markdown files located within `docs/docs` directory
* `examples` directory contains stand-alone usage examples

> **Note**: `verdigris:src` value is used to resolve the package to the source index file during development time. During development, there is no `dist/*.js` files and we do not want to have to build every component to be able to import them into another component's package.

#### Component Package Directory Structure

```bash
.
└── componentName
    ├── docs
    │  ├── docs
    │  │   └── 01-additional-documentation.md
    │  ├── intro.js
    │  ├── style.md
    │  └── usage.md
    ├── examples
    │  ├── 01-first-example.js
    │  └── 02-another-example.js
    ├── src
    │  ├── index.js
    │  └── otherSupportingFile.js
    ├── LICENSE
    ├── package.json
    └── README.md
```

## Tests

Tests are run via [Cypress](https://cypress.io) and are located in `cypress/integration`. Tests are run against a running local instance of the site. `yarn test` will start the site for the tests. However, in order to run tests interactively for development, first run `yarn start` to start the site, then `yarn cypress open` to open the [Cypress](https://cypress.io) test runner.

Tests should be written against the examples page of components on the docs site. This ensures that the docs' examples are fully complete; while giving a test bed for running e2e tests on the components in isolation.
