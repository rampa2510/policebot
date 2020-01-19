import React, { useState } from 'react';
import intereptor from '../Services/Interceptor';
import {Paper, TextField, Hidden, Button, makeStyles, Grid} from '@material-ui/core';
import Crime from './Crime';

const Tracking = () => {
  const [crimeNumber, setCrimeNumber] = useState(false);
  const [data,setData] = useState(null)

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: "center",
    },
    field:{
        background:"#fff",
        margin: theme.spacing(1),
        width:"80%",
      },
      paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
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

    const handleSubmit=async e=>{
        e.preventDefault();

        try {
            const response = await intereptor(`crime-register/${crimeNumber}`);
            setData(response["caseData"])
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    const getData = ()=>{
        if(data!==null)
            return(
                <Grid item xs={12} md={6} >
                <Paper className={classes.paper} elevation={3}>
                <Crime data={data}/>
                </Paper>
                </Grid>
            );
    }

    return(
        <>
            <Grid spacing={3} className= {classes.root} container >
            <Hidden smDown>
                <Grid item md={3}></Grid>
            </Hidden>
            <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
                <TextField type="number" variant="outlined" className={classes.field} onChange={e=>setCrimeNumber(e.target.value)} placeholder="Complaint Number" />
                
                <Button color="primary" variant="contained" className={classes.formButtons} type="submit">
                    Search
                </Button>
            </form>
            </Grid>
            <Hidden smDown>
                <Grid item md={3}></Grid>
            </Hidden>
            <Hidden smDown>
            <Grid md={3} ></Grid>
            </Hidden>
            {getData()}
            </Grid>
        </>
    );
};

export default Tracking;
