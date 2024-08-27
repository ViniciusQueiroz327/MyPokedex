document.addEventListener('DOMContentLoaded', () => {
    const buttonPokedex = document.getElementById('buttonPokedex');

    if (buttonPokedex) {
        buttonPokedex.addEventListener('click', () => {
            window.location.href = '/index.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const pokeOne = document.getElementById('pokeOne');
    const pokeTwo = document.getElementById('pokeTwo');
    const lutar = document.getElementById('lutar');
    const resetButton = document.getElementById('resetButton')

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
                        alert('Já existem dois Pokémon selecionados. Reinicie para escolher novos Pokémons.');
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
        if(position === 'pokeOne') {
            //console.log("entrou aqui One")
            const firstAttackOne = pokemon.attacks[0]
            const secondAttackOne = pokemon.attacks[1]
            pokeDiv.innerHTML = `
            <div class="fightPokemon">
                <img src="${pokemon.image}" alt="${pokemon.name}">
                <h2>${pokemon.name}</h2>
                <p id="hpPokeOne">HP: ${pokemon.hp}</p>
                <progress class="hpBar" id="hpPokeOne" value="${pokemon.hp}" max=${pokemon.hp}></progress>
                <ul>
                    <li id="firstAttackOne"><button type="button" class="buttonAttacks" id="buttonFirstAttackOne" disabled>${firstAttackOne.name}: ${firstAttackOne.damage}</button></li>
                    <li id="secondAttackOne"><button type="button" class="buttonAttacks" id="buttonSecondAttackOne" disabled>${secondAttackOne.name}: ${secondAttackOne.damage}</button></li>
                </ul>
            </div>
        `;
        }
        else if(position === 'pokeTwo') {
            //console.log("entrou aqui Two")
            const firstAttackTwo = pokemon.attacks[0]
            const secondAttackTwo = pokemon.attacks[1]
            pokeDiv.innerHTML = `
            <div class="fightPokemon">
                <img src="${pokemon.image}" alt="${pokemon.name}">
                <h2>${pokemon.name}</h2>
                <p id="hpPokeTwo">HP: ${pokemon.hp}</p>
                <progress class="hpBar" id="hpPokeTwo" value="${pokemon.hp}" max=${pokemon.hp}></progress>
                <ul>
                    <li id="firstAttackTwo"><button type="button" class="buttonAttacks" id="buttonFirstAttackTwo" disabled>${firstAttackTwo.name}: ${firstAttackTwo.damage}</button></li>
                    <li id="secondAttackTwo"><button type="button" class="buttonAttacks" id="buttonSecondAttackTwo" disabled>${secondAttackTwo.name}: ${secondAttackTwo.damage}</button></li>
                </ul>
            </div>
        `;
        }
    }

    lutar.addEventListener('click', () => {
        //console.log('clicado')
        document.getElementById('buttonFirstAttackOne').disabled = false
        document.getElementById('buttonSecondAttackOne').disabled = false
        document.getElementById('buttonFirstAttackTwo').disabled = false
        document.getElementById('buttonSecondAttackTwo').disabled = false
        document.getElementById('buttonPokedex').disabled = true
        document.getElementById('searchButton').disabled = true
        document.getElementById('lutar').disabled = true
    })

    resetButton.addEventListener('click', () => {
        location.reload()
    })
});
