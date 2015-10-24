import React from 'react';
import AddressLine from '../address-line/address-line';

export default ({address = [], addressee = ''}) => (
  <div>
    <AddressLine text={addressee} />
    {
      address.map((text, indx) => (
        <AddressLine key={indx} text={text}/>
      ))
    }
  </div>
);
