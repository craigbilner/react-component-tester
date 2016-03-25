import React, { PropTypes } from 'react';

const Item = ({ text }) => <a>{text}</a>;

Item.propTypes = {
  text: PropTypes.string,
};

export default Item;
