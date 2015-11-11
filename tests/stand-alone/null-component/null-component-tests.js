import assert from 'assert';
import NullComponent from './null-component';
import ReactTester from '../../../src/index';

const tester = ReactTester.create().use(NullComponent);
const antipattern = tester.addFlavour('NULL', {});

describe('null component should', () => {
  it('return a test component of type null', () => {
    assert.deepEqual(antipattern.type, null);
  });
});
