const $pageActions = document.querySelector('#page-actions');
const $pokemonModal = document.querySelector('#pokemonModal');
let nextTenPokemonsUrl = '';
let previousTenPokemonsUrl;

function searchPokemonsInApi(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(e => console.error(e));
}

function searchFirstTenPokemons() {
  return fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10')
    .then(response => response.json())
    .catch(e => console.error(e));
}

function searchPokemonInfoInApi(event) {
  const pokeId = event.relatedTarget.textContent.replace(/\D+/g, '');
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
    .then(response => response.json())
    .catch(e => console.error(e));
}

function renderPokemonsNames(pokemons) {
  nextTenPokemonsUrl = pokemons.next;
  previousTenPokemonsUrl = pokemons.previous;

  handleStatePaginationButtons(nextTenPokemonsUrl, previousTenPokemonsUrl);

  document.querySelectorAll('.rounded-pill').forEach(function(pokemonButton, index) {
    const pokemonId = pokemons.results[index].url.replace(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\//, '').replace(/\//, '');
    const pokemonName = pokemons.results[index].name;
    pokemonButton.textContent = pokemonId + ". " + pokemonName;
  });

}

function renderPokemonInfo(pokemonInfo) {
  const pokemonTypes = [];
  document.querySelector('#pokemon-title').textContent = pokemonInfo.id + ". " + pokemonInfo.name;
  document.querySelector('#pokemon-img').src = `${pokemonInfo.sprites['front_default']}`;
  document.querySelector('#pokemon-height').textContent = pokemonInfo.height;
  document.querySelector('#pokemon-weight').textContent = pokemonInfo.weight;
  for (element of pokemonInfo.types) {
    pokemonTypes.push(element.type.name);
  }
  document.querySelector('#pokemon-type').textContent = pokemonTypes.join('/');
}

function handleStatePaginationButtons(nextPokemonsUrl, previousPokemonsUrl) {
  if (previousPokemonsUrl === null) {
    document.querySelector('#page-previous').parentElement.classList.add('disabled');
    document.querySelector('#page-previous').classList.remove('text-danger');
  } else {
    document.querySelector('#page-previous').parentElement.classList.remove('disabled');
    document.querySelector('#page-previous').classList.add('text-danger');
  }
  
  if (nextPokemonsUrl === null) {
    document.querySelector('#page-next').parentElement.classList.add('disabled');
    document.querySelector('#page-next').classList.remove('text-danger');
  } else {
    document.querySelector('#page-next').parentElement.classList.remove('disabled');
    document.querySelector('#page-next').classList.add('text-danger');
  }
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
$pokemonModal.addEventListener('show.bs.modal', e => {
  searchPokemonInfoInApi(e).then(renderPokemonInfo);
});
