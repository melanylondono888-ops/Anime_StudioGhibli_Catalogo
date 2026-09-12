import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { getAnimes } from '../services/api';
import MovieCard from '../components/MovieCard';
import './Home.css';

export default function Anime() {
  const [animes, setAnimes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnimes();
  }, []);

  const fetchAnimes = async (query = '') => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAnimes(query);
      
      // La API de Jikan responde con { data: [...] } desde el backend
      const animeData = Array.isArray(response.data) 
        ? response.data 
        : response.data?.data || [];
        
      setAnimes(animeData);
    } catch (err) {
      console.error('Error al cargar animes:', err);
      setError('No se pudieron cargar los animes.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchAnimes(term);
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Catálogo Anime</h1>
        <p>Explora las series y películas más populares del anime.</p>
        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar anime..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </section>

      {loading ? (
        <div className="status-container">
          <Loader2 className="spinner" size={40} />
          <p>Cargando animes...</p>
        </div>
      ) : error ? (
        <div className="status-container error">
          <p>{error}</p>
        </div>
      ) : (
        <section className="movies-grid">
          {animes.length > 0 ? (
            animes.map((anime) => (
              <MovieCard 
                key={anime.mal_id || anime.id || Math.random()} 
                movie={{
                  ...anime,
                  id: anime.mal_id || anime.id // Normaliza el ID para FavoritesContext
                }} 
              />
            ))
          ) : (
            <p className="no-results">No se encontraron animes para esa búsqueda.</p>
          )}
        </section>
      )}
    </div>
  );
}