import React, { useState, useEffect } from 'react';
import intereptor from '../Services/Interceptor';
import {Paper, makeStyles} from '@material-ui/core';
import Loader from "./loader";
import Expansion from './Expansion';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Updates from './Updates';



const MyInvestigations = () => {
    const [data,setData] = useState(null)
    const [loaded,setLoaded] = useState(false)
    const [currentCaseNo,setCurrentCaseNo] = useState()

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

    const getsuspects = suspects=>{
        if(suspects.length>0)
        return(
            <>
            {suspects.map((suspect,index)=>{
                if(index===suspects.length-1)
                    return(
                        <React.Fragment key={index}> {suspect}</React.Fragment>
                    );
                else
                    return(
                        <React.Fragment key={index}> {suspect},</React.Fragment>
                    );
            })}
            </>
        );
      }

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

    const getCrimes = reqtype=>{
        if(loaded && data!==null){
            return(
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Case No.</TableCell>
                          <TableCell align="center">Reported By</TableCell>
                          <TableCell align="center">Suspects</TableCell>
                          <TableCell align="center">Crime Date</TableCell>
                          <TableCell align="center">Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((data,index) =>{
                          if(data.crime===reqtype){
                        return(
                          <TableRow hover key={index} onClick={()=>setCurrentCaseNo(data.caseNo)}>
                            <TableCell component="th" scope="row">
                              {data.caseNo}
                            </TableCell>
                            <TableCell align="center">{data.name}</TableCell>
                            <TableCell align="center">{getsuspects(data.personArr)}</TableCell>
                            <TableCell align="center">{data.date.substring(8,10)+'/'+data.date.substring(5,7)+'/'+data.date.substring(0,4)}</TableCell>
                            <TableCell align="center">{data.status}</TableCell>
                          </TableRow>
                        )}})}
                      </TableBody>
                    </Table>
                  </TableContainer>
                );
              }
        else{
          return(
            <Loader open={true} />
          )
        }
    }
    if(currentCaseNo==null){
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
  }
  else return(
    <Updates currentCaseNo={currentCaseNo} setCurrentCaseNo={setCurrentCaseNo} />
  ); 
};

export default MyInvestigations;
