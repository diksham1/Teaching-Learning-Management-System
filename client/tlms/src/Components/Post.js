import React,{useState} from 'react'
import Comment from './Comment.js'

export default function Post(props){

    const [showComments,setShowComments] = useState(false)
    const [isUploaded,setisUploaded]     = useState(false)

    function toggleComments(event){
        const s = Array.from(event.target.classList)
        if(!s.includes('button'))
            setShowComments(p => !p)
    }

    return (
      <div class="w-full shadow-xl hover:shadow-2xl">
        <div
          class="flex flex-row bg-gray-700 text-gray-200 p-4 cursor-pointer"
          onClick={toggleComments}
        >
          <div class="w-7/12 text-2xl">{props.postername}</div>
          <div
            class="w-2/12 bg-yellow-700 text-black font-bold rounded-lg text-center p-1"
            style={{
              display: props.hasAssignment ? "" : "none",
            }}
          >
            Assignment
          </div>
          <div
            class="w-3/12 text-white font-bold  rounded-lg text-center p-1 ml-1"
            style={{
              display: props.hasAssignment ? "" : "none",
              backgroundColor : (!isUploaded)?"rgb(204,35,22)":"rgb(22,204,22)"
            }}
          >
            {(!isUploaded)? "Due " + props.dueDate : "Submitted"}
          </div>
        </div>
        <div class="bg-gray-300 cursor-pointer" onClick={toggleComments}>
          <div class="p-2 text-xl">{props.title}</div>
          <div class="p-4">{props.text}</div>
        <div class = "w-full text-center"
        style = {{
            display : (props.hasAssignment)?"":"none"
        }}
            ><button class = "p-2 bg-blue-500 text-white w-11/12 m-2 rounded-lg hover:opacity-75 text-lg button">{(isUploaded)?"View Submission":"Upload Assignment"}</button></div>
        </div>
        <div
          style={{
            display: showComments ? "" : "none",
          }}
        >
          <Comment
            name="Person1"
            comment="You look really cute...like really really cute"
          />
          <Comment name="Person2" comment="The assignment..." />
          <Comment name="Person3" comment="yep..." />
        </div>
        <div
          class="flex flex-row"
          style={{
            display: showComments ? "" : "none",
          }}
        >
          <input
            class="w-9/12 p-3 bg-gray-200 focus:bg-gray-300 text-black text-lg rounded-lg"
            placeholder="Your Comment here"
          ></input>
          <button class="w-3/12 p-2 bg-gray-600 text-gray-200 hover:opacity-75 text-md rounded-lg">
            Post
          </button>
        </div>
      </div>
    );
}
