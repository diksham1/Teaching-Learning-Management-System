import React,{useState} from 'react';
import './App.css';
import Login from './Components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DashBoard from './Components/Dashboard';
import Class from './Components/Class';
import ClassTeacher from "./Components/ClassTeacher"
import AuthContextProvider from "./Contexts/AuthContext"


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact>
            <AuthContextProvider>
              <Login />
            </AuthContextProvider>
          </Route>
          <Route path="/dashboard" exact>
            <AuthContextProvider>
              <DashBoard />
            </AuthContextProvider>
          </Route>
          <Route path="/class" exact>
            <AuthContextProvider>
              <Class />
            </AuthContextProvider>
          </Route>
          <Route path="/class2" exact>
            <AuthContextProvider>
              <ClassTeacher />
            </AuthContextProvider>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
