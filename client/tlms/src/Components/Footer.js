import React from 'react'

//ये फ़िलहाल निर्माणाधीन है।

export default function Footer(){

  const outerDiv = "w-screen px-16 py-12 space-x-2 bg-black flex flex-row justify-center items-center" 
  const container = "w-3/12 h-full text-white bg-black"
  const rightmostflex = "h-full w-4/12 text-yellow-700 text-opacity-50 text-xl bg-black"
  const medikshaandmodi = "text-sm hover:font-semibold"

    return (
      <div class={outerDiv}>
        <div class={container}>
          <div class="text-yellow-800 text-lg mb-4">Reach Out to Us</div>
          <div class={medikshaandmodi}>
            <a href="mailto:dikshamodi28@gmail.com">
              Diksha Modi
            </a>
          </div>
          <div class={medikshaandmodi}>
            <a href="mailto:subham.kr27@gmail.com">
              Subham Kumar Modi
            </a>
          </div>
          <div class={medikshaandmodi}>
            <a href="mailto:kunalojha1999@gmail.com">
              Kunal Ojha
            </a>
          </div>
        </div>
        <div class="h-full w-5/12 text-white bg-black">
          <div class="text-yellow-800 mb-4">Source Code available at :</div>
          <div class="text-sm">
            <a
              href="https://github.com/diksham1/Teaching-Learning-Management-System"
              target="new"
            >
              https://github.com/diksham1/Teaching-Learning-Management-System
            </a>
          </div>
        </div>
        <div class={rightmostflex}>
          <div>MIT License</div>
          <div>Copyright (c) 2020 Diksha Modi</div>
        </div>
      </div>
    );
}


