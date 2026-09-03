const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const navigationMenu = document.querySelector('.liste');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

function updateThemeButton(isLightTheme) {
    const icon = themeToggle.querySelector('i');
    icon.className = isLightTheme ? 'fas fa-moon' : 'fas fa-sun';
    themeToggle.setAttribute(
        'aria-label',
        isLightTheme ? 'Activer le mode sombre' : 'Activer le mode clair'
    );
}

const savedTheme = localStorage.getItem('portfolio-theme');
const prefersLightTheme = window.matchMedia('(prefers-color-scheme: light)').matches;
const isLightTheme = savedTheme === 'light' || (!savedTheme && prefersLightTheme);

document.body.classList.toggle('light-theme', isLightTheme);
updateThemeButton(isLightTheme);

themeToggle.addEventListener('click', () => {
    const nextIsLightTheme = !document.body.classList.contains('light-theme');
    document.body.classList.toggle('light-theme', nextIsLightTheme);
    localStorage.setItem('portfolio-theme', nextIsLightTheme ? 'light' : 'dark');
    updateThemeButton(nextIsLightTheme);
});

menuToggle.addEventListener('click', () => {
    const isOpen = navigationMenu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    menuToggle.setAttribute('title', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    menuToggle.querySelector('i').className = isOpen ? 'fas fa-xmark' : 'fas fa-bars';
});

navigationMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navigationMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.querySelector('i').className = 'fas fa-bars';
    });
});

contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    formStatus.textContent = 'Envoi en cours...';
    formStatus.style.color = '#38bdf8';

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { Accept: 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Échec de l’envoi');
        }

        formStatus.textContent = 'Votre message a bien été envoyé.';
        formStatus.style.color = '#22c55e';
        contactForm.reset();
    } catch (error) {
        formStatus.textContent = 'Une erreur est survenue. Veuillez réessayer.';
        formStatus.style.color = '#ef4444';
    }
});

