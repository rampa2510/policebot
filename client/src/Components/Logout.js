import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';

const Logout = () => {
  useState(() => {
    localStorage.clear();
    
  }, []);
  return <Redirect to="/" />;
};

export default Logout;
