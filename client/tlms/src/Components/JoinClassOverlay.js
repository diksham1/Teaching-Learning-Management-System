import React from 'react'

export default function JoinClassOverlay(props){


    const outerdiv = "bg-gray-200 flex w-full h-full flex-col border-red-700 border-solid border-2" 
    const titlediv = "bg-gray-900 w-full p-4 text-3xl font-bold border-solid border-white border-2 text-white"
    const descdiv = "mb-1 text-2xl font-medium text-red-800"
    const inputcss = "w-full p-2 bg-white rounded-lg focus:bg-gray-200";
    const buttonsubmit = "bg-red-700 hover:bg-red-600 w-5/12 rounded-lg p-2 focus:font-semibold"

    return (
      <div class= {outerdiv}>
        <div class={titlediv}>
          Join Class
        </div>
        <div class="px-4">
          <div class={descdiv}>
            Enter Class Code
          </div>
          <input
            type="text"
            class={inputcss}
          ></input>
        </div>
        <div class="flex flex-row items-center justify-center p-2">
          <button
            type="button"
            class={buttonsubmit}
          >
            Join Class
          </button>
        </div>
      </div>
    );
}
