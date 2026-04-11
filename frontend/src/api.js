import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

export const getSum = (l, r) => API.get(`/sum?l=${l}&r=${r}`);
export const getMin = (l, r) => API.get(`/min?l=${l}&r=${r}`);
export const getMax = (l, r) => API.get(`/max?l=${l}&r=${r}`);
export const getCompare = (l, r) => API.get(`/compare?l=${l}&r=${r}`);
export const getState = () => API.get('/state');
export const getReset = () => API.get('/reset');
export const postUpdate = (l, r, val) => API.post('/update', { l, r, val });
export const postArray = (array) => API.post('/array', { array });
