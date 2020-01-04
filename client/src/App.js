import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Components/Login';
import RegistrationChatbot from './Components/RegistrationChatbot';
import Register from './Components/Register';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Logout from './Components/Logout';
import Tracking from './Components/Tracking';
import AddPoliceman from './Components/AddPoliceman';
import ManagePolicemen from './Components/ManagePolicemen';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyInvestigations from './Components/MyInvestigations';
import NewReports from './Components/NewReports';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/crimeregistration" component={RegistrationChatbot} />
        <Route path="/crimeawareness" exact component={RegistrationChatbot} />
        <Route path="/tracking" exact component={Tracking} />
        <Route path="/register" exact component={Register} />
        <Route path="/home" exact component={Dashboard} />
        <Route path="/tracking" exact component={Tracking} />
        <Route path="/addpoliceman" exact component={AddPoliceman} />
        <Route path="/managepolicemen" exact component={ManagePolicemen} />
        <Route path="/newreports" exact component={NewReports} />
        <Route path="/myinvestigations" exact component={MyInvestigations} />
        <Route path="/logout" exact component={Logout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
