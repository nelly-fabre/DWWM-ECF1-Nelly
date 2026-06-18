// ================================
// Toggle service__cards
// ================================
{
  document.querySelectorAll(".services__toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = btn.nextElementSibling;
      const isVisible = p.classList.toggle("visible");
      btn.textContent = isVisible ? "Réduire −" : "En savoir +";
    });
  });
}
