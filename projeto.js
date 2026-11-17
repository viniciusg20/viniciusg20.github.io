// Páginas de projeto: tema, menu, zoom das imagens e ano do rodapé.
document.documentElement.classList.add("js");
const root = document.documentElement;

function currentTheme() {
  if (root.dataset.theme) return root.dataset.theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
document.getElementById("themeToggle").addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuToggle");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Zoom: clicar numa imagem da galeria abre em tamanho grande
const box = document.getElementById("lightbox");
if (box && typeof box.showModal === "function") {
  const img = box.querySelector("img");
  const cap = box.querySelector("p");
  document.querySelectorAll(".shot button").forEach((btn) =>
    btn.addEventListener("click", () => {
      const src = btn.querySelector("img");
      img.src = src.src;
      img.alt = src.alt;
      cap.textContent = btn.closest("figure").querySelector("figcaption").textContent;
      box.showModal();
    })
  );
  box.addEventListener("click", (e) => { if (e.target === box || e.target.closest(".lightbox__close")) box.close(); });
} else {
  // navegador sem <dialog>: abre a imagem numa nova aba
  document.querySelectorAll(".shot button").forEach((btn) =>
    btn.addEventListener("click", () => window.open(btn.querySelector("img").src, "_blank"))
  );
}

document.getElementById("year").textContent = new Date().getFullYear();
