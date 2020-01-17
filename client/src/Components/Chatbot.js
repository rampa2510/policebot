import React,{useState,useEffect,useRef} from 'react';
import interceptor from '../Services/Interceptor'
import ToolBar from './Toolbar'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import InputAdornment from '@material-ui/core/InputAdornment';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import StarsIcon from '@material-ui/icons/Stars';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

const useStyles = makeStyles({
  textField:{
    position:'fixed',
    bottom:15,
    width:"90%",
    marginLeft:"5%",
    left:0,
    backgroundColor:"#fff",
    marginTop: "10px"
  },
  botChatCont:{
    left:0,
    width:"100%",
    marginTop:"20px",
    display:'flex',
  },
  botReply:{
    backgroundColor:"#262626",
    color:"#fff",
    maxWidth:"60%",
    // wordBreak:'break-all',
    padding:"10px",
    marginLeft:"10px",
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    hyphens: 'auto',
  },
  botAvatar:{
    color:"#fff",
    backgroundColor:"#262626",
    marginLeft:"10px"
  },
  userChatCont:{
    width:"100%",
    display:'flex',
    marginTop:"20px",
  },
  userReply:{
    backgroundColor:"#fff",
    color:"#262626",
    maxWidth:"60%",
    wordBreak:'break-all',
    padding:"10px",
    marginRight:"10px",
    marginLeft:'auto',
  },
  userAvatar:{
    color:"#262626",
    backgroundColor:"#fff",
    marginRight:"10px"
  },
  chatCont:{
    height:"calc(80vh - 65px)",
    width:"100%",
    overflowY:"scroll",
  }
})

function Chatbot() {
  const WelcomMessage=`Hello PoliceBot here! I am a chatbot designed to report crime, help you
  in difficult situations and create crime awarness for more information type policebot features or policebot f`

  // get initials to show on the avatar icon
  let name = localStorage.getItem('userData');
  name = JSON.parse(name);
  name = name.name
  name = name.slice(0,2)


  const classes = useStyles()
  const [chatHistory,setChatHistory] = useState([{type:'bot',message:WelcomMessage}]);
  const [userChat,setUserChat]=useState('');
  const [isChatDisabled,setDisabled] = useState(false)
  const [isSnackBarOpen,setSnackBar] = useState(false);


  const chatEndRef = React.createRef()

  const scrollToBottom = () => {
    chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom,[chatHistory])

  const inputRef = useRef(null)

  // Function to get reply
  const getBotMsg=async (impChat="")=>{
    setDisabled(true);

      if(!userChat.length && !impChat.length){
        setSnackBar(true);
        return;
      }

      await setChatHistory([...chatHistory,{type:"user",message:impChat.length?impChat:userChat}])
      const data = await interceptor('bot-reply',"POST",{MSG:impChat.length?impChat:userChat});
      if(data.emergency){
        await getCoords();
        return;
      }
      setChatHistory([...chatHistory,{type:"user",message:impChat.length?impChat:userChat},{type:"bot",message:data.reply}]);
      setUserChat('')
      await setDisabled(false)
      inputRef.current.focus()
      
  }

  // success callback for coords
  async function success({coords}) {
    try {
      console.log("l")
      const {display_name,boundingbox} = await fetch(`https://locationiq.org/v1/reverse.php?key=41866a1cdd99d0&lat=${coords.latitude}&lon=${coords.longitude}&format=json`).then(res=>res.json());
      // throw new Error("")
      await interceptor('emergency',"POST",{display_name,boundingbox});
      setDisabled(true);
      await setChatHistory([...chatHistory,{type:"user",message:userChat},{type:"bot",message:"I have sent your coordinates to the policemen! Dont panic help is on its way"}])
      setUserChat('')
      await setDisabled(false)
      inputRef.current.focus()
  
    } catch (err) {
      error()
    }
  } 

  // error callback for coords
  async function error(){
    const addr = prompt("Error finding your location Please enter a benchmark or details of nearby surrounding");
    try {
      await interceptor('/emergency',"POST",{addr});
      alert("I have sent your location to the policemen. Help is on its way");
  
    } catch (err) {
      if(window.confirm("We encountered an issue while trying to connect please check your connection . Do you want to try again?")){
        error()
      }
    }
  }

  // function to get user data
  async function getCoords(){
    // await getBotMsg('');

    if(!window.navigator.geolocation){
      await error()
    }else{
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  // function to render chats
  const renderChat=({type,message,index})=>{
    if(type==="bot"){
      return(
        <div key={index} className={classes.botChatCont}>
          <div className="Mssg"><Avatar className={classes.botAvatar}><StarsIcon /></Avatar></div><Card className={classes.botReply}>{message}</Card>
        </div>
      )
    }

    return (
      <div key={index} className={classes.userChatCont}>
        <Card className={classes.userReply}>{message}</Card><Avatar className={classes.userAvatar}><PersonOutlineIcon /></Avatar>
      </div>
    )
  }



  // event listner for enter key
  const onKeyPress = e=>{
    if(e.key==="Enter") {
      getBotMsg()
      e.preventDefault()
    }
  }

  return (
    <>

    <div className={classes.chatCont}>
    {/* The main chat screen */}
      {chatHistory.map(item=>renderChat(item))}
      <div ref={chatEndRef} />
    </div>
    {/* Message box */}
          <TextField
          multiline
          rowsMax="2"
          disabled={isChatDisabled}
          label="Message"
          variant="outlined"
          className={classes.textField}
          value={userChat}
          onKeyPress={onKeyPress}
          onChange={e=>setUserChat(e.target.value)}
          inputRef={inputRef}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SendIcon onClick={getBotMsg}/>
              </InputAdornment>
            ),
          }}
          />
                 
      {/* Snackbar */}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={isSnackBarOpen}
        autoHideDuration={6000}
        onClose={()=>setSnackBar(false)}
        message="Cannot send an empty message"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={()=>setSnackBar(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}

export default Chatbot;
