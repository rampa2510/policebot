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
            <form className="form tracking-form" onSubmit={handleSubmit}>
                <input type="number" placeholder="Complaint Number" onChange={e=>setCrimeNumber(e.target.value)} className="control-no-input" />
                <button id="searchbutton" type="submit">
                    Search
                </button>
            </form>
        </>
    );
};

export default Tracking;
