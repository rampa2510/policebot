import React, { useState, useEffect } from 'react';
import intereptor from '../Services/Interceptor';
import Crime from './Crime';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const MyInvestigations = () => {
    const [data,setData] = useState(null)
    const [loaded,setLoaded] = useState(false)

    useEffect(()=>{getData()},[])

    const useStyles = makeStyles(theme => ({
        root: {
          flexGrow: 1,
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
            return <button onClick={()=>finishInvestigation(item["caseNo"])}>Finish Investigation</button>
    } 

    const getCrimes = ()=>{
        if(loaded && data!==null){
            return(
            data.map((item,index)=>{
                return (
                    <Grid key={index} item xs={12} md={6} lg={4}>
                    <Crime data={item}/>
                    {checkCompleted(item)}
                    </Grid>
                );
            })
            );
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
