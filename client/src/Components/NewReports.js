import React, { useState, useEffect } from 'react';
import intereptor from '../Services/Interceptor';
import Crime from './Crime';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const NewReports = () => {
    const [data,setData] = useState(null)
    const [loaded,setLoaded] = useState(false)

    useEffect(()=>{getData()},[])

    const useStyles = makeStyles(theme => ({
        root: {
          flexGrow: 1,
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
                    <Grid key={index} item xs={12} md={6} lg={4}>
                    <Crime data={item}/>
                    <button onClick={()=>deleteReport(item["caseNo"])}>Delete</button>
                    <button onClick={()=>startInvestigation(item["caseNo"])}>Start Investigation</button>
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

export default NewReports;
