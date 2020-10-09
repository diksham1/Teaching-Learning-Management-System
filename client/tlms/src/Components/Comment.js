import React from 'react'

export default function Comment(props){

    const outerDiv = "w-full flex flex-row space-x-1 my-1"
    const commentname = "w-3/12 p-2 text-center bg-gray-500 text-xl rounded-lg"
    const commenttext = "w-9/12 p-2 bg-gray-200 text-md"

    return(
        <div class = {outerDiv}>
            <div class = {commentname}>
                {props.name}
            </div>
            <div class = {commenttext}>
                {props.comment}
            </div>
        </div>
    )
}