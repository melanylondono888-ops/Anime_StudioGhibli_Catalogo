import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Anime from './pages/Anime';
import Favorites from './pages/Favorites';
import Detail from './pages/Detail';

export default function App() {
  return (
    <div style={{ backgroundColor: '#09090b', minHeight: '100vh', color: '#f4f4f5' }}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </main>
    </div>
  );
}