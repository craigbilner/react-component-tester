import React from 'react';
import radium from 'radium';
import styles from './welcome-styles';

export default radium(({ text }) => (
  <div style={styles.comp}>
    {text}
  </div>
));
