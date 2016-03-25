import assert from 'assert';
import SomeErrorComponent from './some-error';
import ReactTester from '../../../../src/index';

describe('the SomeErrorComponent should', () => {
  it('result in the expected error thrown', () => {
    const errorFunc = () => {
      const tester = ReactTester.create().use(SomeErrorComponent);
      tester.addFlavour('THROW_ERROR', {});
    };

    assert.throws(errorFunc, /something went wrong/);
  });
});
