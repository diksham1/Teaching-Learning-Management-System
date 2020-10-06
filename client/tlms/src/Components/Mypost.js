import React, { useState } from 'react'

export default function Mypost(props){

  const [isAssignment,setisAssignment] = useState(false)


  function mypost_focus() {
    if (document.getElementById("mypost").innerHTML === "Write a Post") {
      document.getElementById("mypost").innerHTML = "";
    }
  }
  function mypost_blur() {
    if (document.getElementById("mypost").innerHTML === "") {
      document.getElementById("mypost").innerHTML = "Write a Post";
    }
  }
  function mypost_title_focus() {
    if (
      document.getElementById("myposttitle").innerHTML === "Post Title Here"
    ) {
      document.getElementById("myposttitle").innerHTML = "";
    }
  }
  function mypost_title_blur() {
    if (document.getElementById("myposttitle").innerHTML === "") {
      document.getElementById("myposttitle").innerHTML = "Post Title Here";
    }
  }

  return (
    <div>
      <div class="w-full shadow-xl hover:shadow-2xl">
        <div class="bg-gray-700 text-gray-200 p-4 cursor-pointer text-2xl">
          You
        </div>
        <div>
          <div
            class="w-full bg-gray-100 text-black p-4 text-lg text-opacity-50 border-b-2 border-gray-400 border-solid"
            id="myposttitle"
            contentEditable="true"
            onFocus={mypost_title_focus}
            onBlur={mypost_title_blur}
          >
            Post Title Here
          </div>
          <div
            class="w-full bg-gray-100 text-black p-4 text-lg text-opacity-50"
            id="mypost"
            contentEditable="true"
            onFocus={mypost_focus}
            onBlur={mypost_blur}
          >
            Write a Post
          </div>
          <div class="w-full bg-gray-100 text-white p-4 text-lg flex flex-row justify-end">
            <button
              class="rounded-lg text-center w-4/12 p-2 mx-2 bg-green-600 hover:opacity-75 font-semibold"
              style={{
                display: props.isTeacher ? "" : "none",
              }}
              onClick={() => setisAssignment((p) => !p)}
            >
              {isAssignment ? "Unmark As Assignment" : "Mark As Assignment"}
            </button>
            <input
              type="date"
              class="rounded-lg text-center w-4/12 p-2 mx-2 text-black ng-gray-200 hover:opacity-75 font-semibold"
              style={{
                display: isAssignment ? "" : "none",
              }}
            ></input>
            <button class="rounded-lg text-center w-2/12 p-2 mx-2 bg-green-600 hover:opacity-75 font-semibold">
              Attach File
            </button>
            <button class="rounded-lg text-center w-2/12 p-2 mx-2 bg-red-600 hover:opacity-75 font-semibold">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}