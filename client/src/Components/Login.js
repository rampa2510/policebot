import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import interceptor from '../Services/Interceptor';
import {Button, Hidden, TextField, makeStyles, Grid} from '@material-ui/core';
import Bot from '../images/Bot.png';
import Logo from '../images/BPRD_Logo.png';
import Loader from './loader';

const Landing = () => {
  const [loaded, setLoaded] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const reqObj = { username, password };

    try {
      const response = await interceptor('login', 'POST', reqObj);
      localStorage.setItem('Token', JSON.stringify(response.token));
      localStorage.setItem('userData', JSON.stringify(response.data));
      window.location = '/home';
    } catch (error) {
      // console.log(error)
      alert(error.message);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
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
                <TextField className={classes.field} required onChange={(e)=>handleUsernameChange(e)} label="Username" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField className={classes.field} type="password" required onChange={(e)=>handlePasswordChange(e)} label="Password" variant="outlined"/>
              </Grid>
              <Grid item xs={12}>  
                <Button type="submit" className={classes.formButtons} variant="contained" color="primary"> Login </Button>  
              </Grid>
            </form>
            </Grid>
            <Grid item xs={12}>
            <p>Or</p>
            </Grid>
            <Grid item xs={12}>
            <Link style={{ textDecoration: 'none' }} to="/register"><Button className={classes.formButtons} variant="contained" color="primary" >Register</Button></Link>
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
    else
    return(
      <Loader open={true} />
    )
  };

  return <>{loadPage()}</>;
};

export default Landing;
