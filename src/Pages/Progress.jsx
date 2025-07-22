import React, { useContext } from 'react'
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'
import { TaskContext } from '../context/TaskContext'

const Progress = () => {
  const { tasks } = useContext(TaskContext)

  const completedCount = tasks.filter(task => task.completed).length
  const pendingCount = tasks.filter(task => !task.completed).length

  const data = [
    { name: 'Completed', value: completedCount },
    { name: 'Pending', value: pendingCount },
  ]

  const COLORS = ['#10B981', '#FBBF24']

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Progress Overview</h2>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Task Completion</h3>

        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks available. Please add some tasks.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

export default Progress
