import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {AppBar} from '@material-ui/core';
import MyInvestigations from './MyInvestigations';
import Tracking from './Tracking';
import NewReports from './NewReports';
import Emergency from './Emergency';
import Updates from './Updates';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
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

const TabBar = ()=>{
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

  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return(
    <>

        <AppBar position="static" color="default">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" >
                <Tab label="Pending" {...a11yProps(0)} />
                <Tab label="My Cases" {...a11yProps(1)} />
                <Tab label="Tracking" {...a11yProps(2)} />
                <Tab label="Emergency" {...a11yProps(3)} />
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <NewReports />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <MyInvestigations />
        </TabPanel>
        <TabPanel value={value} index={2}>
            <Tracking />
        </TabPanel>
        <TabPanel value={value} index={3}>
            <Emergency />
        </TabPanel>
        <TabPanel value={value} index={4}>
            <Updates />
        </TabPanel>
    </>
  );
}

export default TabBar;
