/* eslint-disable indent */

import React from 'react';
import styles from './stamp-styles';

export default ({types, type, onClick}) => (
  <div style={styles.comp} onClick={onClick}>
    {
      (() => {
        switch (type) {
          case types.NONE:
            return 'Place stamp here';
          case types.FIRST_CLASS:
            return '1st';
          case types.SECOND_CLASS:
            return '2nd';
          default:
            return 'Unknown stamp';
        }
      })()
    }
  </div>
);
