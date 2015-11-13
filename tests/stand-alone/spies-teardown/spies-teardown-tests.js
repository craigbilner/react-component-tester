import assert from 'assert';
import SpiesTeardown from './spies-teardown';
import ReactTester from '../../../src/index';

describe('spies teardown', () => {
  let component;

  beforeEach(() => {
    component = ReactTester
      .create()
      .use(SpiesTeardown);
  });

  describe('refreshes spies each time', () => {
    beforeEach(() => {
      component
        .addFlavour('lemon', {});
    });

    it('is called once the first time I check', () => {
      const callcount = component.ComponentToUse.prototype.spiedOn.callCount;

      assert(callcount, 1);
    });

    it('is called once the second time I check', () => {
      const callcount = component.ComponentToUse.prototype.spiedOn.callCount;

      assert(callcount, 1);
    });
  });

  describe('allows me to tear down when I want to', () => {
    beforeEach(() => {
      component
        .addFlavour('chocolate', {});
    });

    it('spies automatically', () => {
      const isSpy = component.ComponentToUse.prototype.spiedOn.isSinonProxy;

      assert(isSpy, true);
    });

    it('can be unwrapped', () => {
      component.teardown();
      const isSpy = typeof component.ComponentToUse.prototype.spiedOn.isSinonProxy;

      assert(isSpy, 'undefined');
    });
  });
});
