//document.addEventListener('DOMContentLoaded', () => {
//    const buttonPokedex = document.getElementById('buttonPokedex');
//
//    if (buttonPokedex) {
//        buttonPokedex.addEventListener('click', () => {
//            window.location.href = '/index.html';
//        });
//    }
//});

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
                <p id="hpPokeOneText"">HP: ${pokemon.hp}</p>
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
                <p id="hpPokeTwoText">HP: ${pokemon.hp}</p>
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

        atacar();
    })

    resetButton.addEventListener('click', () => {
        location.reload()
    })

    function atacar() {
        const hpPokeOne = document.getElementById('hpPokeOne')
        const hpPokeTwo = document.getElementById('hpPokeTwo')

        const buttonFirstAttackOne = document.getElementById('buttonFirstAttackOne')
        const buttonSecondAttackOne = document.getElementById('buttonSecondAttackOne')
        const buttonFirstAttackTwo = document.getElementById('buttonFirstAttackTwo')
        const buttonSecondAttackTwo = document.getElementById('buttonSecondAttackTwo')

        const firstAttackOne = parseInt(buttonFirstAttackOne.textContent.split(': ')[1], 10);
        const secondAttackOne = parseInt(buttonSecondAttackOne.textContent.split(': ')[1], 10);
        const firstAttackTwo = parseInt(buttonFirstAttackTwo.textContent.split(': ')[1], 10);
        const secondAttackTwo = parseInt(buttonSecondAttackTwo.textContent.split(': ')[1], 10);

        buttonFirstAttackOne.addEventListener('click', () => {
            hpPokeTwo.value -= firstAttackOne;
            document.getElementById('hpPokeTwo').textContent = `HP: ${hpPokeTwo.value}`;
            document.getElementById('hpPokeTwoText').textContent = `HP: ${hpPokeTwo.value}`;
            if(hpPokeTwo.value <= 0) {
                endFight(pokeOne.querySelector('h2').textContent, pokeOne.querySelector('img').src);
            }
        });

        buttonSecondAttackOne.addEventListener('click', () => {
            hpPokeTwo.value -= secondAttackOne;
            document.getElementById('hpPokeTwo').textContent = `HP: ${hpPokeTwo.value}`;
            document.getElementById('hpPokeTwoText').textContent = `HP: ${hpPokeTwo.value}`;
            if(hpPokeTwo.value <= 0) {
                endFight(pokeOne.querySelector('h2').textContent, pokeOne.querySelector('img').src);
            }
        });

        buttonFirstAttackTwo.addEventListener('click', () => {
            hpPokeOne.value -= firstAttackTwo;
            document.getElementById('hpPokeOne').textContent = `HP: ${hpPokeOne.value}`;
            document.getElementById('hpPokeOneText').textContent = `HP: ${hpPokeOne.value}`;
            if(hpPokeOne.value <= 0) {
                endFight(pokeTwo.querySelector('h2').textContent, pokeTwo.querySelector('img').src);
            }
        });

        buttonSecondAttackTwo.addEventListener('click', () => {
            hpPokeOne.value -= secondAttackTwo;
            document.getElementById('hpPokeOne').textContent = `HP: ${hpPokeOne.value}`;
            document.getElementById('hpPokeOneText').textContent = `HP: ${hpPokeOne.value}`;
            if(hpPokeOne.value <= 0) {
                endFight(pokeTwo.querySelector('h2').textContent, pokeTwo.querySelector('img').src);
            }
        });
    }

    function endFight(winnerName, winnerImage) {
        document.getElementById('buttonFirstAttackOne').disabled = true
        document.getElementById('buttonSecondAttackOne').disabled = true
        document.getElementById('buttonFirstAttackTwo').disabled = true
        document.getElementById('buttonSecondAttackTwo').disabled = true
        document.getElementById('buttonPokedex').disabled = false
        document.getElementById('searchButton').disabled = true
        document.getElementById('lutar').disabled = true

        const exibirVencedor = document.getElementById('exibirVencedor')

        exibirVencedor.innerHTML = `
            <h3>Vencedor:</h3>
            <span>${winnerName}</span>
            <img src="${winnerImage}" alt="${winnerName}">
        `;
    }
});