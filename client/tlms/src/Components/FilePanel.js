import React from 'react'

export default function FilePanel(props){
    return (
      <div class="w-full flex flex-row">
        <div class="w-6/12 text-left pl-2">{props.name}</div>
        <div class="w-5/12 text-right">
          <a class="underline pr-2" href={props.fileurl}>
            {props.filename}
          </a>
        </div>
        <button class="flex flex-row justify-center itesm-end w-1/12">
          <div class = "w-4/12">
            <svg viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet">
              <path d="M 0 0 L 40 40 M 0 40 L 40 0" stroke="black"></path>
            </svg>
          </div>
        </button>
      </div>
    );
}