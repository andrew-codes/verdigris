chalk=$(yarn bin)/chalk
name="$(tr '[:upper:]' '[:lower:]' <<< ${1:0:1})${1:1}"

if [ -z $name ]; then
  $chalk -t '{red.bold No component name provided. {~bold.blue Try the following: }{bold.blue yarn new-component ComponentName "component description"}}'
  exit 1
fi

description=${2:-''}
componentName="$(tr '[:lower:]' '[:upper:]' <<< ${name:0:1})${name:1}"

if [ -d "packages/$name" ]; then
  $chalk red bold "There is already a component named $componentName."
  exit 1
fi

# Root package directory
mkdir -p packages/$name
echo "{
  \"name\": \"@verdigris/$name\",
  \"version\": \"0.0.0\",
  \"description\": \"$description\",
  \"license\": \"MIT\",
  \"main\": \"./dist/index.js\",
  \"verdigris:src\": \"./index.js\",
  \"verdigris\": {
    \"name\": \"$componentName\"
  }
}" > packages/$name/package.json
echo "# $componentName
$description
" > packages/$name/README.md

# Src directory
mkdir -p packages/$name/src
echo "" > packages/$name/src/index.js

# Src level tests
mkdir -p packages/$name/src/__tests__
echo "import $componentName from '../';

test('the component is exported', () => {
  throw new Error('Test not implemented.');
});" > packages/$name/src/__tests__/index.test.js
