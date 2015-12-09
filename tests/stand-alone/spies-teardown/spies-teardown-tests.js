import assert from 'assert';
import SpiesTeardown from './spies-teardown';
import ReactTester from '../../../src/index';

describe('spies teardown', () => {
  let tester;

  beforeEach(() => {
    tester = ReactTester
      .create()
      .use(SpiesTeardown);
  });

  describe('refresh spies each time should', () => {
    beforeEach(() => tester.addFlavour('LEMON', {}));

    it('allow normal spy behaviour on the first test pass', () => {
      const actual = tester.ComponentToUse.prototype.spiedOn.callCount;
      const expected = 1;

      assert.equal(actual, expected);
    });

    it('allow normal spy behaviour on the second test pass', () => {
      const actual = tester.ComponentToUse.prototype.spiedOn.callCount;
      const expected = 1;

      assert.equal(actual, expected);
    });
  });

  describe('should', () => {
    beforeEach(() => tester.addFlavour('CHOCOLATE', {}));

    it('add spies automatically', () => {
      const actual = tester.ComponentToUse.prototype.spiedOn.isSinonProxy;
      const expected = true;
      assert.equal(actual, expected);
    });

    it('allow them to be unwrapped', () => {
      tester.teardown();
      const actual = typeof tester.ComponentToUse.prototype.spiedOn.isSinonProxy;
      const expected = 'undefined';

      assert.equal(actual, expected);
    });
  });
});
