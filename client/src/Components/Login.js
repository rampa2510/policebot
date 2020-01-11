import React, { useEffect, useState } from 'react';
import '../css/Landing.css';
import { Link } from 'react-router-dom';
import interceptor from '../Services/Interceptor';
import Bot1 from '../images/Bot.png'
import Logo from '../images/BPRD_Logo.png'

const Landing = () => {
  const [loaded, setLoaded] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const reqObj = { username, password };

    try {
      const response = await interceptor('login', 'POST', reqObj);
      localStorage.setItem('Token', JSON.stringify(response.token));
      localStorage.setItem('userData', JSON.stringify(response.data));
      window.location = '/home';
    } catch (error) {
      // console.log(error)
      alert(error.message);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
      window.location = '/home';
    } else {
      setLoaded(true);
    }
  }, []);

  const loadPage = () => {
    if (loaded) {
      return (
        <div className="register">

        
          <img src={Bot1} className="responsive-image"/>
        
          <div className="form">
          <h1 className="reg-head">PoliceBot</h1>
          <form onSubmit={handleSubmit}>
               <input onChange={(e)=>handleUsernameChange(e)} type="text" placeholder="Username"/>
               <input onChange={(e)=>handlePasswordChange(e)} type="password" placeholder="Password"/>


               <button type="submit"> Login </button>
          </form>
          <br/>
          <p>
            Or
          </p>
          <Link to="/register"><button>Register</button></Link>
        </div>
        

        
          <img src={Logo} className="responsive-image" />
        
        </div>

        
      );
    }
  };

  return <>{loadPage()}</>;
};

export default Landing;
