import React ,{useState, useCallback, useContext} from 'react'
import Header from './Header.js'
import Footer from './Footer.js'
import ClassCard from "./ClassCard.js"
import TaskSideBar from "./TaskSideBar.js"
import {AuthContext} from "../Contexts/AuthContext"


export default function DashBoard(){

    const authContext = useContext(AuthContext)

    console.log(authContext)
  
    return (
      <div>
        <Header name={authContext.name_state}/>
        <div class="flex flex-row">
          <div class="lg:w-9/12 w-full flex flex-col space-y-4 px-16 py-2 ">
            <ClassCard
              classCode="yusy67"
              className="UI/UX"
              classInstructor="James Anderson"
              classDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis et lorem sit amet vehicula. Etiam vel nibh nec nisi euismod mollis"
            />
            <ClassCard
              classCode="yusy67"
              className="UI/UX"
              classInstructor="James Anderson"
              classDesc="Lorem Ipsum"
            />
            <ClassCard
              classCode="yusy67"
              className="UI/UX"
              classInstructor="James Anderson"
              classDesc="Lorem Ipsum"
            />
            <ClassCard
              classCode="yusy67"
              className="UI/UX"
              classInstructor="James Anderson"
              classDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis et lorem sit amet vehicula. Etiam vel nibh nec nisi euismod mollis"
            />
            <ClassCard
              classCode="yusy67"
              className="UI/UX"
              classInstructor="James Anderson"
              classDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis et lorem sit amet vehicula. Etiam vel nibh nec nisi euismod mollis"
            />
          </div>
          <div class="w-3/12 lg:block hidden">
              <TaskSideBar/>
          </div>
        </div>
        <Footer />
      </div>
    );
}