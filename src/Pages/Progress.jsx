import React, { useContext } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { TaskContext } from '../context/TaskContext'

const Progress = () => {
  const { tasks } = useContext(TaskContext)

  const completedCount = tasks.filter(task => task.completed).length
  const pendingCount = tasks.filter(task => !task.completed).length

  const data = [
    { name: 'Completed', value: completedCount, color: '#10B981' },
    { name: 'Pending', value: pendingCount, color: '#FBBF24' },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800 text-center">
        Progress Overview
      </h2>

      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-3 sm:mb-4 text-center">
          Task Completion
        </h3>

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks available. Please add some tasks.</p>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-full h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius="80%"
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* ✅ Custom Legend */}
            <div className="flex gap-4 mt-4">
              {data.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-gray-700">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Progress
