const pokeAPI = {};

function convertJsonDetailToPokemon(pokemonDetail) {
    const novoPokemon = new PokemonToFight()
    novoPokemon.name = pokemonDetail.name
    novoPokemon.hp = pokemonDetail.hp
    novoPokemon.image = pokemonDetail.image
    novoPokemon.attacks = pokemonDetail.attacks.map((attack) => ({
        name: attack.name,
        damage: attack.damage
    }))

    return novoPokemon
}

// Função para buscar Pokémon do arquivo JSON local
pokeAPI.getPokemonFromJson = function(query) {
    return fetch('./pokemons.json')
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.find(pokemon => pokemon.name.toLowerCase() === query.toLowerCase() || pokemon.id === parseInt(query)))
        .then(convertJsonDetailToPokemon)
        .catch((error) => {
            console.error('Erro ao buscar o Pokémon:', error);
            return null;
        });
};