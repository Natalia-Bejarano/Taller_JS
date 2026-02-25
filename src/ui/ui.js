let modalBound = false;
export function showPokemon(pokemon){
    if (!pokemon) return;


    //se cambia la imagen porque esta no sirve y da error
    document.querySelector(".pokemon-img").onclick = () => showModal(pokemon);
    document.getElementById("pokemon-img").src = pokemon.sprite;


    //datos del pokemon
    
    document.getElementById("pokemon-name").textContent = capitalize(pokemon.name);
    document.getElementById("pokemon-id").textContent = "#" + pokemon.id.toString().padStart(3, "0");

    //Tipos
    const typesDiv = document.querySelector(".types");
    typesDiv.innerHTML = "";
    pokemon.types.forEach(t=> {
        const span = document.createElement("span");
        span.classList.add("type", t);
        span.textContent = capitalize(t);
        typesDiv.appendChild(span);
    });
    //estadísticas
    bindModalEventsOnce();
    //las stasst se cargan en el modal no en la fucking card

}

function showModal(pokemon) {
  const modal = document.getElementById("pokemon-modal");
  if (!modal) return;

  document.getElementById("modal-name").textContent = capitalize(pokemon.name);
  document.getElementById("modal-img").src = pokemon.sprite;
  document.getElementById("modal-id").textContent =
    "#" + pokemon.id.toString().padStart(3, "0");

  const heightM = (pokemon.height / 10).toFixed(1);
  const weightKg = (pokemon.weight / 10).toFixed(1);

  document.getElementById("modal-height").textContent = heightM;
  document.getElementById("modal-weight").textContent = weightKg;

  document.getElementById("modal-abilities").textContent =
    pokemon.abilities.map(capitalize).join(", ");

  // aqui si van las stats
  const statsDiv = document.getElementById("modal-stats");
  statsDiv.innerHTML = "<h3>Estadísticas</h3>";

  pokemon.stats.forEach(s => {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${formatStatName(s.stat)}:</strong> ${s.base}`;
    statsDiv.appendChild(p);
  });

  // aqui se deberia mostrar el modal pero no funciona xd, edit ya funciono
  modal.classList.remove("hidden");
}
function closeModal() {
  const modal = document.getElementById("pokemon-modal");
  if (!modal) return;
  modal.classList.add("hidden");
}

function bindModalEventsOnce() {
  if (modalBound) return;
  modalBound = true;

  const modal = document.getElementById("pokemon-modal");
  const closeBtn = document.getElementById("close-modal");

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // Cerrar si hace clic afuera como otro modo de cerrar con el escape
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Cerrar con escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() +word.slice(1);
}
function formatStatName(stat) {
  return stat
    .split("-")
    .map(capitalize)
    .join(" ");
}
