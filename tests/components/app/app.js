import React from 'react';
import Radium from 'radium';
import styles from './app-styles';
import Postcard from '../postcard/postcard';

export default Radium(({
  comingFrom,
  message,
  signature,
  addressee,
  address
  }) => (
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
));
