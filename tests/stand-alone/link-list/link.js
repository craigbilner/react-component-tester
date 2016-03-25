import React, { PropTypes } from 'react';

const Link = ({ text }) => <a>{text}</a>;

Link.propTypes = {
  text: PropTypes.string,
};

export default Link;
