import assert from 'assert';
import Postcard from './postcard';
import Welcome from '../welcome/welcome';
import Message from '../message/message';
import Signature from '../signature/signature';
import Stamp from '../stamp/stamp';
import Address from '../address/address';
import ReactTester from '../../../src/index';

const tester = ReactTester.create().use(Postcard);
const flavours = {
  STANDARD: 1
};
tester.addFlavour(flavours.STANDARD, {
  comingFrom: 'some place',
  message: 'some message',
  signature: 'some signature',
  address: ['line 1', 'postcode'],
  addressee: 'some name'
});

describe('postcard should', () => {
  it('render a welcome component', () => {
    const actual =
      tester
        .flavours
        .get(flavours.STANDARD)
        .countComponents(Welcome);
    const expected = 1;

    assert.deepEqual(actual, expected);
  });

  it('render a message component', () => {
    const actual =
      tester
        .flavours
        .get(flavours.STANDARD)
        .countComponents(Message);
    const expected = 1;

    assert.deepEqual(actual, expected);
  });

  it('render a signature component', () => {
    const actual =
      tester
        .flavours
        .get(flavours.STANDARD)
        .countComponents(Signature);
    const expected = 1;

    assert.deepEqual(actual, expected);
  });

  it('render a stamp component', () => {
    const actual =
      tester
        .flavours
        .get(flavours.STANDARD)
        .countComponents(Stamp);
    const expected = 1;

    assert.deepEqual(actual, expected);
  });

  it('render an address component', () => {
    const actual =
      tester
        .flavours
        .get(flavours.STANDARD)
        .countComponents(Address);
    const expected = 1;

    assert.deepEqual(actual, expected);
  });
});