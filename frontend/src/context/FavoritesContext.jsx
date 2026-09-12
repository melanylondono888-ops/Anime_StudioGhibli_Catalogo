import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('ghibli_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('ghibli_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => String(item.id) === String(movie.id));
      if (exists) {
        return prev.filter((item) => String(item.id) !== String(movie.id));
      }
      return [...prev, movie];
    });
  };

  const isFavorite = (id) => {
    return favorites.some((item) => String(item.id) === String(id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}