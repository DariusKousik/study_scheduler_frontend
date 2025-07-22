import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:8000'
})

export const fetchTasks = () => API.get('/tasks')
export const createTask = (task) => API.post('/tasks',task)

export const fetchProfile = () => API.get('/profile')
export const updateProfile = (profile) => API.put('/profile',profile)