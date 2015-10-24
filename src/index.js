import stampit from 'stampit';
import _ from 'lodash';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

// FLAVOUR

// METHODS

const flavourInit = function ({instance}) {
  this.childMap =
    this.convertAndReduce(instance.children);
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
        const id = parentIndx ? parentIndx + '.' + indx : indx;
        childMap[id] = {
          type: child.type,
          style: child.props.style
        };

        if (TestUtils.isElement(child.props.children)) {
          _.assign(
            childMap,
            this.convertAndReduce(
              child.props.children,
              id
            )
          );
        } else if (child.props.children) {
          const soloId = id + '.0';
          childMap[soloId] = {
            value: child.props.children
          };
        }
      }
      else {
        childMap[indx] = {
          value: child
        };
      }

      return childMap;
    }
  ;

const findChild = function (path) {
  return this.childMap[path];
};

const flavourMethods = {
  convertAndReduce,
  reduceChildren,
  findChild
};

const flavour = stampit()
  .init(flavourInit)
  .methods(flavourMethods);

// TESTER

// INIT
const testerInit = function () {
  this.component = null;
  this.flavours = new Map();
};

// METHODS
const use = function (component) {
  this.component = component;
  return this;
};

const createFlavour = function ({type, props}) {
  return flavour({
    type,
    style: props.style,
    children: props.children
  });
};

const addFlavour = function (name, props) {
  const shallowRenderer = TestUtils.createRenderer();

  shallowRenderer
    .render(React.createElement(
      this.component,
      props
    ));

  this.flavours.set(
    name,
    this.createFlavour(shallowRenderer.getRenderOutput())
  );
};

const testerMethods = {
  use,
  createFlavour,
  addFlavour
};

// STAMP
const ReactTester =
  stampit()
    .init(testerInit)
    .methods(testerMethods);

export default ReactTester.create();
