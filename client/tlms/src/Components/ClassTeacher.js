import React from "react";
import SideBar from "./SideBar.js";
import Header from "./Header";
import Post from "./Post";
import TaskSideBar from "./TaskSideBar";
import Footer from "./Footer";
import Mypost from "./Mypost";

export default function Class() {
  return (
    <div>
      <Header name="Ice" />
      <div class="flex flex-row">
        <div class="mx-2 lg:w-2/12 w-3/12">
          <SideBar classname="UI/UX Design" isTeacher = "true"/>
        </div>
        <div class="lg:w-7/12 w-9/12 mx-2 flex flex-col space-y-4 p-2">
          <Mypost isTeacher = "true"/>
          <Post
            postername="You"
            hasAssignment="true"
            isTeacher = "true"
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
            postername="You"
            title="Lorem Ipsum"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            hasAssignment="true"
            isTeacher = "true"
            dueDate="Oct 5"
          />
          <Post
            postername="World"
            title="Lorem Ipsum"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
        </div>
        <div class="w-3/12 lg:block hidden">
          <TaskSideBar />
        </div>
      </div>
      <Footer />
    </div>
  );
}
