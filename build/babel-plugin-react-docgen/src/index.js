const _ = require('lodash');
const ReactDocgen = require('react-docgen');
const reactDocgenHandlers = require('react-docgen/dist/handlers');
const actualNameHandler = require('./actualNameHandler');

const defaultHandlers = Object.values(reactDocgenHandlers).map(
  handler => handler,
);
const handlers = [...defaultHandlers, actualNameHandler];

module.exports = function plugin({ types: t }) {
  return {
    visitor: {
      Program: {
        exit(path, state) {
          injectReactDocgenInfo(path, state, this.file.code, t);
        },
      },
    },
  };
};

function injectReactDocgenInfo(path, state, code, t) {
  const program = path.scope.getProgramParent().path;
  let docgenResults = [];
  try {
    let resolver = ReactDocgen.resolver.findAllExportedComponentDefinitions;
    if (state.opts.resolver) {
      resolver = ReactDocgen.resolver[state.opts.resolver];
    }
    const additionalHandlers = (state.opts.additionalHandlers || [])
      .filter(handler => !!handler)
      .map(require.resolve)
      .map(require)
      .reduce(
        (acc, handler) =>
          Array.isArray(handler) ? acc.concat(handler) : acc.concat([handler]),
        [],
      );
    docgenResults = ReactDocgen.parse(
      code,
      resolver,
      handlers.concat(additionalHandlers),
    );
    if (state.opts.removeMethods) {
      docgenResults.forEach(result => {
        // eslint-disable-next-line no-param-reassign
        delete result.methods;
      });
    }
  } catch (e) {
    // this is for debugging the error only, do not ship this console log or else it pollutes the webpack output
    // console.log(e);
  }

  docgenResults.forEach(docgenResult => {
    const exportName = docgenResult.actualName;

    // If the result doesn't have an actualName,
    // it's probably on arrow functions.
    if (!exportName) {
      return;
    }

    const docNode = buildObjectExpression(docgenResult, t);
    const docgenInfo = t.expressionStatement(
      t.assignmentExpression(
        '=',
        t.memberExpression(
          t.identifier(exportName),
          t.identifier('__docgenInfo'),
        ),
        docNode,
      ),
    );
    program.pushContainer('body', docgenInfo);
  });
}

function buildObjectExpression(obj, t) {
  if (_.isPlainObject(obj)) {
    const children = [];
    for (const key in obj) {
      if (key !== 'actualName' && !(!(key in obj) || _.isUndefined(obj[key]))) {
        children.push(
          t.objectProperty(
            t.stringLiteral(key),
            buildObjectExpression(obj[key], t),
          ),
        );
      }
    }
    return t.objectExpression(children);
  }
  if (_.isString(obj)) {
    return t.stringLiteral(obj);
  }
  if (_.isBoolean(obj)) {
    return t.booleanLiteral(obj);
  }
  if (_.isNumber(obj)) {
    return t.numericLiteral(obj);
  }
  if (_.isArray(obj)) {
    const children = [];
    obj.forEach(val => {
      children.push(buildObjectExpression(val, t));
    });
    return t.ArrayExpression(children);
  }
  if (_.isNull(obj)) {
    return t.nullLiteral();
  }
  return null;
}
