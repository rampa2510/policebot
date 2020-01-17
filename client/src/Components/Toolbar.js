import React from 'react'
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Toolbar = props => (
  <>
  <header className="Toolbar">
    <nav className="Toolbar-Navigation">
      <div></div>
      <div className="Toolbar-Logo"><a href="/">PoliceBot</a></div>
      <div className="Spacer"/>
      <div className="Toolbar-Navigation-Items">
        <ul>
          <li><Link to='/logout'><ExitToAppIcon fontSize="24" style={{marginTop:"5px"}}/></Link></li>
        </ul>
      </div>
    </nav>
  </header>
  </>
);

export default Toolbar
