import React, { useState, useEffect } from 'react';
import intereptor from '../Services/Interceptor';


const MyInvestigations = () => {
    const [data,setData] = useState(null)
    const [loaded,setLoaded] = useState(false)

    useEffect(()=>{getData()},[])

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

    const getCrimes = ()=>{
        if(loaded && data!==null){
            return(
            data.map(item=>{
                return (
                    <>
                    <p>Case No: {item["caseNo"]}</p>
                    <p>Reported By: {item["name"]}</p>
                    <p>Crime: {item["crime"]}</p>
                    <p>Date of Crime: {item["date"].substring(8,10)+'/'+item["date"].substring(5,7)+'/'+item["date"].substring(0,4)}</p>
                    <p>Status: {item["status"]}</p>
                    <p>Investigating Officer: {item["investigatingOfficer"]}</p>
                    <hr />
                    </>
                );
            })
            );
        }
    }

    return(
        <>
            {getCrimes()}
        </>
    );
};

export default MyInvestigations;
