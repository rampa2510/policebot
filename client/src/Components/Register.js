import React, { useEffect, useState } from 'react';
import '../css/Register.css';
import interceptor from '../Services/Interceptor';
import Bot1 from '../images/Bot.png'
import Logo from '../images/BPRD_Logo.png'

const Register = () => {
  const [loaded, setLoaded] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };
  const handleFullNameChange = e => {
    setFullName(e.target.value);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };
  const handleAddressChange = e => {
    setCity(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const userObj = { username, name, password,city, userType: 'citizen' };
    try {
      const response = await interceptor('register', 'POST', userObj);
      console.log(response);
      localStorage.setItem('Token', JSON.stringify(response.token));
      delete userObj.password;
      localStorage.setItem('userData', JSON.stringify(userObj));
      window.location = '/home';
    } catch (error) {
      console.log(error);
      alert(error);
    }
    // window.location='/home';
  };

  useEffect(() => {
    const session_username = sessionStorage.getItem('username');
    if (session_username !== null) {
      window.location = '/home';
    } else {
      setLoaded(true);
    }
  }, []);

  const loadPage = () => {
    if (loaded) {
      return (
        <div className="register">

        <h1 className="reg-head">PoliceBot</h1>
        <div className="content-grid">
        <div className="col col-lg">
          <img src={Bot1} className="responsive-image"/>
        </div>

        <div className="col col-lg">
          <div className="form">
          <form>
               <input onChange={(e)=>handleFullNameChange(e)} type ="text" placeholder="Full Name"/>
               <input onChange={(e)=>handleUsernameChange(e)} type ="text" placeholder="UserName"/>
               <input onChange={(e)=>handlePasswordChange(e)} type="password" placeholder="Password"/>
               <input onChange={(e)=>handleAddressChange(e)} type="text" placeholder="City"/>

               <button onClick={handleSubmit}> Register </button>
          </form>
        </div>
        </div>

        <div className="col col-lg col-md col-xs">
          <img src={Logo} className="responsive-image" />
        </div>
        </div>

        </div>
      );
    }
  };

  return <>{loadPage()}</>;
};

export default Register;
