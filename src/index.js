const stampit = require('stampit');
const _ = require('lodash'); // eslint-disable-line id-length
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const sinon = require('sinon');

const defaultConfig = {
  spyOnDefault: true,
  spyOn: {},
};

const doNotSpyOn = {
  constructor: false,
  componentWillUnmount: false,
  render: false,
  getChildContext: false,
  getNextStampType: false,
};

// FLAVOUR COMPONENT

// METHODS

const propFunc = function (propToTest) {
  this.propToTest = propToTest;
  return this;
};

const withArgs = function () {
  this.mapTestArgs = [].slice.call(arguments);
  return this;
};

const mapsTo = function (method) {
  const symbolToTest = Symbol(method);

  this.reactClass.prototype[method].reset();
  this.props[this.propToTest].apply(this.reactClass, this.mapTestArgs.concat(symbolToTest));

  return this.reactClass.prototype[method].lastCall.args.indexOf(symbolToTest) > -1;
};

const flavourComponentMethods = {
  propFunc,
  withArgs,
  mapsTo,
};

const flavourComponentInit = function (opts) {
  Object.assign(this, opts);

  this.mapTestArgs = [];

  if (opts.props) {
    this.style = opts.props.style;

    if (!TestUtils.isElement(opts.props.children)) {
      this.value = opts.props.children;
    }
  }
};

const flavourComponent = stampit()
  .init(flavourComponentInit)
  .methods(flavourComponentMethods);

// FLAVOUR

// METHODS

/* eslint-disable no-use-before-define */
const reduceChildren =
  function (parentComponent, reactClass, parentIndx, childMap, child, indx) {
    const thisMap = _.assign({}, childMap);
    const childIsElement = TestUtils.isElement(child);
    const id = parseInt(parentIndx, 10) >= 0 ? `${parentIndx}.${indx}` : indx;

    if (childIsElement) {
      thisMap[id] = flavourComponent(_.assign(
        {},
        child,
        {
          parentComponent,
          reactClass,
        }));

      _.assign(
        thisMap,
        convertAndReduce(
          parentComponent,
          reactClass,
          child.props.children,
          id));
    } else {
      thisMap[id] = {
        value: child,
      };
    }

    return thisMap;
  };
/* eslint-enable no-use-before-define */

const convertAndReduce = function (parentComponent, reactClass, children, parentIndx) {
  return React
    .Children
    .toArray(children)
    .reduce(
      reduceChildren.bind(null, parentComponent, reactClass, parentIndx),
      {});
};

const reduceTypes = function (childMap, typeMap, key) {
  const components = (typeMap.get(childMap[key].type) || []).slice(0);
  components.push(childMap[key]);

  typeMap.set(childMap[key].type, components);

  return typeMap;
};

const flavourInit = function (opts) {
  Object.assign(this, opts);

  const output = opts.shallowRenderer.getRenderOutput();

  this.initialState = _.assign({}, opts.shallowRenderer._instance._instance.state);
  this.state = _.assign({}, this.initialState);
  this.component = flavourComponent(_.assign(
    {},
    output,
    {
      reactClass: opts.reactClass,
    }));

  if (output) {
    this.type = output.type;
    this.childMap = convertAndReduce(
      this.component,
      opts.reactClass,
      output.props.children);
  } else {
    this.type = output;
    this.childMap = [];
  }

  this.typeMap =
    Object
      .keys(this.childMap)
      .reduce(
        reduceTypes.bind(null, this.childMap),
        new Map());

  // console.log('childMap', this.childMap);
  // console.log('typeMap', this.typeMap);
};

const resetState = function () {
  this.shallowRenderer._instance._instance.state = _.assign({}, this.initialState);
};

const getState = function () {
  return this.shallowRenderer._instance._instance.state;
};

const findChild = function (path) {
  return this.childMap[path];
};

const findComponents = function (component) {
  return this.typeMap.get(component) || [];
};

const countComponents = function (component) {
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
const testerInit = function (opts) {
  Object.assign(this, opts);

  this.ComponentToUse = null;

  this.config = {
    spyOnDefault: opts.spyOnDefault,
    spyOn: opts.spyOn,
  };
};

// METHODS
const restoreSpy = function (method) {
  if (method.isSinonProxy) {
    method.restore();
  }
};

const use = function (Component) {
  const options = _.merge(
    {},
    defaultConfig,
    this.config,
    {
      spyOn: doNotSpyOn,
    });

  Object.getOwnPropertyNames(Component.prototype).forEach((method) => {
    if (options.spyOn[method] === false) return;

    if (options.spyOnDefault || options.spyOn[method]) {
      restoreSpy(Component.prototype[method]);
      sinon.spy(Component.prototype, method);
    }
  });

  this.ComponentToUse = Component;

  return this;
};

const createFlavour = function (name, reactClass, shallowRenderer) {
  return flavour({
    name,
    reactClass,
    shallowRenderer,
  });
};

const getShallowRenderer = function (component, props) {
  const shallowRenderer = TestUtils.createRenderer();
  const context = {};

  const componentWithProps = React.createElement(component, props);

  if (componentWithProps.type.contextTypes && componentWithProps.type.contextTypes._radiumConfig) {
    context._radiumConfig = function () {
    };
    context._radiumConfig.plugins = [];

    componentWithProps.type.contextTypes._radiumConfig = context._radiumConfig;
  }

  shallowRenderer
    .render(componentWithProps, context);

  return shallowRenderer;
};

const addFlavour = function (name, props) {
  return createFlavour(
    name,
    this.ComponentToUse,
    getShallowRenderer(this.ComponentToUse, props));
};

const teardown = function () {
  const proto = this.ComponentToUse.prototype;

  Object.getOwnPropertyNames(proto).forEach((method) => {
    restoreSpy(proto[method]);
  });

  return this;
};

const testerMethods = {
  use,
  addFlavour,
  teardown,
};

// STAMP
const ReactTester =
  stampit()
    .init(testerInit)
    .methods(testerMethods);

module.exports = ReactTester;
