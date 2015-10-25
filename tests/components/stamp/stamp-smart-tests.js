import assert from 'assert';
import Stamp from './stamp-smart';
import stampTypes from './stamp-types';
import ReactTester from '../../../src/index';

const tester = ReactTester.create().use(Stamp);
const NONE = tester.addFlavour('NONE', {});

describe('smart stamp should', () => {
  it('render a type of none by default', () => {
    const actual =
      NONE
        .component
        .props
        .type;

    const expected = stampTypes.NONE;

    assert.deepEqual(actual, expected);
  });

  it('pass the expected onClick function to the dumb component', () => {
    const isMapped =
      NONE
        .component
        .propFunc('onClick')
        .mapsTo('handleOnClick');

    assert(isMapped);
  });
});