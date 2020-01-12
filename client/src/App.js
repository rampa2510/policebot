import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Login} />
        {/* <Route path="/tracking" exact component={Tracking} /> */}
        <Route path="/register" exact component={Register} />
        <Route path="/home" exact component={Dashboard} />
        {/* <Route path="/newreports" exact component={NewReports} /> */}
        {/* <Route path="/myinvestigations" exact component={MyInvestigations} /> */}
        {/* <Route path="/logout" exact component={Logout} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
