const $pageActions = document.querySelector('#page-actions');
let nextTenPokemonsUrl = '';
let previousTenPokemonsUrl;

function searchPokemonsInApi(url) {
  return fetch(url)
    .then(response => response.json());
}

function searchFirstTenPokemons() {
  return fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10')
    .then(response => response.json());
}

function searchPokemonInfoInApi() {

}

function renderPokemonsNames(pokemons) {
  nextTenPokemonsUrl = pokemons.next;
  previousTenPokemonsUrl = pokemons.previous;

  if (previousTenPokemonsUrl === null) {
    document.querySelector('#page-previous').parentElement.classList.add('disabled');
    document.querySelector('#page-previous').classList.remove('text-danger');
  } else {
    document.querySelector('#page-previous').parentElement.classList.remove('disabled');
    document.querySelector('#page-previous').classList.add('text-danger');
  }

  document.querySelectorAll('.rounded-pill').forEach(function(pokemonButton, index) {
    const pokemonId = pokemons.results[index].url.replace(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\//, '').replace(/\//, '');
    const pokemonName = pokemons.results[index].name;
    pokemonButton.textContent = pokemonId + ". " + pokemonName;
  });

}

function renderPokemonInfo() {

}

function handlePagination(event) {
  if (event.target.id === 'page-next') {
    searchPokemonsInApi(nextTenPokemonsUrl).then(renderPokemonsNames);
  }

  if (event.target.id === 'page-previous') {
    searchPokemonsInApi(previousTenPokemonsUrl).then(renderPokemonsNames);
  }

}

searchFirstTenPokemons().then(renderPokemonsNames);
$pageActions.onclick = handlePagination;
