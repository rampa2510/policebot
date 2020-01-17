import React,{useState,useEffect,useRef} from 'react';
import interceptor from '../Services/Interceptor'
// import ToolBar from './Toolbar'
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
import { getCoords } from '../Services/emergency'

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
    // overflowWrap: 'break-word',
    // wordWrap: 'break-word',
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
    // wordBreak:'break-all',
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
    height:"calc(100vh - 190px)",
    width:"100%",
    overflowY:"scroll",
    marginBottom:"81px",
  }
})

function Chatbot() {
  const WelcomMessage=`Hello, PoliceBot here! I am a chatbot designed to register crimes, help you
  in difficult situations and create crime awarness! To request immediate police presence at your location, type 100. Type policebot f for more features.`


  const classes = useStyles()
  const [chatHistory,setChatHistory] = useState([{type:'bot',message:WelcomMessage}]);
  const [userChat,setUserChat]=useState('');
  const [isChatDisabled,setDisabled] = useState(false)
  const [isSnackBarOpen,setSnackBar] = useState(false)


  const chatEndRef = React.createRef()

  const scrollToBottom = () => {
    var elem = document.getElementById('scrolldiv');
    elem.scrollTop = elem.scrollHeight;
  }

  useEffect(scrollToBottom,[chatHistory])

  const inputRef = useRef(null)

  // Function to get reply
  const getBotMsg=async e=>{
    

      if(!userChat.length ){
        setSnackBar(true);
        await setDisabled(false)
        return;
      }

      await setChatHistory([...chatHistory,{type:"user",message:userChat}])
      const data = await interceptor('bot-reply',"POST",{MSG:userChat});
      if(data.emergency){
        await getCoords();
        await setChatHistory([...chatHistory,{type:"user",message:userChat},{type:"bot",message:"I have sent your coordinates to the policemen! Dont panic help is on its way"}])
        inputRef.current.focus()
        return;
      }

      setDisabled(true);

      setChatHistory([...chatHistory,{type:"user",message:userChat},{type:"bot",message:data.reply}]);
      setUserChat('')
      await setDisabled(false)
      inputRef.current.focus()
  }

  
  // function to render chats
  const renderChat=({type,message,index})=>{
    if(type==="bot"){
      return(
        <>
        <div key={index} className={classes.botChatCont}>
          <div className="Mssg"><Avatar className={classes.botAvatar}><StarsIcon /></Avatar></div><Card className={classes.botReply}>{message}</Card>
        </div>
        <br/>
        </>
      )
    }

    return (
      <>
      <div key={index} className={classes.userChatCont}>
        <Card className={classes.userReply}>{message}</Card><Avatar className={classes.userAvatar}><PersonOutlineIcon /></Avatar>
      </div>
      <br/>
      </>
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

    <div className={classes.chatCont} id="scrolldiv">
    {/* The main chat screen */}
      {chatHistory.map(item=>renderChat(item))}
      <div ref={chatEndRef} />
    </div>
    {/* Message box */}
      <div className={classes.behindText}>
          <TextField
          multiline
          rowsMax="2"
          disabled={isChatDisabled}
          placeholder="Message"
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
          </div>
                 
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
