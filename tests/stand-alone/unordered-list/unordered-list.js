import React from 'react';

export default ({ i18n, links }) => (
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
            links.map(link => <li key={link.title}>{link.text}</li>)
        }
    </ul>
);
