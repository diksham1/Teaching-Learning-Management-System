import React from 'react'

export default function Class_Card(props){

    async function handle_click(){
        //do api call here to get info about the relevent classes

    }
    return (
      <button class="border-2 border-gray-400 text-left shadow-xl hover:shadow-2xl" onclick = {handle_click}>
        <div class="w-full text-2xl bg-gray-400 text-gray-900 font-bold p-2">
          {props.classCode}
        </div>
        <div class="w-full text-xl bg-gray-200 text-gray-800 font-semibold p-3">
          {props.className}
        </div>
        <div class="w-full text-lg bg-gray-200 text-gray-700 p-3">
          <div class = "font-medium">{props.classInstructor}</div>
          <div>
            <i>{props.classDesc}</i>
          </div>
        </div>
      </button>
    );
}