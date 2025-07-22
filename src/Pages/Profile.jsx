import React, { useContext, useEffect, useState } from 'react'
import { TaskContext } from '../context/TaskContext'

const Profile = () => {
  const { profile, updateProfile } = useContext(TaskContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studyHours: 0,
  })

  // Sync local state with profile from context
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        studyHours: profile.studyHours || 0,
      })
    }
  }, [profile])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'studyHours' ? parseInt(value) || 0 : value,
    }))
  }

  const handleSave = () => {
    updateProfile({
      name: formData.name,
      email: formData.email,
      study_hours: formData.studyHours,
    })
    alert('✅ Profile saved successfully!')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Profile</h2>
      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Study Hours / Day</label>
          <input
            type="number"
            name="studyHours"
            value={formData.studyHours}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            min={0}
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default Profile
