import React,{useEffect,useState} from 'react';
import '../css/Landing.css';
import {Link} from 'react-router-dom';

const Landing = ()=>{
    const [loaded,setLoaded] = useState(false);
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const handleUsernameChange = e=>{setUsername(e.target.value)}
    const handlePasswordChange = e=>{setPassword(e.target.value)}

    const handleSubmit = e=>{
        e.preventDefault();
        sessionStorage['username']  = username.trim();
        sessionStorage['role']="citizen";
        window.location='/home';
    }

    useEffect(()=>{
        const session_username = sessionStorage.getItem('username');
        if(session_username!==null){
            window.location = '/home';
        }
        else{
            setLoaded(true);
        }
    },[]);

    const loadPage = ()=>{
        if(loaded){
            return(
            <div className="container-fluid">
                <div className="landing row text-center">
                    <div className="col-12 col-md-6" id="intro">
                        <h1>Police Chatbot</h1>
                        <p>This chatbot is used to register a complaint of any unlawful activity and to track the status of that complaint. 
                            It can also be used to gain awareness about crimes in your city.
                        </p>
                    </div>
                    <div className="col-12 col-md-6" id="login">
                        <div id="loginform" className="col-12 col-md-8 offset-md-2 text-center">
                            <div className="jumbotron">
                                <h2>Login</h2>
                                <form onSubmit={handleSubmit}>
                                    <input type="text" placeholder="Username" className="form-control" required onChange={handleUsernameChange}></input>
                                    <input type="password" placeholder = "Password" className="form-control" required onChange={handlePasswordChange}></input>
                                    <input type="submit" className="btn btn-success text-center form-control"></input>
                                </form>
                                <p>Don't have an account? <Link to="/register">Register Here!</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
        }
    }

    return(
        <React.Fragment>
            {loadPage()}
        </React.Fragment>
    );
}

export default Landing;