import React ,{useState}from 'react'
import Logo from "./Logo.js"
import JoinClassOverlay from './JoinClassOverlay.js'

export default function Headers(props){

  const [showJoinClassOverlay, setshowJoinClassOverlay] = useState(false); 


    async function handle_class_join_overlay(event){
        const s = event.target
        const t = Array.from(document.querySelector('.joinClassOverlay').querySelectorAll('*'))
        if(!t.includes(s)){
          setshowJoinClassOverlay(false)
        }
    }


    return (
      <div>
        <div
          class=" w-screen h-screen z-10 bg-gray-800 bg-opacity-50 flex flex-col justify-center items-center absolute"
          style={{
            display: showJoinClassOverlay ? "flex" : "none",
          }}
          onClick={handle_class_join_overlay}
        >
          <div class="absolute md:w-3/12 w-6/12 joinClassOverlay">
            <JoinClassOverlay />
          </div>
        </div>
        <div class="grid lg:grid-cols-12 grid-cols-6 px-2 mx-2 my-2 bg-gray-200">
          <button class="col-span-2 m-2 items-end justify-end">
            <Logo />
          </button>
          <div class="col-span-6 lg:inline hidden text-3xl p-1 mb-2 mt-4 mr-2 items-end justify-start">
            <div>Learning Management System</div>
          </div>

          <button
            class="col-span-2 m-2 text-2xl border-gray-600 hover:shadow-xl shadow-md border-opacity-75 border-solid border-2 bg-gray-200"
            onClick={() => setshowJoinClassOverlay(true)}
            id="btn_join"
          >
            Join Class
          </button>

          <button
            class="col-span-2 m-2 text-2xl border-gray-600 hover:shadow-xl shadow-md border-opacity-75 border-solid border-2 bg-gray-200"
            onClick={() => {}}
          >
            Hello {props.name}
          </button>
        </div>
      </div>
    );
}