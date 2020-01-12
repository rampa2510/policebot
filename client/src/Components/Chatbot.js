import React,{useState} from 'react';
import interceptor from '../Services/Interceptor'

function Chatbot() {
  const crimeData = {};
  const [userReply,setUserReply]=useState([]);
  const [chatBotReply,setChatBotReply] = useState([]);
  const [userChat,setChat]=useState('');
  const config = {
    width: '100%',
    height: '100vh',
  };

  const sendData=async ()=>{
    try {
      let res = await interceptor('/crime-register',"POST",crimeData)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const getBotMsg=async (e)=>{
    setUserReply([...userReply,userChat]);
    const data = await interceptor('bot-reply',"POST",{MSG:userChat});
    setChat('')
    setChatBotReply([...chatBotReply,data.reply])
    console.log(data)
  }

  return (
    <>
    <div className="chat-output" id="chat-output">
      <div className="user-message">
        <div className="message">Hi! I'm a bot. What's up?</div>
      </div>
      {chatBotReply.map(item=>{
        return (<div className='bot-message'>
        <div className='message'>
          {item}
        </div>
      </div>)
      })
      }
    </div>

    <div class="chat-input">
    {userReply.map(item=>{
        return (<div class='bot-message'>
        <div class='message'>
          {item}
        </div>
      </div>)
      })
      }
      <form action="#0" id="user-input-form">
        <input onChange={e=>setChat(e.target.value)} type="text" id="user-input" class="user-input" placeholder="Talk to the bot." />
        <input type="submit" onClick={getBotMsg} />
      </form>
    </div>
    </>
  );
}

export default Chatbot;
