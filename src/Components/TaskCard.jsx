import React from 'react'

const TaskCard = ({ task }) => {
  return (
    <div className="flex justify-between items-center p-3 rounded-md border hover:shadow-sm bg-gray-50">
      <div>
        <h4 className="font-medium text-gray-800">{task.title}</h4>
        <p className="text-sm text-gray-500">{task.due}</p>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-semibold 
        ${task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
        {task.status}
      </span>
    </div>
  )
}

export default TaskCard