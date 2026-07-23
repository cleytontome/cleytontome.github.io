(() => {
  // ---- Theme toggle (persisted) ----
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const stored = localStorage.getItem("theme");
  if (stored) root.setAttribute("data-theme", stored);

  const currentTheme = () =>
    root.getAttribute("data-theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  toggle.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  // ---- Reveal on scroll ----
  const revealTargets = document.querySelectorAll(".reveal, .bar__fill");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => io.observe(el));

  // ---- Footer year ----
  document.getElementById("year").textContent = new Date().getFullYear();

  // ---- PDF export (browser print → "Salvar como PDF") ----
  const printHandler = () => window.print();
  document.getElementById("downloadPdf")?.addEventListener("click", printHandler);
  document.getElementById("downloadPdfFooter")?.addEventListener("click", printHandler);
})();
