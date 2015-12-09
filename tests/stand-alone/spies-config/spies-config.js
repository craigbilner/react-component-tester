import React, { Component } from 'react';

export default class SpiesConfig extends Component {

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
