import React,{useState,useEffect,useContext} from 'react'
import Comment from './Comment.js'
import FilePanel from './FilePanel'
import axios from 'axios'
import {ClassContext} from '../Contexts/ClassContext'
import {AuthContext} from '../Contexts/AuthContext'
import ROUTES from '../routes'
import Submissions from './Submissions'
const parse = require("html-react-parser");

export default function Post(props){
  const [showComments, setShowComments] = useState(false);
  const [hasAssignment,sethasAssignment] = useState(false)
  const [isDone, setisDone] = useState(false);
  const [viewSubmissions, setviewSubmissions] = useState(false);
  const [deadline,setdeadline] = useState(null)
  const [assignmentfile,setassignmentfile] = useState(null)
  const [assignmentfilearray, setassignmentfilearray] = useState([]);

  const [apiCallResult,setapiCallResult] = useState(null)
  const [apiCallResult2,setapiCallResult2] = useState(null)
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
      const res2 = await axios.get(ROUTES.api.get.courses + "/" + classContext.classCode_state + "/assignments/" + res.data.assignment_id)
      setdeadline(res2.data.deadline)
      setapiCallResult2(res2.data)
      setisDone(res2.data.submissions.map(p => p.student_id).includes(authContext.id_state))
      console.log(
        res2.data.submissions
          .filter((p) => p.student_id === authContext.id_state)
      );
      if(res2.data.submissions.map(p => p.student_id).includes(authContext.id_state)){
        setassignmentfilearray(
          res2.data.submissions
            .filter((p) => p.student_id === authContext.id_state)
            .map((p) => p.submissions)[0]
        );
      }
      //setassignmentfilearray(res2.data.submissions.filter(p => p.student_id === authContext.id_state).map(p => p.submissions))
    }
    setComments(res.data.comments);
  }

  useEffect(() => {
    f()
  },[])


  async function toggleComments(event) {
    const s = Array.from(event.target.classList);
    if (!s.includes("button")) setShowComments((p) => !p);
  }

  async function post_comment(){
    const com = document.getElementById(String(props.post_id)).value
    await axios.post(
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
    ).then((res) => {});
    //console.log(res)
    document.getElementById(String(props.post_id)).value = "";
    document.getElementById(String(props.post_id)).placeholder = "Your Comment Here";
    f()
  }

  async function handle_delete_post(){
    const res = await axios.delete(ROUTES.api.get.courses + "/" + classContext.classCode_state + "/posts/" + props.post_id)
    console.log(res)
    props.getPostList()
  }

  async function uploadfilechange(event){
    console.log(event.target.files[0])
    setassignmentfile(event.target.files[0]);
  }

  async function uploadfile(){

    const data = new FormData();
    data.append('file', assignmentfile)
    const res = await axios
      .post("http://localhost:8080/v1/upload", data, {
        // receive two    parameter endpoint url ,form data
      })
    setassignmentfilearray((p) => p.concat({"filename":res.data.filename,"fileurl":res.data.fileURL}))
    //assignmentfilearray.push(["Sample.txt","../Sample.txt"])
    //console.log(assignmentfilearray.map(p => p.fileurl))
  }
  async function submit_assignment(){
      const d = new Date()
      const n = d.toISOString() 
      console.log(d)
      console.log(n)
      const res = await axios.post(ROUTES.api.post.courses + "/" + classContext.classCode_state + "/assignments/" + apiCallResult.assignment_id + "/submissions",{
        student_id : authContext.id_state,
        student_name : authContext.name_state,
        submissions : assignmentfilearray,
        timestamp : n
      })
      setisDone((p) => !p)
  }

  async function unsubmit_assignment(){
    const res = await axios.delete(
      ROUTES.api.post.courses +
        "/" +
        classContext.classCode_state +
        "/assignments/" +
        apiCallResult.assignment_id +
        "/submissions/" +
        authContext.id_state
    );
    setisDone((p) => !p)
  }

  //{isUploaded ? "View Submission" : "Upload Assignment"}
  const outerdiv = "w-full shadow-xl hover:shadow-2xl";
  const mainpost = "flex flex-row bg-gray-700 text-gray-200 p-4 cursor-pointer";
  const imposter = "w-7/12 text-2xl";
  const css4 =
    "w-2/12 bg-yellow-700 text-black font-bold rounded-lg text-center p-1";
  const css5 = "w-3/12 text-white font-bold  rounded-lg text-center py-1 ml-1";
  const css6 = "bg-gray-300 cursor-pointer";
  const css7 = "p-2 text-xl";
  const css8 = "p-4 leading-snug";
  const css9 = "w-full text-center";
  const css10 =
    "p-2 bg-blue-500 text-white w-11/12 m-2 rounded-lg hover:opacity-75 text-lg button";
  const css11 =
    "p-2 bg-blue-500 text-white w-11/12 m-2 rounded-lg text-lg button";
  const css12 = "py-4 px-8"
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
          {!isDone
            ? "Due " +
              (deadline == null
                ? ""
                : deadline.substring(0, 10) + " " + deadline.substring(11))
            : "Submitted"}
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
          class={css12}
          style={{
            display:
              apiCallResult === null || apiCallResult.files.length === 0
                ? "none"
                : "",
          }}
        >
          {apiCallResult == null
            ? ""
            : apiCallResult.files.map((p) => (
                <FilePanel
                  key={p.filename}
                  filename={p.filename}
                  fileurl={p.fileurl}
                />
              ))}
        </div>

        <div
          class={css12}
          style={{
            display: assignmentfilearray.length == 0 ? "none" : "",
          }}
        >
          {assignmentfilearray.map((p) => (
            <FilePanel
              key={p.filename}
              filename={p.filename}
              fileurl={p.fileurl}
            />
          ))}
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
            id={"fileurl" + String(props.post_id)}
            style={{
              display: props.isTeacher || isDone ? "none" : "",
            }}
            onChange={uploadfilechange}
          ></input>
          <button
            class={css10}
            style={{
              display: props.isTeacher || isDone ? "none" : "",
            }}
            onClick={uploadfile}
          >
            Upload Assignment"
          </button>
          <button
            class={css10}
            style={{
              display: props.isTeacher ? "none" : "",
            }}
            onClick={isDone ? unsubmit_assignment : submit_assignment}
          >
            {isDone ? "Unmark as Done" : "Mark as Done"}
          </button>
          <button
            class={css10}
            style={{
              display: props.isTeacher ? "" : "none",
            }}
            onClick={() => {
              setviewSubmissions((p) => !p);
              setShowComments(false);
            }}
          >
            {viewSubmissions ? "Unview Submissions" : "View Submissions"}
          </button>
        </div>
      </div>
      <div
        class={
          "w-full overflow-scroll p-4 bg-gray-400 " +
          (apiCallResult2 !== null && apiCallResult2.submissions.length !== 0
            ? "h-48"
            : "")
        }
        style={{
          display: viewSubmissions ? "" : "none",
        }}
      >
        <div class = "p-2">
          {apiCallResult2 !== null && apiCallResult2.submissions.length !== 0
            ? ""
            : "No Submission yet"}
          {apiCallResult2 == null
            ? ""
            : apiCallResult2.submissions.map((p) => (
                <Submissions
                  name={p.student_name}
                  files={p.submissions}
                  timestamp={p.timestamp}
                />
              ))}
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
                  comment.commentator_name.indexOf(" ") === -1
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
            display: showComments
              ? authContext.isEducator_state
                ? ""
                : apiCallResult.creator_id === authContext.id_state
                ? ""
                : "none"
              : "none",
            backgroundColor: "rgb(204,35,22)",
          }}
          onClick={handle_delete_post}
        >
          Delete this Post
        </button>
      </div>
    </div>
  );
}
