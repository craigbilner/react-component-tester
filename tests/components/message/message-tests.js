import assert from 'assert';
import Message from './message';
import ReactTester from '../../../src/index';

const tester = ReactTester.create().use(Message);
const flavours = {
  NOTHING: 1,
  SOMETHING: 2
};
tester.addFlavour(flavours.NOTHING, {});
tester.addFlavour(flavours.SOMETHING, {
  text: 'some text here'
});

describe('message should', () => {
  it('render nothing if no message is given', () => {
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
    const expected = 'some text here';

    assert.deepEqual(actual, expected);
  });
});
