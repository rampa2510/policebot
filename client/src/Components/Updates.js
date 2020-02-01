import React,{useState, useEffect} from 'react';
import intereptor from '../Services/Interceptor';
import { Grid, Paper, makeStyles, TextField, Button, Hidden } from '@material-ui/core';
import Crime from './Crime';

const Updates = props=>{

    // Checks if loaded
    const [loaded, setLoaded] = useState(false);
    const [data,setData] = useState(null);
    const [updateMsg,setUpdateMsg] = useState('');
    const [caseStatus, setCaseStatus] = useState('');
    const [update,setUpdate] = useState(false);
    const [police,setPolice] = useState([]);
    const [transferTo,setTransferTo] = useState();

    const startInvestigation=async (caseNo)=>{
        try {
            const response = await intereptor(`investigation`,"PATCH",{caseNo:props.currentCaseNo});
            alert('Investigation Started');
            setUpdate(!update);
            setCaseStatus('ongoing')
            console.log(response)
        } catch (error) {
          console.log(error)
        }
      }

    const markSpam = async ()=>{
        try {
            const response = await intereptor(`spam`,"POST",{name:data.name , caseNo:props.currentCaseNo});
          console.log(response)
            props.setCurrentCaseNo(null);
            alert('Spam reported!')
        } catch (error) {
          console.log(error)
        }
    }

    const finishInvestigation=async (caseNo)=>{
        try {
            const response = await intereptor(`finishinvestigation`,"PATCH",{caseNo:caseNo});
            alert('Investigation Completed');
            props.setCurrentCaseNo(null)
        } catch (error) {
          console.log(error)
        }
      }

      const handleTransfer = async e=>{
          e.preventDefault();
          try {
            const response = await intereptor('crime-register', 'PATCH', {newOfficer:transferTo ,caseNo:props.currentCaseNo});
            alert('Case Transfered!')
            props.setCurrentCaseNo(null)
            } catch (error) {
            console.log(error);
            alert(error);
        }
      }

    async function fetchData(){
        const response = await intereptor(`crime-register/${props.currentCaseNo}`)
        const policeList = await intereptor('getpolicemen')
        setPolice(policeList)
        setData(response["caseData"])
        setCaseStatus(response.caseData.status)
        setLoaded(true)
    }

    // get userdata with all info see registration handleSubmit method
    // to view model for this storage
    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    // checks if user is logged in
    useEffect(() => {
        if (userData === null || userData.userType === 'citizen') window.location = '/';
        else{
            fetchData()
        }
    }, [update]);

    // useEffect(()=>{
    //     fetchData()
    // },[update])

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

    const getButtons = ()=>{
        if(caseStatus==='pending'){
            return(
                <>
                <Button variant="contained" color="primary"  className={classes.actionbuttons} onClick={()=>startInvestigation(props.currentCaseNo)}>Investigate</Button>
                <Button variant="contained" color="secondary"  className={classes.actionbuttons} onClick={()=>markSpam()}>Mark As Spam</Button>
                </>
            );
        }
        else if(caseStatus==='ongoing'){
            return(
                <>
                <form onSubmit={handleSubmit}>
                    <TextField required variant="outlined" className={classes.field} value={updateMsg} onChange={e=>setUpdateMsg(e.target.value)} placeholder="Update" />
                    
                    <Button color="primary" variant="contained" className={classes.formButtons} type="submit">
                        Update
                    </Button>
                </form>
                <form onSubmit={handleTransfer}>
                    <select required list="policemanList" value={transferTo} onChange={e=>setTransferTo(e.target.value)}>
                        <option value="" disabled selected>Select Police Officer</option>
                    {police.map((item)=><option value={item.name} >{item.name}</option>)}
                    </select>
                    <Button color="primary" variant="contained" className={classes.formButtons} type="submit">
                        Transfer Case
                    </Button>
                </form>
                <Button variant="contained" color="secondary"  className={classes.actionbuttons} onClick={()=>markSpam()}>Mark As Spam</Button>
                <Button variant="contained" color="primary" className={classes.actionbuttons} onClick={()=>finishInvestigation(props.currentCaseNo)}>Finish Investigation</Button>
                </>
            );
        }
    }

    const handleSubmit = async e=>{
        e.preventDefault();
        try {
            const response = await intereptor('update-details', 'POST', {date:Date(), details:updateMsg ,caseNo:props.currentCaseNo,});
            setUpdateMsg('')
            setUpdate(!update);
            alert('Update Sent!')
            } catch (error) {
            console.log(error);
            alert(error);
        }
        
    }

    const loadPage = ()=>{
        if(loaded){
        return(
                <Grid className={classes.root} container spacing={0}>
                    <Hidden smDown>
                        <Grid item md={3}></Grid>
                    </Hidden>
                    <Grid item xs={12} md={6}>
                    {getButtons()}
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
            );
        }
    }

    return(
        <>{loadPage()}</>
    );
}

export default Updates;