import assert from 'assert';
import Address from './address';
import AddressLine from '../address-line/address-line';
import ReactTester from '../../../src/index';

const tester = ReactTester.create().use(Address);
const flavours = {
  NO_ADDRESS: 1,
  THREE_LINES: 2,
  FIVE_LINES: 3
};
tester.addFlavour(flavours.NO_ADDRESS, {
  addressee: 'Mr Robert Smith'
});
tester.addFlavour(flavours.THREE_LINES, {
  addressee: 'Mr Joanne Robinson',
  address: ['line 31', 'line 32', 'line 33']
});
tester.addFlavour(flavours.FIVE_LINES, {
  addressee: 'Mrs Jack Jones',
  address: ['line 51', 'line 52', 'line 53', 'Line 54', 'Line 55']
});

describe('Address should', () => {
  it('render the addressee as the first line if there is no address', () => {
    const addressee =
      tester
        .flavours.get(flavours.NO_ADDRESS)
        .findComponents(AddressLine)[0];
    const actual = addressee.props.text;
    const expected = 'Mr Robert Smith';

    assert.deepEqual(actual, expected);
  });

  it('render the addressee as the first line if there is an address', () => {
    const addressee =
      tester
        .flavours.get(flavours.THREE_LINES)
        .findComponents(AddressLine)[0];
    const actual = addressee.props.text;
    const expected = 'Mr Joanne Robinson';

    assert.deepEqual(actual, expected);
  });

  it('render four address lines if there are three lines in the given address', () => {
    const actual =
      tester
        .flavours.get(flavours.THREE_LINES)
        .countComponents(AddressLine);
    const expected = 4;

    assert.deepEqual(actual, expected);
  });

  it('render six address lines if there are five lines in the given address', () => {
    const actual =
      tester
        .flavours.get(flavours.FIVE_LINES)
        .countComponents(AddressLine);
    const expected = 6;

    assert.deepEqual(actual, expected);
  });

  it('render the expected first line of the address if three lines are given', () => {
    const actual =
      tester
        .flavours.get(flavours.THREE_LINES)
        .findComponents(AddressLine)[1].props.text;
    const expected = 'line 31';

    assert.deepEqual(actual, expected);
  });
});
