import React,{useContext} from 'react'
import {AuthContext} from '../Contexts/AuthContext'
import axios from 'axios'
import ROUTES from '../routes'

export default function CreateClassOverlay(props){

    const authContext = useContext(AuthContext)

    async function handle_press(){
      const p1 = document.getElementById('classname_inp').value
      const p2 = document.getElementById('class_desc_inp').innerHTML
      const res = await axios.post(ROUTES.api.post.courses,
        { 
          "creator_id" : authContext.id_state,
          "creator_name" : authContext.name_state,
          "name" : p1,
          "course_desc" : p2
        })
        console.log(res)
        props.f(false)

    }

    const outerDiv = "bg-gray-200 flex w-full h-full flex-col border-red-700 border-solid border-2"
    const titleDiv = "bg-gray-900 w-full p-4 text-3xl font-bold border-solid border-white border-2 text-white"
    const formelementtitle = "mb-1 text-2xl font-medium text-red-800"
    const formInput = "w-full p-2 bg-white rounded-lg focus:bg-gray-200";
    const formInputDesc = "w-full p-2 bg-white rounded-lg focus:bg-gray-100";
    const buttonConatiner = "flex flex-row items-center justify-center p-2"
    const buttoncss = "bg-red-700 hover:bg-red-600 w-5/12 rounded-lg p-2 focus:font-semibold"



    return (
      <div class= {outerDiv}>
        <div class= {titleDiv}>
          Create Class
        </div>
        <div class="px-4">
          <div class={formelementtitle}>Name of your Course</div>
          <input
            type="text"
            id = "classname_inp"
            class={formInput}
          ></input>
        </div>
        <div class="px-4">
          <div class={formelementtitle}>Course Description</div>
          <div
            type="text"
            class={formInputDesc}
            id = "class_desc_inp"
            contentEditable = "true"
          ></div>
        </div>
        <div class= {buttonConatiner}>
          <button
            type="button"
            class= {buttoncss}
            onClick = {handle_press}
          >
            Create Class
          </button>
        </div>
      </div>
    );
}