import React , {useState} from 'react'
import {Link} from 'react-router-dom'

export default function SideBar(props){
    const [isCurrentlyActive,setisCurrentlyActive] = useState(1)


    async function handle_click_class_home(){
      setisCurrentlyActive(1)
    }
    async function handle_click_my_post() {
      setisCurrentlyActive(2);
    }
    async function handle_click_assignments() {
      setisCurrentlyActive(3);
    }
    async function handle_click_attend_live_class() {
      setisCurrentlyActive(4);
    }
    async function handle_click_past_recording() {
      setisCurrentlyActive(5);
    }
    async function handle_click_create_test(){
      setisCurrentlyActive(6)
    }
    async function handle_click_my_students(){
      setisCurrentlyActive(7)
    }
    

    //CSS 
    const buttonStyle =
      "border-b-2 hover:border-opacity-50 hover:text-blue-500 text-lg focus:text-blue-400 border-black content-center w-9/12 p-2 focus:outline-none";
    const outerButtonDiv = 
      "w-full flex flex-col outline-none items-center h-1/12 m-2"
    const sidebarTitleDiv = 
      "border-b-2 hover:border-opacity-50 text-center text-xl text-black  border-black content-center w-full p-3"
    const outermostDiv = 
      "flex flex-col items-center bg-gray-200 w-full h-screen border-solid my-2 border-2 border-opacity-50 border-gray-700"
    const optionContainerDiv = 
      "w-full flex flex-col outline-none bg-gray-500 items-center h-1/12 mb-2"
    //___________________________________________________________________________

    
    return (
      <div class={outermostDiv}>
        <div class={optionContainerDiv}>
          <div class={sidebarTitleDiv}>{props.classname}</div>
        </div>
        <div class={outerButtonDiv}>
          <button
            class={buttonStyle.concat(
              isCurrentlyActive == 1 ? " text-blue-400 font-semibold" : ""
            )}
            onClick={handle_click_class_home}
          >
            Class Home
          </button>
        </div>
        <div class={outerButtonDiv}>
          <button
            class={buttonStyle.concat(
              isCurrentlyActive == 2 ? " text-blue-400 font-semibold" : ""
            )}
            onClick={handle_click_my_post}
          >
            My Posts
          </button>
        </div>
        <div class={outerButtonDiv}>
          <button
            class={buttonStyle.concat(
              isCurrentlyActive == 3 ? " text-blue-400 font-semibold" : ""
            )}
            onClick={handle_click_assignments}
          >
            Assignments
          </button>
        </div>
        <div
          class={outerButtonDiv}
          style={{
            display: props.isTeacher ? "" : "none",
          }}
        >
          <button
            class={buttonStyle.concat(
              isCurrentlyActive == 6 ? " text-blue-400 font-semibold" : ""
            )}
            onClick={handle_click_create_test}
          >
            Create Test
          </button>
        </div>
        <div
          class={outerButtonDiv}
          style={{
            display: props.isTeacher ? "" : "none",
          }}
        >
          <button
            class={buttonStyle.concat(
              isCurrentlyActive == 7 ? " text-blue-400 font-semibold" : ""
            )}
            onClick={handle_click_create_test}
          >
            My Students
          </button>
        </div>
        <div class={outerButtonDiv}>
          <button
            class={buttonStyle.concat(
              isCurrentlyActive == 4 ? " text-blue-400 font-semibold" : ""
            )}
            onClick={handle_click_attend_live_class}
          >
            {props.isTeacher ? "Start Livestream" : "Attend Live Class"}
          </button>
        </div>
        <div class={outerButtonDiv}>
          <button
            class={buttonStyle.concat(
              isCurrentlyActive == 5 ? " text-blue-400 font-semibold" : ""
            )}
            onClick={handle_click_past_recording}
          >
            Past Recordings
          </button>
        </div>
      </div>
    );
}