import React, { useState, useEffect } from 'react';
import intereptor from '../Services/Interceptor';
import {Paper, Grid, makeStyles} from '@material-ui/core';
import Loader from './loader';
import Crime from './Crime';

const MyInvestigations = () => {
    const [data,setData] = useState(null)
    const [loaded,setLoaded] = useState(false)

    useEffect(()=>{getData()},[])

    const useStyles = makeStyles(theme => ({
        root: {
          flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            paddingBottom: "5px",
            textAlign: 'center',
            color: theme.palette.text.secondary,
            height:"100%",
        },
        gridItem:{
            marginBottom:"20px",
            marginTop:"20px",
        },
        actionbuttons:{
            width:"100%",
            marginTop:"10px"
        }
      }));

    const classes = useStyles();

    const getData=async ()=>{
        try {
            const response = await intereptor(`get-user-crimes`);
            setData(response["crimeData"])
        } catch (error) {
            console.log(error);
            alert(error);
        }
        setLoaded(true)
        
    }


    const getCrimes = ()=>{
        if(loaded && data!==null){
            return(
            data.map((item,index)=>{
                return (
                    <Grid key={index} item xs={12} md={6} lg={4} className={classes.gridItem}>
                    <Paper className={classes.paper} elevation={3}>
                    <Crime data={item}/>
                    </Paper>
                    </Grid>
                );
            })
            );
        }
        else
        return(
            <Loader open={true} />
          )
    }

    return(
        <div className={classes.root}>
        <Grid container spacing={3}>
            {getCrimes()}
        </Grid>
        </div>
    );
};

export default MyInvestigations;
