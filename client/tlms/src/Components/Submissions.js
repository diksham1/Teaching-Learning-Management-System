import React from 'react'
import FilePanel from './FilePanel'

export default function Submissions(props){
    
    return (
      <div>
        <div class = "flex flex-row">
          <div class="text-lg font-semibold w-9/12">{props.name}</div>
          <div class="text-lg w-3/12">{props.timestamp.substring(0,10) + " " + props.timestamp.substring(11,16) + " hrs"}</div>
        </div>

        <div class="px-4">
          {props.files.map((p) => (
            <FilePanel filename={p.filename} fileurl={p.fileurl} />
          ))}
        </div>
      </div>
    );
}