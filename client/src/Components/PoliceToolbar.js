import React from 'react'
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const PoliceToolbar = () =>{
    return (
    <>
    <header className="Toolbar">
      <nav className="Toolbar-Navigation">
        <div></div>
        <div className="Toolbar-Logo"><Link to="/home">PoliceBot</Link></div>
        <div className="Spacer"/>
        <div className="Toolbar-Navigation-Items">
          <ul>
            <li><Link to='/logout'><ExitToAppIcon style={{marginTop:"5px"}}/></Link></li>
          </ul>
        </div>
      </nav>
    </header>
    </>
  );
}

export default PoliceToolbar
