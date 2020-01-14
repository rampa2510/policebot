import React, { useState, useEffect } from 'react';
import intereptor from '../Services/Interceptor';
import Crime from './Crime';
import Grid from '@material-ui/core/Grid';
import {Paper, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const NewReports = () => {
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
        marginTop:"10px",
      }
    }));

    const classes = useStyles();

    const deleteReport=async (caseNo)=>{
        try {
            const response = await intereptor(`investigation/${caseNo}`,"DELETE");
          console.log(response)
          getData();
        } catch (error) {
          console.log(error)
        }
      }

      const startInvestigation=async (caseNo)=>{
        try {
            const response = await intereptor(`investigation`,"PATCH",{caseNo:caseNo});
          console.log(response)
          getData();
        } catch (error) {
          console.log(error)
        }
      }

    const getData=async ()=>{
        try {
            const response = await intereptor(`get-crime-register`);
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
                    <Grid container spacing={3}>
                      <Grid item xs={6} md={6} lg={6}>
                        <Button variant="contained" color="primary"  className={classes.actionbuttons} onClick={()=>startInvestigation(item["caseNo"])}>Investigate</Button>
                      </Grid>
                      <Grid item xs={6} md={6} lg={6}>
                        <Button variant="contained" color="secondary" className={classes.actionbuttons} onClick={()=>deleteReport(item["caseNo"])}>Delete</Button>
                      </Grid>
                    </Grid>
                    </Paper>
                    </Grid>
                );
            })
            );
        }
    }

    return(
        <div className={classes.root}>
        <Grid container spacing={0}>
            {getCrimes()}
        </Grid>
        </div>
    );
};

export default NewReports;
