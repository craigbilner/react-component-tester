import React, { Component } from 'react';

export default class UnorderedListComponent extends Component {
  render() {
    const { i18n = {}, links = [], rlinks = [] } = this.props;

    return (
      <ul className="class-1">
        <li className="class-2">
          <a href="some-href-1"
             title={i18n.help}
             target="_blank"
             rel="help">
            {i18n.help}
          </a>
        </li>
        <li className="class-3">
          <a href="some-href-2">
            {i18n.something}
          </a>
        </li>
        {
          links.map((link, indx) => <li key={`lnk${indx}`}>{link.text}</li>)
        }
        {
          rlinks.map((link, indx) => <li key={`rlink${indx}`}>{link}</li>)
        }
      </ul>
    );
  }
};
