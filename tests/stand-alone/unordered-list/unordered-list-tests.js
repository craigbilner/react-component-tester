import assert from 'assert';
import UnorderedList from './unordered-list';
import ReactTester from '../../../src/index';

const tester = ReactTester.create().use(UnorderedList);
const i18n = {
  help: 'test help',
  something: 'test something',
};
const NO_LINKS = tester.addFlavour('NO_LINKS', {
  i18n,
  links: [],
});

describe('unordered list should', () => {
  it('render the first anchor with the expected title with no dynamic links', () => {
    const actual = NO_LINKS.findChild('0.0').props.title;
    const expected = 'test help';

    assert.deepEqual(actual, expected);
  });

  it('render the first anchor with the expected value with no dynamic links', () => {
    const actual = NO_LINKS.findChild('0.0').value;
    const expected = 'test help';

    assert.deepEqual(actual, expected);
  });
});
