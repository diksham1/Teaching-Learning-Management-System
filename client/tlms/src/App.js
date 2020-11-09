import React,{useState} from 'react';
import './App.css';
import Login from './Components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DashBoard from './Components/Dashboard';
import Class from './Components/Class';
import AuthContextProvider from "./Contexts/AuthContext"
import ClassContextProvider from "./Contexts/ClassContext"


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <AuthContextProvider>
            <ClassContextProvider>
              <Login />
            </ClassContextProvider>
          </AuthContextProvider>
        </Route>
        <Route path="/dashboard" exact>
          <AuthContextProvider>
            <ClassContextProvider>
              <DashBoard />
            </ClassContextProvider>
          </AuthContextProvider>
        </Route>
        <Route path="/class" exact>
          <AuthContextProvider>
            <ClassContextProvider>
              <Class />
            </ClassContextProvider>
          </AuthContextProvider>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
