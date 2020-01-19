import React, { useState, useEffect } from 'react';
import TabBar from './TabBar'
import Toolbar from './Toolbar'
import UserTabBar from './UserTabBar';
import PoliceToolbar from './PoliceToolbar';
import Loader from './loader';

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
  }, [userData]);

    // Loads dashboard based on if user is citizen or police
    const loadPage = () => {
      if (loaded) {
        if (userData.userType === 'citizen') {
          return (
            <>
              <Toolbar/>
              <UserTabBar/>
            </>
          );
        }
        if (userData.userType === 'policeman') {
          return (
            <>
              <PoliceToolbar/>
              <TabBar/>
            </>
          );
        }
        else{
          return(
            <Loader open={true} />
          )
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
