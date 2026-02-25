import Pokemon from "../models/pokemon.js";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

export async function fetchPokemon(id) {
try {
    const res = await fetch(API_URL + id);
    if (!res.ok) throw new Error("No se encontró el Pokémon");
    const data = await res.json();

    //extraer las habilidades 
    const abilities = data.abilities.map(a => a.ability.name);
    
    //Extraer los tipos
    const types = data.types.map(t => t.type.name);
    //extraer estadísticas
    const stats = data.stats.map(s => ({
    stat: s.stat.name,
    base: s.base_stat
    }));
    const sprite =
      data.sprites?.other?.["official-artwork"]?.front_default
       data.sprites?.front_default
       "";

    //Crear instacia de Pokémon
        return new Pokemon(
        data.id,
        data.name,
        types,
        sprite,
        data.height,
        data.weight, 
        abilities,  // error encontrado, se estaba llamando en desorden los parametros
        stats    
        );
    
        } catch (error) {
        console.error(error);
        return null;
        }
}



