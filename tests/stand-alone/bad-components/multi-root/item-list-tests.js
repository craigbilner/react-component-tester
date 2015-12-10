import assert from 'assert';
import ItemListComponent from './item-list';
import ReactTester from '../../../../src/index';

describe('the ItemListComponent should', () => {
  it('result in the expected error thrown', () => {
    const errorFunc = () => {
      const tester = ReactTester.create().use(ItemListComponent);
      tester.addFlavour('THROW_ERROR', {
        items: [
          {
            text: 'one',
          },
          {
            text: 'two',
          },
          {
            text: 'two',
          },
        ],
      });
    };

    assert.throws(errorFunc, /a react component must return one root element/);
  });
});
