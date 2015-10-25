import stampit from 'stampit';
import _ from 'lodash';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';

// FLAVOUR COMPONENT

// METHODS

const propFunc = function (propToTest) {
  this.propToTest = propToTest;
  return this;
};

const mapsTo = function (method) {
  const symbolToTest = Symbol(method);
  this.props[this.propToTest](symbolToTest);

  return this.reactClass.prototype[method].calledWith(symbolToTest);
};

const flavourComponentMethods = {
  propFunc,
  mapsTo
};

const flavourComponentInit = function ({instance}) {
  this.style = instance.props.style;
};

const flavourComponent = stampit()
  .init(flavourComponentInit)
  .methods(flavourComponentMethods);

// FLAVOUR

// METHODS

const flavourInit = function ({instance}) {
  const output = instance.shallowRenderer.getRenderOutput();

  this.initialState = _.assign({}, instance.shallowRenderer._instance._instance.state);
  this.state = _.assign({}, this.initialState);
  this.type = output.type;
  this.component = flavourComponent(_.assign({}, output, {reactClass: instance.reactClass}));

  this.childMap =
    this.convertAndReduce(output.props.children);

  this.typeMap =
    Object
      .keys(this.childMap)
      .reduce(
      this.reduceTypes.bind(null, this.childMap),
      new Map()
    );

  // console.log('childMap', this.childMap);
  // console.log('typeMap', this.typeMap);
};

const resetState = function () {
  this.shallowRenderer._instance._instance.state = _.assign({}, this.initialState);
};

const getState = function () {
  return this.shallowRenderer._instance._instance.state;
};

const convertAndReduce = function (children, parentIndx) {
  return React
    .Children
    .toArray(children)
    .reduce(
    this.reduceChildren.bind(this, parentIndx),
    {}
  );
};

const reduceChildren =
  function (parentIndx, childMap, child, indx) {
    const childIsElement = TestUtils.isElement(child);

    if (childIsElement) {
      const id = parentIndx >= 0 ? parentIndx + '.' + indx : indx;
      childMap[id] = flavourComponent(child);

      _.assign(
        childMap,
        this.convertAndReduce(
          child.props.children,
          id
        )
      );
    }
    else {
      childMap[indx] = {
        value: child
      };
    }

    return childMap;
  };

const reduceTypes = function (childMap, typeMap, key) {
  const components =
    [...(typeMap.get(childMap[key].type) || []).slice(0), childMap[key]];

  typeMap.set(childMap[key].type, components);

  return typeMap;
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
  convertAndReduce,
  reduceChildren,
  reduceTypes,
  findChild,
  findComponents,
  countComponents
};

const flavour = stampit()
  .init(flavourInit)
  .methods(flavourMethods);

// TESTER

// INIT
const testerInit = function () {
  this.ComponentToUse = null;
};

// METHODS
const use = function (Component) {
  const ignore = ['constructor', 'componentWillUnmount', 'render'];
  for (let key of Object.getOwnPropertyNames(Component.prototype)) {
    if (!~ignore.indexOf(key)) {
      sinon.spy(Component.prototype, key);
    }
  }
  this.ComponentToUse = Component;
  return this;
};

const createFlavour = function (name, reactClass, shallowRenderer) {
  return flavour({
    name,
    reactClass,
    shallowRenderer
  });
};

const getShallowRenderer = function (component, props) {
  const shallowRenderer = TestUtils.createRenderer();

  shallowRenderer
    .render(React.createElement(
      component,
      props
    ));

  return shallowRenderer;
};

const addFlavour = function (name, props) {
  return this.createFlavour(
    name,
    this.ComponentToUse,
    this.getShallowRenderer(this.ComponentToUse, props)
  );
};

const testerMethods = {
  use,
  getShallowRenderer,
  createFlavour,
  addFlavour
};

// STAMP
const ReactTester =
  stampit()
    .init(testerInit)
    .methods(testerMethods);

export default ReactTester;
