/* eslint-disable indent */
import React, { PropTypes } from 'react';
import styles from './stamp-styles';

const StampDumb = ({ types, type, onClick }) => (
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

StampDumb.propTypes = {
  type: PropTypes.number,
  types: PropTypes.object,
  onClick: PropTypes.func,
};

export default StampDumb;
