import React from 'react'

export default function FilePanel(props){
    return (
        <div class="w-full">
          <a class="underline pr-2" href={props.fileurl}>
            {props.filename}
          </a>
        </div>
    );
}