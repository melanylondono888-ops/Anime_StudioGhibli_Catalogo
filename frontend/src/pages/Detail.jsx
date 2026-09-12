import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Calendar, Heart } from 'lucide-react';
import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { getGhibliMovies, getAnimes } from '../services/api';
import './Detail.css';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      // Primero intentamos buscar en Ghibli
      const ghibliRes = await getGhibliMovies();
      const ghibliMatch = ghibliRes.data.find((m) => m.id === id);

      if (ghibliMatch) {
        setItem({
          id: ghibliMatch.id,
          title: ghibliMatch.title,
          originalTitle: ghibliMatch.original_title,
          image: ghibliMatch.image,
          banner: ghibliMatch.movie_banner,
          description: ghibliMatch.description,
          director: ghibliMatch.director,
          producer: ghibliMatch.producer,
          year: ghibliMatch.release_date,
          score: ghibliMatch.rt_score,
          duration: `${ghibliMatch.running_time} min`,
          type: 'Ghibli'
        });
      } else {
        // Si no es de Ghibli, buscamos en Anime (Jikan)
        const animeRes = await getAnimes();
        const animeList = Array.isArray(animeRes.data) ? animeRes.data : animeRes.data?.data || [];
        const animeMatch = animeList.find((a) => String(a.mal_id) === String(id));

        if (animeMatch) {
          setItem({
            id: animeMatch.mal_id,
            title: animeMatch.title,
            originalTitle: animeMatch.title_japanese,
            image: animeMatch.images?.jpg?.large_image_url || animeMatch.images?.jpg?.image_url,
            banner: animeMatch.images?.jpg?.large_image_url,
            description: animeMatch.synopsis,
            score: animeMatch.score,
            year: animeMatch.year || animeMatch.aired?.prop?.from?.year || 'N/A',
            episodes: animeMatch.episodes ? `${animeMatch.episodes} eps` : null,
            type: 'Anime'
          });
        }
      }
    } catch (err) {
      console.error('Error al cargar detalle:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="detail-loading">Cargando detalles...</div>;
  }

  if (!item) {
    return (
      <div className="detail-loading">
        <p>No se encontró la información.</p>
        <button onClick={() => navigate('/')} className="back-btn">Volver</button>
      </div>
    );
  }

  const favorite = isFavorite(item.id);

  return (
    <div className="detail-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        <ArrowLeft size={20} /> Volver
      </button>

      <div className="detail-card">
        <img src={item.image} alt={item.title} className="detail-poster" />

        <div className="detail-info">
          <div className="detail-header">
            <h1>{item.title}</h1>
            <button onClick={() => toggleFavorite(item)} className="fav-btn">
              <Heart size={24} fill={favorite ? '#ec4899' : 'none'} color={favorite ? '#ec4899' : '#ffffff'} />
            </button>
          </div>

          {item.originalTitle && <h3 className="original-title">{item.originalTitle}</h3>}

          <div className="detail-tags">
            <span className="tag"><Calendar size={14} /> {item.year}</span>
            {item.score && <span className="tag score"><Star size={14} /> {item.score}</span>}
            {item.duration && <span className="tag"><Clock size={14} /> {item.duration}</span>}
            {item.episodes && <span className="tag"><Clock size={14} /> {item.episodes}</span>}
          </div>

          <p className="description">{item.description}</p>

          {item.director && (
            <div className="extra-info">
              <p><strong>Director:</strong> {item.director}</p>
              <p><strong>Productor:</strong> {item.producer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}