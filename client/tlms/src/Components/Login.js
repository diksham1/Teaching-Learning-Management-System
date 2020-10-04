import React, { useState } from 'react';
import { Link , Redirect} from 'react-router-dom';
import ROUTES from '../routes';
import Logo from "./Logo.js"
import Footer from "./Footer.js"
import axios from 'axios';
import SignUpFormOverlay from './SignUpFormOverlay.js'


export default function Login() {

  const [redirect, setRedirect] = useState(null);
  const [isLogging,setisLogging] = useState(false);
  const [showSignUpOverlay,setshowSignUpOverlay] = useState(false)
  const [showSignInOverlay, setshowSignInOverlay] = useState(false);

  async function handle_login() {
    setisLogging(true); //this varible is to be used for custom message display. May be modified to include display messages 
    //const loginResponse = await axios.get(ROUTES.api.get.login);
    //console.log(loginResponse);
    //setRedirect(ROUTES.student.dashboard);
    setshowSignInOverlay(true)
  }

  var c = 0;
  function handle_signup(){
    setshowSignUpOverlay(true)
  }

  function handle_random_click_on_overlay(event){
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


  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div>
      <div
        class="bg-black bg-opacity-75 z-10 fixed w-screen h-screen flex flex-row items-center justify-center"
        style={{
          display: showSignUpOverlay ? "flex" : "none",
        }}
        onClick={handle_random_click_on_overlay}
      >
        <div class="md:w-5/12 w-8/12 overlay">
          <SignUpFormOverlay />
        </div>
      </div>
      <div
        class="bg-black bg-opacity-50 z-10 fixed w-screen h-screen flex flex-row items-center justify-center"
        style={{
          display: showSignInOverlay ? "flex" : "none",
        }}
        onClick={handle_random_click_on_overlay}
      >
        <div class="md:w-3/12 w-5/12 p-4 flex flex-col overlay2 bg-gray-200 border-red-700 borde-solid border-2">
          <button class = "m-1 bg-red-700 hover:bg-red-600 p-2 rounded-lg">Sign In as Educator</button>
          <button class = "m-1 bg-red-700 hover:bg-red-600 p-2 rounded-lg">Sign In as Educatee</button>
        </div>
      </div>
      <div
        class="w-screen h-screen flex flex-col justify-center items-center"
        style={{
          backgroundImage: "url(/images/classroom.jpg)",
          backgroundSize: "cover",
        }}
      >
        <div class="flex flex-col w-6/12 h-5/12 bg-gray-200 justify-center items-center bg-opacity-50 hover:bg-opacity-75 rounded-lg p-4 border-4 border-red-700 shadow-2xl">
          <div class="md:w-8/12 w-11/12">
            <Logo />
          </div>

          <div class="mt-4 w-full text-2xl font-medium text-red-800">Email</div>
          <div class="w-full">
            <input
              type="text"
              id="username"
              placeholder="jane@example.com"
              class="w-full rounded-lg sm:p-4 p-2 focus:bg-gray-200 text-opacity-75"
            ></input>
          </div>
          <div class="mt-4 w-full text-2xl font-medium text-red-800">
            Password
          </div>
          <div class="w-full">
            <input
              type="password"
              id="username"
              placeholder="'qwertyuiop' is a terrible password"
              class="w-full rounded-lg sm:p-4 p-2 focus:bg-gray-200 text-opacity-75"
            ></input>
          </div>
          <div class="flex flex-col w-full px-8 justify-center items-center sm:flex-row ">
            <button
              onClick={handle_login}
              class="flex-1 px-4 py-2 m-4 md:w-1/2 w-full bg-red-700 hover:bg-red-600 hover:z-10 rounded-lg text-lg"
            >
              Sign In
            </button>
            <button
              onClick={handle_signup}
              class="flex-1 px-4 py-2 m-4 md:w-1/2 w-full bg-red-700 hover:bg-red-600 hover:z-10 rounded-lg text-lg"
            >
              Sign Up
            </button>
          </div>
        </div>
        <div class="flex flex-row w-6/12 p-2 m-2 text-4xl justify-center font-extrabold">
          <div>{isLogging ? "Logging you In...." : ""}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
