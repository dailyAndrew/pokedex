const starters = ["bulbasaur", "charmander", "squirtle"];

const inputEl = document.getElementById("pokemonName");
const buttonEl = document.getElementById("fetchButton");
const cardEl = document.getElementById("pokemonCard");

buttonEl.addEventListener("click", () => {
  const name = inputEl.value.trim().toLowerCase();
  if (name) fetchAndRender(name);
});

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const name = inputEl.value.trim().toLowerCase();
    if (name) fetchAndRender(name);
  }
});

// Build the starters grid with live sprites
window.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("startersGrid");
  for (const name of starters) {
    const data = await getPokemon(name);
    const sprite = data?.sprites?.front_default || "";

    const card = document.createElement("button");
    card.type = "button";
    card.className = "starter-card";
    card.setAttribute("aria-label", name);

    const img = document.createElement("img");
    img.src = sprite;
    img.alt = `${name} sprite`;

    const label = document.createElement("div");
    label.className = "starter-name";
    label.textContent = name;

    card.appendChild(img);
    card.appendChild(label);
    card.addEventListener("click", () => fetchAndRender(name));

    grid.appendChild(card);
  }

  // Load a default to make the page feel alive
  fetchAndRender("bulbasaur");
});

async function getPokemon(nameOrId) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    if (!res.ok) throw new Error("Not found");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function fetchAndRender(nameOrId) {
  const data = await getPokemon(nameOrId);
  if (!data) {
    alert("Pokémon not found. Try another name!");
    return;
  }
  renderCard(data);
}

function renderCard(data) {
  // sprite
  document.getElementById("pokemonImage").src = data.sprites.front_default;

  // text fields
  document.getElementById("name").textContent = data.name;
  document.getElementById("id").textContent = data.id;

  const types = data.types
    .map((t) => t.type.name)
    .join(", ");
  document.getElementById("type").textContent = types;

  document.getElementById("height").textContent = data.height;
  document.getElementById("weight").textContent = data.weight;

  // show card
  cardEl.style.display = "block";
}
