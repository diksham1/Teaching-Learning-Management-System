import React, { useState , useContext} from 'react'
import axios from 'axios'
import {AuthContext} from "../Contexts/AuthContext"
import {ClassContext} from "../Contexts/ClassContext.js"
import ROUTES from '../routes'


export default function Mypost(props){

  const authContext = useContext(AuthContext)
  const classContext = useContext(ClassContext)

  const [isAssignment,setisAssignment] = useState(false)

  async function mypost_focus() {
    if (document.getElementById("myposttext").innerHTML === "Write a Post") {
      document.getElementById("myposttext").innerHTML = "";
    }
  }
  async function mypost_blur() {
    if (document.getElementById("myposttext").innerHTML === "") {
      document.getElementById("myposttext").innerHTML = "Write a Post";
    }
  }
  async function mypost_title_focus() {
    if (
      document.getElementById("myposttitle").innerHTML === "Post Title Here"
    ) {
      document.getElementById("myposttitle").innerHTML = "";
    }
  }
  async function mypost_title_blur() {
    if (document.getElementById("myposttitle").innerHTML === "") {
      document.getElementById("myposttitle").innerHTML = "Post Title Here";
    }
  }


  async function handle_create_post(){
    const ptitle = document.getElementById('myposttitle').innerHTML
    const ptext = document.getElementById('myposttext').innerHTML
    const body = {
      "post_title" : ptitle,
      "post_text" : ptext,
      "creator_id" : authContext.id_state,
      "files" : []
    }
    console.log(body)
    const response = await axios.post(ROUTES.api.post.courses + "/" + String(classContext.classCode_state) + "/posts",body)
    console.log(response)
    document.getElementById("myposttitle").innerHTML = "Post Title Here";
    document.getElementById("myposttext").innerHTML = "Write a Post";
    props.getPostList()

  }

  async function handle_create_assignment(){
    window.alert("Yet to be implemented")
  }

  const outerdiv = "w-full shadow-xl hover:shadow-2xl" 
  const nameposter = "bg-gray-700 text-gray-200 p-4 cursor-pointer text-2xl"
  const posttitle = "w-full bg-gray-100 text-black p-4 text-lg text-opacity-50 border-b-2 border-gray-400 border-solid focus:text-opacity-100 focus:outline-none"
  const postbody = "w-full bg-gray-100 text-black p-4 text-lg text-opacity-50 focus:text-opacity-100 focus:outline-none"
  const optdivcss = "w-full bg-gray-100 text-white p-4 text-lg flex flex-row justify-end"
  const buttoncss1 = "rounded-lg text-center w-4/12 p-2 mx-2 bg-green-600 hover:opacity-75 font-semibold"
  const inputcss1 = "rounded-lg text-center w-4/12 p-2 mx-2 text-black ng-gray-200 hover:opacity-75 font-semibold"
  const buttoncss2 = "rounded-lg text-center w-2/12 p-2 mx-2 bg-green-600 hover:opacity-75 font-semibold"
  const buttoncss3 =
    "rounded-lg text-center w-2/12 p-2 mx-2 bg-red-600 hover:opacity-75 font-semibold";


  return (
    <div>
      <div class= {outerdiv}>
        <div class= {nameposter}>
          You
        </div>
        <div>
          <div
            class={posttitle}
            id="myposttitle"
            style={{
              display: "inline-block"
            }}
            contentEditable="true"
            onFocus={mypost_title_focus}
            onBlur={mypost_title_blur}
            onKeyDown={(evt) => {
              if (evt.keyCode === 13) {
                evt.preventDefault();
              }
            }}
          >
            Post Title Here
          </div>
          <div
            class={postbody}
            style = {{
              display : "inline-block"
            }}
            id="myposttext"
            contentEditable="true"
            onFocus={mypost_focus}
            onBlur={mypost_blur}
          >
            Write a Post
          </div>
          <div class={optdivcss}>
            <button
              class={buttoncss1}
              style={{
                display: props.isTeacher ? "" : "none",
              }}
              onClick={() => setisAssignment((p) => !p)}
            >
              {isAssignment ? "Unmark As Assignment" : "Mark As Assignment"}
            </button>
            <input
              type="date"
              class={inputcss1}
              style={{
                display: isAssignment ? "" : "none",
              }}
            ></input>
            <button class={buttoncss2}>
              Attach File
            </button>
            <button class={buttoncss3} onClick = {(isAssignment)?handle_create_assignment:handle_create_post}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}