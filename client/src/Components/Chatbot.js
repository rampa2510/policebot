import React,{useState} from 'react';
import interceptor from '../Services/Interceptor'
import ToolBar from './Toolbar'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  textField:{
    position:'absolute',
    bottom:5,

  }
})

function Chatbot() {
  const classes = useStyles()
  const [userReply,setUserReply]=useState([]);
  const [chatBotReply,setChatBotReply] = useState([]);
  const [userChat,setChat]=useState('');


  const getBotMsg=async (e)=>{
    setUserReply([...userReply,userChat]);
    const data = await interceptor('bot-reply',"POST",{MSG:userChat});
    setChat('')
    setChatBotReply([...chatBotReply,data.reply])
    console.log(data)
  }

  return (
    <>
    <div>
      <ToolBar/>
    </div>
    <div className={classes.textField}>
      <TextField />
    </div>
    </>
  );
}

export default Chatbot;
