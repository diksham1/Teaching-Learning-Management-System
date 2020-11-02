import React ,{useState, useCallback, useContext, useEffect} from 'react'
import Header from './Header.js'
import Footer from './Footer.js'
import ClassCard from "./ClassCard.js"
import TaskSideBar from "./TaskSideBar.js"
import {AuthContext} from "../Contexts/AuthContext"
import axios from 'axios'
import ROUTES from '../routes.js'


export default function DashBoard(){

    const authContext = useContext(AuthContext)

    const [course_array,setcourse_array] = useState(null)

    useEffect(() => {
      async function f(){
          if(authContext.isEducator_state){
            const res = await axios.get(
              ROUTES.api.get.creatorcourses + "/" + String(authContext.id_state)
            );
            setcourse_array(
              res.data.courses.map((p) => {
                return p.invite_code;
              })
            );
          }
          else{
            const res = await axios.get(ROUTES.api.get.users + "/" + String(authContext.id_state));
            setcourse_array(res.data.courses)
          }
      }
      f();
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
          isStudent = {!authContext.isEducator_state}

        />
        <div class="flex flex-row">
          <div class="lg:w-9/12 w-full flex flex-col space-y-4 px-16 py-2 ">
            {(course_array == null)? "" : course_array.map((course) => (
              <ClassCard key={course} classCode={course} isStudent = {!authContext.isEducator_state}/>
              ))
            }
          </div>
          <div class="w-3/12 lg:block hidden">
            <TaskSideBar />
          </div>
        </div>
        <Footer />
      </div>
    );
}