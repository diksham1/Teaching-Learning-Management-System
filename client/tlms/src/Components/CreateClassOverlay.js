import React from 'react'

export default function CreateClassOverlay(){

    const outerDiv = "bg-gray-200 flex w-full h-full flex-col border-red-700 border-solid border-2"
    const titleDiv = "bg-gray-900 w-full p-4 text-3xl font-bold border-solid border-white border-2 text-white"
    const formelementtitle = "mb-1 text-2xl font-medium text-red-800"
    const formInput = "w-full p-2 bg-white rounded-lg focus:bg-gray-200";
    const formInputDesc = "w-full p-2 bg-white rounded-lg focus:bg-gray-100";
    const buttonConatiner = "flex flex-row items-center justify-center p-2"
    const buttoncss = "bg-red-700 hover:bg-red-600 w-5/12 rounded-lg p-2 focus:font-semibold"



    return (
      <div class= {outerDiv}>
        <div class= {titleDiv}>
          Create Class
        </div>
        <div class="px-4">
          <div class={formelementtitle}>Name of your Course</div>
          <input
            type="text"
            class={formInput}
          ></input>
        </div>
        <div class="px-4">
          <div class={formelementtitle}>Course Description</div>
          <div
            type="text"
            class={formInputDesc}
            contentEditable = "true"
          ></div>
        </div>
        <div class= {buttonConatiner}>
          <button
            type="button"
            class= {buttoncss}
          >
            Create Class
          </button>
        </div>
      </div>
    );
}