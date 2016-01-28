import assert from 'assert';
import OnChangeComponent from './on-change';
import ReactTester from '../../../src/index';

const tester = ReactTester.create().use(OnChangeComponent);
const MAP_TEST = tester.addFlavour('MAP_TEST', {});

describe('the OnChangeComponent should', () => {
  it('map the onChange method to the inputs onChange provided test arguments', () => {
    const actual =
      MAP_TEST
        .component
        .propFunc('onChange')
        .withArgs({
          target: {
            name: 'test name',
            value: 'test value',
          },
        })
        .mapsTo('onChange');
    const expected = true;

    assert.deepEqual(actual, expected);
  });
});
