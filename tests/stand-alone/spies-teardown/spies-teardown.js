import React, { Component } from 'react';

export default class SpiesTeardown extends Component {

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
