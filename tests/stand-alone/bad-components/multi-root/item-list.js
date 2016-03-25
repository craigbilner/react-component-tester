import React, { PropTypes } from 'react';
import Item from './item';

const ItemListComponent =
  ({ items }) => items.map(({ text }, indx) => <Item key={indx} text={text} />);

ItemListComponent.propTypes = {
  items: PropTypes.array,
};

export default ItemListComponent;
