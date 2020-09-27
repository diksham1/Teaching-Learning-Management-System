import React from 'react';
import './App.css';
import Login from './Components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DashBoard from './Components/Dashboard';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
        </Switch>
        <Switch>
          <Route path="/dashboard" exact component={DashBoard} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
