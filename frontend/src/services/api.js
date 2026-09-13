import axios from 'axios';

const API = axios.create({
  baseURL: 'https://anime-studioghibli-catalogo.onrender.com/api'
});

export const getGhibliMovies = () => API.get('/ghibli');
export const getAnimes = (query = '') => API.get(`/anime${query ? `?q=${query}` : ''}`);