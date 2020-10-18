//This module renders the Login page of the application.
//The SignUpFormOverlay is imported from another module while the sign up overlay is present on page
//props : none


import React, { useState , useContext} from 'react';
import { Link , Redirect} from 'react-router-dom';
import ROUTES from '../routes';
import Logo from "./Logo.js"
import Footer from "./Footer.js"
import axios from 'axios';    //api calls
import SignUpFormOverlay from './SignUpFormOverlay.js' //displayed on clicking "Sign Up"
import {AuthContext} from '../Contexts/AuthContext'


export default function Login() {

  const [redirect, setRedirect] = useState(null); //sets whether the page needs to redirect to another route or not,stores the redirect url
  const [custommessage,setcustommessage] = useState(""); //detects the logging while credentilas are being verified
  const [showSignUpOverlay,setshowSignUpOverlay] = useState(false) //enalble/disable sign up form
  const [showSignInOverlay, setshowSignInOverlay] = useState(false); //enable/disable sign in overlay options
  const p = useContext(AuthContext)

  

  async function setUserMessage(p){
    setcustommessage(p)
    document.getElementById("name").value = ""; 
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("password").value = "";
    document.getElementById("cpassword").value = "";
    setshowSignUpOverlay(false)
  }


  //handles the case when signin button is clicked
  async function handle_login() {

    setcustommessage(""); //this varible is to be used for custom message display. May be modified to include display messages 
    //const loginResponse = await axios.get(ROUTES.api.get.login);
    //console.log(loginResponse);
    //setRedirect(ROUTES.student.dashboard);
    console.log(p);
    setshowSignInOverlay(true)
  }

  function handle_signup(){
    //handles the case when sign up button is pressed
    setshowSignUpOverlay(true)
  }

  function handle_random_click_on_overlay(event){
    //function to detect clicks when an overlay is visible. If the user clicks outside the overlay
    //area, the overlay closes
    const s = event.target
    const t1 = Array.from(
      document.querySelector(".overlay").querySelectorAll("*")
    );
    const t2 = Array.from(
      document.querySelector(".overlay2").querySelectorAll("*")
    );
    if(!t1.includes(s))
    {
      setshowSignUpOverlay(false)
    }
    if (!t2.includes(s)) {
      setshowSignInOverlay(false)
    }
  }



  const overlaycss = "bg-black bg-opacity-75 z-10 fixed w-screen h-screen flex flex-row items-center justify-center"
  const overlaycss2 = "md:w-5/12 w-8/12 overlay"
  const overlaycss3 =
    "bg-black bg-opacity-50 z-10 fixed w-screen h-screen flex flex-row items-center justify-center";
  const overlaycss4 = "md:w-3/12 w-5/12 p-4 flex flex-col overlay2 bg-gray-200 border-red-700 borde-solid border-2"
  const overlaybuttoncss = "m-1 bg-red-700 hover:bg-red-600 p-2 rounded-lg"
  const backgroundcss = "w-screen h-screen flex flex-col justify-center items-center"
  const logocss = "flex flex-col w-6/12 h-5/12 bg-gray-200 justify-center items-center bg-opacity-50 hover:bg-opacity-75 rounded-lg p-4 border-4 border-red-700 shadow-2xl"
  const logocss2 = "md:w-8/12 w-11/12";
  const forminputtitle = "mt-4 w-full text-2xl font-medium text-red-800"
  const forminput =
    "w-full rounded-lg sm:p-4 p-2 focus:bg-gray-200 text-opacity-75";
  const buttoncss = "flex-1 px-4 py-2 m-4 md:w-1/2 w-full bg-red-700 hover:bg-red-600 hover:z-10 rounded-lg text-lg"
  const remainingcss1 = "flex flex-col w-full px-8 justify-center items-center sm:flex-row "
  const remainingcss2 = "flex flex-row w-full p-2 m-2 text-2xl justify-center font-bold"


  if (redirect) { //if redirect is true then redirect to a different route
    return <Redirect to={redirect} />;
  }

  return (
    <div>
      <div
        class={overlaycss}
        style={{
          display: showSignUpOverlay ? "flex" : "none",
        }}
        onClick={handle_random_click_on_overlay}
      >
        <div class={overlaycss2}>
          <SignUpFormOverlay setusrmsg = {setUserMessage}/>
        </div>
      </div>
      <div
        class={overlaycss3}
        style={{
          display: showSignInOverlay ? "flex" : "none",
        }}
        onClick={handle_random_click_on_overlay}
      >
        <div class={overlaycss4}>
          <button class={overlaybuttoncss}>Sign In as Educator</button>
          <button class={overlaybuttoncss}>Sign In as Educatee</button>
        </div>
      </div>
      <div
        class={backgroundcss}
        style={{
          backgroundImage: "url(/images/classroom.jpg)",
          backgroundSize: "cover",
        }}
      >
        <div class={logocss}>
          <div class={logocss2}>
            <Logo />
          </div>

          <div class={forminputtitle}>Email</div>
          <div class="w-full">
            <input
              type="text"
              id="username"
              placeholder="jane@example.com"
              class={forminput}
            ></input>
          </div>
          <div class={forminputtitle}>Password</div>
          <div class="w-full">
            <input
              type="password"
              id="username"
              placeholder="'qwertyuiop' is a terrible password"
              class={forminput}
            ></input>
          </div>
          <div class={remainingcss1}>
            <button onClick={handle_login} class={buttoncss}>
              Sign In
            </button>
            <button onClick={handle_signup} class={buttoncss}>
              Sign Up
            </button>
          </div>
          <div class= {remainingcss2}
            style = {{
              display : (custommessage)?"":"none"
            }}>
            <div>{custommessage}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
