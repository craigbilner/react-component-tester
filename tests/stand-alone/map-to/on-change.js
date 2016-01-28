import React, { Component } from 'react';

export default class OnChangeComponent extends Component {
  onChange(evt) {
    const { name, value } = evt.target;
    console.log(name, value); // eslint-disable-line no-console
  }

  render() {
    return (
      <input
        name="username"
        onChange={this.onChange}
      />
    );
  }
}
