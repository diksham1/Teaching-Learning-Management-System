import React from 'react'
import Logo from "./Logo.js"

export default function Headers(props){



    async function handle_class_join(){

    }


    return (
      <div class="grid lg:grid-cols-12 grid-cols-6 px-2 mx-2 my-2 bg-gray-200">
        <button class="col-span-2 m-2 items-end justify-end">
          <Logo />
        </button>
        <div class="col-span-6 lg:inline hidden text-3xl p-1 mb-2 mt-4 mr-2 items-end justify-start">
          <div>IIEST Learning Management System</div>
        </div>
        <button 
          class="flex col-span-1 m-2 text-2xl rounded-lg border-gray-600 border-opacity-75 border-solid hover:shadow-xl shadow-md border-2 bg-gray-200 place-content-center">
            <img src = "images/plus.png" class = "h-16"></img>
        </button>
      <button 
        class="col-span-3 m-2 text-2xl border-gray-600 hover:shadow-xl shadow-md border-opacity-75 border-solid border-2 bg-gray-200">
          Hello {props.name}
      </button>
    </div>
    );
}