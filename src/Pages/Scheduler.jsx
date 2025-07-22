import React, { useContext, useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { format, isSameDay } from 'date-fns'
import { TaskContext } from '../context/TaskContext'

const Scheduler = () => {
  const { tasks, addTask, deleteTask, editTask, getRecommendations } = useContext(TaskContext)

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [formData, setFormData] = useState({ title: '', description: '', date: new Date() })
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [suggestions, setSuggestions] = useState([])  // ✅ New state for suggestions

  const tasksForSelectedDate = tasks.filter((task) =>
    isSameDay(new Date(task.date), selectedDate)
  )

  useEffect(() => {
    setFormData({
      title: '',
      description: '',
      date: selectedDate,
    })
    setEditingTaskId(null)
    setSuggestions([])  // ✅ Reset suggestions when date changes
  }, [selectedDate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formattedDate = format(formData.date, 'yyyy-MM-dd')

    if (editingTaskId) {
      await editTask(editingTaskId, {
        title: formData.title,
        date: formattedDate,
        completed: false
      })
    } else {
      await addTask({
        title: formData.title,
        date: formattedDate,
      })
    }

    setFormData({ title: '', description: '', date: selectedDate })
    setEditingTaskId(null)
    setSuggestions([])
  }

  const handleToggleComplete = async (taskId, newStatus) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      await editTask(taskId, {
        title: task.title,
        date: task.date,
        completed: newStatus
      });
    }
  };

  const handleEditClick = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
      date: new Date(task.date),
    })
    setEditingTaskId(task.id)
    setSuggestions([])
  }

  // ✅ Suggestion Handler
  const handleSuggest = async () => {
    if (formData.title.trim() === '') return
    const results = await getRecommendations(formData.title)
    setSuggestions(results)
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <div className="flex flex-col items-center md:w-1/2">
        <h2 className="text-xl font-semibold mb-4 text-center">📅 Select Date</h2>
        <div className="rounded shadow p-2 border">
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            tileContent={({ date, view }) => {
              if (view === 'month') {
                const hasTask = tasks.some((task) =>
                  isSameDay(new Date(task.date), date)
                )
                return hasTask ? (
                  <div className="flex justify-center mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  </div>
                ) : null
              }
            }}
          />
        </div>
      </div>

      <div className="md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">
          {editingTaskId ? '✏️ Edit Task' : '➕ Add Task'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editingTaskId ? 'Update Task' : 'Add Task'}
            </button>
            <button
              type="button"
              onClick={handleSuggest}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Get Suggestions
            </button>
          </div>
        </form>

        {/* ✅ Show Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h4 className="font-semibold mb-2">💡 Suggested Tasks</h4>
            <ul className="list-disc pl-5 space-y-1">
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">📋 Tasks on {format(selectedDate, 'dd MMM yyyy')}</h3>
          {tasksForSelectedDate.length === 0 ? (
            <p className="text-gray-500">No tasks found for this day.</p>
          ) : (
            <ul className="space-y-2">
              {tasksForSelectedDate.map((task) => (
                <li key={task.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task.id, !task.completed)}
                    />
                    <span className={task.completed ? 'line-through text-gray-400' : 'font-medium'}>
                      {task.title}
                    </span>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => handleEditClick(task)} className="text-blue-500 hover:text-blue-700">
                      📝
                    </button>
                    <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>

          )}
        </div>
      </div>
    </div>
  )
}

export default Scheduler
