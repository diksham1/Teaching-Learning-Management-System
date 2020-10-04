import React from 'react'
import SideBar from './SideBar.js'
import Header from './Header'
import Post from './Post'
import TaskCard from './TaskCard'
import Footer from './Footer'

export default function Class(){

    function mypost_focus(){
        if(document.getElementById("mypost").innerHTML === "Write a Post"){
            document.getElementById("mypost").innerHTML = ""
        }
    }
    function mypost_blur(){
        if (document.getElementById("mypost").innerHTML === "") {
          document.getElementById("mypost").innerHTML = "Write a Post";
        }
    }
    function mypost_title_focus(){
        if (
          document.getElementById("myposttitle").innerHTML === "Post Title Here"
        ) {
          document.getElementById("myposttitle").innerHTML = "";
        }
    }
    function mypost_title_blur(){
        if (document.getElementById("myposttitle").innerHTML === "") {
          document.getElementById("myposttitle").innerHTML = "Post Title Here";
        }
    }

    return (
      <div>
        <Header name="World" />
        <div class="flex flex-row">
          <div class="mx-2 w-2/12">
            <SideBar classname="UI/UX Design" />
          </div>
          <div class="w-7/12 mx-2 flex flex-col space-y-4 p-2 h-screen overflow-scroll">
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
                  <button class="rounded-lg text-center w-2/12 p-2 mx-2 bg-green-600 hover:opacity-75 font-semibold">
                    Attach File
                  </button>
                  <button class="rounded-lg text-center w-2/12 p-2 mx-2 bg-red-600 hover:opacity-75 font-semibold">
                    Post
                  </button>
                </div>
              </div>
            </div>
            <Post
              postername="World"
              hasAssignment="true"
              dueDate="Sept 23"
              title="Lorem Ipsum"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
            <Post
              postername="World"
              title="Lorem Ipsum"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
            <Post
              postername="World"
              title="Lorem Ipsum"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
            <Post
              postername="World"
              title="Lorem Ipsum"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              hasAssignment="true"
              dueDate="Oct 5"
            />
            <Post
              postername="World"
              title="Lorem Ipsum"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
          </div>
          <div class="lg:flex md:flex-col hidden md:space-y-4 w-3/12 mr-6 p-2">
            <div class="bg-gray-700 font-medium text-3xl rounded-sm border-2 border-gray-400 text-gray-200 text-center">
              Pinned Tasks
            </div>
            <TaskCard task="Task 1" desc="Sample Description 1" />
            <TaskCard task="Task 2" desc="Sample Description 2" />
            <TaskCard task="Task 3" desc="Sample Description 3" />
          </div>
        </div>
        <Footer />
      </div>
    );
}