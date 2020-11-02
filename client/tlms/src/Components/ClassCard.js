import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios'
import ROUTES from '../routes'
import {Link} from 'react-router-dom'
import {AuthContext} from '../Contexts/AuthContext'
import {ClassContext} from "../Contexts/ClassContext"


export default function ClassCard(props){

    const [apicallresult,setapicallresult] = useState(null)

    const authContext = useContext(AuthContext)
    const classContext = useContext(ClassContext)

    useEffect(()=>{
      async function f(){
          const res = await axios.get(ROUTES.api.get.courses + "/" + String(props.classCode))
          setapicallresult(res.data)
      }
      f();
    },[])
    const [isHovered,setisHovered] = useState(false)

    const classcodeDiv = "w-full text-2xl bg-gray-400 text-gray-900 font-bold p-2"
    const classnameDiv = "w-full text-xl bg-gray-200 text-gray-800 font-semibold p-3"
    const classdescDiv = "w-full text-lg bg-gray-200 text-gray-700 p-3"

    async function handle_click(){
        //do api call here to get info about the relevent classes
        classContext.setclassName_state(apicallresult.name)
        classContext.setclassCode_state(apicallresult.invite_code)
        classContext.setcreator_name_state(apicallresult.creator_name)
    }
    
    return (
      <Link
        to={authContext.isEducator_state ? "/class2" : "class"}
        class="border-2 border-gray-400 post text-left shadow-xl hover:shadow-2xl focus:shadow-none"
      >
        <button
          class = "w-full text-left"
          onClick={handle_click}
          onMouseEnter={() => setisHovered(true)}
          onMouseLeave={() => {
            Array.from(document.getElementsByClassName("post")).includes(
              document.activeElement
            )
              ? setisHovered(true)
              : setisHovered(false);
          }}
          onFocus={() => setisHovered(true)}
          onBlur={() => setisHovered(false)}
        >
          <div class={classcodeDiv}>
            {apicallresult == null ? "" : apicallresult.invite_code}
          </div>
          <div class={classnameDiv}>
            {apicallresult == null ? "" : apicallresult.name}
          </div>
          <div class={classdescDiv}>
            <div class="font-medium">
              {apicallresult == null
                ? ""
                : props.isStudent
                ? apicallresult.creator_name
                : "Your Class"}
            </div>
            <div style={{ display: isHovered ? "block" : "none" }}>
              <i>{apicallresult == null ? "" : apicallresult.course_desc}</i>
            </div>
          </div>
        </button>
      </Link>
    );
}