document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------
    // Data Structure for Easy Scalability
    // -----------------------------------------

    // Main Links Config
    const linksData = [
        {
            title: 'Portfolio Principale',
            description: 'Scopri i miei progetti software e le mie competenze',
            url: 'https://mattiascarpa.it', // Real URL
            iconClass: 'fa-solid fa-globe',
        },
        {
            title: 'Immobili in Affitto',
            description: 'Esplora le mie proprietà immobiliari per le tue vacanze',
            url: 'https://immobili.mattiascarpa.it', // Real URL
            iconClass: 'fa-solid fa-house',
        },
        {
            title: 'GitHub',
            description: 'Esplora il codice sorgente dei miei progetti open-source',
            url: 'https://github.com/Tiume001', // Real URL
            iconClass: 'fa-brands fa-github',
        },
        {
            title: 'LinkedIn',
            description: 'Connettiamoci professionalmente',
            url: 'https://www.linkedin.com/in/mattia-scarpa-a20a6b277/', // Real URL
            iconClass: 'fa-brands fa-linkedin',
        },
        {
            title: 'HackerRank',
            description: 'Guarda le mie sfide di coding e certificazioni',
            url: 'https://www.hackerrank.com/profile/h892831', // Real URL
            iconClass: 'fa-brands fa-hackerrank',
        }
    ];

    // Social Footer Config
    const socialsData = [
        {
            label: 'Instagram',
            url: 'https://www.instagram.com/10.tmx.01/', // Real URL
            iconClass: 'fa-brands fa-instagram',
        },
        {
            label: 'WhatsApp',
            url: 'https://wa.me/393400080030', // Real URL
            iconClass: 'fa-brands fa-whatsapp',
        },
        {
            label: 'Telefono',
            url: 'tel:+393400080030', // Real URL
            iconClass: 'fa-solid fa-phone',
        },
        {
            label: 'Telegram',
            url: 'https://t.me/+393400080030', // Real URL
            iconClass: 'fa-brands fa-telegram',
        },
        {
            label: 'Facebook',
            url: '#', // TODO: Add real facebook URL later
            iconClass: 'fa-brands fa-facebook',
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
    const metaThemeColor = document.getElementById('meta-theme-color');

    // Function to update the meta theme color
    function updateMetaThemeColor(isLight) {
        if (metaThemeColor) {
            // Calcolo esatto dei colori che appaiono in cima (viola scuro e marrone)
            // L'aggiornamento simultaneo con la CSS transition a volte blocca Safari su iOS.
            const newColor = isLight ? '#CDB59D' : '#2E2F68';
            metaThemeColor.setAttribute('content', newColor);

            // Forza l'aggiornamento a transizione finita per eludere il bug
            setTimeout(() => {
                metaThemeColor.setAttribute('content', newColor);
            }, 450);
        }
    }

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        rootElement.classList.add('light-mode');
        updateMetaThemeColor(true);
    } else {
        updateMetaThemeColor(false);
    }

    // Toggle theme on click
    themeToggleBtn.addEventListener('click', () => {
        const isLightMode = rootElement.classList.toggle('light-mode');
        updateMetaThemeColor(isLightMode);

        // Save preference
        if (isLightMode) {
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
