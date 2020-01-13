import React, { useState, useEffect } from 'react';
import intereptor from '../Services/Interceptor';
import Crime from './Crime';

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
            <>
                <Crime data={data}/>
            </>
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
            {getData()}
        </>
    );
};

export default Tracking;
