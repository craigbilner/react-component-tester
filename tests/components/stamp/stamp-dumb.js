/* eslint-disable indent */

import React from 'react';
import styles from './stamp-styles';

export default ({ types, type, onClick }) => (
  <div style={styles.comp} onClick={onClick}>
    {
      (() => {
        switch (type) {
        case types.NONE:
          return (
            <div>Place stamp here</div>
          );
        case types.FIRST_CLASS:
          return (
            <div>1st</div>
          );
        case types.SECOND_CLASS:
          return (
            <div>2nd</div>
          );
        default:
          return (
            <div>Unknown stamp</div>
          );
        }
      })()
    }
  </div>
);
