import assert from 'assert';
import Stamp from './stamp-smart';
import stampTypes from './stamp-types';
import ReactTester from '../../../src/index';

const tester = ReactTester.create().use(Stamp);
const flavours = {
  NONE: 1
};
tester.addFlavour(flavours.NONE, {});

describe('smart stamp should', () => {
  it('render a type of none by default', () => {
    const actual =
      tester
        .flavours
        .get(flavours.NONE)
        .component
        .props
        .type;

    const expected = stampTypes.NONE;

    assert.deepEqual(actual, expected);
  });
});