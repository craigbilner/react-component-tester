import assert from 'assert';
import AddressLine from './address-line';
import ReactTester from '../../../src/index';

const tester = ReactTester.create().use(AddressLine);
const flavours = {
  NOTHING: 1,
  SOMETHING: 2
};
tester.addFlavour(flavours.NOTHING, {});
tester.addFlavour(flavours.SOMETHING, {
  text: 'some line of the address'
});

describe('line should', () => {
  it('render nothing if no line is given', () => {
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
    const expected = 'some line of the address';

    assert.deepEqual(actual, expected);
  });
});
