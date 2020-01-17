import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getCoords } from '../Services/emergency'

const Toolbar = () =>{

  var noOfClicks = 0;
  var timer=null;

  const onClick = ()=>{
    if(!timer){
      noOfClicks++;
      timer = setTimeout(async()=>{
        if(noOfClicks>=3)
          await getCoords();
        
        clearTimeout(timer)
        timer=null;
        noOfClicks = 0;
      },3000);
    }else{
      noOfClicks++;
    }
  }

  

  return (
    <>
    <header className="Toolbar">
      <nav className="Toolbar-Navigation">
        <div></div>
        <div onClick={onClick} className="Toolbar-Logo">PoliceBot</div>
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
}

export default Toolbar
