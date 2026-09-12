import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';
import { Heart } from 'lucide-react';
import './Home.css';

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Tus Favoritas</h1>
        <p>Películas y animes guardados en tu colección personal.</p>
      </section>

      {favorites.length > 0 ? (
        <section className="movies-grid">
          {favorites.map((item) => (
            <MovieCard key={item.id || item.mal_id} movie={item} />
          ))}
        </section>
      ) : (
        <div className="status-container" style={{ minHeight: '30vh' }}>
          <Heart size={48} color="#ec4899" />
          <p>Aún no has agregado ninguna película o anime a tus favoritos.</p>
        </div>
      )}
    </div>
  );
}