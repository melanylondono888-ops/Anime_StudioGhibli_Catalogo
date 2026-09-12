import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { getGhibliMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import './Home.css';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await getGhibliMovies();
      setMovies(response.data);
      setFilteredMovies(response.data);
    } catch (err) {
      console.error('Error al cargar películas:', err);
      setError('No se pudieron cargar las películas. Revisa que el servidor backend esté encendido.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(term.toLowerCase()) ||
      movie.original_title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  if (loading) {
    return (
      <div className="status-container">
        <Loader2 className="spinner" size={40} />
        <p>Cargando catálogo de Studio Ghibli...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-container error">
        <p>{error}</p>
        <button onClick={fetchMovies} className="retry-btn">Reintentar</button>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Banner / Encabezado */}
      <section className="hero-section">
        <h1>Catálogo Studio Ghibli</h1>
        <p>Explora la magia y las historias inolvidables de Studio Ghibli.</p>

        {/* Buscador */}
        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por título en español o japonés..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </section>

      {/* Rejilla de Películas */}
      <section className="movies-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p className="no-results">No se encontraron películas que coincidan con "{searchTerm}".</p>
        )}
      </section>
    </div>
  );
}