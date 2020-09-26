import React from 'react'
import Logo from "./Logo.js"

export default function Headers(props){
    return (
      <div class="flex flex-row pb-1 px-2 m-2 mb-4 bg-gray-300">
        <div class="w-2/12 flex flex-col items-end justify-end">
          <Logo />
        </div>
        <div class="w-6/12 text-4xl flex flex-row items-end justify-start">
          <div>IIEST Learning Management System</div>
        </div>
        <div class="w-2/12 text-2xl text-center flex items-center justify-end">
          <button class="flex flex-row bg-gray-400 p-4 mx-1 my-2 hover:bg-gray-200">
            <img src="images/plus.png" class="h-8 w-8 rounded border-1"></img>
            Join Class
          </button>
        </div>
        <div class="w-2/12 text-2xl text-center flex items-center justify-end">
          <button class="bg-gray-400 mx-1 my-2 p-4 hover:bg-gray-200">
            Hello {props.name}
          </button>
        </div>
      </div>
    );
}