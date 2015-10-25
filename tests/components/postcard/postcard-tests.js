import assert from 'assert';
import Postcard from './postcard';
import Welcome from '../welcome/welcome';
import Message from '../message/message';
import Signature from '../signature/signature';
import Stamp from '../stamp/stamp-smart';
import Address from '../address/address';
import ReactTester from '../../../src/index';

const tester = ReactTester.create().use(Postcard);
const STANDARD = tester.addFlavour('STANDARD', {
  comingFrom: 'some place',
  message: 'some message',
  signature: 'some signature',
  address: ['line 1', 'postcode'],
  addressee: 'some name',
});

describe('postcard should', () => {
  it('render a welcome component', () => {
    const actual = STANDARD.countComponents(Welcome);
    const expected = 1;

    assert.deepEqual(actual, expected);
  });

  it('give comingFrom to the welcome component', () => {
    const actual =
      STANDARD
        .findComponents(Welcome)[0]
        .props
        .text;
    const expected = 'some place';

    assert.deepEqual(actual, expected);
  });

  it('render a message component', () => {
    const actual = STANDARD.countComponents(Message);
    const expected = 1;

    assert.deepEqual(actual, expected);
  });

  it('give message to the message component', () => {
    const actual =
      STANDARD
        .findComponents(Message)[0]
        .props
        .text;
    const expected = 'some message';

    assert.deepEqual(actual, expected);
  });

  it('render a signature component', () => {
    const actual = STANDARD.countComponents(Signature);
    const expected = 1;

    assert.deepEqual(actual, expected);
  });

  it('give signature to the signature component', () => {
    const actual =
      STANDARD
        .findComponents(Signature)[0]
        .props
        .text;
    const expected = 'some signature';

    assert.deepEqual(actual, expected);
  });

  it('render a stamp component', () => {
    const actual = STANDARD.countComponents(Stamp);
    const expected = 1;

    assert.deepEqual(actual, expected);
  });

  it('render an address component', () => {
    const actual = STANDARD.countComponents(Address);
    const expected = 1;

    assert.deepEqual(actual, expected);
  });

  it('give addressee to the address component', () => {
    const actual =
      STANDARD
        .findComponents(Address)[0]
        .props
        .addressee;
    const expected = 'some name';

    assert.deepEqual(actual, expected);
  });

  it('give address to the address component', () => {
    const actual =
      STANDARD
        .findComponents(Address)[0]
        .props
        .address;
    const expected = ['line 1', 'postcode'];

    assert.deepEqual(actual, expected);
  });
});
