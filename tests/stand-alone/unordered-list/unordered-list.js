import React, { Component, PropTypes } from 'react';

export default class UnorderedListComponent extends Component {
  getDrlinks(i18n, email, links, randomString) {
    const someComponent = (
      <div
        id="some-id"
        ref="some-ref"
      >
        <a>
          {i18n.guest} <span className="class-random">test</span>
        </a>
        <div>
          <li>
            {email}
          </li>
          {links.map((link, indx) => (
            <li key={`drlinkChild${indx}`}>{link}</li>
          ))}
        </div>
      </div>
    );

    return [
      someComponent,
      randomString,
    ];
  }

  handleOnClick() {
    // do something
  }

  handleKeyPress() {
    // do something
  }

  render() {
    const { i18n = {}, links = [], rlinks = [], drlinkssrc = [], randomString = '', email = '' } = this.props;
    const drlinks = email ? this.getDrlinks(i18n, email, drlinkssrc, randomString) : [];

    return (
      <ul className="class-1" onClick={this.handleOnClick}>
        <li className="class-2">
          <a href="some-href-1"
            title={i18n.help}
            target="_blank"
            rel="help"
            onKeyPress={this.handleKeyPress}
          >
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
        {
          drlinks.map((link, indx) => <li key={`drlink${indx}`}>{link}</li>)
        }
      </ul>
    );
  }
}

UnorderedListComponent.propTypes = {
  i18n: PropTypes.object,
  links: PropTypes.array,
  rlinks: PropTypes.array,
  drlinkssrc: PropTypes.array,
  randomString: PropTypes.string,
  email: PropTypes.string,
};
