const express = require('express');
const path = require('path');

const rotas = express.Router();

const dbPath = 'pokemon';
const db = {
  pokemon: require('./pokemon/pokedex.json'),
  moves: require('./pokemon/moves.json'),
  items: require('./pokemon/items.json')
}

rotas.get('/', (req, res) => {
  res.json(server)
})

rotas.get('/pokemon/:id', (req, res) => {
  const pokemon = db.pokemon[req.params.id - 1];

  pokemon.image = {
    id: req.params.id,
    url: `${apiUrl}/image/${req.params.id}`
  };
  pokemon.sprite = {
    id: req.params.id,
    url: `${apiUrl}/sprite/${req.params.id}`
  };

  return res.status(200).json(pokemon);
});

rotas.get('/move/:id', (req, res) => {
  const move = db.moves[req.params.id - 1];

  return res.status(200).json(move);
});

rotas.get('/image/:id', (req, res) => {
  const imageId = req.params.id.padStart(3, '0');
  const imageName = `${imageId}.png`

  return res.sendFile(path.join(__dirname, dbPath, 'images', imageName));
});

rotas.get('/sprite/:id', (req, res) => {
  const spriteId = req.params.id.padStart(3, '0');
  const spriteName = `${spriteId}MS.png`;

  return res.sendFile(path.join(__dirname, dbPath, 'sprites', spriteName));
});

rotas.get('/type/:type/pokemon', (req, res) => {
  const type = req.params.type[0].toUpperCase() + req.params.type.slice(1);
  const pokemonsData = db.pokemon.filter(p => p.type.includes(type));
  const pokemons = pokemonsData.map(p => ({
    id: p.id,
    url: `${apiUrl}/pokemon/${p.id}`
  }));

  return res.status(200).json(pokemons);
});

rotas.get('/type/:type/moves', (req, res) => {
  const type = req.params.type[0].toUpperCase() + req.params.type.slice(1);
  const movesData = db.moves.filter(p => p.type.includes(type));
  const moves = movesData.map(p => ({
    id: p.id,
    url: `${apiUrl}/move/${p.id}`
  }));

  return res.status(200).json(moves);
});

module.exports = rotas;
