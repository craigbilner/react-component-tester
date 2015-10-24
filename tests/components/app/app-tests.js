import assert from 'assert';
import App from './app';
import ReactTester from '../../../src/index';

const tester = ReactTester.init(App);

describe('app should', () => {
  it('be a radium component for responsiveness', () => {
    console.log(tester.component);
  });
});
