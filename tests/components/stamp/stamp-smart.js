/* eslint-disable indent */

import React, { Component, PropTypes } from 'react';
import Stamp from './stamp-dumb';
import stampTypes from './stamp-types';

export default class StampSmartComponent extends Component {
  constructor(props) {
    super(props);

    this.state = props.state || {
        type: stampTypes.NONE,
      };
  }

  getNextStampType(types, currentType) {
    let nextType;

    switch (currentType) {
      case types.NONE:
        nextType = types.FIRST_CLASS;
        break;
      case types.FIRST_CLASS:
        nextType = types.SECOND_CLASS;
        break;
      case types.SECOND_CLASS:
        nextType = types.NONE;
        break;
      default:
        nextType = types.NONE;
    }

    return nextType;
  }

  handleOnClick() {
    this.setState({
      type: this.getNextStampType(stampTypes, this.state.type),
    });
  }

  render() {
    return (
      <Stamp
        types={stampTypes}
        type={this.state.type}
        onClick={this.handleOnClick.bind(this)}
        />
    );
  }
}

StampSmartComponent.propTypes = {
  state: PropTypes.shape({
    type: PropTypes.number,
  }),
};
