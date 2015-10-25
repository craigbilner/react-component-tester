import assert from 'assert';
import Stamp from './stamp-smart';
import stampTypes from './stamp-types';
import ReactTester from '../../../src/index';

const tester = ReactTester.create().use(Stamp);
const NONE = tester.addFlavour('NONE', {});
const SECOND_CLASS = tester.addFlavour('SECOND_CLASS', {
  state: {
    type: stampTypes.SECOND_CLASS,
  },
});

describe('smart stamp should', () => {
  afterEach(() => {
    NONE.resetState();
  });

  it('render a type of none by default', () => {
    const actual =
      NONE
        .component
        .props
        .type;

    const expected = stampTypes.NONE;

    assert.deepEqual(actual, expected);
  });

  it('pass the stamp type from state to the stamp', () => {
    const actual =
      SECOND_CLASS
        .component
        .props
        .type;
    const expected = stampTypes.SECOND_CLASS;

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

  it('set the stamp to first class on the first click', () => {
    NONE.component.props.onClick();

    const actual = NONE.getState().type;
    const expected = stampTypes.FIRST_CLASS;

    assert.deepEqual(actual, expected);
  });

  it('set the stamp to second class on the second click', () => {
    NONE.component.props.onClick();
    NONE.component.props.onClick();

    const actual = NONE.getState().type;
    const expected = stampTypes.SECOND_CLASS;

    assert.deepEqual(actual, expected);
  });

  it('set the stamp to none on the third click', () => {
    NONE.component.props.onClick();
    NONE.component.props.onClick();
    NONE.component.props.onClick();

    const actual = NONE.getState().type;
    const expected = stampTypes.NONE;

    assert.deepEqual(actual, expected);
  });
});
