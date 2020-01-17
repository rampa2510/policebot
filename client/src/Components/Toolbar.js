import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getCoords } from '../Services/emergency'
import Snackbar from '@material-ui/core/Snackbar';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const Toolbar = () =>{
  const [isSnackBarOpen,setSnackBar] = useState(false)

  var noOfClicks = 0;
  var timer=null;
  var isReqSend = false;
  const onClick = ()=>{
    
    if(!timer){
      noOfClicks++;
      timer = setTimeout(async()=>{
        if(noOfClicks>=3 && !isReqSend){
          await getCoords();
          isReqSend=true;
        }
        clearTimeout(timer)
        timer=null;
      },3000);
    }else{
      if(noOfClicks===1){
        setSnackBar(true)
      }
      noOfClicks++;
    }
  }

  
  let message = `click more ${3-noOfClicks} times consectively to fire an emergency event`
  return (
    <>
    <header className="Toolbar">
      <nav className="Toolbar-Navigation">
        <div></div>
        <div className="Toolbar-Logo">PoliceBot</div>
        <div className="Spacer"/>
        <div className="Toolbar-Navigation-Items">
          <ul>
            <li onClick={onClick}><PersonPinCircleIcon fontSize="24" style={{marginTop:"5px"}}/></li>
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
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={()=>setSnackBar(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}

export default Toolbar
