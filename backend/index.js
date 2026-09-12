const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint para obtener películas de Studio Ghibli
app.get('/api/ghibli', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.GHIBLI_API_URL}/films`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener datos de Ghibli', error: error.message });
  }
});

// Endpoint para buscar animes en Jikan API
app.get('/api/anime', async (req, res) => {
  const { q } = req.query;
  try {
    const url = q 
      ? `${process.env.JIKAN_API_URL}/anime?q=${q}&limit=12` 
      : `${process.env.JIKAN_API_URL}/top/anime?limit=12`;
    
    const response = await axios.get(url);
    res.json(response.data.data);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener datos de Anime', error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send(' Servidor API de Studio Ghibli & Anime funcionando correctamente');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});