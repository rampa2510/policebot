import React, { useState, useEffect } from 'react';
import Chatbot from './Chatbot';
import TabBar from './TabBar'


const Dashboard = () => {
  // Checks if loaded
  const [loaded, setLoaded] = useState(false);

  // get userdata with all info see registration handleSubmit method
  // to view model for this storage
  let userData = localStorage.getItem('userData');
  userData = JSON.parse(userData);
  // checks if user is logged in
  useEffect(() => {
    if (userData === null) window.location = '/';
    else setLoaded(true);
  }, []);



    // Loads dashboard based on if user is student or admin
    const loadPage = () => {
      if (loaded) {
        if (userData.userType === 'citizen') {
          return (
            <Chatbot/>
          );
        }
        if (userData.userType === 'policeman') {
          return (
            <>
              <TabBar/>
            </>
          );
        }
      }
    };
    return (
      <>
        {loadPage()}
      </>
    );
  };

  export default Dashboard;
