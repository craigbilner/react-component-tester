import assert from 'assert';
import LinkListComponent from './link-list';
import Link from './link';
import ReactTester from '../../../src/index';

describe('the LinkListComponent should', () => {
  const tester = ReactTester.create().use(LinkListComponent);
  const THREE_LINKS = tester.addFlavour('THREE_LINKS', {
    links: [
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

  it('render three links if given an array of three items', () => {
    const actual = THREE_LINKS.countComponents(Link);
    const expected = 3;

    assert.deepEqual(actual, expected);
  });

  it('contain no div elements', () => {
    const actual = THREE_LINKS.findComponents('div');
    const expected = [];

    assert.deepEqual(actual, expected);
  });

  it('hook up the expected click handler to the first link', () => {
    const firstLink = THREE_LINKS.findComponents('li')[0];

    const isMapped = firstLink
      .propFunc('onClick')
      .mapsTo('handleLink1Click');

    assert(isMapped);
  });

  it('hook up the expected click handler to the second link', () => {
    const secondLink = THREE_LINKS.findComponents('li')[1];

    const isMapped = secondLink
      .propFunc('onClick')
      .mapsTo('handleLink2Click');

    assert(isMapped);
  });

  it('hook up the expected click handler to the third link', () => {
    const thirdLink = THREE_LINKS.findComponents('li')[2];

    const isMapped = thirdLink
      .propFunc('onClick')
      .mapsTo('handleLink3Click');

    assert(isMapped);
  });
});
