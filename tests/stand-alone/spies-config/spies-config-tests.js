import assert from 'assert';
import SpiesConfig from './spies-config';
import ReactTester from '../../../src/index';

describe('spies config', () => {
  describe('should', () => {
    let tester;

    const shouldNeverBeSpied = (method) => {
      const componentMethod = tester.ComponentToUse.prototype[method];

      if (!componentMethod) return;

      const actual = componentMethod.isSinonProxy;
      const expected = undefined;

      assert.deepEqual(actual, expected, `${method} should never be spied`);
    };

    afterEach(() => {
      shouldNeverBeSpied('constructor');
      shouldNeverBeSpied('render');
      shouldNeverBeSpied('componentWillUnmount');

      tester.teardown();
    });

    it('add spies automatically by default', () => {
      tester = ReactTester.create().use(SpiesConfig);

      tester.addFlavour('CHOCOLATE', {});

      const actual = tester.ComponentToUse.prototype.spiedOn.isSinonProxy;
      const expected = true;

      assert.deepEqual(actual, expected);
    });

    it('allow explicitly disabling specific spies', () => {
      tester = ReactTester.create({
        spyOn: {
          spiedOn: false,
        },
      }).use(SpiesConfig);

      tester.addFlavour('CHOCOLATE', {});

      const actual = tester.ComponentToUse.prototype.spiedOn.isSinonProxy;
      const expected = undefined;

      assert.deepEqual(actual, expected);
    });

    it('allow disabling all spies', () => {
      tester = ReactTester.create({
        spyOnDefault: false,
      }).use(SpiesConfig);

      tester.addFlavour('CHOCOLATE', {});

      const actual = tester.ComponentToUse.prototype.spiedOn.isSinonProxy;
      const expected = undefined;

      assert.deepEqual(actual, expected);
    });

    it('allow explicitly enabling specific spies', () => {
      tester = ReactTester.create({
        spyOnDefault: false,
        spyOn: {
          spiedOn: true,
        },
      }).use(SpiesConfig);

      tester.addFlavour('CHOCOLATE', {});

      const actual = tester.ComponentToUse.prototype.spiedOn.isSinonProxy;
      const expected = true;

      assert.deepEqual(actual, expected);
    });
  });
});
