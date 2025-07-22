import React, { useContext } from 'react'
import { TaskContext } from '../context/TaskContext'
import {
  format,
  isToday,
  isThisWeek,
  parseISO,
  isValid,
  startOfDay,
} from 'date-fns'

const Dashboard = () => {
  const { tasks } = useContext(TaskContext)

  // ✅ Filter only pending (not completed) tasks
  const pendingTasks = tasks.filter((task) => !task.completed)

  // ✅ Parse and normalize dates
  const parsedTasks = pendingTasks
    .map((task) => {
      const dateObj = parseISO(task.date)
      return isValid(dateObj) ? { ...task, dateObj: startOfDay(dateObj) } : null
    })
    .filter((task) => task !== null)

  const totalTasks = parsedTasks.length
  const todayTasks = parsedTasks.filter((task) => isToday(task.dateObj)).length
  const weekTasks = parsedTasks.filter((task) =>
    isThisWeek(task.dateObj, { weekStartsOn: 1 })
  ).length

  const recentTasks = [...parsedTasks]
    .sort((a, b) => b.dateObj - a.dateObj)
    .slice(0, 5)

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">Pending Tasks</p>
          <h3 className="text-3xl font-bold text-indigo-600">{totalTasks}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">Today</p>
          <h3 className="text-3xl font-bold text-green-500">{todayTasks}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">This Week</p>
          <h3 className="text-3xl font-bold text-yellow-500">{weekTasks}</h3>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Recent Pending Tasks</h4>
        {recentTasks.length > 0 ? (
          <ul className="space-y-2">
            {recentTasks.map((task, index) => (
              <li key={index} className="flex justify-between text-gray-700">
                <span>{task.title}</span>
                <span className="text-sm text-gray-500">
                  {format(task.dateObj, 'dd MMM yyyy')}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No pending tasks found.</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
