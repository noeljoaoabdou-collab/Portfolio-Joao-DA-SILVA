const typingTarget = document.querySelector("#typing-text");
const typingSentence = "Soigner les patients, puis soigner la donnée";
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const revealElements = document.querySelectorAll(".reveal");
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

let typingIndex = 0;

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-mode", isDark);
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeToggle?.setAttribute("aria-label", isDark ? "Activer le mode clair" : "Activer le mode sombre");
}

function typeHeroText() {
  if (!typingTarget) return;

  typingTarget.textContent = typingSentence.slice(0, typingIndex);
  typingIndex += 1;

  if (typingIndex <= typingSentence.length) {
    window.setTimeout(typeHeroText, 48);
  }
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
  localStorage.setItem("portfolio-theme", nextTheme);
  applyTheme(nextTheme);
});

const sections = [...document.querySelectorAll("main section[id]")];

function setActiveLink() {
  const currentSection = sections.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 130 && rect.bottom >= 130;
  });

  navItems.forEach((item) => {
    item.classList.toggle("active", item.getAttribute("href") === `#${currentSection?.id}`);
  });
}

window.addEventListener("scroll", setActiveLink, { passive: true });

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Envoi en cours...";
  formStatus.textContent = "";

  window.setTimeout(() => {
    form.reset();
    submitButton.disabled = false;
    submitButton.textContent = "Envoyer";
    formStatus.textContent = "Message prêt à être envoyé. Merci pour votre intérêt.";
  }, 850);
});

applyTheme(savedTheme || (prefersDark ? "dark" : "light"));
typeHeroText();
setActiveLink();
