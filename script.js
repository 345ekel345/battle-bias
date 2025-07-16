fetch("mini-kpopnet.json")
  .then(response => response.json())
  .then(data => {
    const battleArena = document.getElementById("battle-arena");

    // Create a map of group ID to group name
    const groupMap = {};
    data.groups.forEach(group => {
      groupMap[group.id] = group.name;
    });

    data.idols.forEach(idol => {
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

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(group);
      battleArena.appendChild(card);
    });
  })
  .catch(error => console.error("Error loading K-pop data:", error));
