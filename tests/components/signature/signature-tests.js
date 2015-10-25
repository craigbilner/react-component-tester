import assert from 'assert';
import Signature from './signature';
import ReactTester from '../../../src/index';

const tester = ReactTester.create().use(Signature);
const NOTHING = tester.addFlavour('NOTHING', {});
const SOMETHING = tester.addFlavour('SOMETHING', {
  text: 'Jack Johnson',
});

describe('signature should', () => {
  it('render nothing if no signature is given', () => {
    const value = NOTHING.findChild('0');
    const actual = typeof value;
    const expected = 'undefined';

    assert.deepEqual(actual, expected);
  });

  it('render the given text', () => {
    const actual = SOMETHING.findChild('0').value;
    const expected = 'Jack Johnson';

    assert.deepEqual(actual, expected);
  });
});
