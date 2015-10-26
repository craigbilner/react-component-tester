const stampit = require('stampit');
const _ = require('lodash'); // eslint-disable-line id-length
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const sinon = require('sinon');

// FLAVOUR COMPONENT

// METHODS

const propFunc = function(propToTest) {
  this.propToTest = propToTest;
  return this;
};

const mapsTo = function(method) {
  const symbolToTest = Symbol(method);
  this.props[this.propToTest](symbolToTest);

  return ~this.reactClass.prototype[method].lastCall.args.indexOf(symbolToTest) >> 0;
};

const flavourComponentMethods = {
  propFunc,
  mapsTo,
};

const flavourComponentInit = function(opts) {
  this.style = opts.instance.props.style;
};

const flavourComponent = stampit()
    .init(flavourComponentInit)
    .methods(flavourComponentMethods);

// FLAVOUR

// METHODS

/* eslint-disable no-use-before-define */
const reduceChildren =
    function(parentIndx, childMap, child, indx) {
      const childIsElement = TestUtils.isElement(child);

      if (childIsElement) {
        const id = parentIndx >= 0 ? parentIndx + '.' + indx : indx;
        childMap[id] = flavourComponent(child);

        _.assign(
            childMap,
            convertAndReduce(
                child.props.children,
                id
            )
        );
      } else {
        childMap[indx] = {
          value: child,
        };
      }

      return childMap;
    };
/* eslint-enable no-use-before-define */

const convertAndReduce = function(children, parentIndx) {
  return React
      .Children
      .toArray(children)
      .reduce(
      reduceChildren.bind(this, parentIndx),
      {}
  );
};

const reduceTypes = function(childMap, typeMap, key) {
  const components = (typeMap.get(childMap[key].type) || []).slice(0);
  components.push(childMap[key]);

  typeMap.set(childMap[key].type, components);

  return typeMap;
};

const flavourInit = function(opts) {
  const output = opts.instance.shallowRenderer.getRenderOutput();

  this.initialState = _.assign({}, opts.instance.shallowRenderer._instance._instance.state);
  this.state = _.assign({}, this.initialState);
  this.type = output.type;
  this.component = flavourComponent(_.assign({}, output, {reactClass: opts.instance.reactClass}));

  this.childMap =
      convertAndReduce(output.props.children);

  this.typeMap =
      Object
          .keys(this.childMap)
          .reduce(
          reduceTypes.bind(null, this.childMap),
          new Map()
      );

  // console.log('childMap', this.childMap);
  // console.log('typeMap', this.typeMap);
};

const resetState = function() {
  this.shallowRenderer._instance._instance.state = _.assign({}, this.initialState);
};

const getState = function() {
  return this.shallowRenderer._instance._instance.state;
};

const findChild = function(path) {
  return this.childMap[path];
};

const findComponents = function(component) {
  return this.typeMap.get(component) || [];
};

const countComponents = function(component) {
  return this.findComponents(component).length;
};

const flavourMethods = {
  getState,
  resetState,
  findChild,
  findComponents,
  countComponents,
};

const flavour = stampit()
    .init(flavourInit)
    .methods(flavourMethods);

// TESTER

// INIT
const testerInit = function() {
  this.ComponentToUse = null;
};

// METHODS
const use = function(Component) {
  const ignore = ['constructor', 'componentWillUnmount', 'render'];
  Object.getOwnPropertyNames(Component.prototype).forEach(method => {
    if (!~ignore.indexOf(method)) {
      sinon.spy(Component.prototype, method);
    }
  });
  this.ComponentToUse = Component;
  return this;
};

const createFlavour = function(name, reactClass, shallowRenderer) {
  return flavour({
    name,
    reactClass,
    shallowRenderer,
  });
};

const getShallowRenderer = function(component, props) {
  const shallowRenderer = TestUtils.createRenderer();

  shallowRenderer
      .render(React.createElement(
          component,
          props
      ));

  return shallowRenderer;
};

const addFlavour = function(name, props) {
  return createFlavour(
      name,
      this.ComponentToUse,
      getShallowRenderer(this.ComponentToUse, props)
  );
};

const testerMethods = {
  use,
  addFlavour,
};

// STAMP
const ReactTester =
    stampit()
        .init(testerInit)
        .methods(testerMethods);

module.exports = ReactTester;