import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Film, Heart, Tv, Sparkles } from 'lucide-react';
import { FavoritesContext } from '../context/FavoritesContext';

export default function Navbar() {
  const { favorites } = useContext(FavoritesContext);

  const getLinkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '20px',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: isActive ? '#ffffff' : '#a1a1aa',
    backgroundColor: isActive ? '#27272a' : 'transparent',
    transition: 'all 0.2s ease-in-out',
  });

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(18, 18, 20, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #27272a',
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(168, 85, 247, 0.3)'
          }}>
            <Sparkles size={22} />
          </div>
          <span style={{
            fontSize: '1.25rem',
            fontWeight: '800',
            color: '#ffffff',
            letterSpacing: '-0.5px'
          }}>
            Ghibli<span style={{ color: '#a855f7' }}>Anime</span>
          </span>
        </NavLink>

        {/* Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <NavLink to="/" style={getLinkStyle}>
            <Film size={18} />
            <span>Ghibli</span>
          </NavLink>

          <NavLink to="/anime" style={getLinkStyle}>
            <Tv size={18} />
            <span>Anime</span>
          </NavLink>

          <NavLink to="/favorites" style={getLinkStyle}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Heart 
                size={18} 
                style={{ 
                  color: favorites.length > 0 ? '#ec4899' : 'currentColor',
                  fill: favorites.length > 0 ? '#ec4899' : 'none'
                }} 
              />
              {favorites.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-10px',
                  backgroundColor: '#ec4899',
                  color: '#ffffff',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  padding: '2px 6px',
                  lineHeight: 1
                }}>
                  {favorites.length}
                </span>
              )}
            </div>
            <span>Favoritas</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}