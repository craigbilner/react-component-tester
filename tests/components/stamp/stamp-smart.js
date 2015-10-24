import React, { Component, PropTypes } from 'react';
import Stamp from './stamp-dumb';

export default class StampSmartComponent extends Component {
  constructor(props) {
    super(props);

    this.stampTypes = {
      NONE: 1,
      FIRST_CLASS: 2,
      SECOND_CLASS: 3
    };
    this.state = {
      type: this.stampTypes.NONE
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
      type: this.getNextStampType(this.stampTypes, this.state.type)
    });
  }

  render() {
    return (
      <Stamp
        types={this.stampTypes}
        type={this.state.type}
        onClick={this.handleOnClick.bind(this)}
        />
    );
  }
}

StampSmartComponent.propTypes = {};
