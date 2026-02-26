let modalBound = false;

const typeColors = {
  fire: "#e74c3c",
  water: "#3498db",
  grass: "#2ecc71",
  electric: "#f1c40f",
  poison: "#9b59b6",
  ground: "#d35400",
  flying: "#81ecec",
  psychic: "#fd79a8",
  dark: "#2d3436",
  fairy: "#f8a5c2",
};
export function showPokemon(pokemon){
    if (!pokemon) return;

    //se cambia la imagen porque esta no sirve y da error
    document.querySelector(".pokemon-img").onclick = () => showModal(pokemon);
    document.getElementById("pokemon-img").src = pokemon.sprite;


    //datos del pokemon
    
    document.getElementById("pokemon-name").textContent = capitalize(pokemon.name);
    document.getElementById("pokemon-id").textContent = "#" + pokemon.id.toString().padStart(3, "0");

    //Tipos de pokemon
    const typesDiv = document.querySelector(".types");
    typesDiv.innerHTML = "";

  pokemon.types.forEach(t => {
  const img = document.createElement("img");

  img.src = `/recursos/types/${t}.png`;
  img.alt = t;
  img.classList.add("type-icon");

  typesDiv.appendChild(img);

  
});

const abilitiesDiv = document.querySelector(".pokemon-abilities");
abilitiesDiv.innerHTML = "";

pokemon.abilities.slice(0, 2).forEach(ability => {
  const span = document.createElement("span");
  span.classList.add("ability");
  span.textContent = capitalize(ability);
  abilitiesDiv.appendChild(span);
});
const card = document.querySelector(".card");

const mainType = pokemon.types[0];
const color = typeColors[mainType] || "#999";

card.style.backgroundColor = color;

const img = document.getElementById("pokemon-img");
img.style.background = `url(/recursos/fondos/${mainType}.png) center/cover no-repeat`;


card.classList.remove("legendary", "mythical");

if (pokemon.isLegendary) card.classList.add("legendary");
if (pokemon.isMythical) card.classList.add("mythical");
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
    const modalContent = document.querySelector(".modal-content");

  const mainType = pokemon.types[0];
  const color = typeColors[mainType] || "#ffffff";

  if (modalContent) {
    modalContent.style.setProperty("--modal-bg", color);
  }

  // aqui las stats

  const statsDiv = document.getElementById("modal-stats");
  statsDiv.innerHTML = "<h3>Estadísticas</h3>";

  pokemon.stats.forEach(s => {
  const statRow = document.createElement("div");
  statRow.classList.add("stat-row");
  
  const percent = Math.min((s.base / 150) * 100, 100);

  statRow.innerHTML = `
    <span class="stat-name">${formatStatName(s.stat)}</span>
    <div class="stat-bar">
      <div class="stat-fill"></div>
    </div>
    <span class="stat-value">${s.base}</span>
  `;
    statRow.querySelector(".stat-fill").style.setProperty("--stat-percent", percent);
    statsDiv.appendChild(statRow);
});

  // aqui se deberia mostrar el modal, edit ya funciono
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

  // Cerrar si hace clic afuera 
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
    .split("-").map(capitalize).join(" ");
}
