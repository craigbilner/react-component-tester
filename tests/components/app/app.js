import React from 'react';
import styles from './app-styles';
import Postcard from '../postcard/postcard';

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
  '24 random road',
  'Random town',
  'Random county',
  'ID8 9JD'
];

export default props => (
  <div style={styles.comp}>
    <div style={styles.gutter}></div>
    <div style={styles.body}>
      <div style={styles.cardContainer}>
        <Postcard
          comingFrom={comingFrom}
          message={message}
          signature={signature}
          addressee={addressee}
          address={address}
          />
      </div>
    </div>
    <div style={styles.gutter}></div>
  </div>
);
