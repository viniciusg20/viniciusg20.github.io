// Portfólio · Vinicius Gonzales
document.documentElement.classList.add("js");

const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- tema claro/escuro ---------- */
function currentTheme() {
  if (root.dataset.theme) return root.dataset.theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
document.getElementById("themeToggle").addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

/* ---------- menu mobile ---------- */
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuToggle");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

/* ---------- borda do header ao rolar ---------- */
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- gráfico de dispersão decorativo no hero ---------- */
(function drawScatter() {
  const g = document.getElementById("scatter");
  if (!g) return;
  let seed = 7; // números "aleatórios" fixos, para o desenho ser sempre igual
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const ns = "http://www.w3.org/2000/svg";
  for (let i = 0; i < 70; i++) {
    const x = 20 + rand() * 560;
    const trend = 360 - (x - 20) * 0.53;            // segue a linha de tendência
    const y = trend + (rand() - 0.5) * 120;
    const c = document.createElementNS(ns, "circle");
    c.setAttribute("cx", x.toFixed(1));
    c.setAttribute("cy", Math.max(10, Math.min(390, y)).toFixed(1));
    c.setAttribute("r", (2 + rand() * 3).toFixed(1));
    g.appendChild(c);
  }
})();

/* ---------- elementos aparecem ao rolar ---------- */
const revealEls = document.querySelectorAll(".reveal");
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("is-visible"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
}

/* ---------- contador dos KPIs ---------- */
document.querySelectorAll("[data-count]").forEach((el) => {
  const target = Number(el.dataset.count);
  if (reduceMotion || target > 100) return; // anos (ex.: 2022) ficam fixos
  const io = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    const start = performance.now();
    const dur = 900;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = "0";
    requestAnimationFrame(tick);
  });
  io.observe(el);
});

/* ---------- link ativo no menu ---------- */
const links = [...nav.querySelectorAll("a")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));
}

/* ---------- filtro de projetos ---------- */
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");
filters.forEach((btn) =>
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.toggle("is-active", b === btn));
    const f = btn.dataset.filter;
    projects.forEach((p) => {
      const show = f === "all" || p.dataset.tags.split(" ").includes(f);
      p.classList.toggle("is-hidden", !show);
      if (show) p.classList.add("is-visible");
    });
  })
);

document.getElementById("year").textContent = new Date().getFullYear();
