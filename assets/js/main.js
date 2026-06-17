// main.js

// ================================
// Burger menu
// ================================
{
  const burger = document.getElementById("burger");
  const navLinks = document.querySelector(".navbar__links");

  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      burger.setAttribute("aria-expanded", isOpen);
    });
  }
}

// ================================
// Scroll to top
// ================================
{
  const scrollTopBtn = document.getElementById("scrollTop");

  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.classList.toggle("visible", window.scrollY > 300);
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

//==========================================
// Carousel
//==========================================

// Get all elements on variables
const cards = document.querySelectorAll(".programs-highlights__carousel__card");
const arrowScrollToRight = document.querySelector(".navigation-scrollToRight");
const arrowScrollToLeft = document.querySelector(".navigation-scrollToLeft");
let activeIndex = 0; // To keep track of the active card - 0 is the first card

// Function to add .is-active .is-inactive and put indexes on cards
function setActiveCard(activeIndex) {
  cards.forEach((card) => {
    card.classList.remove("is-active");
    card.classList.remove("is-inactive");
  });

  // Add .is-active to the active card / index 0
  cards[activeIndex].classList.add("is-active");

  // Add is-inactive to other cards
  cards.forEach((card, i) => {
    if (i != activeIndex) {
      card.classList.add("is-inactive");
    }
  });
}

cards.forEach((card, index) => {
  card.addEventListener("click", function () {
    activeIndex = index;
    setActiveCard(index);
    updateArrows(index);
  });
});

//////////////////////////////////////////////////////////
// GENERATE RANDOM CARDS ON PROJECT HIGHLIGHT CAROUSEL ///
//////////////////////////////////////////////////////////

fetch("assets/spectacles.json")
  .then((response) => response.json())
  .then((data) => {
    // Create a table to store random indexes
    const randomIndexes = [];

    // Get 3 random indexes
    while (randomIndexes.length < 3) {
      const index = Math.floor(Math.random() * data.length);
      if (!randomIndexes.includes(index)) {
        randomIndexes.push(index);
      }
    }
    // Create an array to get indexes of projects
    const randomPrograms = randomIndexes.map((index) => data[index]);

    randomPrograms.forEach((program, index) => {
      const imageElement = cards[index].querySelector(
        ".programs-highlights__carousel__card__picture-item",
      );
      const titleElement = cards[index].querySelector(
        ".programs-highlights__carousel__card__title",
      );
      const linkElement = cards[index].querySelector(
        ".programs-highlights__carousel-project-link",
      );

      imageElement.src = project.img_1;
      titleElement.textContent = program.type;
      linkElement.href = `assets/pages/detail-program.html?id=${project.id}`;
    });
  });
