const express = require('express');
const cors = require('cors');
const path = require('path');
const porta = process.env.PORT || 80;
const app = express();

const dbPath = 'pokemon';
const db = {
  pokemon: require('./pokemon/pokedex.json'),
  moves: require('./pokemon/moves.json'),
  items: require('./pokemon/items.json')
}

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/pokemon/:id', (req, res) => {
  const pokemon = db.pokemon[req.params.id - 1];

  pokemon.image = {
    id: req.params.id,
    url: `${apiUrl}/image/${req.params.id}`
  };
  pokemon.sprite = {
    id: req.params.id,
    url: `${apiUrl}/sprite/${req.params.id}`
  };

  console.log({pokemon});

  return res.status(200).json(pokemon);
});

app.get('/move/:id', (req, res) => {
  const move = db.moves[req.params.id - 1];

  console.log({move});

  return res.status(200).json(move);
});

app.get('/image/:id', (req, res) => {
  const imageId = req.params.id.padStart(3, '0');
  const imageName = `${imageId}.png`

  console.log({imageName});

  return res.sendFile(path.join(__dirname, dbPath, 'images', imageName));
});

app.get('/sprite/:id', (req, res) => {
  const spriteId = req.params.id.padStart(3, '0');
  const spriteName = `${spriteId}MS.png`;

  console.log({spriteName});

  return res.sendFile(path.join(__dirname, dbPath, 'sprites', spriteName));
});

app.get('/type/:type/pokemon', (req, res) => {
  const type = req.params.type[0].toUpperCase() + req.params.type.slice(1);
  const pokemonsData = db.pokemon.filter(p => p.type.includes(type));
  const pokemons = pokemonsData.map(p => ({
    id: p.id,
    url: `${apiUrl}/pokemon/${p.id}`
  }));

  console.log({pokemons});

  return res.status(200).json(pokemons);
});

app.get('/type/:type/moves', (req, res) => {
  const type = req.params.type[0].toUpperCase() + req.params.type.slice(1);
  const movesData = db.moves.filter(p => p.type.includes(type));
  const moves = movesData.map(p => ({
    id: p.id,
    url: `${apiUrl}/move/${p.id}`
  }));

  console.log({moves});

  return res.status(200).json(moves);
});

let apiUrl;
const server = app.listen(porta, (err) => {
  console.log("Executando na porta " + porta);

  let endereco = server.address();
  if (endereco.address == '::') endereco.address = 'localhost';
  apiUrl = `http://${endereco.address}:${endereco.port}`;
});
