import assert from 'assert';
import SpiesConfig from './spies-config';
import ReactTester from '../../../src/index';

describe.only('spies config', () => {
  describe('should', () => {
    let tester;

    afterEach(() => {
      const actual = tester.ComponentToUse.prototype.constructor.isSinonProxy;
      const expected = undefined;
      assert.equal(actual, expected, 'constructor should never be spied');
    });

    afterEach(() => {
      const actual = tester.ComponentToUse.prototype.render.isSinonProxy;
      const expected = undefined;
      assert.equal(actual, expected, 'render should never be spied');
    });

    afterEach(() => {
      tester.teardown();
    });

    it('add spies automatically by default', () => {
      tester = ReactTester.create().use(SpiesConfig);
      tester.addFlavour('CHOCOLATE', {});
      const actual = tester.ComponentToUse.prototype.spiedOn.isSinonProxy;
      const expected = true;
      assert.equal(actual, expected);
    });

    it('allow explicitly disabling specific spies', () => {
      tester = ReactTester.create().use(SpiesConfig, { spyOn: { spiedOn: false } });
      tester.addFlavour('CHOCOLATE', {});
      const actual = tester.ComponentToUse.prototype.spiedOn.isSinonProxy;
      const expected = undefined;
      assert.equal(actual, expected);
    });

    it('allow disabling all spies', () => {
      tester = ReactTester.create().use(SpiesConfig, { spyOnDefault: false });
      tester.addFlavour('CHOCOLATE', {});
      const actual = tester.ComponentToUse.prototype.spiedOn.isSinonProxy;
      const expected = undefined;
      assert.equal(actual, expected);
    });

    it('allow explicitly enabling specific spies', () => {
      tester = ReactTester.create().use(SpiesConfig, { spyOnDefault: false, spyOn: { spiedOn: true } });
      tester.addFlavour('CHOCOLATE', {});
      const actual = tester.ComponentToUse.prototype.spiedOn.isSinonProxy;
      const expected = true;
      assert.equal(actual, expected);
    });
  });
});
