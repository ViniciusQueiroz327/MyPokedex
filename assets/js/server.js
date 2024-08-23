const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Servir arquivos estáticos do diretório 'public'
app.use(express.static(path.join(__dirname, '../../public')));

// Caminho correto para pokemons.json
const pokemons = JSON.parse(fs.readFileSync(path.join(__dirname, '../../pokemons.json'), 'utf8'));

// Rota para obter todos os Pokémon
app.get('/api/pokemons', (req, res) => {
    res.json(pokemons);
});

// Rota para obter um Pokémon específico pelo ID
app.get('/api/pokemons/:id', (req, res) => {
    const pokemon = pokemons.find(p => p.id === parseInt(req.params.id, 10));
    if (pokemon) {
        res.json(pokemon);
    } else {
        res.status(404).send('Pokémon não encontrado');
    }
});

app.listen(port, () => {
    console.log(`Servidor API rodando em http://localhost:${port}`);
});
