
let translationCache = {};

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
        // For navbar items, preserve the icon and only update the text
        const icon = element.querySelector('i');
        if (icon) {
          // Keep the icon and update only the text node
          const textNode = Array.from(element.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '');
          if (textNode) {
            textNode.textContent = ` ${translationData.nav[key]}`;
          } else {
            // If no text node found, append the text after the icon
            element.appendChild(document.createTextNode(` ${translationData.nav[key]}`));
          }
        } else {
          // No icon, just update the text
          element.textContent = translationData.nav[key];
        }
      }
    }
  });
}

function getTranslationPath() {
  // Determine the correct path to translation files based on current location
  const path = window.location.pathname;
  if (path.startsWith('/pages/')) {
    return '../translation/';
  } else if (path.includes('/posts/')) {
    return '../../translation/';
  } else {
    return 'translation/';
  }
}

function loadTranslation(language) {
  // If English is selected, just reload the page to show default content
  if (language === "en") {
    localStorage.removeItem("selectedLanguage");
    location.reload();
    return;
  }
  
  localStorage.setItem("selectedLanguage", language);

  const languageSelector = document.getElementById("language-selector");
  if (languageSelector) {
    languageSelector.value = language;
  }

  // Check cache first
  if (translationCache[language]) {
    applyTranslation(translationCache[language]);
    return;
  }

  // Load translation file for the selected language
  const translationPath = `${getTranslationPath()}${language}.json`;
  
  fetch(translationPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Translation file not found: ${translationPath}`);
      }
      return response.json();
    })
    .then(data => {
      // Cache the translation data
      translationCache[language] = data;
      applyTranslation(data);
    })
    .catch(error => {
      console.error("Error loading translation:", error);
      // Fallback to English if translation fails
      if (languageSelector) {
        languageSelector.value = "en";
      }
      // Show content even if translation fails
      showContent();
    });
}

function applyTranslation(translationData) {
  // Update navigation
  updateNavigation(translationData);
  
  // Update page-specific content
  const currentPage = getCurrentPage();
  if (translationData[currentPage]) {
    updateTranslatableElements(translationData);
  }
  
  // Show content after translation is complete
  showContent();
}

function showContent() {
  // Add a small delay to ensure content is properly hidden before showing
  setTimeout(() => {
    // Remove the content-hidden class from main containers
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
      container.classList.remove('content-hidden');
    });
    
    // Also remove from any element with mt-5 class (common in pages)
    const mt5Elements = document.querySelectorAll('.mt-5');
    mt5Elements.forEach(element => {
      element.classList.remove('content-hidden');
    });
  }, 10);
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
  
  // If no saved language or English, show content immediately
  const savedLanguage = localStorage.getItem("selectedLanguage");
  if (!savedLanguage || savedLanguage === "en") {
    showContent();
  }
});
