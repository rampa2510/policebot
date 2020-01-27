import React, { useState, useEffect } from 'react';
import intereptor from '../Services/Interceptor';
import {Paper, Button, Grid, makeStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import Loader from "./loader";
import Crime from './Crime';
import Expansion from './Expansion';

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

    const getCrimes = reqtype=>{
        if(loaded && data!==null){
            return(
            data.map((item,index)=>{
                if(item["crime"]===reqtype){ 
                return (
                    <Grid key={index} item xs={12} md={6} lg={4} className={classes.gridItem}>
                    <Paper className={classes.paper} elevation={3}>
                    <Crime data={item}/>
                    {checkCompleted(item)}
                    </Paper>
                    </Grid>
                );
                }
            })
            );
            
        }else{
            return (<Loader open={true} />)
        }
    }

    return(
        <div className={classes.root}>
            <Expansion type="Assault" data={getCrimes("Assault")} />
            <Expansion type="Bullying" data={getCrimes("Bullying")} />
            <Expansion type="Corruption" data={getCrimes("Corruption")} />
            <Expansion type="Cyber Crime" data={getCrimes("Cyber Crime")} />
            <Expansion type="Domestic Abuse" data={getCrimes("Domestic Abuse")} />
            <Expansion type="Drugs" data={getCrimes("Drugs")} />
            <Expansion type="Fraud" data={getCrimes("Fraud")} />
            <Expansion type="Harassment" data={getCrimes("Harassment")} />
            <Expansion type="Kidnapping" data={getCrimes("Kidnapping")} />
            <Expansion type="Murder" data={getCrimes("Murder")} />
            <Expansion type="Rape" data={getCrimes("Rape")} />
            <Expansion type="Road Crime" data={getCrimes("Road Crime")} />
            <Expansion type="Robbery" data={getCrimes("Robbery")} />
            <Expansion type="Tranquility Offence" data={getCrimes("Tranquility Offence")} />
        </div>
    );
};

export default MyInvestigations;
