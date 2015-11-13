import React, { Component } from 'react';

export default class spiesTeardown extends Component {

  spiedOn() {
    return 'foo';
  }

  render() {
    return (
      <div>
        { this.spiedOn() }
      </div>
    );
  }

}
