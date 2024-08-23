const pokeAPI = {}

function convertPokeApiDetailToPokemon(pokemonDetail) {
    const novoPokemon = new Pokemon()
    novoPokemon.name = pokemonDetail.name
    novoPokemon.number = pokemonDetail.id

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    novoPokemon.types = types
    novoPokemon.mainType = type

    novoPokemon.imagem = pokemonDetail.sprites.other.dream_world.front_default
    novoPokemon.height = pokemonDetail.height / 10
    novoPokemon.weight = pokemonDetail.weight / 10
    novoPokemon.abilities = pokemonDetail.abilities.map((ability) => ability.ability.name)

    return novoPokemon;
}


pokeAPI.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeAPI.getPokemons = function(offset = 0, limit = 9) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url) 
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
        .catch((error) => {
            console.error('Error fetching Pokémon:', error);
            return [];
        });
}

pokeAPI.getPokemonByNameOrId = function(query) {
    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            return response.json();
        })
        .then(convertPokeApiDetailToPokemon)
        .catch((error) => {
            console.error('Error fetching Pokémon:', error);
            return null;
        });
};