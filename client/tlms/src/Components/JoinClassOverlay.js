import React from 'react'

export default function JoinClassOverlay(props){
    return (
      <div class="flex flex-col  border-2 border-solid border-red-700">
        <div class="w-full bg-gray-600 p-1 text-2xl text-center font-medium">
            Join Class 
        </div>
        <div class = "bg-gray-400 p-2">
          <div class = "mb-1 text-xl">Enter Class Code</div>
          <div>
            <input type="text" class = "rounded-lg bg-gray-200 p-3 w-full"></input>
          </div>
          <div class="flex flex-row p-1 justify-center w-full m-2">
            <button class="bg-red-600 p-2 m-1 w-5/12 hover:bg-red-700 hover:shadow-xl">Join</button>
          </div>
        </div>
      </div>
    );
}
