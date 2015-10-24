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
// tester.addFlavour(flavours.WITH_SIGNATURE, {});
// tester.addFlavour(flavours.NO_SIGNATURE, {});

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
});
