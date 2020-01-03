import React, { useState } from 'react';

const Logout = ()=>{
    useState(()=>{
        localStorage.clear()
        window.location='/';
    },[])
    return(
        <React.Fragment></React.Fragment>
    );
}

export default Logout;