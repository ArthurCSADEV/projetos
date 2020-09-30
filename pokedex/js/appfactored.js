//-----------------------------------------------------------------------------------------
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
//-----------------------------------------------------------------------------------------
const generatePokemonPromises = () => Array(150).fill().map((_, index) => 
fetch(getPokemonUrl(index+1)).then(response => response.json()))
//-----------------------------------------------------------------------------------------
const pokemonPromises = generatePokemonPromises();
//-----------------------------------------------------------------------------------------
const generateHTML = pokemons => {
    return pokemons.reduce((a, pokemon) => {
     const types = pokemon.types.map(typeInfo => typeInfo.type.name);
        a += `
        <li class="card ${types[0]}">
        <img class="card-image" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
        <h3 class="card-undertitle">${pokemon.id}</h3>
        <h2 class="card-title">${pokemon.name}</h2>
        <p class="card-subtitle">${(types.join(' | ')).toUpperCase()}</p>
        </li>
        `;
        return a;
    }, '')
}    
//-----------------------------------------------------------------------------------------
const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons;
}    
//-----------------------------------------------------------------------------------------
const fetchAll = () => {
    const pokemonPromises = generatePokemonPromises()

    Promise.all(pokemonPromises)
        .then(generateHTML)
        .then(insertPokemonsIntoPage)
}
fetchAll()