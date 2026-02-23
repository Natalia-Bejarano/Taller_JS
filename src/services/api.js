import Pokemon from "../models/pokemon.js";

const API_URL = " https://pokeapi.co/api/v2/pokemon/";

export async function fetchPokemon(id) {
try {
    const res = await fetch(API_URL + id);
    if (!res.ok) throw new Error("No se encontró el Pokémon");
    const data = await res.json();
    
    //Extraer los tipos

    const types = data.types.map(t => t.type.name);

    //Crear instacia de Pokémon
        return new Pokemon (
        data.id,
        data.name,
        types,
        data.sprites.other["official-artwork"].font_default
        );
    
        } catch (error) {
        console.error(error);
        return null;
        }
}

//extraer las habilidades 
const abilities = data.abilities.map(a => a.ability.name);

//extraer estadísticas
const stats = data.stats.map(s => ({
    stat: s.stat.name,
    base: s.base_stat

}));