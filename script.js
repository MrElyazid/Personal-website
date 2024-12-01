
// there is probably another good way to do this but who cares as long as this one is working



function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('/pages/about.html')) return 'about';
    if (path.includes('/pages/skills.html')) return 'skills';
    if (path.includes('/pages/contact.html')) return 'contact';
    return 'home';
}


const elements = {
    // Navigation (common to all pages)
    navPortfolio: document.getElementById('nav-portfolio'),
    navHome: document.getElementById('nav-home'),
    navAbout: document.getElementById('nav-about'),
    navSkills: document.getElementById('nav-skills'),
    navContact: document.getElementById('nav-contact'),
    
    // Home page elements
    home: {
        whoami: document.getElementById('whoami'),
        intro: document.getElementById('intro'),
        opinionsTitle: document.getElementById('opinions-title'),
        opinionsSubtitle: document.getElementById('opinions-subtitle'),
        opinions: Array.from({length: 7}, (_, i) => document.getElementById(`opinion-${i + 1}`)),
        interestsTitle: document.getElementById('interests-title'),
        interests: Array.from({length: 6}, (_, i) => document.getElementById(`interest-${i + 1}`)),
        currentlyTitle: document.getElementById('currently-title'),
        currentlyText: document.getElementById('currently-text'),
        findMe: document.getElementById('find-me')
    },

    // About page elements
    about: {
        educationTitle: document.getElementById('education-title'),
        educationHeaderLocation: document.getElementById('education-header-location'),
        educationHeaderTime: document.getElementById('education-header-time'),
        educationHeaderComment: document.getElementById('education-header-comment'),
        schools: Array.from({length: 3}, (_, i) => ({
            name: document.getElementById(`school-${i + 1}-name`),
            period: document.getElementById(`school-${i + 1}-period`),
            comment: document.getElementById(`school-${i + 1}-comment`)
        })),
        personalitiesTitle: document.getElementById('personalities-title'),
        chessPlayers: document.getElementById('chess-players'),
        programmers: document.getElementById('programmers'),
        chessTitle: document.getElementById('chess-title'),
        chessIntro: document.getElementById('chess-intro'),
        chessItems: Array.from({length: 3}, (_, i) => document.getElementById(`chess-item-${i + 1}`)),
        additionalTitle: document.getElementById('additional-title'),
        additionalItems: Array.from({length: 4}, (_, i) => document.getElementById(`additional-item-${i + 1}`))
    },

    // Skills page elements
    skills: {
        mainTitle: document.getElementById('skills-maintitle'),
        programmingTitle: document.getElementById('programming-title'),
        programmingGood: document.getElementById('programming-good'),
        programmingIntermediate: document.getElementById('programming-intermediate'),
        programmingKnowledge: document.getElementById('programming-knowledge'),
        webdevTitle: document.getElementById('webdev-title'),
        webdevIntro: document.getElementById('webdev-intro'),
        webdevFrontend: document.getElementById('webdev-frontend'),
        webdevBackend: document.getElementById('webdev-backend'),
        webdevDatabases: document.getElementById('webdev-databases'),
        webdevCss: document.getElementById('webdev-css'),
        webdevBaas: document.getElementById('webdev-baas'),
        webdevOther: document.getElementById('webdev-other'),
        devopsTitle: document.getElementById('devops-title'),
        devopsText: document.getElementById('devops-text'),
        datascienceTitle: document.getElementById('datascience-title'),
        datascienceText: document.getElementById('datascience-text'),
        guiTitle: document.getElementById('gui-title'),
        guiText: document.getElementById('gui-text'),
        graphicsTitle: document.getElementById('graphics-title'),
        graphicsText: document.getElementById('graphics-text'),
        aiTitle: document.getElementById('ai-title'),
        aiText: document.getElementById('ai-text'),
        miscTitle: document.getElementById('misc-title'),
        miscText: document.getElementById('misc-text'),
        onlinePresenceTitle: document.getElementById('online-presence-title'),
        certificatesIntro: document.getElementById('certificates-intro'),
        certificatesTitle: document.getElementById('certificates-title'),
        achievementsTitle: document.getElementById('achievements-title'),
        codewarsAchievement: document.getElementById('codewars-achievement'),
        resumeTitle: document.getElementById('resume-title'),
        resumeButton: document.getElementById('resume-button'),
        loadingText: document.getElementById('loading-text'),
        errorText: document.getElementById('error-text')
    },

    // Contact page elements
    contact: {
        title: document.getElementById('contact-title'),
        email: document.getElementById('contact-email'),
        linkedin: document.getElementById('contact-linkedin'),
        discord: document.getElementById('contact-discord')
    }
};

const languageSelector = document.getElementById('language-selector');

