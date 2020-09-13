import React from 'react';
import './App.css';
import Login from './Components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
