import { fetchPokemon } from "./services/api.js";
import { showPokemon } from "./ui/ui.js";

let current = 25; //es Pikachu, o sea, el número del pokémon pue'

async function loadPokemon(id) {
    const pokemon = await fetchPokemon(id);
    showPokemon(pokemon);
}

loadPokemon(current);

document.querySelector("#next").addEventListener("click", () => {
    current++;
    loadPokemon(current);
});

document.querySelector("#prev").addEventListener("click", () => {
    if (current > 1) current--;
    loadPokemon(current);
})


//buscar pokemon
const input = document.getElementById("pokemon-input");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", async () => {
  const id = input.value.trim();
  if (!id) return;

  const pokemon = await fetchPokemon(id);
  if (pokemon) {
    showPokemon(pokemon);
    currentId = pokemon.id;
  }
});
input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
searchBtn.addEventListener("click", async () => {
  const id = parseInt(input.value);
//validacion
  if (isNaN(id) || id < 1 || id > 1025) {
    alert("Número inválido");
    return;
  }

  const pokemon = await fetchPokemon(id);
  if (pokemon) {
    showPokemon(pokemon);
    currentId = pokemon.id;
  }
});
//musica
const music = document.getElementById("bg-music");
const toggleBtn = document.getElementById("music-toggle");

let isPlaying = false;

toggleBtn.addEventListener("click", () => {
  if (!isPlaying) {
    music.play();
    toggleBtn.textContent = "Pausar música";
  } else {
    music.pause();
    toggleBtn.textContent = "Música";
  }
  isPlaying = !isPlaying;
});