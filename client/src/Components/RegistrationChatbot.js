import React from 'react';
import ChatBot from 'react-simple-chatbot';
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

  const steps = [
    {
      id: 'Greet',
      message:
        'Hello, Welcome to the Crime Registration Chatbot. Please enter the type of crime to continue.',
      trigger: 'Waiting for type',
    },
    {
      id: 'Waiting for type',
      user: true,
      validator: value => {
        crimeData.type = value;
        return true;
      },
      trigger: 'Asking Date',
    },
    {
      id: 'Asking Date',
      message:
        'You are trying to report a {previousValue} crime. Please enter the Date of the crime.',
      trigger: 'Waiting for date',
    },

    {
      id: 'Waiting for date',
      user: true,
      validator: value => {
        crimeData.date = value;
        return true;
      },

      trigger: 'Asking criminal',
    },
    {
      id: 'Asking criminal',
      message: 'Enter the name of the suspect. Enter - if you do not know the name',
      trigger: 'Waiting for name',
    },
    {
      id: 'Waiting for name',
      user: true,
      validator: value => {
        crimeData.suspect = value;
        sendData()
        return true;
      },
      trigger:"Read name"
    },
    {
      id: 'Read name',
      message: 'Thank you for reporting!',
      end: true,
    },
  ];
  return <ChatBot steps={steps} {...config} />;
}

export default RegistrationChatbot;
