// ================================
// Burger menu
// ================================
const burger = document.getElementById("burger");
const navLinks = document.querySelector(".navbar__links");

if (burger && navLinks) {
  burger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    burger.setAttribute("aria-expanded", isOpen);
  });
}

// ================================
// Scroll to top
// ================================
const scrollTopBtn = document.getElementById("scrollTop");

if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    scrollTopBtn.classList.toggle("visible", window.scrollY > 300);
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
