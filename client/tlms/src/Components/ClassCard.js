import React,{useState} from 'react'

export default function ClassCard(props){

    const [isHovered,setisHovered] = useState(false)

    const classcodeDiv = "w-full text-2xl bg-gray-400 text-gray-900 font-bold p-2"
    const classnameDiv = "w-full text-xl bg-gray-200 text-gray-800 font-semibold p-3"
    const classdescDiv = "w-full text-lg bg-gray-200 text-gray-700 p-3"

    async function handle_click(){
        //do api call here to get info about the relevent classes

    }
    return (
      <button class="border-2 border-gray-400 post text-left shadow-xl hover:shadow-2xl focus:shadow-none" 
      onClick = {handle_click}
      onMouseEnter = {() => setisHovered(true)}
      onMouseLeave = {() => {(Array.from(document.getElementsByClassName('post')).includes(document.activeElement))?setisHovered(true):setisHovered(false)}}
      onFocus      = {() => setisHovered(true)}
      onBlur       = {() => setisHovered(false)}
      >
        <div class= {classcodeDiv}>
          {props.classCode}
        </div>
        <div class= {classnameDiv}>
          {props.className}
        </div>
        <div class={classdescDiv}>
          <div class = "font-medium">{props.classInstructor}</div>
          <div style = {{display:(isHovered)?"block":"none"}}>
            <i>{props.classDesc}</i>
          </div>
        </div>
      </button>
    );
}