let allIdols = [];
let groupMap = {};
let currentIds = [];

function renderBattle(idol1, idol2) {
  const battleArena = document.getElementById("battle-arena");
  battleArena.innerHTML = "";

  // Special case: only one idol left
  if (allIdols.length === 1) {
    const solo = allIdols[0];
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = solo.thumb_url || "placeholder.jpg";
    img.alt = solo.name;

    const name = document.createElement("h2");
    name.textContent = solo.name;

    const groupNames = solo.groups.map(gid => groupMap[gid]).join(", ");
    const group = document.createElement("p");
    group.textContent = groupNames;

    const banner = document.createElement("h1");
    banner.textContent = "💜 Your Ultimate Bias 💜";

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(group);

    battleArena.appendChild(banner);
    battleArena.appendChild(card);
    return;
  }

  [idol1, idol2].forEach((idol, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = idol.thumb_url || "placeholder.jpg";
    img.alt = idol.name;

    const name = document.createElement("h3");
    name.textContent = idol.name;

    const groupNames = idol.groups.map(gid => groupMap[gid]).join(", ");
    const group = document.createElement("p");
    group.textContent = groupNames;

    img.addEventListener("click", () => {
      // Remove the idol who got replaced
      const keepIdol = idol;
      const otherIndex = index === 0 ? 1 : 0;
      const removeId = currentIds[otherIndex];
      allIdols = allIdols.filter(i => i.id !== removeId);

      // If only one left, show bias banner
      if (allIdols.length === 1) {
        renderBattle();
        return;
      }

      const newIdol = getRandomUniqueIdol(keepIdol.id);
      currentIds = [keepIdol.id, newIdol.id];
      renderBattle(keepIdol, newIdol);
    });

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(group);
    battleArena.appendChild(card);
  });
}

function getRandomUniqueIdol(excludeId) {
  const filtered = allIdols.filter(idol => idol.id !== excludeId);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

fetch("kpopnet.json")
  .then(response => response.json())
  .then(data => {
    allIdols = data.idols;
    data.groups.forEach(group => {
      groupMap[group.id] = group.name;
    });

    let first = allIdols[Math.floor(Math.random() * allIdols.length)];
    let second;
    do {
      second = allIdols[Math.floor(Math.random() * allIdols.length)];
    } while (second.id === first.id);

    currentIds = [first.id, second.id];
    renderBattle(first, second);
  })
  .catch(error => console.error("Error loading K-pop data:", error));
