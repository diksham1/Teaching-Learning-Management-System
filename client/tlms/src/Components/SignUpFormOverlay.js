import React,{useState} from 'react'

export default function SignUpFormOverlay(){

    return (
      <div class="bg-gray-200 flex w-full h-full flex-col border-red-700 border-solid border-2">
        <div class="bg-gray-900 w-full p-4 text-3xl font-bold border-solid border-white border-2 text-white">
          Sign Up
        </div>
        <div class="px-4">
          <div class="mb-1 text-2xl font-medium text-red-800">Name*</div>
          <input
            type="text"
            class="w-full p-2 bg-white rounded-lg focus:bg-gray-200"
          ></input>
        </div>
        <div class="px-4">
          <div class="mb-1 text-2xl font-medium text-red-800">Email*</div>
          <input
            type="text"
            class="w-full p-2 bg-white rounded-lg focus:bg-gray-100"
          ></input>
        </div>
        <div class="px-4">
          <div class="mb-1 text-2xl font-medium text-red-800">Phone Number</div>
          <input
            type="text"
            class="w-full p-2 bg-white rounded-lg focus:bg-gray-100"
          ></input>
        </div>
        <div class="px-4">
          <div class="mb-1 text-2xl font-medium text-red-800">Password*</div>
          <input
            type="text"
            class="w-full p-2 bg-white rounded-lg focus:bg-gray-100"
          ></input>
        </div>
        <div class="px-4">
          <div class="mb-1 text-2xl font-medium text-red-800">
            Confirm Password*
          </div>
          <input
            type="text"
            class="w-full p-2 bg-white rounded-lg focus:bg-gray-100"
          ></input>
        </div>
        <div class="flex flex-row items-center justify-center p-2">
          <button
            type="button"
            class="bg-red-700 hover:bg-red-600 w-5/12 rounded-lg p-2 focus:font-semibold"
          >
            Create Account
          </button>
        </div>
      </div>
    );
}