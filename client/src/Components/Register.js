import React, { useEffect, useState } from 'react';
import interceptor from '../Services/Interceptor';
import Bot from '../images/Bot.png'
import Logo from '../images/BPRD_Logo.png'
import Grid from '@material-ui/core/Grid';
import {Button, Hidden, TextField} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';

const Register = () => {
  const [loaded, setLoaded] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [phone,setNo] = useState(null);
  
  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };
  const handleFullNameChange = e => {
    setFullName(e.target.value);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };
  const handleAddressChange = e => {
    setCity(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const userObj = { username, name, password,city, phone,userType: 'citizen' };
    try {
      const response = await interceptor('register', 'POST', userObj);
      console.log(response);
      localStorage.setItem('Token', JSON.stringify(response.token));
      delete userObj.password;
      localStorage.setItem('userData', JSON.stringify(userObj));
      window.location = '/home';
    } catch (error) {
      console.log(error);
      alert(error);
    }
    // window.location='/home';
  };

  useEffect(() => {
    const session_username = sessionStorage.getItem('username');
    if (session_username !== null) {
      window.location = '/home';
    } else {
      setLoaded(true);
    }
  }, []);

  const useStyles = makeStyles(theme => ({
    root: {
      background: "#f2f2f2",
      minWidth:"100vw",
      minHeight: "100vh",
      alignItems: "center",
      textAlign:"center",
    },
    heading: {
      fontSize: "3rem",
    },
    field:{
      background:"#fff",
      margin: theme.spacing(1),
      width:"80%",
    },
    formButtons: {
      width:"80%",
      margin: theme.spacing(1),
      background:"#262626",
      textDecoration:"none",
      padding: "12px",
      "&:hover": {
        backgroundColor: "#808080"
    }
    }
  }));

  const classes = useStyles();

  const loadPage = () => {
    if (loaded) {
      return (
        <Grid className={classes.root} container spacing={0}>
          <Hidden smDown>
            <Grid item md={4}>
              <img alt="police" width="80%" src={Bot}/>
            </Grid>
          </Hidden>
          <Grid item xs={12} md={4}>
            <Grid item xs={12}>
              <h1 className={classes.heading}>PoliceBot</h1>
            </Grid>
            <Grid item xs={12}>
              <form className={classes.loginform} onSubmit={handleSubmit}>
                <Grid item xs={12}>
                  <TextField required onChange={(e)=>handleFullNameChange(e)} className={classes.field} label="Full Name" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField className={classes.field} required onChange={(e)=>handleUsernameChange(e)} label="Username" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                  <TextField className={classes.field} required onChange={(e)=>handlePasswordChange(e)} type="password" label="Password" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                  <TextField required onChange={(e)=>handleAddressChange(e)} className={classes.field} label="City" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                  <TextField required onChange={(e)=>setNo(e.target.value)} className={classes.field} label="phone number" type="number" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>  
                  <Button type="submit" className={classes.formButtons} variant="contained" color="primary"> Register </Button>  
                </Grid>
              </form>
            </Grid>
          </Grid>
          <Hidden smDown>
            <Grid item  md={4}>
              <img alt="logo" width="50%" src={Logo}/>
            </Grid>
          </Hidden>
        </Grid>
      );
    }
  };

  return <>{loadPage()}</>;
};

export default Register;
