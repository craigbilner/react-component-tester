import stampit from 'stampit';
import _ from 'lodash';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

// FLAVOUR

// METHODS

const flavourInit = function ({instance}) {
  this.component = this.makeModel(instance);

  this.childMap =
    this.convertAndReduce(instance.props.children);

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

const makeModel = function ({type, props}) {
  return {
    type,
    style: props.style || {},
    props: _.omit(props, 'style', 'children', '_radiumDidResolveStyles')
  }
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
      childMap[id] = this.makeModel(child);

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
  makeModel,
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
  this.componentToUse = null;
  this.flavours = new Map();
};

// METHODS
const use = function (component) {
  this.componentToUse = component;
  return this;
};

const createFlavour = function ({type, props}) {
  return flavour({
    type,
    props
  });
};

const getShallowOutput = function (component, props) {
  const shallowRenderer = TestUtils.createRenderer();

  shallowRenderer
    .render(React.createElement(
      component,
      props
    ));

  return shallowRenderer.getRenderOutput();
};

const addFlavour = function (name, props) {
  this.flavours.set(
    name,
    this.createFlavour(this.getShallowOutput(this.componentToUse, props))
  );
};

const testerMethods = {
  use,
  getShallowOutput,
  createFlavour,
  addFlavour
};

// STAMP
const ReactTester =
  stampit()
    .init(testerInit)
    .methods(testerMethods);

export default ReactTester;
