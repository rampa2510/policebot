import React, { useState, useEffect } from 'react';
import intereptor from '../Services/Interceptor';
import Crime from './Crime';


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
            data.map((item,index)=>{
                return (
                    <div key={index}>
                    <Crime data={item}/>
                    <hr />
                    </div>
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
