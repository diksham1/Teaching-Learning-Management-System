import React from 'react'

export default function FilePanel(props){
    return (
        <div class={"w-full flex flex-row" + (props.isAssignmentFile? " justify-end" : "")}>
          <a class="underline px-2 text-lg tracking-wide" href={props.fileurl}>
            {props.filename}
          </a>
        </div>
    );
}