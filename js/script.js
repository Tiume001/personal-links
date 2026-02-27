document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------
    // Data Structure for Easy Scalability
    // -----------------------------------------

    // Main Links Config
    const linksData = [
        {
            title: 'Portfolio Principale',
            description: 'Scopri i miei progetti software e le mie competenze',
            url: '#', // TODO: Add real URL later
            iconClass: 'fa-solid fa-globe',
        },
        {
            title: 'Immobili in Affitto',
            description: 'Esplora le mie proprietà immobiliari per le tue vacanze',
            url: '#', // TODO: Add real URL later
            iconClass: 'fa-solid fa-house',
        },
        {
            title: 'GitHub',
            description: 'Esplora il codice sorgente dei miei progetti open-source',
            url: '#', // TODO: Add real URL later
            iconClass: 'fa-brands fa-github',
        },
        {
            title: 'LinkedIn',
            description: 'Connettiamoci professionalmente',
            url: '#', // TODO: Add real URL later
            iconClass: 'fa-brands fa-linkedin',
        }
    ];

    // Social Footer Config
    const socialsData = [
        {
            label: 'Instagram',
            url: '#', // TODO: Add real URL later
            iconClass: 'fa-brands fa-instagram',
        },
        {
            label: 'Email',
            url: 'mailto:info@example.com', // TODO: Add real Email later
            iconClass: 'fa-solid fa-envelope',
        }
    ];

    const linksContainer = document.getElementById('links-container');
    const socialsContainer = document.getElementById('socials-container');

    // -----------------------------------------
    // Render Functions
    // -----------------------------------------

    function renderLinks() {
        linksContainer.innerHTML = '';
        linksData.forEach((link, index) => {
            const linkHtml = `
                <a href="${link.url}" class="link-card" target="_blank" rel="noopener noreferrer">
                    <div class="link-icon">
                        <i class="${link.iconClass}"></i>
                    </div>
                    <div class="link-content">
                        <h2>${link.title}</h2>
                        <p>${link.description}</p>
                    </div>
                </a>
            `;
            linksContainer.insertAdjacentHTML('beforeend', linkHtml);
        });
    }

    function renderSocials() {
        socialsContainer.innerHTML = '';
        socialsData.forEach((social) => {
            const socialHtml = `
                <a href="${social.url}" class="social-icon" aria-label="${social.label}" target="_blank" rel="noopener noreferrer">
                    <i class="${social.iconClass}"></i>
                </a>
            `;
            socialsContainer.insertAdjacentHTML('beforeend', socialHtml);
        });
    }

    // Initial render
    renderLinks();
    renderSocials();

    // -----------------------------------------
    // Theme Toggling Logic
    // -----------------------------------------
    const themeToggleBtn = document.getElementById('themeToggle');
    const rootElement = document.documentElement;

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        rootElement.classList.add('light-mode');
    }

    // Toggle theme on click
    themeToggleBtn.addEventListener('click', () => {
        rootElement.classList.toggle('light-mode');

        // Save preference
        if (rootElement.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });

    // -----------------------------------------
    // Staggered Animation for Links
    // -----------------------------------------
    const linkCards = document.querySelectorAll('.link-card');

    // Setup Intersection Observer for smooth entrance
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Apply staggered delay based on index
                setTimeout(() => {
                    entry.target.classList.add('link-anim-in');
                }, index * 100);

                // Unobserve after animating
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    linkCards.forEach((card) => {
        observer.observe(card);
    });
});