// Function to preserve HTML elements like spans and links while updating text
function updateTextPreservingElements(element, text, preserveSpans = false) {
    if (!element) return;
    
    // Store existing spans and links
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = element.innerHTML;
    const spans = preserveSpans ? Array.from(tempDiv.getElementsByTagName('span')) : [];
    const links = Array.from(tempDiv.getElementsByTagName('a'));
    
    // Update the text content
    element.textContent = text;
    
    // Re-insert spans and links
    if (preserveSpans) {
        spans.forEach(span => {
            const spanText = text.split(span.textContent);
            if (spanText.length > 1) {
                element.innerHTML = element.innerHTML.replace(
                    spanText[0] + span.textContent + spanText[1],
                    spanText[0] + span.outerHTML + spanText[1]
                );
            }
        });
    }
    
    links.forEach(link => {
        const linkText = text.split(link.textContent);
        if (linkText.length > 1) {
            element.innerHTML = element.innerHTML.replace(
                linkText[0] + link.textContent + linkText[1],
                linkText[0] + link.outerHTML + linkText[1]
            );
        }
    });
}

function updateNavigation(data) {
    if (elements.navPortfolio) elements.navPortfolio.textContent = data.nav.portfolio;
    if (elements.navHome) elements.navHome.textContent = ` ${data.nav.home}`;
    if (elements.navAbout) elements.navAbout.textContent = ` ${data.nav.about}`;
    if (elements.navSkills) elements.navSkills.textContent = ` ${data.nav.skills}`;
    if (elements.navContact) elements.navContact.textContent = ` ${data.nav.contact}`;
}


function updateHomePage(data) {
    const home = elements.home;
    if (!home.whoami) return;

    home.whoami.textContent = data.home.whoami;
    home.intro.textContent = data.home.intro;
    
    home.opinionsTitle.textContent = data.home.opinions.title + ' ';
    home.opinionsSubtitle.textContent = data.home.opinions.subtitle;
    home.opinions.forEach((element, index) => {
        if (element) {
            if (index === 3) {
                const link = element.querySelector('a');
                if (link) {
                    element.innerHTML = `<a href="https://en.wikipedia.org/wiki/Harira" target="_blank">Harira</a> ${data.home.opinions.items[index].split('Harira')[1]}`;
                } else {
                    element.textContent = data.home.opinions.items[index];
                }
            } else {
                element.textContent = data.home.opinions.items[index];
            }
        }
    });
    
    home.interestsTitle.textContent = data.home.interests.title;
    home.interests.forEach((element, index) => {
        if (element) {
            element.textContent = data.home.interests.items[index];
        }
    });
    
    home.currentlyTitle.textContent = data.home.currently.title;
    home.currentlyText.textContent = data.home.currently.text;
    
    home.findMe.textContent = data.home.findMe;
}

// update about page elements
function updateAboutPage(data) {
    const about = elements.about;
    if (!about.educationTitle) return;

    about.educationTitle.textContent = data.about.education.title;
    about.educationHeaderLocation.textContent = data.about.education.headers.location;
    about.educationHeaderTime.textContent = data.about.education.headers.time;
    about.educationHeaderComment.textContent = data.about.education.headers.comment;

    about.schools.forEach((school, index) => {
        if (school.name && school.period && school.comment) {
            school.name.textContent = data.about.education.schools[index].name;
            school.period.textContent = data.about.education.schools[index].period;
            school.comment.textContent = data.about.education.schools[index].comment;
        }
    });

    about.personalitiesTitle.textContent = data.about.personalities.title;
    
    // Preserve links while updating text for chess players and programmers
    if (about.chessPlayers) {
        const chessLinks = Array.from(about.chessPlayers.getElementsByTagName('a'));
        about.chessPlayers.innerHTML = `${data.about.personalities.chess} `;
        chessLinks.forEach((link, index) => {
            about.chessPlayers.appendChild(link);
            if (index === 0) about.chessPlayers.appendChild(document.createTextNode(', and '));
            if (index === 1) about.chessPlayers.appendChild(document.createTextNode('.'));
        });
    }

    if (about.programmers) {
        const progLinks = Array.from(about.programmers.getElementsByTagName('a'));
        about.programmers.innerHTML = `${data.about.personalities.programmers} `;
        progLinks.forEach((link, index) => {
            about.programmers.appendChild(link);
            if (index < 2) about.programmers.appendChild(document.createTextNode(', '));
            if (index === 2) about.programmers.appendChild(document.createTextNode('.'));
        });
    }

    about.chessTitle.textContent = data.about.chess.title;
    about.chessIntro.textContent = data.about.chess.intro;
    about.chessItems.forEach((item, index) => {
        if (item) item.textContent = data.about.chess.items[index];
    });

    about.additionalTitle.textContent = data.about.additional.title;
    about.additionalItems.forEach((item, index) => {
        if (item) item.textContent = data.about.additional.items[index];
    });
}

