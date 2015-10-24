import stampit from 'stampit';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

// INIT
const init = function () {
  this.component = null;
  this.flavours = new Map();
};

// METHODS
const use = function (component) {
  this.component = component;
  return this;
};

const addFlavour = function (name, flavour) {
  const shallowRenderer = TestUtils.createRenderer();

  shallowRenderer
    .render(React.createElement(
      this.component,
      flavour
    ));

  const {
    type,
    props
    } = shallowRenderer.getRenderOutput();

  this.flavours.set(
    name,
    {
      type,
      style: props.style
    }
  );
};

const methods = {
  use,
  addFlavour
};

// STAMP
const ReactTester =
  stampit()
    .init(init)
    .methods(methods);

export default ReactTester.create();
