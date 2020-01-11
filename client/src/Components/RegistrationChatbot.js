import React from 'react';
import interceptor from '../Services/Interceptor'

function RegistrationChatbot() {
  const crimeData = {};

  const config = {
    width: '100%',
    height: '100vh',
  };

  const sendData=async ()=>{
    try {
      let res = await interceptor('/crime-register',"POST",crimeData)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <h1>Hello</h1>
  );
}

export default RegistrationChatbot;
