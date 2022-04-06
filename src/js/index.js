function searchPokemonsInApi() {
  return fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10')
    .then(response => response.json());
}

function searchPokemonInfoInApi() {

}

function renderPokemonsNames(pokemons) {

  document.querySelectorAll('.rounded-pill').forEach(function(pokemonButton, index) {
    const pokemonId = pokemons.results[index].url.replace(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\//, '').replace(/\//, '');
    const pokemonName = pokemons.results[index].name;
    pokemonButton.textContent = pokemonId + ". " + pokemonName;
  });

}

function renderPokemonInfo() {

}

function handlePagination() {

}

searchPokemonsInApi().then(renderPokemonsNames);

