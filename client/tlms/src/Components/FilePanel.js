import React from 'react'

export default function FilePanel(props){
    return (
      <div class = "w-full flex flex-row">
        <div class = "w-6/12">{props.name}</div>
        <div>
    <a class = "w-6/12" href = {props.fileurl}>{props.filename}</a>
        </div>
      </div>
    );
}