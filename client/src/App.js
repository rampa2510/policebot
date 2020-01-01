import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './Components/Login'
import RegistrationChatbot from "./Components/RegistrationChatbot";
import Register from './Components/Register';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Logout from './Components/Logout';
import Tracking from './Components/Tracking';
import AddPoliceman from './Components/AddPoliceman';
import ManagePolicemen from './Components/ManagePolicemen'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyInvestigations from "./Components/MyInvestigations";
import NewReports from "./Components/NewReports";

function App() {
  return(
    <BrowserRouter>
    <Navbar />
    <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path="/crimeregistration" component={RegistrationChatbot}></Route>
        <Route path="/crimeawareness" exact component={RegistrationChatbot}></Route>
        <Route path="/tracking" exact component={Tracking}></Route>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/home" exact component={Dashboard}></Route>
        <Route path="/tracking" exact component={Tracking}></Route>
        <Route path="/addpoliceman" exact component={AddPoliceman}></Route>
        <Route path="/managepolicemen" exact component={ManagePolicemen}></Route>
        <Route path="/newreports" exact component={NewReports}></Route>
        <Route path="/myinvestigations" exact component={MyInvestigations}></Route>
        <Route path="/logout" exact component={Logout}></Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
