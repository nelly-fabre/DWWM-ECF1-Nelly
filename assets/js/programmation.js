fetch("/spectacles.json")
  .then((response) => response.json())
  .then((data) => {
    console.log("data reçue :", data); // ← ajoute ça
    console.log("data[0] :", data[0]);
    const programs = data[0].spectacles;
    console.log("programs :", programs);
    const cardsContainer = document.querySelector(".program");

    programs.forEach((program) => {
      const card = document.createElement("div");
      card.classList.add("program__card");

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
      programImageHoverIcon.src = "/assets/img/hover-more-icon.png";

      const programImageHoverLink = document.createElement("a");
      programImageHoverLink.href = `/assets/pages/fiche-program.html?id=${program.id}`;

      const programType = document.createElement("p");
      programType.classList.add("program__type");
      programType.textContent = program.type;

      const programTitle = document.createElement("a");
      programTitle.classList.add("program__title");
      programTitle.textContent = program.titre;
      programTitle.href = `/assets/pages/fiche-program.html?id=${program.id}`;

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

      cardsContainer.appendChild(card);
    });

    // Hover on mobile
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
  });
