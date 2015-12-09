const stampit = require('stampit');
const _ = require('lodash'); // eslint-disable-line id-length
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const sinon = require('sinon');

const defaultConfig = {
  spyOnDefault: true,
  spyOn: {
    constructor: false,
    componentWillUnmount: false,
    render: false,
  },
};

// FLAVOUR COMPONENT

// METHODS

const propFunc = function(propToTest) {
  this.propToTest = propToTest;
  return this;
};

const mapsTo = function(method) {
  const symbolToTest = Symbol(method);
  this.props[this.propToTest](symbolToTest);
  const reactClass = this.reactClass || this.parentComponent.reactClass;

  return reactClass.prototype[method].lastCall.args.indexOf(symbolToTest) > -1;
};

const flavourComponentMethods = {
  propFunc,
  mapsTo,
};

const flavourComponentInit = function(opts) {
  if (opts.instance.props) {
    this.style = opts.instance.props.style;

    if (!TestUtils.isElement(opts.instance.props.children)) {
      this.value = opts.instance.props.children;
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
  function(parentComponent, parentIndx, childMap, child, indx) {
    const childIsElement = TestUtils.isElement(child);
    const id = parseInt(parentIndx, 10) >= 0 ? parentIndx + '.' + indx : indx;

    if (childIsElement) {
      childMap[id] = flavourComponent(_.assign({}, child, {parentComponent}));

      _.assign(
        childMap,
        convertAndReduce(
          parentComponent,
          child.props.children,
          id
        )
      );
    } else {
      childMap[id] = {
        value: child,
      };
    }

    return childMap;
  };
/* eslint-enable no-use-before-define */

const convertAndReduce = function(parentComponent, children, parentIndx) {
  return React
    .Children
    .toArray(children)
    .reduce(
      reduceChildren.bind(null, parentComponent, parentIndx),
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
  this.component = flavourComponent(_.assign({}, output, {reactClass: opts.instance.reactClass}));

  if (output) {
    this.type = output.type;
    this.childMap = convertAndReduce(this.component, output.props.children);
  } else {
    this.type = output;
    this.childMap = [];
  }

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
const testerInit = function(opts) {
  this.ComponentToUse = null;
  this.config = opts.instance;
};

// METHODS
const restoreSpy = function(method) {
  if (method.isSinonProxy) {
    method.restore();
  }
};

const use = function(Component) {
  const options = _.merge(defaultConfig, this.config);

  Object.getOwnPropertyNames(Component.prototype).forEach(method => {
    if (options.spyOn[method] === false) return;

    if (options.spyOnDefault || options.spyOn[method]) {
      restoreSpy(Component.prototype[method]);
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

const teardown = function() {
  const proto = this.ComponentToUse.prototype;

  Object.getOwnPropertyNames(proto).forEach(method => {
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
