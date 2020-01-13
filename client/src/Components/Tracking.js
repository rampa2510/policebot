import React, { useState, useEffect } from 'react';
import intereptor from '../Services/Interceptor';
import Crime from './Crime';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const Tracking = () => {
  const [crimeNumber, setCrimeNumber] = useState(false);
  const [data,setData] = useState(null)

//   useEffect(() => {
//     if (localStorage.getItem('Token') != null) setLoaded(true);
//     else window.location = '/';
//   }, []);

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
                <Crime data={data}/>
                </Grid>
            );
    }

    return(
        <>
            <form className="form tracking-form" onSubmit={handleSubmit}>
                <input type="number" placeholder="Complaint Number" onChange={e=>setCrimeNumber(e.target.value)} className="control-no-input" />
                <button id="searchbutton" type="submit">
                    Search
                </button>
            </form>
            <Grid container >
            <Grid item xs={0} md={3} >
            </Grid>
            {getData()}
            </Grid>
        </>
    );
};

export default Tracking;
