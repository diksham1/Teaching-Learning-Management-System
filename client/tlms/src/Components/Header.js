//This module returns the Header of the application
//It returns two variants of the Header depending on whether it is for the student dashboard or the teacher dashboard
//For teacher there are two variants depending on whether the a particualr class is open(in which case the option to add a new assignemnt becomes available)

import React, { useState } from "react";
import {Link} from 'react-router-dom'
import Logo from "./Logo.js";
import JoinClassOverlay from "./JoinClassOverlay.js";
import CreateClassOverlay from './CreateClassOverlay'
import LogoutButton from './LogoutButton'

export default function Headers(props) {
  const [showJoinClassOverlay, setshowJoinClassOverlay] = useState(false);
  const [showCreateClassOverlay, setshowCreateClassOverlay] = useState(false);

  function handle_class_join_overlay(event) {
    const s = event.target;
    const t = Array.from(
      document.querySelector(".joinClassOverlay").querySelectorAll("*")
    );
    if (!t.includes(s)) {
      setshowJoinClassOverlay(false);
    }
  }

  function handle_create_class_overlay(event){
    const s = event.target;
    const t = Array.from(
      document.querySelector(".createClassOverlay").querySelectorAll("*")
    );
    if (!t.includes(s)) {
      setshowCreateClassOverlay(false);
    }
  }

  async function handle_logout(){
    window.location.replace("/")
  }

  const outerDiv = "w-screen h-screen z-10 bg-gray-800 bg-opacity-75 flex flex-col justify-center items-center absolute"
  const joinoverlay = "absolute md:w-3/12 w-6/12 joinClassOverlay"
  const createoverlay = "absolute md:w-3/12 w-6/12 createClassOverlay";
  const paneldiv =
    "grid lg:grid-cols-12 grid-cols-6 px-2 mx-2 my-2 bg-gray-200";
  const logolink = "col-span-2 m-2 items-end justify-end"
  const applicationtitle =
    "col-span-5 lg:inline hidden text-3xl p-1 mb-2 mt-4 mr-2 items-end justify-start";
  const buttoncss = "col-span-2 m-2 text-2xl border-gray-600 hover:shadow-xl shadow-md border-opacity-75 border-solid border-2 bg-gray-200 focus:outline-none focus:shadow-none"
  const logoutButton = "col-span-1 m-2 p-2 text-2xl rounded-full border-gray-600 hover:shadow-xl shadow-md border-opacity-75 border-solid border-2 bg-gray-200 focus:outline-none"

  if(props.isStudent){
  return (
    <div>
      <div
        class={outerDiv}
        style={{
          display: showJoinClassOverlay ? "flex" : "none",
        }}
        onClick={handle_class_join_overlay}
      >
        <div class={joinoverlay}>
          <JoinClassOverlay
            f={setshowJoinClassOverlay}
            getClassesList={props.getClassesList}
          />
        </div>
      </div>
      <div class={paneldiv}>
        <Link class={logolink} to="/dashboard">
          <Logo />
        </Link>
        <div class={applicationtitle}>
          <div>Learning Management System</div>
        </div>

        <button
          class={buttoncss}
          onClick={() => setshowJoinClassOverlay(true)}
          id="btn_join"
        >
          Join Class
        </button>

        <button
          class={buttoncss + " border-opacity-50 cursor-default shadow-none hover:shadow-none focus:shadow-none "}
          onClick={() => {}}
        >
          Hello {props.name}
        </button>
        <button class={logoutButton} onClick={() => {}}>
          <div
            class="flex flex-row items-center justify-center"
            onClick={handle_logout}
          >
            <div class="w-7/12">
              <LogoutButton />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
  }

  else{
    return (
      <div>
        <div
          class={outerDiv}
          style={{
            display: showCreateClassOverlay ? "flex" : "none",
          }}
          onClick={handle_create_class_overlay}
        >
          <div class={createoverlay}>
            <CreateClassOverlay
              f={setshowCreateClassOverlay}
              getClassesList={props.getClassesList}
            />
          </div>
        </div>
        <div class={paneldiv}>
          <Link class={logolink} to="/dashboard">
            <Logo />
          </Link>
          <div class={applicationtitle}>
            <div>Learning Management System</div>
          </div>

          <button
            class={buttoncss}
            onClick={() => setshowCreateClassOverlay(true)}
            id="btn_join"
          >
            Create Class
          </button>
          <button
            class={
              buttoncss +
              "  border-opacity-50 cursor-default shadow-none hover:shadow-none focus:shadow-none "
            }
            onClick={() => {}}
          >
            Hello {props.name}
          </button>
          <button class={logoutButton} onClick={() => {}}>
            <div
              class="flex flex-row items-center justify-center"
              onClick={handle_logout}
            >
              <div class="w-7/12">
                <LogoutButton />
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }
}
