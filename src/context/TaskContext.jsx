import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const TaskContext = createContext()

const API_BASE = 'http://localhost:8000' // Change this for production if needed

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [profile, setProfile] = useState(null)

  // ✅ Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tasks`)
      setTasks(res.data)
    } catch (err) {
      console.error('❌ Error fetching tasks:', err)
    }
  }

  // ✅ Add a new task
const addTask = async (task) => {
  try {
    const payload = {
      ...task,
      completed: false, // ✅ Add this explicitly
    }
    const res = await axios.post(`${API_BASE}/tasks`, payload)
    const newTask = res.data
    setTasks(prev => [...prev, newTask])
  } catch (err) {
    console.error("❌ Error adding task:", err)
  }
}
const editTask = async (taskId, updatedFields) => {
  try {
    const response = await axios.put(`http://localhost:8000/tasks/${taskId}`, updatedFields);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, ...updatedFields } : task
      )
    );
  } catch (error) {
    console.error("❌ Error editing task:", error);
  }
};

  // ✅ Fetch user profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_BASE}/profile`)
      setProfile(res.data)
    } catch (err) {
      console.error('❌ Error fetching profile:', err)
    }
  }

  // ✅ Update user profile
  const updateProfile = async (profileData) => {
    try {
      const res = await axios.put(`${API_BASE}/profile`, profileData)
      setProfile(res.data)
      return res.data
    } catch (err) {
      console.error('❌ Error updating profile:', err)
    }
  }
  const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_BASE}/tasks/${taskId}`)
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  } catch (err) {
    console.error('❌ Error deleting task:', err)
  }
}

const getRecommendations = async (title) => {
  try {
    const res = await axios.post('http://localhost:8000/recommend', {
      new_title: title   // 👈 Send as object with field 'new_title'
    });
    return res.data.recommendations;
  } catch (err) {
    console.error("❌ Error fetching recommendations:", err);
    return [];
  }
};

  // Load tasks and profile when app starts
  useEffect(() => {
    fetchTasks()
    fetchProfile()
  }, [])

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        profile,
        deleteTask,
        editTask,
        fetchProfile,
        updateProfile,
        getRecommendations,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
