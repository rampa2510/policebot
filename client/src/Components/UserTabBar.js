import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab, Typography, Box, AppBar} from '@material-ui/core';
import MyCases from './MyCases';
import Chatbot from './Chatbot';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    // If tab is chatbot, remove the padding
    if(value===0){
      return (
        <Typography
          component="div"
          role="tabpanel"
          hidden={value !== index}
          id={`scrollable-auto-tabpanel-${index}`}
          aria-labelledby={`scrollable-auto-tab-${index}`}
          {...other}
        >
          {value === index && <Box p={0}>{children}</Box>}
        </Typography>
      );
    }
    else{
        return (
          <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
          >
            {value === index && <Box p={3}>{children}</Box>}
          </Typography>
        );
      
    }
  }

const UserTabBar = ()=>{
    //material code
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

  const  [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return(
    <>

        <AppBar position="static" color="default">
            <Tabs value={value} onChange={handleChange}>
                <Tab label="ChatBot" {...a11yProps(0)} />
                <Tab label="My Cases" {...a11yProps(1)} />
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <Chatbot />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <MyCases />
        </TabPanel>
    </>
  );
}

export default UserTabBar;
