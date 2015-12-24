import React from 'react';
import radium from 'radium';
import styles from './address-line-styles';

export default radium(({ text }) => (
  <div style={styles.comp}>
    {text}
  </div>
));
