import React from 'react'

export default function SideBar(props){
    

    return (
      <div class="flex flex-col items-center bg-gray-200 w-full h-screen border-solid my-2 border-2 border-opacity-50 border-gray-700">
        <div class="w-full flex flex-col outline-none bg-gray-500 items-center h-1/12 mb-2">
          <div class="border-b-2 hover:border-opacity-50 text-center text-xl text-black  border-black content-center w-full p-3">
            {props.classname}
          </div>
        </div>
        <div class="w-full flex flex-col outline-none items-center h-1/12 m-2">
          <button class="border-b-2 hover:border-opacity-50 hover:text-blue-500 text-lg focus:text-blue-400 border-black content-center w-9/12 p-2">
            Class Home
          </button>
        </div>
        <div class="w-full flex flex-col outline-none items-center h-1/12 m-2">
          <button class="border-b-2 hover:border-opacity-50 hover:text-blue-500 text-lg focus:text-blue-400 border-black content-center w-9/12 p-2">
            My Posts
          </button>
        </div>
        <div class="w-full flex flex-col outline-none items-center h-1/12 m-2">
          <button class="border-b-2 hover:border-opacity-50 hover:text-blue-500 text-lg focus:text-blue-400 border-black content-center w-9/12 p-2">
            Assignments
          </button>
        </div>
        <div class="w-full flex flex-col outline-none items-center h-1/12 m-2">
          <button class="border-b-2 hover:border-opacity-50 hover:text-blue-500 text-lg focus:text-blue-400 border-black content-center w-9/12 p-2">
            Attend Live Class
          </button>
        </div>
        <div class="w-full flex flex-col outline-none items-center h-1/12 m-2">
          <button class="border-b-2 hover:border-opacity-50 hover:text-blue-500 text-lg focus:text-blue-400 border-black content-center w-9/12 p-2">
            Past Recordings
          </button>
        </div>
      </div>
    );
}