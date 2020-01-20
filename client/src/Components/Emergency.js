import React, { useState, useEffect } from 'react';
import intereptor from '../Services/Interceptor';
import {Paper, Button, Hidden, makeStyles, Grid} from '@material-ui/core';
import EmergencyReport from './EmergencyReport';
import Loader from './loader';

const Emergency = () => {
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

    const deleteEmergency=async (emergencyNo)=>{
        try {
          await intereptor(`deleteemergency/${emergencyNo}`,"DELETE");
          getData();
        } catch (error) {
          console.log(error)
        }
      }

    const getData=async ()=>{
        try {

            const response = await intereptor(`getemergency`);
            setData(response["emergencyData"])
        } catch (error) {
            console.log(error);
            alert(error);
        }
        setLoaded(true)
        
    }

    const getEmergencies = ()=>{
        if(loaded && data!==null){
            return(
            data.map((item,index)=>{
                return (
                  <Grid key={index} item xs={12} md={6} lg={4} className={classes.gridItem}>
                    <Paper className={classes.paper} elevation={3}>
                    <EmergencyReport data={item}/>
                    <Grid container spacing={3}>
                      <Hidden smDown>
                        <Grid item md={3}></Grid>
                      </Hidden>
                      <Grid item xs={12} md={6}>
                        <Button variant="contained" color="secondary" className={classes.actionbuttons} onClick={()=>deleteEmergency(item["_id"])}>Delete</Button>
                      </Grid>
                    </Grid>
                    </Paper>
                    </Grid>
                );
            })
            );
        }
        else{
          return(
            <Loader open={true} />
          )
        }
    }

    return(
        <div className={classes.root}>
        <Grid container spacing={3}>
            {getEmergencies()}
        </Grid>
        </div>
    );
};

export default Emergency;
