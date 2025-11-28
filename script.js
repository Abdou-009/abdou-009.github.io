// Theme toggle & year

const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const yearSpan = document.getElementById("year");

// Set current year
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Load theme from localStorage
const storedTheme = localStorage.getItem("theme");
if (storedTheme === "light") {
  body.classList.remove("dark-theme");
  body.classList.add("light-theme");
  if (themeToggle) themeToggle.textContent = "☀";
}

function toggleTheme() {
  if (body.classList.contains("dark-theme")) {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "☀";
  } else {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☾";
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

// Mobile menu
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("nav-open");
  });

  // Close on link click (mobile)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("nav-open");
    });
  });
}

// Simple fade-in on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.08,
  }
);

document.querySelectorAll(".section, .hero-card").forEach((el) => {
  el.style.opacity = 0;
  el.style.transform = "translateY(18px)";
  el.style.transition = "opacity 260ms ease-out, transform 260ms ease-out";
  observer.observe(el);
});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document
      .querySelectorAll(".section, .hero-card")
      .forEach((el) => el.classList.add("in-view"));
  }, 100);
});

// Apply final styles when in view
const style = document.createElement("style");
style.textContent = `
  .section.in-view,
  .hero-card.in-view {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);
