import React,{useState,useEffect,useRef} from 'react';
import interceptor from '../Services/Interceptor';
import { makeStyles, InputAdornment, TextField, Card, Avatar, Snackbar, IconButton } from '@material-ui/core';
import StarsIcon from '@material-ui/icons/Stars';
import CloseIcon from '@material-ui/icons/Close'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import SendIcon from '@material-ui/icons/Send';
import { getCoords } from '../Services/emergency'
import MicIcon from '@material-ui/icons/Mic';
import MicNoneIcon from '@material-ui/icons/MicNone';

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

  const [listening, setListening] = useState(false);
 
  var SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.interimResults = false;

  recognition.onresult = function(event) {
      var last = event.results.length - 1;
      var command = event.results[last][0].transcript;
      setListening(false);
      setUserChat(command)
  };

  recognition.onspeechend = function() {
      recognition.stop();
  };

  recognition.onerror = function(event) {
     console.log('Error occurred in recognition: ' + event.error);
  }        




  const classes = useStyles()
  const [chatHistory,setChatHistory] = useState([{type:'bot',message:WelcomMessage}]);
  const [userChat,setUserChat]=useState('');
  const [isChatDisabled,setDisabled] = useState(false)
  const [isSnackBarOpen,setSnackBar] = useState(false)
  const chatEndRef = React.createRef()
  let count = -1;

  const scrollToBottom = () => {
    count = count+1;
    var elem = document.getElementById('scrolldiv');
    elem.scrollTop = elem.scrollHeight;
    var messagestest = document.getElementsByClassName("messages");
    messagestest[messagestest.length-1].innerHTML = messagestest[messagestest.length-1].innerHTML.replace(/\\n/g, "<br />");
  }

  useEffect(scrollToBottom,[chatHistory])

  const inputRef = useRef(null)

  // Function to get reply
  const getBotMsg=async e=>{
    
      setDisabled(true);

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
        await setDisabled(false)
        inputRef.current.focus()
        return;
      }


      setChatHistory([...chatHistory,{type:"user",message:userChat},{type:"bot",message:data.reply}]);
      setUserChat('')
      await setDisabled(false)
      inputRef.current.focus()
  }

  const checkListening = ()=>{
    if(listening===false)
      return <MicNoneIcon style={{paddingRight:"10px"}} onClick={()=>{setListening(true); recognition.start()}}/>
    else
      return <MicIcon style={{paddingRight:"10px"}} onClick={()=>{setListening(false); recognition.stop()}} />

  }

  // function to render chats
  const renderChat=({type,message},index)=>{
    if(type==="bot"){
      return(
        <div key={index} className={classes.botChatCont}>
          <div className="Mssg"><Avatar className={classes.botAvatar}><StarsIcon /></Avatar></div><Card className={[classes.botReply,"message"].join(' ')}>{message}</Card>
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

    <div className={classes.chatCont} id="scrolldiv">
    {/* The main chat screen */}
      {chatHistory.map((item,index)=>renderChat(item,index))}
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
                {checkListening()}
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
