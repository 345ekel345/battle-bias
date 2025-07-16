let allIdols = [];
let groupMap = {};
let currentIds = [];
let roundCount = 1;
const maxRounds = 20;

// Display current round
function updateRoundDisplay() {
  const roundText = roundCount > maxRounds
    ? "✨ Final Round Complete ✨"
    : `Round ${roundCount} of ${maxRounds}`;
  document.getElementById("round-counter").textContent = roundText;
}

// Render idol cards or final bias
function renderBattle(idol1, idol2, keepOnLeft = true) {
  updateRoundDisplay();
  const battleArena = document.getElementById("battle-arena");
  battleArena.innerHTML = "";

  if (allIdols.length === 1 || roundCount > maxRounds) {
    const solo = idol1 || allIdols[0];
    const banner = document.createElement("h1");
    banner.textContent = "💜 Your Ultimate Bias 💜";

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

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(group);

    battleArena.appendChild(banner);
    battleArena.appendChild(card);
    return;
  }

  const idols = keepOnLeft ? [idol1, idol2] : [idol2, idol1];

  idols.forEach((idol, index) => {
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
      if (roundCount >= maxRounds) {
        allIdols = [idol];
        renderBattle(idol, null);
        return;
      }

      const keepIdol = idol;
      const otherIndex = index === 0 ? 1 : 0;
      const removeId = currentIds[otherIndex];
      allIdols = allIdols.filter(i => i.id !== removeId);

      const newIdol = getRandomUniqueIdol(keepIdol.id);
      currentIds = index === 0
        ? [keepIdol.id, newIdol.id]
        : [newIdol.id, keepIdol.id];

      roundCount++;
      renderBattle(keepIdol, newIdol, index === 0);
    });

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(group);
    battleArena.appendChild(card);
  });
}

// Get a random idol that's not excluded
function getRandomUniqueIdol(excludeId) {
  const filtered = allIdols.filter(idol => idol.id !== excludeId);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

// Load data and start battle
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
