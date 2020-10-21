import React, { Component, createContext} from "react";

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    isLoggedIn_state: false,
    isEducator_state: false,
    email_state: "",
    name_state: ""
  };

  toggleisLoggedIn_state = () => {
    this.setState({ isLoggedIn_state : !this.state.isLoggedIn_state})
  }

  toggleisEducator_state = () => {
    this.setState({ isEducator_state : !this.state.isEducator_state})
  }

  setemail_state = (p) => {
    this.setState( {email_state : p} )
  }

  setname_state = (p) => {
    this.setState( {name_state : p} )
  }

  render() {
    return (
      <AuthContext.Provider value={
        {...this.state, 
          toggleisLoggedIn_state : this.toggleisLoggedIn_state,
          setemail_state : this.setemail_state,
          setname_state : this.setname_state,
          toggleisEducator_state : this.toggleisEducator_state
        }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContextProvider
