import React,{useState} from 'react'

export default function SignUpFormOverlay(){


    const outerdiv = "bg-gray-200 flex w-full h-full flex-col border-red-700 border-solid border-2"
    const titlecss = "bg-gray-900 w-full p-4 text-3xl font-bold border-solid border-white border-2 text-white"
    const forminputtitle = "mb-1 text-2xl font-medium text-red-800"
    const forminput = "w-full p-2 bg-white rounded-lg focus:bg-gray-200"
    const buttondiv = "flex flex-row items-center justify-center p-2"
    const buttoncss = "bg-red-700 hover:bg-red-600 w-5/12 rounded-lg p-2 focus:font-semibold"

    return (
      <div class={outerdiv}>
        <div class={titlecss}>Sign Up</div>
        <div class="px-4">
          <div class={forminputtitle}>Name*</div>
          <input type="text" class={forminput}></input>
        </div>
        <div class="px-4">
          <div class={forminputtitle}>Email*</div>
          <input type="text" class={forminput}></input>
        </div>
        <div class="px-4">
          <div class={forminputtitle}>Phone Number</div>
          <input type="text" class={forminput}></input>
        </div>
        <div class="px-4">
          <div class={forminputtitle}>Password*</div>
          <input type="text" class={forminput}></input>
        </div>
        <div class="px-4">
          <div class={forminputtitle}>Confirm Password*</div>
          <input type="text" class={forminput}></input>
        </div>
        <div class={buttondiv}>
          <button
            type="button"
            class={buttoncss}
          >
            Create Account
          </button>
        </div>
      </div>
    );
}