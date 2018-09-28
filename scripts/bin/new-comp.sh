chalk=$(yarn bin)/chalk
name="$(tr '[:upper:]' '[:lower:]' <<< ${1:0:1})${1:1}"

if [ -z $name ]; then
  $chalk -t '{red.bold No component name provided. {~bold.blue Try the following: }{bold.blue yarn new-pkg PackageName "package description"}}'
  exit 1
fi

description=${2:-''}
componentName="$(tr '[:lower:]' '[:upper:]' <<< ${name:0:1})${name:1}"

if [ -d "components/$name" ]; then
  $chalk red bold "There is already a component named $componentName."
  exit 1
fi

# ## Root package directory
mkdir -p components/$name
# Create license
echo "The MIT License (MIT)

Copyright (c) 2018 Andrew Smith

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE." \
> components/$name/LICENSE
# Create package.json
echo "{
  \"name\": \"@andrew-codes/verdigris-$name\",
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
}" > components/$name/package.json
# Create README.md
echo "# $componentName
$description
" > components/$name/README.md

# ## src directory
mkdir -p components/$name/src
# Create default exported JS file
echo "" > components/$name/src/index.js

# ## docs directory
mkdir -p components/$name/docs
# code docs page (intro.js)
echo "import { code, md } from '@andrew-codes/verdigris-docs';

export default () => md\`
## $componentName

$description
\`;
" > components/$name/docs/intro.js
# usage docs page
echo "
" > components/$name/docs/usage.md
# style docs page
echo "
" > components/$name/docs/style.md
# Directory to house any other misc. package doc pages
mkdir -p components/$name/docs/docs

# ## examples directory
mkdir -p components/$name/examples
echo "import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class App extends Component {
  render() {
    return (
      <div>Put example here</div>
    )
  }
}
" > components/$name/examples/01-an-example.js
