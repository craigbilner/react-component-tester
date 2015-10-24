import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const comingFrom = 'Welcome from some sort of React holiday';
const message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo venenatis tortor, ' +
  'in viverra libero ullamcorper quis. Nam blandit volutpat ante sit amet sagittis. Cras ultrices augue sem, ' +
  'id congue felis efficitur a. Mauris luctus, nisl eu dignissim molestie, sem libero fringilla ex, ' +
  'id faucibus ligula justo et nibh. Donec posuere rhoncus leo eget fringilla. Nulla ex arcu, ' +
  'gravida nec malesuada sit amet, faucibus ut lectus. Donec elementum sapien a lorem tristique egestas. ' +
  'Etiam a orci tincidunt, interdum leo blandit, consequat risus.';
const signature = 'John Smith';
const addressee = 'Mrs. Joanne Bloggs';
const address = [
  '25 random road',
  'Random town',
  'Random county',
  'ID8 9JD'
];

ReactDOM.render(<App
    comingFrom={comingFrom}
    message={message}
    signature={signature}
    addressee={addressee}
    address={address}
  />, document.getElementById('root'));

