import React from 'react';
import Radium from 'radium';
import styles from './welcome-styles';

export default Radium(({text}) => (
  <div style={styles.comp}>
    {text}
  </div>
));
