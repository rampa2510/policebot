import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getCoords } from '../Services/emergency'
import Snackbar from '@material-ui/core/Snackbar';

const Toolbar = () =>{
  const [isSnackBarOpen,setSnackBar] = useState(false)

  var noOfClicks = 0;
  var timer=null;

  const onClick = ()=>{
    
    if(!timer){
      noOfClicks++;
      setSnackBar(true)
      timer = setTimeout(async()=>{
        if(noOfClicks>=3)
          await getCoords();
        
        clearTimeout(timer)
        timer=null;
        noOfClicks = 0;
      },3000);
    }else{
      setSnackBar(true)
      noOfClicks++;
    }
  }

  
  let message = `click more ${3-noOfClicks} times consectively to fire an emergency meet`
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
    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={isSnackBarOpen}
        autoHideDuration={1000}
        message={message}
      />
    </>
  );
}

export default Toolbar