//update skills page elements
function updateSkillsPage(data) {
    const skills = elements.skills;
    if (!skills.mainTitle) return;

    skills.mainTitle.textContent = data.skills.mainTitle;
    
    // Programming Languages section
    skills.programmingTitle.textContent = data.skills.programming.title;
    updateTextPreservingElements(skills.programmingGood, data.skills.programming.good, true);
    updateTextPreservingElements(skills.programmingIntermediate, data.skills.programming.intermediate, true);
    updateTextPreservingElements(skills.programmingKnowledge, data.skills.programming.knowledge, true);
    
    // Web Dev section
    skills.webdevTitle.textContent = data.skills.webdev.title;
    skills.webdevIntro.textContent = data.skills.webdev.intro;
    updateTextPreservingElements(skills.webdevFrontend, data.skills.webdev.frontend, true);
    updateTextPreservingElements(skills.webdevBackend, data.skills.webdev.backend, true);
    updateTextPreservingElements(skills.webdevDatabases, data.skills.webdev.databases, true);
    updateTextPreservingElements(skills.webdevCss, data.skills.webdev.css, true);
    updateTextPreservingElements(skills.webdevBaas, data.skills.webdev.baas, true);
    updateTextPreservingElements(skills.webdevOther, data.skills.webdev.other, true);
    
    // DevOps section
    skills.devopsTitle.textContent = data.skills.devops.title;
    updateTextPreservingElements(skills.devopsText, data.skills.devops.text, true);
    
    // Data Science section
    skills.datascienceTitle.textContent = data.skills.datascience.title;
    updateTextPreservingElements(skills.datascienceText, data.skills.datascience.text, true);
    
    // GUI Development section
    skills.guiTitle.textContent = data.skills.gui.title;
    updateTextPreservingElements(skills.guiText, data.skills.gui.text, true);
    
    // Graphics section
    skills.graphicsTitle.textContent = data.skills.graphics.title;
    updateTextPreservingElements(skills.graphicsText, data.skills.graphics.text, true);
    
    // AI and ML section
    skills.aiTitle.textContent = data.skills.ai.title;
    updateTextPreservingElements(skills.aiText, data.skills.ai.text, true);
    
    // Misc section
    skills.miscTitle.textContent = data.skills.misc.title;
    updateTextPreservingElements(skills.miscText, data.skills.misc.text, true);
    
    // Certificates and Achievements section
    skills.certificatesTitle.textContent = data.skills.certificates.title;
    skills.certificatesIntro.textContent = data.skills.certificates.intro;
    skills.achievementsTitle.textContent = data.skills.achievements.title;
    updateTextPreservingElements(skills.codewarsAchievement, data.skills.achievements.codewars);
    
    // Resume section
    skills.resumeTitle.textContent = data.skills.resume.title;
    if (skills.resumeButton) {
        const icon = skills.resumeButton.querySelector('i');
        skills.resumeButton.innerHTML = `${icon ? icon.outerHTML : ''} ${data.skills.resume.button}`;
    }
    if (skills.loadingText) skills.loadingText.textContent = data.skills.resume.downloading;
    if (skills.errorText) skills.errorText.textContent = data.skills.resume.error;
}

//update contact page elements
function updateContactPage(data) {
    const contact = elements.contact;
    if (!contact.title) return;

    contact.title.textContent = data.contact.title;
    contact.email.textContent = data.contact.email;
    contact.linkedin.textContent = data.contact.linkedin;
    contact.discord.textContent = data.contact.discord;
}

// Function to load and apply translation
function loadTranslation(language) {
    // Save selected language to localStorage
    localStorage.setItem('selectedLanguage', language);
    
    // Update language selector to match stored language
    if (languageSelector) {
        languageSelector.value = language;
    }

    fetch(`${window.location.pathname.includes('/pages/') ? '../' : ''}${language}.json`)
        .then(response => response.json())
        .then(data => {
            // Update navigation (common to all pages)
            updateNavigation(data);

            // Update page-specific content
            const currentPage = getCurrentPage();
            if (currentPage === 'home') {
                updateHomePage(data);
            } else if (currentPage === 'about') {
                updateAboutPage(data);
            } else if (currentPage === 'skills') {
                updateSkillsPage(data);
            } else if (currentPage === 'contact') {
                updateContactPage(data);
            }
        })
        .catch(error => console.error('Error loading translation:', error));
}

// Event listener for language change
if (languageSelector) {
    languageSelector.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        loadTranslation(selectedLanguage);
    });
}

// Load saved language or default to 'en'
// const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
// loadTranslation(savedLanguage);
