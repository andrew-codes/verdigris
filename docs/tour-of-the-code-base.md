# Tour of the Code Base
This document will outline the general structure of the code, the standards and norms employed for the library, as well as any relevant technologies and or commands for interacting with the code base.

## Structure
This code base is a mono-repo and leverages [lerna](https://lernajs.io/) to manage dependencies between the various packages in the repo. There are a few top-level concerns that will be detailed:

- **`build`**: contains a collection of private, un-publishable packages related to the configuration or build process in general. This includes things like the webpack configuration, jest configuration, etc.
- **`docs`**: collection of Markdown files, such as this one, which contain relevant documentation on the repo itself.
- **`packages`**: directory of component packages; most of which will be publishable. See [anatomy of a component package]() for more details.
- **`scripts`**: miscellaneous utility scripts, such as a shell script for creating a new component package.
- *`website`**: web application containing help, documentation, and examples of this library; currently published to [verdigris.andrew.codes](http://verdigris.andrew.codes).

### Anatomy of a Component Package
Component packages all follow the same directory structure and general guidelines:

- The package name (directory) is camel case
- `src` directory contains all source files
- Every directory/sub-directory under `src` contains a `__tests__` directory to house unit tests
- Unit tests follow the `fileName.test.js` naming convention
- `package.json` contains a `main` key that points to the distribution index file (`dist/index.js`)
- `package.json` contains a `verdigris:src` file pointing to the source index file (`src/index.js`)

> **Note**: `verdigris:src` value is used to resolve the package to the source index file during development time. During development, there is no `dist/*.js` files and we do not want to have to build every component to be able to import them into another component's package.

#### Component Package Directory Structure

```
.
└── packageName
    ├── src
    │  ├── __tests__
    |  |   ├── index.test.js
    |  |   └── otherSupportingFiles.test.js
    |  ├── index.js
    |  └── otherSupportingFiles.js
    ├── LICENSE
    ├── package.json
    └── README.md
```

#### Component Declarations (Class versus Function)
