import { fetchPokemon } from "./services/api.js";
import { showPokemon } from "./ui/ui.js";

let current = 25; //es Pikachu, o sea, el número del pokémon pue'

async function loadPokemon(id) {
    const pokemon = await fetchPokemon(id);
    showPokemon(pokemon);
}

//Inicial
loadPokemon(current);

//Navegación, aqui estaba el error, estabamos llamando una clase y era un id entonces se cambia por #
document.querySelector("#next").addEventListener("click", () => {
    current++;
    loadPokemon(current);
});

document.querySelector("#prev").addEventListener("click", () => {
    if (current > 1) current--;
    loadPokemon(current);
})