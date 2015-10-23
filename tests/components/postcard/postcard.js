import React from 'react';
import styles from './postcard-styles';
import Welcome from '../welcome/welcome';
import Message from '../message/message';
import Signature from '../signature/signature';
import Stamp from '../stamp/stamp';
import Address from '../address/address';

export default props => (
  <div style={styles.comp}>
    <div style={styles.left}>
      <Welcome />
      <Message />
      <Signature />
    </div>
    <div style={styles.right}>
      <div style={styles.head}>
        <div style={styles.stampContainer}>
          <Stamp />
        </div>
      </div>
      <div style={styles.body}>
        <Address />
      </div>
    </div>
  </div>
);
