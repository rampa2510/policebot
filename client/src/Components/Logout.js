import React, { useState } from 'react';

const Logout = ()=>{
    useState(()=>{
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('fullName');
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('role');
        window.location='/';
    },[])
    return(
        <React.Fragment></React.Fragment>
    );
}

export default Logout;