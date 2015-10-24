import assert from 'assert';
import Welcome from './welcome';
import ReactTester from '../../../src/index';

const tester = ReactTester.create().use(Welcome);
const flavours = {
  NOTHING: 1,
  SOMETHING: 2
};
tester.addFlavour(flavours.NOTHING, {});
tester.addFlavour(flavours.SOMETHING, {
  text: 'Welcome from this place'
});

describe('welcome should', () => {
  it('render nothing if no welcome is given', () => {
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
    const expected = 'Welcome from this place';

    assert.deepEqual(actual, expected);
  });
});
