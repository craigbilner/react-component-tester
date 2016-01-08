import React, { Component, PropTypes } from 'react';
import Link from './link';

export default class LinkListComponent extends Component {
  constructor(props) {
    super(props);

    this.handleLink1Click = this.handleLink1Click.bind(this);
    this.handleLink2Click = this.handleLink1Click.bind(this);
    this.handleLink3Click = this.handleLink1Click.bind(this);
  }

  handleLink1Click() {
    // console.log('one clicked');
  }

  handleLink2Click() {
    // console.log('two clicked');
  }

  handleLink3Click() {
    // console.log('three clicked');
  }

  render() {
    const { links } = this.props;
    return (
      <ul>
        <li key="0" onClick={this.handleLink1Click}>
          <Link text={links[0].text}/>
        </li>
        <li key="1" onClick={this.handleLink2Click}>
          <Link text={links[1].text}/>
        </li>
        <li key="2" onClick={this.handleLink3Click}>
          <Link text={links[2].text}/>
        </li>
      </ul>
    );
  }
}

LinkListComponent.propTypes = {
  links: PropTypes.array,
};
