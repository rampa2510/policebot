import React,{useState, useEffect} from 'react';
import intereptor from '../Services/Interceptor';
import { Grid, Paper, makeStyles, TextField, Button, Hidden, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
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
            textAlign: "center",
            maxWidth:"100vw",
            marginTop:"10px",
        },
        field:{
            background:"#fff",
            width:"100%",
          },
          paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
            textAlign:"center",
            },
          formButtons: {
          	height:"100%",
          	width:"100%",
            background:"#262626",
            "&:hover": {
              backgroundColor: "#808080"
          }
          }
      }));
    
    const classes = useStyles();

    const getButtons = ()=>{
        if(caseStatus==='pending'){
            return(
            	<Grid container spacing={4} style={{paddingTop:"15px"}}>
	            	<Hidden smDown>
	            	<Grid item md={3}/>
	            	</Hidden>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper} elevation={3}>
                            <Crime data={data} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:"20px", minHeight:"100vh%"}}>
                    
                <Grid container spacing={1} style={{width:"100%", textAlign:"center", height:"100%", }}>
            	
            		<Grid item xs={1} md={4}/>			
            	
                <Grid item xs={5} md={2}>
                <Button variant="contained" color="primary"  className={classes.actionbuttons} onClick={()=>startInvestigation(props.currentCaseNo)}>Investigate</Button>
                </Grid>
                <Grid item xs={5} md={2}>
                <Button variant="contained" color="secondary"  className={classes.actionbuttons} onClick={()=>markSpam()}>Mark Spam</Button>
                </Grid>
                </Grid>
                </Grid>
                </Grid>
            );
        }
        else if(caseStatus==='ongoing'){
            return(
            	<Grid container spacing={4} style={{paddingTop:"15px"}}>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper} elevation={3}>
                            <Crime data={data} />
                        </Paper>
                    </Grid>
                    <Hidden smUp>
                    <Grid item xs={1}/>
                    </Hidden>
                    <Grid item xs={12} md={6} style={{marginTop:"20px", minHeight:"100vh%"}}>
                <Grid container spacing={2} style={{minHeight:"50vh", textAlign:"center"}}>
		                <form onSubmit={handleSubmit} style={{width:"100%"}}>
		                	<Grid container spacing={2}>
		                		<Grid item xs={8} md={9}>
		                    	<TextField required variant="outlined" className={classes.field} value={updateMsg} onChange={e=>setUpdateMsg(e.target.value)} placeholder="Update" />
		                    	</Grid>
		                    	<Grid item xs={4} md={3}>
		                    	<Button color="primary" variant="contained" className={classes.formButtons} type="submit">
		                        	Update
		                    	</Button>
		                    	</Grid>
		                    </Grid>
		                </form>
                <form onSubmit={handleTransfer} style={{width:"100%"}}>
                	<Grid container spacing={2}>

		                		<Grid item xs={8} md={9}>
		                			<FormControl variant="outlined" style={{width:"100%"}}>
		                			<InputLabel>Select Police Officer</InputLabel>
                    				<Select style={{width:"100%"}} className={classes.field} required list="policemanList" value={transferTo} onChange={e=>setTransferTo(e.target.value)}>
				                        
				                    	{police.map((item)=>{if(item.name!==data.name)return(<MenuItem value={item.name} >{item.name}</MenuItem>);})}
				                    </Select>
				                    </FormControl>
				                </Grid>
				                <Grid item xs={4} md={3}>
				                    <Button color="primary" variant="contained" className={classes.formButtons} type="submit">
				                        Transfer
				                    </Button>
				                </Grid>
	                </Grid>
                </form>
                <Grid container spacing={2} style={{width:"100%", textAlign:"center"}}>
                	
                		<Grid item xs={1}/>			
                	
                	<Grid item xs={5}>
                	<Button variant="contained" color="secondary"  className={classes.actionbuttons} onClick={()=>markSpam()}>Mark Spam</Button>
                	</Grid>
                	<Grid item xs={5}>
                	<Button variant="contained" color="primary" className={classes.actionbuttons} onClick={()=>finishInvestigation(props.currentCaseNo)}>Complete</Button>
                	</Grid>
                	</Grid>
               	</Grid>
               	</Grid>
                </Grid>
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
               <> 
                    	{getButtons()}
                   </>
            );
        }
    }

    return(
        <>{loadPage()}</>
    );
}

export default Updates;