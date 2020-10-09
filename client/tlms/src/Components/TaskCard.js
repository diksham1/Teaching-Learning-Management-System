import React from 'react'

export default function TaskCard(props){

    const outerbutton = "border-2 border-gray-400 text-left shadow-xl hover:shadow-2xl" 
    const proptaskcss = "w-full text-2xl bg-gray-400 text-gray-900 font-bold p-2"
    const propdesc    = "w-full text-lg bg-gray-200 text-gray-700 p-3"

    return (
      <button class={outerbutton}>
        <div class={proptaskcss}>
          {props.task}
        </div>
        <div class={propdesc}>
          {props.desc}
        </div>
      </button>
    );
}