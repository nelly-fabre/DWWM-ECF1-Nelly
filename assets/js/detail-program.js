const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const reponse = await fetch("/spectacles.json");
const data = await reponse.json();
const fiches = data[0].spectacles;

const program = fiches.find((p) => p.id === Number(id));

if (!program) {
  document.querySelector(".detail-program").innerText =
    "Programme introuvable.";
} else {
  const sectionFiche = document.querySelector(".detail-program");

  // =====================
  // FONCTION UTILITAIRE
  // =====================
  function createDetail(label, value) {
    if (!value) return null;
    const container = document.createElement("div");
    container.classList.add("detail_container");

    const titleEl = document.createElement("div");
    titleEl.classList.add("detail_title");
    titleEl.textContent = label;

    const infoEl = document.createElement("div");
    infoEl.classList.add("detail_info");
    infoEl.textContent = value;

    container.appendChild(titleEl);
    container.appendChild(infoEl);
    return container;
  }

  // =====================
  // HERO
  // =====================
  const hero = document.createElement("div");
  hero.classList.add("detail-hero");

  const heroLeft = document.createElement("div");
  heroLeft.classList.add("detail-hero__left");

  const dateObj = new Date(program.date);
  const dateFormatted = dateObj.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const date = document.createElement("p");
  date.classList.add("detail-hero__date");
  date.textContent = dateFormatted;

  const titre = document.createElement("h1");
  titre.classList.add("detail-hero__titre");
  titre.textContent = program.titre;

  const type = document.createElement("p");
  type.classList.add("detail-hero__type");
  type.textContent = program.type;

  const btnReserver = document.createElement("a");
  btnReserver.classList.add("btn-reserve");
  btnReserver.textContent = "Réserver";
  btnReserver.href = "#";

  heroLeft.appendChild(date);
  heroLeft.appendChild(titre);
  heroLeft.appendChild(type);
  heroLeft.appendChild(btnReserver);

  const heroRight = document.createElement("div");
  heroRight.classList.add("detail-hero__right");

  const heroImage = document.createElement("img");
  heroImage.src = program.image;
  heroImage.alt = program.titre;
  heroImage.classList.add("detail-hero__image");

  heroRight.appendChild(heroImage);
  hero.appendChild(heroLeft);
  hero.appendChild(heroRight);
  sectionFiche.appendChild(hero);

  // =====================
  // DETAILS
  // =====================
  const detailSection = document.createElement("div");
  detailSection.classList.add("detail-infos");

  const detailTitle = document.createElement("h2");
  detailTitle.classList.add("detail-infos__title");
  detailTitle.textContent = "À propos";
  detailSection.appendChild(detailTitle);

  const detailBody = document.createElement("div");
  detailBody.classList.add("detail-infos__body");

  // Colonne gauche — description
  const detailLeft = document.createElement("div");
  detailLeft.classList.add("detail-infos__left");

  const descriptionEl = document.createElement("p");
  descriptionEl.classList.add("detail-infos__description");
  descriptionEl.textContent = program.description;
  detailLeft.appendChild(descriptionEl);

  // Colonne droite — infos
  const detailRight = document.createElement("div");
  detailRight.classList.add("detail-infos__right");

  // Calcul du taux de remplissage
  const placesRestantes = program.places_total - program.places_vendues;
  const pct = Math.round((program.places_vendues / program.places_total) * 100);
  const tier = pct >= 90 ? "scarce" : pct >= 70 ? "limited" : "available";
  const dispoText =
    placesRestantes <= 0 ? "Complet" : `${placesRestantes} places restantes`;

  // Conteneur disponibilité
  const capacityContainer = document.createElement("div");
  capacityContainer.classList.add(
    "detail_container",
    "detail_container--capacity",
  );

  const capacityTitle = document.createElement("div");
  capacityTitle.classList.add("detail_title");
  capacityTitle.textContent = "Disponibilité";

  // Label + compte
  const capacityLabel = document.createElement("div");
  capacityLabel.classList.add("detail__capacity-label");

  const capacityText = document.createElement("span");
  capacityText.classList.add("detail__capacity-text");
  capacityText.textContent = placesRestantes <= 0 ? "Complet" : "Disponibilité";

  const capacityCount = document.createElement("span");
  capacityCount.classList.add(
    "detail__capacity-count",
    `detail__capacity-count--${tier}`,
  );
  capacityCount.textContent = dispoText;

  capacityLabel.appendChild(capacityText);
  capacityLabel.appendChild(capacityCount);

  // Barre
  const capacityBar = document.createElement("div");
  capacityBar.classList.add("detail__capacity-bar");

  const capacityFill = document.createElement("div");
  capacityFill.classList.add(
    "detail__capacity-fill",
    `detail__capacity-fill--${tier}`,
  );
  capacityFill.style.width = `${pct}%`;

  capacityBar.appendChild(capacityFill);
  capacityContainer.appendChild(capacityTitle);
  capacityContainer.appendChild(capacityLabel);
  capacityContainer.appendChild(capacityBar);
  detailRight.appendChild(capacityContainer);

  [
    createDetail("Artiste", program.artiste),
    createDetail("Date", dateFormatted),
    createDetail("Horaire", program.horaire),
    createDetail("Durée", program.duree),
    createDetail("Prix", program.prix ? `${program.prix} €` : null),
  ].forEach((el) => {
    if (el) detailRight.appendChild(el);
  });

  detailBody.appendChild(detailLeft);
  detailBody.appendChild(detailRight);
  detailSection.appendChild(detailBody);
  sectionFiche.appendChild(detailSection);
}
