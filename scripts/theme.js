window.pendingTheme = null;

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateParticleBackground(isDark);
  updateThemeIcon(isDark);
}

function initializeTheme() {
  // Set light mode as default
  const savedTheme = localStorage.getItem("theme");
  const theme = savedTheme || "light"; // Default to 'light'

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    updateParticleBackground(true);
  }

  updateThemeIcon(theme === "dark");
}

function updateParticleBackground(isDark) {
  // Communicate with p5.js sketch to change background
  if (window.sketch && typeof window.sketch.setBackground === "function") {
    window.sketch.setBackground(isDark ? 30 : 240); // Dark gray vs light gray
  } else {
    window.pendingTheme = isDark;
  }
}

function updateThemeIcon(isDark) {
  const lightIcon = document.querySelector(".theme-toggle .light-icon");
  const darkIcon = document.querySelector(".theme-toggle .dark-icon");

  if (lightIcon && darkIcon) {
    lightIcon.style.display = isDark ? "inline-block" : "none";
    darkIcon.style.display = isDark ? "none" : "inline-block";
  }
}

function setupThemeToggle() {
  const toggleButtons = document.querySelectorAll(".theme-toggle");
  toggleButtons.forEach((button) => {
    button.addEventListener("click", toggleTheme);
  });
}

function watchSystemTheme() {
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", (e) => {
      // Only follow system theme if user hasn't explicitly set a preference
      if (!localStorage.getItem("theme")) {
        const systemTheme = e.matches ? "dark" : "light";
        const isDark = systemTheme === "dark";
        document.documentElement.classList.toggle("dark", isDark);
        updateParticleBackground(isDark);
        updateThemeIcon(isDark);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  setupThemeToggle();
  watchSystemTheme();
});
