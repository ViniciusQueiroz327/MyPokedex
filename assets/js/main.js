const pokemonList = document.getElementById('pokemonList')
const loadMore = document.getElementById('loadMore')

const searchButton = document.getElementById('searchButton')
const searchInput = document.getElementById('searchInput')

const resetButton = document.getElementById('resetButton')

//document.addEventListener('DOMContentLoaded', () => {
//    const buttonFight = document.getElementById('buttonFight');
//
//    if (buttonFight) {
//        buttonFight.addEventListener('click', () => {
//            window.location.href = '/fight.html';
//        });
//    }
//});

const limit = 9
let offset = 0

function loadPokemonItens(offset, limit) {
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {    
        pokemonList.innerHTML += pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.mainType}" data-number="${pokemon.number}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span> 
                <div class="details">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.imagem}" alt="${pokemon.name}">
                </div>
                <div class="extra-details hidden" id="extra-details-${pokemon.number}">
                    <!-- Informações adicionais aqui -->
                </div>
            </li>
        `).join('')

        addClickEventToPokemons()
    })
}

function addClickEventToPokemons() {
    const pokemonItems = document.querySelectorAll('.pokemon')
    
    pokemonItems.forEach(item => {
        item.addEventListener('click', () => {
            const extraDetails = item.querySelector('.extra-details')

            if (item.classList.contains('expanded')) {
                // Se o Pokémon já estiver expandido, recolhe ele
                item.classList.remove('expanded')
                extraDetails.classList.add('hidden')
            } else {
                // Fecha todos os outros Pokémon e expande o selecionado
                pokemonItems.forEach(p => {
                    p.classList.remove('expanded')
                    p.querySelector('.extra-details').classList.add('hidden')
                })
                
                item.classList.add('expanded')
                extraDetails.classList.remove('hidden')
                fetchAdditionalDetails(item.getAttribute('data-number'), extraDetails)
            }
        })
    })
}

function fetchAdditionalDetails(number, container) {
    pokeAPI.getPokemonByNameOrId(number).then(pokemon => {
        if (pokemon) {
            container.innerHTML = `
                <p>Altura: ${pokemon.height} m</p>
                <p>Peso: ${pokemon.weight} kg</p>
                <p>Habilidades: ${pokemon.abilities.join(', ')}</p>
            `
        }
    })
}

loadPokemonItens(offset, limit)

loadMore.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit)
})

function searchPokemonByNameOrId() {
    const query = searchInput.value.trim().toLowerCase()

    if (!query) {
        // Se o campo estiver vazio, recarrega a lista de Pokémons
        pokemonList.innerHTML = ''
        offset = 0
        loadPokemonItens(offset, limit)
        const pagination = document.querySelector('.pagination')
        pagination.appendChild(loadMore)
        return
    }

    // Remove todos os Pokémon da lista antes de adicionar o novo resultado
    pokemonList.innerHTML = ''

    pokeAPI.getPokemonByNameOrId(query).then((pokemon) => {
        if (pokemon) {
            // Adiciona o Pokémon encontrado à lista
            pokemonList.innerHTML = `
                <li class="pokemon ${pokemon.mainType}" data-number="${pokemon.number}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span> 
                    <div class="details">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.imagem}" alt="${pokemon.name}">
                    </div>
                    <div class="extra-details hidden" id="extra-details-${pokemon.number}">
                        <!-- Informações adicionais aqui -->
                    </div>
                </li>
            `

            // Remove o botão "Load more" após a pesquisa
            if (loadMore.parentElement) {
                loadMore.parentElement.removeChild(loadMore)
            }

            // Adiciona o evento de clique ao Pokémon pesquisado
            addClickEventToPokemons()
            
            // Expande o Pokémon pesquisado para mostrar detalhes
            const searchedPokemon = document.querySelector(`li[data-number="${pokemon.number}"]`)
            if (searchedPokemon) {
                searchedPokemon.classList.add('expanded')
                const extraDetails = searchedPokemon.querySelector('.extra-details')
                fetchAdditionalDetails(pokemon.number, extraDetails)
                extraDetails.classList.remove('hidden')
            }
        } else {
            alert('Pokémon não encontrado!')
            pokemonList.innerHTML = ''
            offset = 0
            loadPokemonItens(offset, limit)
        }
    }).catch((error) => {
        console.error('Error fetching Pokémon:', error)
        alert('Ocorreu um erro ao buscar o Pokémon.')
    });
}

searchButton.addEventListener('click', searchPokemonByNameOrId)

resetButton.addEventListener('click', () => {
    location.reload()
})