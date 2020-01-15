import React,{useState} from 'react';
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

const useStyles = makeStyles({
  textField:{
    position:'absolute',
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
    marginTop:"5px",
    display:'flex',
  },
  botReply:{
    backgroundColor:"#262626",
    color:"#fff",
    maxWidth:"60%",
    wordBreak:'break-all',
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
    display:'flex',
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
    height:"80vh",
    overflowY:"scroll",
    marginTop:"20px"
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

  // Function to get reply
  const getBotMsg=async ()=>{
    setDisabled(true);


    if(!userChat.length){
      setSnackBar(true);
      return;
    }

    await setChatHistory([...chatHistory,{type:"user",message:userChat}])
    const data = await interceptor('bot-reply',"POST",{MSG:userChat});
    setChatHistory([...chatHistory,{type:"user",message:userChat},{type:"bot",message:data.reply}]);
    setUserChat('')
    setDisabled(false)
  }


  // function to render chats
  const renderChat=(item)=>{
    if(item.type==="bot"){
      return(
        <div key={item.index} className={classes.botChatCont}>
          <div className="Mssg"><Avatar className={classes.botAvatar}>PB</Avatar></div><Card className={classes.botReply}>{item.message}</Card>
        </div>
      )
    }

    return (
      <div className={classes.userChatCont}>
  <Card className={classes.userReply}>{item.message}</Card><Avatar className={classes.userAvatar}>{name}</Avatar>
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
    <div>
      <ToolBar/>
    </div>

    <div className={classes.chatCont}>
    {/* The main chat screen */}
      {chatHistory.map(item=>renderChat(item))}

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
