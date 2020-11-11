import React,{useState,useContext} from 'react'
import { AuthContext } from '../Contexts/AuthContext'

export default function StudentDetailTab(props){
    const authContext = useContext(AuthContext)

    return (
      <div class="mt-8 bg-gray-200 px-2 py-2 rounded-lg">
        <div class="flex flex-row items-center">
          <div class="font-semibold w-10/12">
            {props.name} (
            {(props.id !== authContext.id_state)? 
                <a
                class="font-normal hover:opacity-50"
                href={"mailto:" + props.email}
                >
                {props.email}
                </a> :
                <span class = "font-normal">
                    Yes you are your own classmate...
                </span>
            }
            )
          </div>
          <div
            class="w-2/12"
            style={{
              display: props.isTeacher ? "" : "none",
            }}
          >
            <button class="rounded-lg text-center w-full p-2 mx-2 bg-red-600 hover:opacity-75 focus:font-bold shadow-xl focus:shadow-none font-semibold focus:outline-none"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
}