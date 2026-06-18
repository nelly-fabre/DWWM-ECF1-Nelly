fetch("spectacles.json")
  .then((response) => response.json())
  .then((data) => {
    const programs = data[0].spectacles;
    const cardsContainer = document.querySelector(".program");

    /*    
    ========================================================
    ---------------------DATE MENU--------------------------
    ========================================================
 */

    const filterDate = document.getElementById("filter-date");
    const dates = [...new Set(programs.map((p) => p.date))].sort();
    dates.forEach((date) => {
      const option = document.createElement("option");
      option.value = date;
      const dateObj = new Date(date);
      option.textContent = dateObj.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
      filterDate.appendChild(option);
    });

    /*    
    ========================================================
    -----------------------CARDS----------------------------
    ========================================================
 */

    function createCard(program) {
      const card = document.createElement("div");
      card.classList.add("program__card");

      const programBadge = document.createElement("span");
      programBadge.classList.add("badge");
      if (program.places_vendues >= program.places_total) {
        programBadge.textContent = "Complet";
        programBadge.classList.add("badge__full");
      } else {
        programBadge.textContent = `${program.places_total - program.places_vendues} places restantes`;
        programBadge.classList.add("badge__available");
      }

      const programPictureWrapper = document.createElement("div");
      programPictureWrapper.classList.add("program__picture");

      const programImage = document.createElement("img");
      programImage.src = program.image;
      programImage.alt = program.titre;

      const programImageHover = document.createElement("div");
      programImageHover.classList.add("picture-hover");

      const programImageHoverIcon = document.createElement("img");
      programImageHoverIcon.classList.add("more-icon");
      programImageHoverIcon.alt = "Voir le programme";
      programImageHoverIcon.src = "assets/img/hover-more-icon.webp";

      const programImageHoverLink = document.createElement("a");
      programImageHoverLink.href = `assets/pages/detail-program.html?id=${program.id}`;

      const programType = document.createElement("p");
      programType.classList.add("program__type");
      programType.textContent = program.type;

      const programTitle = document.createElement("a");
      programTitle.classList.add("program__title");
      programTitle.textContent = program.titre;
      programTitle.href = `assets/pages/detail-program.html?id=${program.id}`;

      const programDate = document.createElement("p");
      programDate.classList.add("program__date");
      const dateObj = new Date(program.date);
      programDate.textContent = dateObj.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const programInfo = document.createElement("div");
      programInfo.classList.add("program__info");
      programInfo.appendChild(programType);
      programInfo.appendChild(programTitle);
      programInfo.appendChild(programDate);

      programImageHover.appendChild(programImageHoverIcon);
      programImageHoverLink.appendChild(programImageHover);
      programPictureWrapper.appendChild(programImage);
      programPictureWrapper.appendChild(programImageHoverLink);
      card.appendChild(programPictureWrapper);
      card.appendChild(programInfo);
      card.appendChild(programBadge);

      return card;
    }

    /*    
    ========================================================
    ------------------IF NO SELECTION-----------------------
    ========================================================
 */

    function renderCards(list) {
      cardsContainer.innerHTML = "";

      if (list.length === 0) {
        const empty = document.createElement("p");
        empty.classList.add("program__empty");
        empty.textContent = "Aucun spectacle ne correspond à votre recherche.";
        cardsContainer.appendChild(empty);
        return;
      }

      list.forEach((program) => {
        cardsContainer.appendChild(createCard(program));
      });

      /*    
    ========================================================
    --------------------HOVER MOBILE------------------------
    ========================================================
 */

      if (window.innerWidth < 768) {
        const cards = document.querySelectorAll(".program__card");
        let visibleCards = [];

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                visibleCards.push(entry.target);
              } else {
                visibleCards = visibleCards.filter((c) => c !== entry.target);
              }
            });
          },
          { threshold: 0 },
        );

        cards.forEach((card) => observer.observe(card));

        window.addEventListener("scroll", () => {
          visibleCards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = (rect.top + rect.bottom) / 2;
            const screenCenter = window.innerHeight / 2;
            const isNearCenter = Math.abs(cardCenter - screenCenter) < 150;
            card
              .querySelector(".picture-hover")
              .classList.toggle("active", isNearCenter);
          });
        });
      }
    }

    /*    
    ========================================================
    -----------------------FILTERS--------------------------
    ========================================================
 */

    function applyFilters() {
      const type = document.getElementById("filter-type").value;
      const date = document.getElementById("filter-date").value;
      const dispo = document.getElementById("filter-dispo").value;

      const filtered = programs.filter((p) => {
        const matchType = type === "" || p.type === type;
        const matchDate = date === "" || p.date === date;
        const matchDispo =
          dispo === "" || p.places_total - p.places_vendues > 0;
        return matchType && matchDate && matchDispo;
      });

      renderCards(filtered);
    }

    document
      .getElementById("filter-type")
      .addEventListener("change", applyFilters);
    document
      .getElementById("filter-date")
      .addEventListener("change", applyFilters);
    document
      .getElementById("filter-dispo")
      .addEventListener("change", applyFilters);

    renderCards(programs);
  });
