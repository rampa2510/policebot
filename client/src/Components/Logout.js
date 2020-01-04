import React, { useState } from 'react';

const Logout = () => {
  useState(() => {
    localStorage.clear();
    window.location = '/';
  }, []);
  return <></>;
};

export default Logout;
