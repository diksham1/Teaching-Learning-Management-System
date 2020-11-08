import React from 'react'
const parse = require('html-react-parser')

export default function Comment(props){

    const outerDiv = "w-full flex flex-row space-x-1 my-1"
    const commentname = "w-2/12 p-1 text-center bg-gray-500 text-xl rounded-lg"
    const commenttext = "w-10/12 pl-2 p-1 bg-gray-200 text-lg"

    return(
        <div class = {outerDiv}>
            <div class = {commentname}>
                {props.name}
            </div>
            <div class = {commenttext}>
                {parse(props.comment)}
            </div>
        </div>
    )
}