import React, { Component, createContext } from "react";

export const ClassContext = createContext();

class ClassContextProvider extends Component {
  state = {
      classCode_state : "",
      className_state : "",
      creator_name_state:""
  };

  setclassCode_state = (p) => {
    this.setState({ classCode_state : p });
  };


  setclassName_state = (p) => {
    this.setState({ className_state: p });
  };

  setcreator_name_state = (p) => {
    this.setState({ creator_name_state: p });
  };


  render() {
    return (
      <ClassContext.Provider
        value={{
          ...this.state,
          setclassName_state: this.setclassName_state,
          setclassCode_state: this.setclassCode_state,
          setcreator_name_state: this.setcreator_name_state,
        }}
      >
        {this.props.children}
      </ClassContext.Provider>
    );
  }
}

export default ClassContextProvider;
