import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import {Typography,Grid} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';



const Expansion = props=>{

    const useStyles = makeStyles(theme => ({
        heading: {
          fontSize: theme.typography.pxToRem(15),
          fontWeight: theme.typography.fontWeightRegular,
        },
      }));
    
      const classes = useStyles();

    return(
    <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{props["type"]}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Grid container spacing={3}>
                {props["data"]}
            </Grid>
        </ExpansionPanelDetails>
    </ExpansionPanel>
    );
}

export default Expansion;