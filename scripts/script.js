
function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes("/pages/about.html")) return "about";
  if (path.includes("/pages/skills.html")) return "skills";
  if (path.includes("/pages/projects.html")) return "projects";
  if (path.includes("/pages/blog.html")) return "blog";
  return "home";
}

function updateTranslatableElements(translationData) {
  // Find all elements with data-i18n attribute
  const translatableElements = document.querySelectorAll('[data-i18n]');
  
  translatableElements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const keys = key.split('.');
    let value = translationData;
    
    // Navigate through the translation object using the key path
    for (let i = 0; i < keys.length; i++) {
      if (value && value.hasOwnProperty(keys[i])) {
        value = value[keys[i]];
      } else {
        value = null;
        break;
      }
    }
    
  
    if (value !== null) {
      
      if (Array.isArray(value)) {
        // Handle list items
        const listItems = element.querySelectorAll('li');
        listItems.forEach((li, index) => {
          if (value[index]) {
            li.innerHTML = value[index];
          }
        });
      } else {
        
        element.innerHTML = value;
      }
    }
  });
}

// Generic function to update navigation
function updateNavigation(translationData) {
  const navElements = document.querySelectorAll('[data-i18n-nav]');
  navElements.forEach(element => {
    const key = element.getAttribute('data-i18n-nav');
    if (translationData.nav && translationData.nav[key]) {
      if (element.tagName === 'SPAN') {
        element.textContent = translationData.nav[key];
      } else {
        element.innerHTML = ` ${translationData.nav[key]}`;
      }
    }
  });
}

function loadTranslation(language) {
  localStorage.setItem("selectedLanguage", language);

  const languageSelector = document.getElementById("language-selector");
  if (languageSelector) {
    languageSelector.value = language;
  }

  // If English, just reload
  if (language === "en") {
    if (localStorage.getItem("selectedLanguage") !== null) {
      localStorage.removeItem("selectedLanguage");
      location.reload();
    }
    return;
  }

  fetch(`${window.location.pathname.includes("/pages/") ? "../translation/" : "translation/"}${language}.json`)
    .then(response => response.json())
    .then(data => {
      // Update navigation
      updateNavigation(data);
      
      // Update page-specific content
      const currentPage = getCurrentPage();
      if (data[currentPage]) {
        updateTranslatableElements(data);
      }
    })
    .catch(error => console.error("Error loading translation:", error));
}

// Apply saved localStorage choice when reloading
window.addEventListener("load", () => {
  const savedLanguage = localStorage.getItem("selectedLanguage");
  if (savedLanguage && savedLanguage !== "en") {
    loadTranslation(savedLanguage);
  }
});

// Main event listener
document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById("language-selector");
  if (languageSelector) {
    languageSelector.addEventListener("change", (event) => {
      const selectedLanguage = event.target.value;
      loadTranslation(selectedLanguage);
    });
  }
});
