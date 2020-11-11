import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import SideBar from "./SideBar.js";
import Header from "./Header";
import Post from "./Post";
import TaskSideBar from "./TaskSideBar";
import Footer from "./Footer";
import Mypost from "./Mypost";
import { ClassContext } from "../Contexts/ClassContext";
import { AuthContext } from "../Contexts/AuthContext";
import ROUTES from "../routes.js";
import axios from "axios";

export default function Class() {
  const classContext = useContext(ClassContext);
  const authContext = useContext(AuthContext);

  const [showmypost, setshowmypost] = useState(true);
  const [posts_array, setposts_array] = useState(null);
  const [redirect, setredirect] = useState(false);

  async function getPostList() {
    const res = await axios.get(
      ROUTES.api.get.courses +
        "/" +
        String(classContext.classCode_state) +
        "/posts"
    );
    setposts_array(res.data.posts);
  }

  useEffect(() => {
    getPostList();
  }, []);

  useEffect(() => {
    getPostList();
  }, [classContext.classCode_state]);

  if (redirect) {
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <div>
      <div style={{ display: "none" }}>{classContext.classCode_state}</div>
      <Header
        name={
          authContext.name_state.indexOf(" ") === -1
            ? authContext.name_state
            : authContext.name_state.substring(
                0,
                authContext.name_state.indexOf(" ")
              )
        }
        isStudent={!authContext.isEducator_state}
      />
      <div class="flex flex-row">
        <div class="mx-2 w-3/12">
          <SideBar
            classname={classContext.className_state}
            isTeacher={authContext.isEducator_state}
            setredirect={setredirect}
            setposts_array={setposts_array}
            setshowmypost={setshowmypost}
          />
        </div>
        <div class="w-9/12 mx-2 flex flex-col space-y-8 py-2 px-8">
          <div
            style={{
              display: showmypost ? "" : "none",
            }}
          >
            <Mypost
              getPostList={getPostList}
              isTeacher={authContext.isEducator_state}
              showmypost={showmypost}
            />
          </div>

          {posts_array == null
            ? ""
            : posts_array
                .reverse()
                .map((post_id) => (
                  <Post
                    key={post_id}
                    post_id={post_id}
                    isTeacher={authContext.isEducator_state}
                    getPostList={getPostList}
                  />
                ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
