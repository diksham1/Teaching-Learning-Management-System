import React,{useState,useEffect,useContext} from 'react'
import Comment from './Comment.js'
import FilePanel from './FilePanel'
import axios from 'axios'
import {ClassContext} from '../Contexts/ClassContext'
import {AuthContext} from '../Contexts/AuthContext'
import ROUTES from '../routes'
const parse = require("html-react-parser");

export default function Post(props){
  const [showComments, setShowComments] = useState(false);
  const [isUploaded, setisUploaded] = useState(false);
  const [hasAssignment,sethasAssignment] = useState(false)
  const [isDone, setisDone] = useState(false);
  const [viewSubmissions, setviewSubmissions] = useState(false);

  const [apiCallResult,setapiCallResult] = useState(null)
  const [creatorname,setcreatorname] = useState(null)
  const [comments,setComments] = useState(null)

  const classContext = useContext(ClassContext)
  const authContext = useContext(AuthContext)
  
  async function f() {
    const res = await axios.get(
      ROUTES.api.get.courses +
        "/" +
        String(classContext.classCode_state) +
        "/posts/" +
        String(props.post_id)
    );
    const res2 = await axios.get(ROUTES.api.get.users + "/" + res.data.creator_id)
    setcreatorname(res2.data.name)
    setapiCallResult(res.data);
    if(res.data.assignment_id){
      sethasAssignment(true)
    }
    setComments(res.data.comments);
  }

  useEffect(() => {
    f()
  },[])

  async function toggleComments(event) {
    console.log(event.target.classList.value);
    const s = Array.from(event.target.classList);
    if (!s.includes("button")) setShowComments((p) => !p);
  }

  async function post_comment(){
    const com = document.getElementById(String(props.post_id)).value
    const res = await axios.post(
      ROUTES.api.get.courses +
        "/" +
        String(classContext.classCode_state) +
        "/posts/" +
        String(props.post_id) +
        "/comments",
        {
          "commentator_id" : authContext.id_state,
          "commentator_name" : authContext.name_state,
          "comment" : com
        }
    );
    //console.log(res)
    document.getElementById(String(props.post_id)).value = "";
    document.getElementById(String(props.post_id)).placeholder = "Your Comment Here";
    f()
  }

  async function delete_post(){
    const res = await axios.delete(ROUTES.api.get.courses + "/" + classContext.classCode_state + "/posts/" + props.post_id)
    console.log(res)
    props.getPostList()
  }

  //{isUploaded ? "View Submission" : "Upload Assignment"}
  const outerdiv = "w-full shadow-xl hover:shadow-2xl";
  const mainpost = "flex flex-row bg-gray-700 text-gray-200 p-4 cursor-pointer";
  const imposter = "w-7/12 text-2xl";
  const css4 =
    "w-2/12 bg-yellow-700 text-black font-bold rounded-lg text-center p-1";
  const css5 = "w-3/12 text-white font-bold  rounded-lg text-center p-1 ml-1";
  const css6 = "bg-gray-300 cursor-pointer";
  const css7 = "p-2 text-xl";
  const css8 = "p-4 leading-none";
  const css9 = "w-full text-center";
  const css10 =
    "p-2 bg-blue-500 text-white w-11/12 m-2 rounded-lg hover:opacity-75 text-lg button";
  const css11 =
    "p-2 bg-blue-500 text-white w-11/12 m-2 rounded-lg text-lg button";
  const css12 =
    "p-1 w-11/12 rounded-lg text-lg button cursor-default button focus:outline-none";
  const cssbored1 = "flex flex-row";
  const cssbored2 =
    "w-9/12 p-3 bg-gray-200 focus:bg-gray-300 text-black text-lg rounded-lg";
  const cssbored3 =
    "w-3/12 p-2 bg-gray-600 text-gray-200 hover:opacity-75 text-md rounded-lg";
  const cssbored4 = "w-full text-center p-1";
  const cssbored5 =
    "w-11/12 text-white font-bold hover:opacity-75 rounded-lg text-center p-2 my-2";

  return (
    <div class={outerdiv}>
      <div class={mainpost} onClick={toggleComments}>
        <div class={imposter}>{creatorname == null ? "" : creatorname}</div>
        <div
          class={css4}
          style={{
            display: hasAssignment ? "" : "none",
          }}
        >
          Assignment
        </div>
        <div
          class={css5}
          style={{
            display: hasAssignment ? "" : "none",
            backgroundColor: !isDone ? "rgb(204,35,22)" : "rgb(22,204,22)",
          }}
        >
          {!isDone ? "Due " + props.dueDate : "Submitted"}
        </div>
      </div>
      <div class={css6} onClick={toggleComments}>
        <div class={css7}>
          {apiCallResult == null ? "" : parse(apiCallResult.post_title)}
        </div>
        <div class={css8}>
          {apiCallResult == null ? "" : parse(apiCallResult.post_text)}
        </div>
        <div
          class={css9}
          style={{
            display: hasAssignment ? "" : "none",
          }}
        >
          <input
            class={css11}
            type="file"
            style={{
              display: props.isTeacher ? "none" : "",
            }}
          ></input>
          <button
            class={css10}
            style={{
              display: props.isTeacher ? "none" : "",
            }}
            onClick={() => setisUploaded(true)}
          >
            {isUploaded && isDone ? "View Submission" : "Upload Assignment"}
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
        {comments == null
          ? ""
          : comments.map((comment) => (
              <Comment
                name={
                  comment.commentator_name.indexOf(" ") == -1
                    ? comment.commentator_name
                    : comment.commentator_name.substring(
                        0,
                        comment.commentator_name.indexOf(" ")
                      )
                }
                comment={comment.comment}
              />
            ))}
      </div>
      <div
        class={cssbored1}
        style={{
          display: showComments ? "" : "none",
        }}
      >
        <input
          class={cssbored2}
          style={{
            display: "inline-block",
          }}
          placeholder="Your Comment here"
          id={String(props.post_id)}
        ></input>
        <button class={cssbored3} onClick={post_comment}>
          Post
        </button>
      </div>
      <div class={cssbored4}>
        <button
          class={cssbored5}
          style={{
            display: showComments ? (classContext.isEducator_state ? "" : (apiCallResult.creator_id == authContext.id_state) ? "" : "none") : "none",
            backgroundColor: "rgb(204,35,22)",
          }}
          onClick={delete_post}
        >
          Delete this Post
        </button>
      </div>
    </div>
  );
}
