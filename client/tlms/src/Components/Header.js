//This module returns the Header of the application
//It returns two variants of the Header depending on whether it is for the student dashboard or the teacher dashboard
//For teacher there are two variants depending on whether the a particualr class is open(in which case the option to add a new assignemnt becomes available)

import React, { useState } from "react";
import Logo from "./Logo.js";
import JoinClassOverlay from "./JoinClassOverlay.js";
import CreateClassOverlay from './CreateClassOverlay'

export default function Headers(props) {
  const [showJoinClassOverlay, setshowJoinClassOverlay] = useState(false);
  const [showCreateClassOverlay, setshowCreateClassOverlay] = useState(false);

  async function handle_class_join_overlay(event) {
    const s = event.target;
    const t = Array.from(
      document.querySelector(".joinClassOverlay").querySelectorAll("*")
    );
    if (!t.includes(s)) {
      setshowJoinClassOverlay(false);
    }
  }

  async function handle_create_class_overlay(event){
    const s = event.target;
    const t = Array.from(
      document.querySelector(".createClassOverlay").querySelectorAll("*")
    );
    if (!t.includes(s)) {
      setshowCreateClassOverlay(false);
    }
  }

  if(props.isStudent){
  return (
    <div>
      <div
        class=" w-screen h-screen z-10 bg-gray-800 bg-opacity-75 flex flex-col justify-center items-center absolute"
        style={{
          display: showJoinClassOverlay ? "flex" : "none",
        }}
        onClick={handle_class_join_overlay}
      >
        <div class="absolute md:w-3/12 w-6/12 joinClassOverlay">
          <JoinClassOverlay />
        </div>
      </div>
      <div class="grid lg:grid-cols-12 grid-cols-6 px-2 mx-2 my-2 bg-gray-200">
        <button class="col-span-2 m-2 items-end justify-end">
          <Logo />
        </button>
        <div class="col-span-6 lg:inline hidden text-3xl p-1 mb-2 mt-4 mr-2 items-end justify-start">
          <div>Learning Management System</div>
        </div>

        <button
          class="col-span-2 m-2 text-2xl border-gray-600 hover:shadow-xl shadow-md border-opacity-75 border-solid border-2 bg-gray-200"
          onClick={() => setshowJoinClassOverlay(true)}
          id="btn_join"
        >
          Join Class
        </button>

        <button
          class="col-span-2 m-2 text-2xl border-gray-600 hover:shadow-xl shadow-md border-opacity-75 border-solid border-2 bg-gray-200"
          onClick={() => {}}
        >
          Hello {props.name}
        </button>
      </div>
    </div>
  );
  }
  else{
    return (
      <div>
        <div
          class=" w-screen h-screen z-10 bg-gray-800 bg-opacity-75 flex flex-col justify-center items-center absolute"
          style={{
            display: showCreateClassOverlay ? "flex" : "none",
          }}
          onClick={handle_create_class_overlay}
        >
          <div class="absolute md:w-4/12 w-7/12 createClassOverlay">
            <CreateClassOverlay />
          </div>
        </div>
        <div class="grid lg:grid-cols-12 grid-cols-6 px-2 mx-2 my-2 bg-gray-200">
          <button class="col-span-2 m-2 items-end justify-end">
            <Logo />
          </button>
          <div class="col-span-6 lg:inline hidden text-3xl p-1 mb-2 mt-4 mr-2 items-end justify-start">
            <div>Learning Management System</div>
          </div>

          <button
            class="col-span-2 m-2 text-2xl border-gray-600 hover:shadow-xl shadow-md border-opacity-75 border-solid border-2 bg-gray-200"
            onClick={() => setshowCreateClassOverlay(true)}
            id="btn_join"
          >
            Create Class
          </button>

          <button
            class="col-span-2 m-2 text-2xl border-gray-600 hover:shadow-xl shadow-md border-opacity-75 border-solid border-2 bg-gray-200"
            onClick={() => {}}
          >
            Hello {props.name}
          </button>
        </div>
      </div>
    );
  }
}
