
// there is probably another good way to do this but who cares as long as this one is working


function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('/pages/about.html')) return 'about';
    if (path.includes('/pages/skills.html')) return 'skills';
    if (path.includes('/pages/contact.html')) return 'contact';
    return 'home';
}


const elements = {
    
    navPortfolio: document.getElementById('nav-portfolio'),
    navHome: document.getElementById('nav-home'),
    navAbout: document.getElementById('nav-about'),
    navSkills: document.getElementById('nav-skills'),
    navContact: document.getElementById('nav-contact'),
    
    
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

    
    contact: {
        title: document.getElementById('contact-title'),
        email: document.getElementById('contact-email'),
        linkedin: document.getElementById('contact-linkedin'),
        discord: document.getElementById('contact-discord')
    }
};

const languageSelector = document.getElementById('language-selector');


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

    home.whoami.innerHTML = data.home.whoami;
    home.intro.innerHTML = data.home.intro;
    
    home.opinionsTitle.textContent = data.home.opinions.title + ' ';
    home.opinionsSubtitle.textContent = data.home.opinions.subtitle;
    home.opinions.forEach((element, index) => {
        if (element) {
            if (index === 3) {
                    element.innerHTML = data.home.opinions.items[index];
            } else {
                element.innerHTML = data.home.opinions.items[index];
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
            school.comment.innerHTML = data.about.education.schools[index].comment;
        }
    });

    about.personalitiesTitle.textContent = data.about.personalities.title;
    about.chessPlayers.innerHTML = data.about.personalities.chess;
    about.programmers.innerHTML = data.about.personalities.programmers;



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

function updateSkillsPage(data) {
    const skills = elements.skills;
    if (!skills.mainTitle) return;

    skills.mainTitle.textContent = data.skills.mainTitle;

    //programming languages
    skills.programmingTitle.textContent = data.skills.programming.title;
    skills.programmingGood.innerHTML = data.skills.programming.good;
    skills.programmingIntermediate.innerHTML = data.skills.programming.intermediate;
    skills.programmingKnowledge.innerHTML = data.skills.programming.knowledge;

    //webdev
    skills.webdevTitle.textContent = data.skills.webdev.title;
    skills.webdevIntro.innerHTML = data.skills.webdev.intro;
    skills.webdevFrontend.innerHTML = data.skills.webdev.frontend
    skills.webdevBackend.innerHTML = data.skills.webdev.backend
    skills.webdevDatabases.innerHTML = data.skills.webdev.databases
    skills.webdevCss.innerHTML = data.skills.webdev.css
    skills.webdevBaas.innerHTML = data.skills.webdev.baas
    skills.webdevOther.innerHTML = data.skills.webdev.other
    
    //DevOps
    skills.devopsTitle.textContent = data.skills.devops.title;
    skills.devopsText.innerHTML =  data.skills.devops.text;
    
    //Data Science
    skills.datascienceTitle.textContent = data.skills.datascience.title;
    skills.datascienceText.innerHTML = data.skills.datascience.text;

    //GUI and desktop
    skills.guiTitle.textContent = data.skills.gui.title;
    skills.guiText.innerHTML = data.skills.gui.text;
    
    //Creative coding
    skills.graphicsTitle.textContent = data.skills.graphics.title;
    skills.graphicsText.innerHTML = data.skills.graphics.text;
    
    //AI and ML
    skills.aiTitle.textContent = data.skills.ai.title;
    skills.aiText.innerHTML = data.skills.ai.text;
    
    //Misc
    skills.miscTitle.textContent = data.skills.misc.title;
    skills.miscText.innerHTML = data.skills.misc.text;
    
    //online presence
    skills.onlinePresenceTitle.innerHTML = data.skills.onlinePresence.title;

    //Certificates and Achievements section
    skills.certificatesTitle.innerHTML = data.skills.certificates.title;
    skills.certificatesIntro.innerHTML = data.skills.certificates.intro;
    skills.achievementsTitle.textContent = data.skills.achievements.title;
    skills.codewarsAchievement.innerHTML = data.skills.achievements.codewars;
    
    //Resume section
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



function loadTranslation(language) {

    localStorage.setItem('selectedLanguage', language);
    
    if (languageSelector) {
        languageSelector.value = language;
    }

    //if english then just reload
    if (language === 'en') {

        //avoid an infinite loop
        if (localStorage.getItem('selectedLanguage') !== null) {
            localStorage.removeItem('selectedLanguage');
            location.reload();
        }
        return;
    }

    fetch(`${window.location.pathname.includes('/pages/') ? '../' : ''}${language}.json`)
        .then(response => response.json())
        .then(data => {
            //update navbar text
            updateNavigation(data);

            //page-specific content
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

//apply saved local-storage choice when reloading
window.addEventListener('load', () => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && savedLanguage !== 'en') {
        loadTranslation(savedLanguage);
    }
});

//main event listener
if (languageSelector) {
    languageSelector.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        loadTranslation(selectedLanguage);
    });
}
