import React, { PropTypes } from 'react';
import AddressLine from '../address-line/address-line';

const Address = ({ address = [], addressee = '' }) => (
  <div>
    <AddressLine text={addressee} />
    {
      address.map((text, indx) => (
        <AddressLine key={indx} text={text} />
      ))
    }
  </div>
);

Address.propTypes = {
  address: PropTypes.array,
  addressee: PropTypes.string,
};

export default Address;
