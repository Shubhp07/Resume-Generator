import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust if your backend is on a different port
});

export const generateResume = (profile) => API.post('/resume', profile);
export const getResume = (id) => API.get(`/resume/${id}`);
export const listResumes = () => API.get('/resume');

export default API;
