import React from 'react';
import styles from './app-styles';
import Postcard from '../postcard/postcard';

export default props => (
  <div style={styles.comp}>
    <div style={styles.gutter}></div>
    <div style={styles.body}>
      <div style={styles.cardContainer}>
        <Postcard />
      </div>
    </div>
    <div style={styles.gutter}></div>
  </div>
);
