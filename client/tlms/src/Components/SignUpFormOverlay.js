import React,{useState} from 'react'
import ROUTES from '../routes'
import axios from 'axios'

export default function SignUpFormOverlay(props){


    async function createAccount(){
      
      const p1 = document.getElementById('name').value
      const p2 = document.getElementById("email").value;
      const p3 = document.getElementById("phone").value;
      const p4 = document.getElementById("password").value;
      const p5 = document.getElementById("cpassword").value;
      
      const check1 = (p4 === p5)
      const check2 = (!isNaN(p3) && p3.length === 10)
      const check3 = validateemail(p2)

      if(check1 === false)
        props.setusrmsg('Password Mismatch')
      else if(check2 === false)
        props.setusrmsg('Phone Number not valid')
      else if(check3 === false)
        props.setusrmsg('Email is not valid')
      else{
        const res = await axios.post(ROUTES.api.post.users , {'name' : p1 , 'email' : p2 , 'phone': p3 , 'password' : p4})
        console.log(res);
        if(res.data.result === true)
          props.setusrmsg('Account Creation Successful')
        else
          props.setusrmsg('Account Creation Failed')
      }
      
    }
    function validateemail(e){  
      var x=e  
      var atposition=x.indexOf("@");  
      var dotposition=x.lastIndexOf(".");  
      if (atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length){  
        return false;  
      } 
      return true 
    }

    const outerdiv = "bg-gray-200 flex w-full h-full flex-col border-red-700 border-solid border-2"
    const titlecss = "bg-gray-900 w-full p-4 text-3xl font-bold border-solid border-white border-2 text-white"
    const forminputtitle = "mb-1 text-2xl font-medium text-red-800"
    const forminput = "w-full p-2 bg-white rounded-lg focus:bg-gray-200"
    const buttondiv = "flex flex-row items-center justify-center p-2"
    const buttoncss = "bg-red-700 hover:bg-red-600 w-5/12 rounded-lg p-2 focus:font-semibold"

    return (
      <div class={outerdiv}>
        <div class={titlecss}>Sign Up</div>
        <div class="px-4">
          <div class={forminputtitle}>Name*</div>
          <input type="text" class={forminput} id = "name"></input>
        </div>
        <div class="px-4">
          <div class={forminputtitle}>Email*</div>
          <input type="text" class={forminput} id = "email"></input>
        </div>
        <div class="px-4">
          <div class={forminputtitle}>Phone Number</div>
          <input type="text" class={forminput} id = "phone"></input>
        </div>
        <div class="px-4">
          <div class={forminputtitle}>Password*</div>
          <input type="password" class={forminput} id = "password"></input>
        </div>
        <div class="px-4">
          <div class={forminputtitle}>Confirm Password*</div>
          <input type="password" class={forminput} id = "cpassword"></input>
        </div>
        <div class={buttondiv}>
          <button
            type="button"
            class={buttoncss}
            onClick = {createAccount}
          >
            Create Account
          </button>
        </div>
      </div>
    );
}