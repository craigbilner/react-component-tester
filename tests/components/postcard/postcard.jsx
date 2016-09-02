import React from 'react';
import radium from 'radium';
import styles from './postcard-styles';
import Welcome from '../welcome/welcome';
import Message from '../message/message';
import Signature from '../signature/signature';
import Stamp from '../stamp/stamp-smart';
import Address from '../address/address';

export default radium(({ comingFrom, message, signature, address, addressee }) => (
  <div style={styles.comp}>
    <div style={styles.left}>
      <Welcome
        text={comingFrom}
      />
      <Message
        text={message}
      />

      <div style={styles.signatureContainer}>
        <Signature
          text={signature}
        />
      </div>
    </div>
    <div style={styles.right}>
      <div style={styles.head}>
        <Stamp />
      </div>
      <div style={styles.body}>
        <Address
          addressee={addressee}
          address={address}
        />
      </div>
    </div>
  </div>
));
