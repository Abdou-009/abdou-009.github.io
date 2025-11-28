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

// Detect system theme preference and apply it
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Load theme from localStorage or use system preference
const storedTheme = localStorage.getItem("theme");
if (storedTheme === "light") {
  body.classList.remove("dark-theme");
  body.classList.add("light-theme");
  if (themeToggle) themeToggle.textContent = "☀";
} else if (storedTheme === "dark" || (storedTheme === null && systemPrefersDark)) {
  body.classList.remove("light-theme");
  body.classList.add("dark-theme");
  if (themeToggle) themeToggle.textContent = "☾";
} else {
  // If no stored theme and system preference is dark, apply dark mode
  body.classList.remove("light-theme");
  body.classList.add("dark-theme");
  if (themeToggle) themeToggle.textContent = "☾";
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

// Mobile menu functionality
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
