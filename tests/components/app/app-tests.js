import assert from 'assert';
import App from './app';
import ReactTester from '../../../src/index';

const tester = ReactTester.use(App);
const flavours = {
  NONE: 1,
  WITH_SIGNATURE: 2,
  NO_SIGNATURE: 3
};
tester.addFlavour(flavours.NONE, {});
tester.addFlavour(flavours.WITH_SIGNATURE, {});
tester.addFlavour(flavours.NO_SIGNATURE, {});

describe('app should', () => {
  it('render as a div', () => {
    const actual =
      tester
        .flavours
        .get(flavours.NONE)
        .type;
    const expected = 'div';
    assert.deepEqual(actual, expected);
  });
});
