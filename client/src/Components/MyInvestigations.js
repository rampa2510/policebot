import React, { useState, useEffect } from 'react';
import intereptor from '../Services/Interceptor';
import Crime from './Crime';
import Grid from '@material-ui/core/Grid';
import {Paper, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Loader from "./loader";

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
            const response = await intereptor(`get-my-crimes`);
            setData(response["crimeData"])
        } catch (error) {
            console.log(error);
            alert(error);
        }
        setLoaded(true)
        
    }

    const finishInvestigation=async (caseNo)=>{
        try {
            const response = await intereptor(`finishinvestigation`,"PATCH",{caseNo:caseNo});
          console.log(response)
          getData();
        } catch (error) {
          console.log(error)
        }
      }

    const checkCompleted = item=>{
        if(item["status"]==="ongoing")
            return( 
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Link to={"/update/"+item["caseNo"]}><Button variant="contained" color="primary" className={classes.actionbuttons} >Update</Button></Link>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="primary" className={classes.actionbuttons} onClick={()=>finishInvestigation(item["caseNo"])}>Complete</Button>
                    </Grid>
                </Grid>
            );
    } 

    const getCrimes = ()=>{
        if(loaded && data!==null){
            return(
            data.map((item,index)=>{
                return (
                    <Grid key={index} item xs={12} md={6} lg={4} className={classes.gridItem}>
                    <Paper className={classes.paper} elevation={3}>
                    <Crime data={item}/>
                    {checkCompleted(item)}
                    </Paper>
                    </Grid>
                );
            })
            );
        }else{
            return (<Loader open={true} />)
        }
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
