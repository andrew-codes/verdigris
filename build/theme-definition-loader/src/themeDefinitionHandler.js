/*
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const getPropType = require('react-docgen/dist/utils/getPropType');
const getPropertyName = require('react-docgen/dist/utils/getPropertyName');
const isReactModuleName = require('react-docgen/dist/utils/isReactModuleName');
const isStatelessComponent = require('react-docgen/dist/utils/isStatelessComponent');
const getMemberValuePath = require('react-docgen/dist/utils/getMemberValuePath');
const printValue = require('react-docgen/dist/utils/printValue');
const recast = require('recast');
const resolveFunctionDefinitionToReturnValue = require('react-docgen/dist/utils/resolveFunctionDefinitionToReturnValue');
const resolveToModule = require('react-docgen/dist/utils/resolveToModule');
const resolveToValue = require('react-docgen/dist/utils/resolveToValue');
const setPropDescription = require('react-docgen/dist/utils/setPropDescription');

const {
  types: { namedTypes: types },
} = recast;

function isPropTypesExpression(path) {
  const moduleName = resolveToModule.default(path);
  if (moduleName) {
    return (
      isReactModuleName.default(moduleName) || moduleName === 'ReactPropTypes'
    );
  }
  return false;
}

function amendPropTypes(getDescriptor, path) {
  if (!types.ObjectExpression.check(path.node)) {
    return;
  }

  path.get('properties').each(propertyPath => {
    switch (propertyPath.node.type) {
      case types.Property.name: {
        console.log(1);
        const propDescriptor = getDescriptor(
          getPropertyName.default(propertyPath),
        );
        const valuePath = propertyPath.get('value');
        const type = isPropTypesExpression(valuePath)
          ? getPropType.default(valuePath)
          : { name: 'custom', raw: printValue.default(valuePath) };

        if (type) {
          propDescriptor.type = type;
        }
        break;
      }
      case types.SpreadElement.name: {
        console.log(2);

        const resolvedValuePath = resolveToValue.default(
          propertyPath.get('argument'),
        );
        switch (resolvedValuePath.node.type) {
          case types.ObjectExpression.name: // normal object literal
            amendPropTypes(getDescriptor, resolvedValuePath);
            break;
        }
        break;
      }
    }
  });
}

function resolveDocumentation(documentation, path) {
  if (!types.ObjectExpression.check(path.node)) {
    return;
  }

  path.get('properties').each(propertyPath => {
    if (types.Property.check(propertyPath.node)) {
      setPropDescription.default(documentation, propertyPath);
    } else if (types.SpreadElement.check(propertyPath.node)) {
      const resolvedValuePath = resolveToValue.default(
        propertyPath.get('argument'),
      );
      resolveDocumentation(documentation, resolvedValuePath);
    }
  });
}

function getDefaultValue(path) {
  let { node } = path;
  let defaultValue;
  if (types.Literal.check(node)) {
    defaultValue = node.raw;
  } else {
    if (types.AssignmentPattern.check(path.node)) {
      path = resolveToValue.default(path.get('right'));
    } else {
      path = resolveToValue.default(path);
    }
    if (types.ImportDeclaration.check(path.node)) {
      defaultValue = node.name;
    } else {
      node = path.node;
      defaultValue = printValue.default(path);
    }
  }
  if (typeof defaultValue !== 'undefined') {
    return {
      value: defaultValue,
      computed:
        types.CallExpression.check(node) ||
        types.MemberExpression.check(node) ||
        types.Identifier.check(node),
    };
  }

  return null;
}

function getStatelessPropsPath(componentDefinition) {
  return resolveToValue.default(componentDefinition).get('params', 0);
}

function getDefaultPropsPath(componentDefinition) {
  let defaultPropsPath = getMemberValuePath.default(
    componentDefinition,
    'defaultThemeValues',
  );
  if (!defaultPropsPath) {
    return null;
  }

  defaultPropsPath = resolveToValue.default(defaultPropsPath);
  if (!defaultPropsPath) {
    return null;
  }

  if (types.FunctionExpression.check(defaultPropsPath.node)) {
    // Find the value that is returned from the function and process it if it is
    // an object literal.
    const returnValue = resolveFunctionDefinitionToReturnValue.default(
      defaultPropsPath,
    );
    if (returnValue && types.ObjectExpression.check(returnValue.node)) {
      defaultPropsPath = returnValue;
    }
  }
  return defaultPropsPath;
}

function getDefaultValuesFromProps(properties, documentation, isStateless) {
  properties
    .filter(propertyPath => types.Property.check(propertyPath.node))
    // Don't evaluate property if component is functional and the node is not an AssignmentPattern
    .filter(
      propertyPath =>
        !isStateless ||
        types.AssignmentPattern.check(propertyPath.get('value').node),
    )
    .forEach(propertyPath => {
      const propDescriptor = documentation.getPropDescriptor(
        getPropertyName.default(propertyPath),
      );
      const defaultValue = getDefaultValue(
        isStateless
          ? propertyPath.get('value', 'right')
          : propertyPath.get('value'),
      );
      if (defaultValue) {
        propDescriptor.defaultValue = defaultValue;
      }
    });
}

const getPropTypeHandler = propName => {
  return (documentation, path) => {
    let propTypesPath = getMemberValuePath.default(path, propName);
    if (!propTypesPath) {
      return;
    }
    propTypesPath = resolveToValue.default(propTypesPath);
    if (!propTypesPath) {
      return;
    }
    const getDescriptor = documentation.getPropDescriptor;
    amendPropTypes(getDescriptor.bind(documentation), propTypesPath);
    resolveDocumentation(documentation, propTypesPath);

    let statelessProps = null;
    const defaultPropsPath = getDefaultPropsPath(path);
    if (isStatelessComponent.default(path)) {
      statelessProps = getStatelessPropsPath(path);
    }
    // Do both statelessProps and defaultProps if both are available so defaultProps can override
    if (statelessProps && types.ObjectPattern.check(statelessProps.node)) {
      getDefaultValuesFromProps(
        statelessProps.get('properties'),
        documentation,
        true,
      );
    }
    if (
      defaultPropsPath &&
      types.ObjectExpression.check(defaultPropsPath.node)
    ) {
      getDefaultValuesFromProps(
        defaultPropsPath.get('properties'),
        documentation,
        false,
      );
    }
  };
};

module.exports = getPropTypeHandler('themeDefinition');
