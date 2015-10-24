import assert from 'assert';
import Signature from './signature';
import ReactTester from '../../../src/index';

const tester = ReactTester.create().use(Signature);
const flavours = {
  NOTHING: 1,
  SOMETHING: 2
};
tester.addFlavour(flavours.NOTHING, {});
tester.addFlavour(flavours.SOMETHING, {
  text: 'Jack Johnson'
});

describe('signature should', () => {
  it('render nothing if no signature is given', () => {
    const value =
      tester
        .flavours
        .get(flavours.NOTHING)
        .findChild('0');
    const actual = typeof value;
    const expected = 'undefined';

    assert.deepEqual(actual, expected);
  });

  it('render the given text', () => {
    const actual =
      tester
        .flavours
        .get(flavours.SOMETHING)
        .findChild('0').value;
    const expected = 'Jack Johnson';

    assert.deepEqual(actual, expected);
  });
});
