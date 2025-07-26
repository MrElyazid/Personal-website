// Simplified Theme Management for Dark/Light Mode Toggle

// Toggle between dark and light themes
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateParticleBackground(isDark);
  updateThemeIcon(isDark);
}

// Initialize theme based on saved preference or system setting
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const theme = savedTheme || systemTheme;
  
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    updateParticleBackground(true);
  }
  
  updateThemeIcon(theme === 'dark');
}

// Update particle background color
function updateParticleBackground(isDark) {
  // Communicate with p5.js sketch to change background
  if (window.sketch) {
    window.sketch.setBackground(isDark ? 30 : 240); // Dark gray vs light gray
  }
}

// Update theme toggle icon
function updateThemeIcon(isDark) {
  const lightIcon = document.querySelector('.theme-toggle .light-icon');
  const darkIcon = document.querySelector('.theme-toggle .dark-icon');
  
  if (lightIcon && darkIcon) {
    lightIcon.style.display = isDark ? 'inline-block' : 'none';
    darkIcon.style.display = isDark ? 'none' : 'inline-block';
  }
}

// Set up theme toggle buttons
function setupThemeToggle() {
  const toggleButtons = document.querySelectorAll('.theme-toggle');
  toggleButtons.forEach((button) => {
    button.addEventListener('click', toggleTheme);
  });
}

// Watch for system theme changes
function watchSystemTheme() {
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        const systemTheme = e.matches ? 'dark' : 'light';
        const isDark = systemTheme === 'dark';
        document.documentElement.classList.toggle('dark', isDark);
        updateParticleBackground(isDark);
        updateThemeIcon(isDark);
      }
    });
  }
}

// Initialize theme management when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  setupThemeToggle();
  watchSystemTheme();
});