document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const pokeOne = document.getElementById('pokeOne');
    const pokeTwo = document.getElementById('pokeTwo');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            searchPokemon(query);
        } else {
            alert('Por favor, insira o nome ou ID do Pokémon.');
        }
    });

    function searchPokemon(query) {
        pokeAPI.getPokemonFromJson(query)
            .then(pokemon => {
                if (pokemon) {
                    // Verifica qual espaço está vazio e coloca o Pokémon lá
                    if (!pokeOne.innerHTML) {
                        console.log('Adding Pokémon to pokeOne'); //verificar adição correta no pokeOne
                        renderPokemonInFight(pokemon, 'pokeOne'); 
                    } 
                    else if (!pokeTwo.innerHTML) {
                        console.log('Adding Pokémon to pokeTwo'); //verificar adição correta no pokeTwo
                        renderPokemonInFight(pokemon, 'pokeTwo');
                    } 
                    else {
                        alert('Já existem dois Pokémon selecionados. Reinicie para escolher novos Pokémon.');
                    }
                } 
                else {
                    alert('Pokémon não encontrado!');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o Pokémon:', error);
            });
    }

    function renderPokemonInFight(pokemon, position) {
        const pokeDiv = document.getElementById(position);
        pokeDiv.innerHTML = `
            <div class="fightPokemon">
                <img src="${pokemon.image}" alt="${pokemon.name}">
                <h2>${pokemon.name}</h2>
                <p>HP: ${pokemon.hp}</p>
                <ul>
                    ${pokemon.attacks.map(attack => `<li>${attack.name}: ${attack.damage}</li>`).join('')}
                </ul>
            </div>
        `;
    }
});
