chalk=$(yarn bin)/chalk
name="$(tr '[:upper:]' '[:lower:]' <<< ${1:0:1})${1:1}"

if [ -z $name ]; then
  $chalk -t '{red.bold No component name provided. {~bold.blue Try the following: }{bold.blue yarn new-pkg PackageName "package description"}}'
  exit 1
fi

description=${2:-''}
componentName="$(tr '[:lower:]' '[:upper:]' <<< ${name:0:1})${name:1}"

if [ -d "packages/$name" ]; then
  $chalk red bold "There is already a component named $componentName."
  exit 1
fi

# ## Root package directory
mkdir -p packages/$name
# Create license
echo "The MIT License (MIT)

Copyright (c) 2018 Andrew Smith

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE." \
> packages/$name/LICENSE
# Create package.json
echo "{
  \"name\": \"@verdigris/$name\",
  \"version\": \"0.0.0\",
  \"description\": \"$description\",
  \"license\": \"MIT\",
  \"main\": \"./dist/index.js\",
  \"verdigris:src\": \"./src/index.js\",
  \"verdigris\": {
    \"name\": \"$componentName\"
  },
  \"files\": [
    \"dist\"
  ]
}" > packages/$name/package.json
# Create README.md
echo "# $componentName
$description
" > packages/$name/README.md

# ## src directory
mkdir -p packages/$name/src
# Create default exported JS file
echo "" > packages/$name/src/index.js
# Create default tests
mkdir -p packages/$name/src/__tests__
echo "test('the component is exported', () => {
  throw new Error('Test not implemented.');
});" > packages/$name/src/__tests__/index.test.js

# ## docs directory
mkdir -p packages/$name/docs
# code docs page (intro.js)
echo "import { code, md } from '@verdigris/docs';

export default () => md`
# $componentName

$description
`;
" > packages/$name/docs/intro.js
# usage docs page
echo "
" > packages/$name/docs/usage.md
# style docs page
echo "
" > packages/$name/docs/style.md
# Directory to house any other misc. package doc pages
mkdir -p package/$name/docs/docs

# ## examples directory
mkdir -p packages/$name/examples
echo "import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

export default class App extends Component {
  render() {
    return (
      <div>Put example here</div>
    )
  }
}
" > packages/$name/examples/01-an-example.js
