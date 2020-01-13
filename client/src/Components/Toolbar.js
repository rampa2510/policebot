import React from 'react'

const Toolbar = props => (
  <div>
  <header className="Toolbar">
    <nav className="Toolbar-Navigation">
      <div></div>
      <div className="Toolbar-Logo"><a href="/">Police</a></div>
      <div className="Spacer"/>
      <div className="Toolbar-Navigation-Items">
        <ul>
          <li><a href="/">Logout</a></li>
        </ul>
      </div>
    </nav>
  </header>
  <br className="Spacing"/>
  </div>
);

export default Toolbar
