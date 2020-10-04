import React ,{useState, useCallback} from 'react'
import Header from './Header.js'
import Footer from './Footer.js'
import JoinClassOverlay from './JoinClassOverlay.js'
import ClassCard from "./ClassCard.js"
import TaskCard from "./TaskCard.js"


export default function DashBoard(){


    

    return (
      <div>
        <Header name="World" />
        <div class="flex flex-row">
          <div class="lg:w-9/12 w-full h-screen overflow-scroll flex flex-col space-y-4 px-16 py-2 ">
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
          <div class="lg:flex md:flex-col hidden md:space-y-4 w-3/12 mr-6 my-2 p-4">
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