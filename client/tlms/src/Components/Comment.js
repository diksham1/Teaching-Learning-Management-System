import React from 'react'

export default function Comment(props){
    return(
        <div class = "w-full flex flex-row space-x-1 my-1">
            <div class = "w-3/12 p-2 text-center bg-gray-500 text-xl rounded-lg">
                {props.name}
            </div>
            <div class = "w-9/12 p-2 bg-gray-200 text-md">
                {props.comment}
            </div>
        </div>
    )
}