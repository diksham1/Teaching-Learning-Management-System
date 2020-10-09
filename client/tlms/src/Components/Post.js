import React,{useState} from 'react'
import Comment from './Comment.js'

export default function Post(props){

    const [showComments,setShowComments] = useState(false)
    const [isUploaded,setisUploaded]     = useState(false)
    const [isDone,setisDone]             = useState(false)
    const [viewSubmissions,setviewSubmissions] = useState(false)

    function toggleComments(event){
        const s = Array.from(event.target.classList)
        if(!s.includes('button'))
            setShowComments(p => !p)
    }


    const outerdiv = "w-full shadow-xl hover:shadow-2xl"
    const mainpost = "flex flex-row bg-gray-700 text-gray-200 p-4 cursor-pointer"
    const imposter = "w-7/12 text-2xl";
    const css4 = "w-2/12 bg-yellow-700 text-black font-bold rounded-lg text-center p-1"
    const css5 = "w-3/12 text-white font-bold  rounded-lg text-center p-1 ml-1"
    const css6 = "bg-gray-300 cursor-pointer"
    const css7 = "p-2 text-xl"
    const css8 = "p-4 leading-none"
    const css9 = "w-full text-center"
    const css10 = "p-2 bg-blue-500 text-white w-11/12 m-2 rounded-lg hover:opacity-75 text-lg button"
    const cssbored1 = "flex flex-row"
    const cssbored2 = "w-9/12 p-3 bg-gray-200 focus:bg-gray-300 text-black text-lg rounded-lg"
    const cssbored3 = "w-3/12 p-2 bg-gray-600 text-gray-200 hover:opacity-75 text-md rounded-lg"
    const cssbored4 = "w-full text-center p-1"
    const cssbored5 = "w-11/12 text-white font-bold hover:opacity-75 rounded-lg text-center p-2 my-2"

    return (
      <div class={outerdiv}>
        <div
          class={mainpost}
          onClick={toggleComments}
        >
          <div class={imposter}>{props.postername}</div>
          <div
            class={css4}
            style={{
              display: props.hasAssignment ? "" : "none",
            }}
          >
            Assignment
          </div>
          <div
            class={css5}
            style={{
              display: props.hasAssignment ? "" : "none",
              backgroundColor: !isUploaded
                ? "rgb(204,35,22)"
                : "rgb(22,204,22)",
            }}
          >
            {!isUploaded ? "Due " + props.dueDate : "Submitted"}
          </div>
        </div>
        <div class={css6} onClick={toggleComments}>
          <div class={css7}>{props.title}</div>
          <div class={css8}>{props.text}</div>
          <div
            class={css9}
            style={{
              display: props.hasAssignment ? "" : "none",
            }}
          >
            <button
              class={css10}
              style={{
                display: props.isTeacher ? "none" : "",
              }}
              onClick={() => setisUploaded(true)}
            >
              {isUploaded ? "View Submission" : "Upload Assignment"}
            </button>
            <button
              class={css10}
              style={{
                display: isUploaded ? "" : "none",
              }}
              onClick={() => setisUploaded(false)}
            >
              Unsubmit
            </button>
            <button
              class={css10}
              style={{
                display: props.isTeacher ? "none" : "",
              }}
              onClick={() => setisDone((p) => !p)}
            >
              {isDone ? "Unmark as Done" : "Mark as Done"}
            </button>
            <button
              class={css10}
              style={{
                display: props.isTeacher ? "" : "none",
              }}
            >
              View Submissions
            </button>
          </div>
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
          <Comment name="Person2" comment="you mean the assignment..." />
          <Comment name="Person3" comment="yep..." />
        </div>
        <div
          class={cssbored1}
          style={{
            display: showComments ? "" : "none",
          }}
        >
          <input
            class={cssbored2}
            placeholder="Your Comment here"
          ></input>
          <button class={cssbored3}>
            Post
          </button>
        </div>
        <div class ={cssbored4} >
          <button
            class={cssbored5}
            style={{
              display: showComments ? "" : "none",
              backgroundColor: "rgb(204,35,22)",
            }}
          >
            Delete this Post
          </button>
        </div>
      </div>
    );
}
