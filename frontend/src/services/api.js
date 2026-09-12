import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const getGhibliMovies = () => API.get('/ghibli');
export const getAnimes = (query = '') => API.get(`/anime${query ? `?q=${query}` : ''}`);