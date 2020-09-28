import React from 'react'
import Header from './Header.js'
import Footer from './Footer.js'
import Join_Class_Overlay from './Join_Class_Overlay.js'
import Class_Card from "./Class_Card.js"
import Task_Card from "./Task_Card"

export default function DashBoard(){
    return (
      <div>
        <Header name="Tejaswini" />
        <div class="flex flex-row">
          <div class="md:w-9/12 w-full flex flex-col space-y-4 px-16 py-2 ">
            <Class_Card
              classCode="yusy67"
              className="UI/UX"
              classInstructor="James Anderson"
              classDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis et lorem sit amet vehicula. Etiam vel nibh nec nisi euismod mollis"
            />
            <Class_Card
              classCode="yusy67"
              className="UI/UX"
              classInstructor="James Anderson"
              classDesc="Lorem Ipsum"
            />
            <Class_Card
              classCode="yusy67"
              className="UI/UX"
              classInstructor="James Anderson"
              classDesc="Lorem Ipsum"
            />
            <Class_Card
              classCode="yusy67"
              className="UI/UX"
              classInstructor="James Anderson"
              classDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis et lorem sit amet vehicula. Etiam vel nibh nec nisi euismod mollis"
            />
            <Class_Card
              classCode="yusy67"
              className="UI/UX"
              classInstructor="James Anderson"
              classDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis et lorem sit amet vehicula. Etiam vel nibh nec nisi euismod mollis"
            />
          </div>
            <div class="md:flex md:flex-col hidden md:space-y-4 w-3/12 mr-6 my-2 p-4">
              <div class="bg-gray-700 font-medium text-3xl rounded-sm border-2 border-gray-400 text-gray-200 text-center">
                Pinned Tasks
              </div>
              <Task_Card task="Task 1" desc="Sample Description" />
              <Task_Card task="Task 2" desc="Sample Description" />
              <Task_Card task="Task 3" desc="Sample Description" />
            </div>
        </div>
        <Footer />
      </div>
    );
}