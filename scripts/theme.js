// Theme Manager for Dark/Light Mode Toggle
class ThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
    this.init();
  }

  init() {
    // Apply the current theme
    this.applyTheme(this.currentTheme);

    // Set up theme toggle buttons
    this.setupThemeToggle();

    // Listen for system theme changes
    this.watchSystemTheme();
  }

  getSystemTheme() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "light";
  }

  getStoredTheme() {
    return localStorage.getItem("theme");
  }

  storeTheme(theme) {
    localStorage.setItem("theme", theme);
  }

  applyTheme(theme) {
    const html = document.documentElement;

    if (theme === "dark") {
      html.setAttribute("data-theme", "dark");
      html.classList.add("theme-dark");
    } else {
      html.removeAttribute("data-theme");
      html.classList.remove("theme-dark");
    }

    this.currentTheme = theme;
    this.updateThemeToggleIcon();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "dark" ? "light" : "dark";
    this.applyTheme(newTheme);
    this.storeTheme(newTheme);
  }

  setupThemeToggle() {
    const toggleButtons = document.querySelectorAll(".theme-toggle");
    toggleButtons.forEach((button) => {
      button.addEventListener("click", () => this.toggleTheme());
    });
  }

  updateThemeToggleIcon() {
    const toggleButtons = document.querySelectorAll(".theme-toggle");
    toggleButtons.forEach((button) => {
      const lightIcon = button.querySelector(".light-icon");
      const darkIcon = button.querySelector(".dark-icon");

      if (this.currentTheme === "dark") {
        if (lightIcon) lightIcon.style.display = "inline-block";
        if (darkIcon) darkIcon.style.display = "none";
      } else {
        if (lightIcon) lightIcon.style.display = "none";
        if (darkIcon) darkIcon.style.display = "inline-block";
      }
    });
  }

  watchSystemTheme() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!this.getStoredTheme()) {
          const systemTheme = e.matches ? "dark" : "light";
          this.applyTheme(systemTheme);
        }
      });
    }
  }

  // Public method to get current theme
  getCurrentTheme() {
    return this.currentTheme;
  }

  // Public method to set theme programmatically
  setTheme(theme) {
    if (theme === "dark" || theme === "light") {
      this.applyTheme(theme);
      this.storeTheme(theme);
    }
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.themeManager = new ThemeManager();
});

// Export for use in other scripts if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = ThemeManager;
}
