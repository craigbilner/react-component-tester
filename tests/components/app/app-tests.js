import assert from 'assert';
import App from './app';
import Postcard from '../postcard/postcard';
import ReactTester from '../../../src/index';

const tester = ReactTester.use(App);
const flavours = {
  NONE: 1,
  WITH_SIGNATURE: 2,
  NO_SIGNATURE: 3
};
tester.addFlavour(flavours.NONE, {
  comingFrom: 'Some random place',
  message: 'Some random message',
  signature: 'Joe Bloggs',
  addressee: 'Mrs Random Person',
  address: ['line 1', 'line 2']
});
tester.addFlavour(flavours.WITH_SIGNATURE, {
  comingFrom: 'Some random place',
  message: 'Some random message',
  signature: 'Joe Bloggs',
  addressee: 'Mrs Random Person',
  address: ['line 1', 'line 2']
});
tester.addFlavour(flavours.NO_SIGNATURE, {
  comingFrom: 'Some random place',
  message: 'Some random message',
  addressee: 'Mrs Random Person',
  address: ['line 1', 'line 2']
});

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

  it('display as a flex row', () => {
    const actual =
      tester
        .flavours
        .get(flavours.NONE)
        .style;
    const expected = {
      display: 'flex',
      flexFlow: 'row'
    };

    assert.deepEqual(actual, expected);
  });

  it('have a right gutter', () => {
    const rightGutter =
      tester
        .flavours
        .get(flavours.NONE)
        .findChild('2');
    const actual = rightGutter.style;
    const expected = {
      flex: 0,
      '@media (min-width: 400px)': {
        flex: 1
      }
    };

    assert.deepEqual(actual, expected);
  });

  it('render a Postcard component', () => {
    const actual =
      tester
        .flavours
        .get(flavours.NONE)
        .countComponents(Postcard);
    const expected = 1;

    assert.deepEqual(actual, expected);
  });

  it('render the Postcard component with the given signature', () => {
    const actual =
      tester
        .flavours
        .get(flavours.WITH_SIGNATURE)
        .findComponents(Postcard)[0]
        .props
        .signature;
    const expected = 'Joe Bloggs';

    assert.deepEqual(actual, expected);
  });

  it('render the Postcard component with no signature if one is not given', () => {
    const signature =
      tester
        .flavours
        .get(flavours.NO_SIGNATURE)
        .findComponents(Postcard)[0]
        .props
        .signature;
    const actual = typeof signature;
    const expected = 'undefined';

    assert.deepEqual(actual, expected);
  });
});
