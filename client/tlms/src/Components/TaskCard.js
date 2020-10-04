import React from 'react'

export default function TaskCard(props){
    return (
      <button class="border-2 border-gray-400 text-left shadow-xl hover:shadow-2xl">
        <div class="w-full text-2xl bg-gray-400 text-gray-900 font-bold p-2">
          {props.task}
        </div>
        <div class="w-full text-lg bg-gray-200 text-gray-700 p-3">
          {props.desc}
        </div>
      </button>
    );
}