import React,{useState} from 'react';
import interceptor from '../Services/Interceptor'
import ToolBar from './Toolbar'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import InputAdornment from '@material-ui/core/InputAdornment';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
const useStyles = makeStyles({
  textField:{
    position:'absolute',
    bottom:15,
    width:"90%",
    marginLeft:"5%",
    left:0,
    backgroundColor:"#fff"
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
    width:"60%",
    wordBreak:'break-all',
    padding:"10px",
    marginLeft:"10px"
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
    width:"60%",
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
    marginTop:"50px"
  }
})

function Chatbot() {
  const classes = useStyles()
  const [chatHistory,setChatHistory] = useState([{type:'bot',message:"Hello"}]);
  const [userChat,setUserChat]=useState('');
  const [isChatDisabled,setDisabled] = useState(false)

  const getBotMsg=async ()=>{
    setDisabled(true);
    await setChatHistory([...chatHistory,{type:"user",message:userChat}])
    // setUserReply([...userReply,userChat]);
    const data = await interceptor('bot-reply',"POST",{MSG:userChat});
    setChatHistory([...chatHistory,{type:"user",message:userChat},{type:"bot",message:data.reply}]);
    setUserChat('')
    setDisabled(false)
  }

  const renderChat=(item)=>{
    if(item.type==="bot"){
      return(
        <div className={classes.botChatCont}>
          <Avatar className={classes.botAvatar}>PB</Avatar> <Card className={classes.botReply}>{item.message}</Card>
        </div>  
      )
    }

    return (
      <div className={classes.userChatCont}>
        <Card className={classes.userReply}>{item.message}</Card><Avatar className={classes.userAvatar}>U</Avatar> 
      </div>
    )
  }

  return (
    <>
    <div>
      <ToolBar/>
    </div>
    <div className={classes.chatCont}>
      {/* <div className={classes.botChatCont}>
      <Avatar className={classes.botAvatar}>PB</Avatar> <Card className={classes.botReply}>Helllodsjdsjkdajkdbajkdabadsasdkdasb</Card>
      </div>
      <div className={classes.userChatCont}>
      <Card className={classes.userReply}>Helllodsjdsjkdajkdbajkdabadsasdkdasb</Card><Avatar className={classes.userAvatar}>U</Avatar> 
      </div> */}
      {chatHistory.map(item=>renderChat(item))}
    </div>
      <TextField 
      multiline
      rowsMax="2" 
      disabled={isChatDisabled} 
      label="Message" 
      variant="outlined"
      className={classes.textField}
      value={userChat}
      onChange={e=>setUserChat(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SendIcon onClick={getBotMsg}/>
          </InputAdornment>
        ),
      }}
      />
    </>
  );
}

export default Chatbot;
