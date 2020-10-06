import React from 'react'
import TaskCard from './TaskCard'

export default function TaskSideBar(props){

    return (
      <div class="w-full flex flex-col md:space-y-4 mr-6 my-2 p-4">
        <div class="bg-gray-700 font-medium text-3xl rounded-sm border-2 border-gray-400 text-gray-200 text-center">
          Pinned Tasks
        </div>
        <TaskCard task="Task 1" desc="Sample Description 1" />
        <TaskCard task="Task 2" desc="Sample Description 2" />
        <TaskCard task="Task 3" desc="Sample Description 3" />
        <button class="w-full text-2xl bg-gray-400 text-gray-900 font-bold p-2 shadow-xl hover:opacity-75">
          + New Task
        </button>
      </div>
    );
}