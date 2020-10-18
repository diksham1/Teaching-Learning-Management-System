import React from 'react';
import './App.css';
import Login from './Components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DashBoard from './Components/Dashboard';
import Class from './Components/Class';
import ClassTeacher from "./Components/ClassTeacher"
import AuthContextProvider from "./Contexts/AuthContext.js"

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
        </Switch>
        <Switch>
          <Route path="/dashboard" exact component={DashBoard} />
        </Switch>
        <Switch>
          <Route path="/class" exact component={Class} />
        </Switch>
        <Switch>
          <Route path="/class2" exact component={ClassTeacher} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
