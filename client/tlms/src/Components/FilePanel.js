import React from 'react'

export default function FilePanel(props){
    return (
      <div>
        <div>{props.fileName}</div>
        <div>
            <a href = {props.fileurl}>Download</a>
        </div>
      </div>
    );
}