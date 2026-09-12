import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { FavoritesContext } from '../context/FavoritesContext';
import './MovieCard.css';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, isFavorite } = useContext(FavoritesContext);

  const id = movie.id || movie.mal_id;
  const title = movie.title || movie.title_english || 'Sin título';
  const image = movie.image || movie.images?.jpg?.large_image_url || movie.images?.jpg?.image_url;
  const score = movie.rt_score || movie.score || 'N/A';
  const year = movie.release_date || movie.year || movie.aired?.prop?.from?.year || 'N/A';

  // Si isFavorite existe en el contexto lo usa, si no, usa una comprobación directa
  const favorite = isFavorite ? isFavorite(id) : favorites?.some((item) => String(item.id) === String(id));

  const handleCardClick = () => {
    navigate(`/detail/${id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite({
      id,
      title,
      image,
      score,
      year,
      original_title: movie.original_title || movie.title_japanese,
      description: movie.description || movie.synopsis,
      director: movie.director,
      producer: movie.producer,
      running_time: movie.running_time
    });
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <div className="poster-container">
        <img src={image} alt={title} className="movie-poster" />
        <button 
          className={`favorite-btn ${favorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label="Agregar a favoritos"
        >
          <Heart size={18} fill={favorite ? '#ec4899' : 'none'} color={favorite ? '#ec4899' : '#ffffff'} />
        </button>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <div className="movie-meta">
          <span className="movie-year">{year}</span>
          <span className="movie-score">
            <Star size={14} className="star-icon" />
            {score}
          </span>
        </div>
      </div>
    </div>
  );
}