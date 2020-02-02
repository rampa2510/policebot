import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Components/Login';
import Logout from './Components/Logout';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import Updates from './Components/Updates';
import AddPolice from './Components/AddPolice';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/home" exact component={Dashboard} />
        <Route path="/logout" exact component={Logout} />
        <Route path = '/update/' component={Updates}></Route>
        <Route path = '/addpolice' component={AddPolice}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
