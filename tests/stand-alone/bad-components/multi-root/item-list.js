import React, { Component, PropTypes } from 'react';
import Item from './item';

export default class ItemListComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.items.map(({ text }, indx) => <Item key={indx} text={text}/>);
  }
}

ItemListComponent.propTypes = {
  items: PropTypes.array,
};
