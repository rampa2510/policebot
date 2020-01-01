import React,{useEffect,useState} from 'react';
import '../css/Register.css';

const Register = ()=>{
    const [loaded,setLoaded] = useState(false);
    const [username,setUsername] = useState('');
    const [fullName,setFullName] = useState('');
    const [password,setPassword] = useState('');

    const handleUsernameChange = e=>{setUsername(e.target.value)}
    const handleFullNameChange = e=>{setFullName(e.target.value)}
    const handlePasswordChange = e=>{setPassword(e.target.value)}

    const handleSubmit = e=>{
        e.preventDefault();
        sessionStorage['username']  = username.trim();
        sessionStorage['fullName']=fullName;
        sessionStorage['password'] = password;
        sessionStorage['role'] = 'citizen';
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
                <div className="markattendance row text-center">
                    <div className="col-12 col-md-6 col-lg-4" id="login">
                        <div id="loginform" className="col-12 text-center">
                            <div className="jumbotron">
                                <h2>Register</h2>
                                <form onSubmit={handleSubmit}>
                                    <input type="text" placeholder="Full Name" onChange={handleFullNameChange} className="form-control" required></input>
                                    <input type="text" placeholder="Username" onChange={handleUsernameChange} className="form-control" required></input>
                                    <input type="password" placeholder="Password" onChange={handlePasswordChange} className="form-control" required></input>
                                    <input type="submit" className="btn btn-success text-center form-control"></input>
                                </form>
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

export default Register;