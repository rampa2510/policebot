import React,{useState, useEffect} from 'react';
import intereptor from '../Services/Interceptor';
import Crime from './Crime';
import { Grid, Paper, makeStyles, TextField, Button, Hidden } from '@material-ui/core';
// import TabBar from './TabBar'
import Toolbar from './Toolbar'

const Updates = props=>{

    // Checks if loaded
    const [loaded, setLoaded] = useState(false);
    const urlname = props.location.pathname.substring(8);
    const [data,setData] = useState(null);
    const [updateMsg,setUpdateMsg] = useState('');

    const  checkExists = async ()=>{
        try {
            const response = await intereptor(`crime-register/${parseInt(urlname)}`)
            if(response["caseData"]==null)
                window.location='/home'
            else{
                setData(response["caseData"])
                setLoaded(true)
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    // get userdata with all info see registration handleSubmit method
    // to view model for this storage
    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    // checks if user is logged in
    useEffect(() => {
        if (userData === null || userData.userType === 'citizen') window.location = '/';
        else{
            checkExists()
        }
    }, []);

    const useStyles = makeStyles(theme => ({
        root: {
            marginTop:"32px",
            textAlign: "center",
            padding:theme.spacing(2),
            minHeight:"100vh",
            maxWidth:"100vw",
            alignItems:"center",
        },
        field:{
            background:"#fff",
            margin: theme.spacing(1),
            width:"80%",
          },
          paper: {
            margin: theme.spacing(2),
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
            },
          formButtons: {
            width:"80%",
            margin: theme.spacing(1),
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            background:"#262626",
            padding: "12px",
            "&:hover": {
              backgroundColor: "#808080"
          }
          }
      }));
    
    const classes = useStyles();


    const handleSubmit = async e=>{
        e.preventDefault();
        try {
            const response = await intereptor('update-details', 'POST', {date:Date(), details:updateMsg ,caseNo:urlname,});
            console.log(response);
            checkExists()
            } catch (error) {
            console.log(error);
            alert(error);
        }
        
    }

    const loadPage = ()=>{
        if(loaded){
            return(
                <>
                <div>
                <Toolbar/>
                </div>
                <Grid className={classes.root} container spacing={0}>
                    <Hidden smDown>
                        <Grid item md={3}></Grid>
                    </Hidden>
                    <Grid item xs={12} md={6}>
                    <form onSubmit={handleSubmit}>
                        <TextField required variant="outlined" className={classes.field} onChange={e=>setUpdateMsg(e.target.value)} placeholder="Update" />
                        
                        <Button color="primary" variant="contained" className={classes.formButtons} type="submit">
                            Update
                        </Button>
                    </form>
                    </Grid>
                    <Hidden smDown>
                        <Grid item md={3}></Grid>
                    </Hidden>
                    <Hidden smDown>
                        <Grid item md={3} ></Grid>
                    </Hidden>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper} elevation={3}>
                            <Crime data={data} />
                        </Paper>
                    </Grid>
                </Grid>
                </>
            );
        }
    }

    return(
        <>{loadPage()}</>
    );
}

export default Updates;