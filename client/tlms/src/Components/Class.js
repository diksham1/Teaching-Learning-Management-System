import React,{useContext,useEffect, useState} from 'react'
import SideBar from './SideBar.js'
import Header from './Header'
import Post from './Post'
import TaskSideBar from './TaskSideBar'
import Footer from './Footer'
import Mypost from './Mypost'
import {ClassContext} from '../Contexts/ClassContext'
import {AuthContext} from '../Contexts/AuthContext'
import ROUTES from '../routes.js'
import axios from 'axios'


export default function Class(){
    const classContext = useContext(ClassContext)
    const authContext = useContext(AuthContext)

    const [posts_array, setposts_array] = useState(null)

    useEffect(() => {
        async function f(){
          const res = await axios.get(ROUTES.api.get.courses + "/" + String(classContext.classCode_state) + "/posts")
          setposts_array(res.data.posts)
          console.log(res.data.posts)
        }
        f()
    },[])
    return (
      <div>
        <Header
          name={
            authContext.name_state.indexOf(" ") == -1
              ? authContext.name_state
              : authContext.name_state.substring(
                  0,
                  authContext.name_state.indexOf(" ")
                )
          }
          isStudent="true"
        />
        <div class="flex flex-row">
          <div class="mx-2 lg:w-2/12 w-3/12">
            <SideBar classname={classContext.className_state} />
          </div>
          <div class="lg:w-7/12 w-9/12 mx-2 flex flex-col space-y-4 p-2">
            <Mypost />
            {(posts_array == null)
              ? ""
              : posts_array.map((post_id) => (
                  <Post
                    key={post_id}
                    post_id = {post_id}
                  />
                ))}
          </div>
          <div class="w-3/12 lg:block hidden">
            <TaskSideBar />
          </div>
        </div>
        <Footer />
      </div>
    );
}