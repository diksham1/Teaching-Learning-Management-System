import React, { useState , useContext} from 'react'
import axios from 'axios'
import {AuthContext} from "../Contexts/AuthContext"
import {ClassContext} from "../Contexts/ClassContext.js"
import ROUTES from '../routes'
import FilePanel from './FilePanel'

export default function Mypost(props){

  const authContext = useContext(AuthContext)
  const classContext = useContext(ClassContext)

  const [isAssignment,setisAssignment] = useState(false)
  const [filesarray,setfilesarray] = useState([])
  const [file,setfile] = useState(null)

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
      "files" : filesarray
    }
    console.log(body)
    const response = await axios.post(ROUTES.api.post.courses + "/" + String(classContext.classCode_state) + "/posts",body)
    console.log(response)
    document.getElementById("myposttitle").innerHTML = "Post Title Here";
    document.getElementById("myposttext").innerHTML = "Write a Post";
    setfilesarray([])
    props.getPostList()

  }

  async function handle_create_assignment(){
    var deadline = document.getElementById("deadline").value;
    var d = new Date()
    var cur_date = d.toISOString().substring(0,16)
    if(cur_date > deadline){
      window.alert('Invalid Date')
      return
    }
    const ptitle = document.getElementById("myposttitle").innerHTML;
    const ptext = document.getElementById("myposttext").innerHTML;
    const body = {
      "post_title" : ptitle,
      "post_text" : ptext,
      "creator_id" : authContext.id_state,
      "files" : filesarray,
      "deadline" : deadline
    };
    console.log(body);
    await axios.post(
      ROUTES.api.post.courses +
        "/" +
        String(classContext.classCode_state) +
        "/assignments",
      body
    ).then((response) => {});
    document.getElementById("myposttitle").innerHTML = "Post Title Here";
    document.getElementById("myposttext").innerHTML = "Write a Post";
    setfilesarray([]);
    setisAssignment(false)
    props.getPostList();
  }

  async function uploadfilechange(event) {
    console.log(event.target.files[0]);
    setfile(event.target.files[0]);
  }

  async function uploadfile() {
    const data = new FormData();
    data.append("file", file);
    const res = await axios.post("http://localhost:8080/v1/upload", data, {
      // receive two    parameter endpoint url ,form data
    });
    setfilesarray((p) =>
      p.concat({ "filename": res.data.filename, "fileurl": res.data.fileURL })
    );
    //assignmentfilearray.push(["Sample.txt","../Sample.txt"])
    //console.log(assignmentfilearray.map(p => p.fileurl))
  }

  const outerdiv = "w-full shadow-xl hover:shadow-2xl" 
  const nameposter = "bg-gray-700 text-gray-200 p-4 cursor-pointer text-2xl"
  const posttitle = "w-full text-black p-4 text-lg text-opacity-50 border-b-2 border-gray-400 border-solid focus:text-opacity-100 focus:outline-none " + (props.showmypost?"bg-gray-100":"bg-gray-200")
  const postbody =
    "w-full text-black p-4 text-lg text-opacity-50 focus:text-opacity-100 focus:outline-none " +
    (props.showmypost ? "bg-gray-100" : "bg-gray-200");
  const optdivcss = "w-full bg-gray-100 text-white p-1 text-lg flex flex-row justify-end"
  const buttoncss1 = "rounded-lg text-center w-4/12 p-2 mx-2 bg-green-600 hover:opacity-75 font-semibold"
  const inputcss1 = "rounded-lg text-center w-4/12 p-2 mx-2 text-black ng-gray-200 hover:opacity-75 font-semibold"
  const buttoncss2 =
    "rounded-lg text-center w-2/12 p-2 mx-2 bg-blue-500 hover:opacity-75 font-semibold";
  const buttoncss3 =
    "rounded-lg text-center w-2/12 p-2 mx-2 bg-red-600 hover:opacity-75 font-semibold";


  return (
    <div>
      <div class={outerdiv}>
        <div class={nameposter}>You</div>
        <div>
          <div
            class={posttitle}
            id="myposttitle"
            style={{
              display: "inline-block",
            }}
            contentEditable={props.showmypost ? "true" : "false"}
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
            style={{
              display: "inline-block",
            }}
            id="myposttext"
            contentEditable={props.showmypost ? "true" : "false"}
            onFocus={mypost_focus}
            onBlur={mypost_blur}
          >
            Write a Post
          </div>
          <div class="py-4 px-8"
          style = {{
            display : filesarray.length == 0 ? "none" : ""
          }}
          >
            {filesarray.map((p) => (
              <FilePanel key = {p.filename} filename={p.filename} fileurl={p.fileurl} />
            ))}
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
              id="deadline"
              type="datetime-local"
              class={inputcss1}
              style={{
                display: isAssignment ? "" : "none",
              }}
            ></input>
          </div>
          <div class={optdivcss}>
            <input
              class={buttoncss2 + " w-9/12"}
              type="file"
              id="fileurlmypost"
              onChange={uploadfilechange}
            ></input>
            <button class={buttoncss2 + " w-3/12"} onClick={uploadfile}>
              Upload File
            </button>
          </div>
          <div class={optdivcss}>
            <button
              class={buttoncss3}
              onClick={
                props.showmypost
                  ? isAssignment
                    ? handle_create_assignment
                    : handle_create_post
                  : () => {}
              }
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}