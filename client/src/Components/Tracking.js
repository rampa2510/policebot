import React, { useState, useEffect } from 'react';
import intereptor from '../Services/Interceptor';

const Tracking = () => {
  const [crimeNumber, setCrimeNumber] = useState(false);

//   useEffect(() => {
//     if (localStorage.getItem('Token') != null) setLoaded(true);
//     else window.location = '/';
//   }, []);

    const handleSubmit=async e=>{
        e.preventDefault();

        try {
            const response = await intereptor(`/crime-register/${crimeNumber}`);
            console.log(response)
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }
  
    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder="Complaint Number" onChange={e=>setCrimeNumber(e.target.value)} className="form-control" />
                <button id="searchbutton" type="submit" className="btn btn-primary form-control">
                    Search
                </button>
            </form>
        </>
    );
};

export default Tracking;
