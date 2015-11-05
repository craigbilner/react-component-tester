import assert from 'assert';
import Stamp from './stamp-dumb';
import types from './stamp-types';
import ReactTester from '../../../src/index';

const tester = ReactTester.create().use(Stamp);
const NONE = tester.addFlavour('NONE', {
  types,
  type: types.NONE,
});

describe('dumb stamp should', () => {
  it('render the place stamp here text if the type is none', () => {
    const actual = NONE.findChild('0').value;
    const expected = 'Place stamp here';

    assert.deepEqual(actual, expected);
  });
});
