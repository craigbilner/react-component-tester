import assert from 'assert';
import App from './app';
import Postcard from '../postcard/postcard';
import ReactTester from '../../../src/index';

const tester = ReactTester.create().use(App);
const NONE = tester.addFlavour('NONE', {
  comingFrom: 'Some random place',
  message: 'Some random message',
  signature: 'Joe Bloggs',
  addressee: 'Mrs Random Person',
  address: ['line 1', 'line 2'],
});
const WITH_SIGNATURE = tester.addFlavour('WITH_SIGNATURE', {
  comingFrom: 'Some random place',
  message: 'Some random message',
  signature: 'Joe Bloggs',
  addressee: 'Mrs Random Person',
  address: ['line 1', 'line 2'],
});
const NO_SIGNATURE = tester.addFlavour('NO_SIGNATURE', {
  comingFrom: 'Some random place',
  message: 'Some random message',
  addressee: 'Mrs Random Person',
  address: ['line 1', 'line 2'],
});

describe('app should', () => {
  it('render as a div', () => {
    const actual = NONE.type;
    const expected = 'div';

    assert.deepEqual(actual, expected);
  });

  it('display as a flex row', () => {
    const actual = NONE.component.style;
    const expected = {
      display: 'flex',
      flexFlow: 'row',
    };

    assert.deepEqual(actual, expected);
  });

  it('have a right gutter', () => {
    const rightGutter = NONE.findChild('2');
    const actual = rightGutter.style;
    const expected = {
      flex: 0,
      '@media (min-width: 400px)': {
        flex: 1,
      },
    };

    assert.deepEqual(actual, expected);
  });

  it('render a Postcard component', () => {
    const actual = NONE.countComponents(Postcard);
    const expected = 1;

    assert.deepEqual(actual, expected);
  });

  it('render the Postcard component in the expected position', () => {
    const actual = NONE.findChild('1.0.0').type;
    const expected = Postcard;

    assert.deepEqual(actual, expected);
  });

  it('render the Postcard component with the given signature', () => {
    const actual =
      WITH_SIGNATURE
        .findComponents(Postcard)[0]
        .props
        .signature;
    const expected = 'Joe Bloggs';

    assert.deepEqual(actual, expected);
  });

  it('render the Postcard component with no signature if one is not given', () => {
    const signature =
      NO_SIGNATURE
        .findComponents(Postcard)[0]
        .props
        .signature;
    const actual = typeof signature;
    const expected = 'undefined';

    assert.deepEqual(actual, expected);
  });
});
