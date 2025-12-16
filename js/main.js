/* ========================================
   MAIN JAVASCRIPT - Shaoum Service Digital
   Fonctionnalités interactives du site
======================================== */

// ============================================
// VARIABLES GLOBALES
// ============================================
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const scrollTopBtn = document.getElementById('scroll-top');

// ============================================
// HEADER STICKY AU SCROLL
// ============================================
function handleHeaderScroll() {
    if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
}

window.addEventListener('scroll', handleHeaderScroll);

// ============================================
// MENU MOBILE TOGGLE
// ============================================
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Empêcher le scroll du body quand le menu est ouvert
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Fermer le menu au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Fermer le menu au clic en dehors
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// SMOOTH SCROLL POUR LES LIENS INTERNES
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignorer les liens vides ou qui pointent vers #
        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
if (scrollTopBtn) {
    // Afficher/masquer le bouton selon le scroll
    function handleScrollTopButton() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }

    window.addEventListener('scroll', handleScrollTopButton);

    // Action au clic
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// ANIMATIONS D'ENTRÉE AU SCROLL
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Désactiver l'observation après l'animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer tous les éléments à animer
    const elementsToAnimate = document.querySelectorAll(
        '.service__card, .pricing__card, .why-us__item, .value__item, .feature-item'
    );

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Initialiser les animations au chargement
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// ============================================
// FORMULAIRE DE CONTACT
// ============================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone') ? document.getElementById('phone').value : '',
            service: document.getElementById('service') ? document.getElementById('service').value : '',
            budget: document.getElementById('budget') ? document.getElementById('budget').value : '',
            message: document.getElementById('message').value
        };

        // Validation basique
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Veuillez entrer une adresse email valide.', 'error');
            return;
        }

        // Simulation d'envoi (à remplacer par un vrai backend)
        console.log('Formulaire soumis:', formData);
        
        // Afficher un message de succès
        showNotification('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.', 'success');
        
        // Réinitialiser le formulaire
        contactForm.reset();
    });
}

// ============================================
// SYSTÈME DE NOTIFICATIONS
// ============================================
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <svg class="notification__icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                ${type === 'success' ? 
                    '<path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' :
                    type === 'error' ?
                    '<path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' :
                    '<path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
                }
            </svg>
            <p class="notification__message">${message}</p>
        </div>
        <button class="notification__close" aria-label="Fermer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    `;

    // Ajouter au body
    document.body.appendChild(notification);

    // Afficher avec animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Fonction pour fermer la notification
    const closeNotification = () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    };

    // Fermer au clic sur le bouton
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', closeNotification);

    // Fermer automatiquement après 5 secondes
    setTimeout(closeNotification, 5000);
}

// ============================================
// ACTIVE LINK SELON LA PAGE ACTUELLE
// ============================================
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === '/' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Définir le lien actif au chargement
document.addEventListener('DOMContentLoaded', setActiveLink);

// ============================================
// GESTION DES ACCORDÉONS FAQ (si présents)
// ============================================
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Fermer tous les autres items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle l'item actuel
                item.classList.toggle('active');
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', initFaqAccordion);

// ============================================
// LAZY LOADING DES IMAGES
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

document.addEventListener('DOMContentLoaded', initLazyLoading);

// ============================================
// PROTECTION CONTRE LE SPAM DU FORMULAIRE
// ============================================
let formSubmitCount = 0;
let lastSubmitTime = 0;

function canSubmitForm() {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastSubmitTime;
    
    // Limiter à 3 soumissions par heure
    if (timeDiff < 3600000) { // 1 heure en millisecondes
        formSubmitCount++;
        if (formSubmitCount > 3) {
            showNotification('Trop de tentatives. Veuillez réessayer dans une heure.', 'error');
            return false;
        }
    } else {
        formSubmitCount = 1;
    }
    
    lastSubmitTime = currentTime;
    return true;
}

// ============================================
// DÉTECTION DU MODE SOMBRE DU SYSTÈME (optionnel)
// ============================================
function detectDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('Mode sombre détecté');
        // Vous pouvez ajouter une classe au body si vous voulez supporter le mode sombre
        // document.body.classList.add('dark-mode');
    }
}

document.addEventListener('DOMContentLoaded', detectDarkMode);

// ============================================
// GESTION DES ERREURS DE CHARGEMENT D'IMAGES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Remplacer par une image placeholder si l'image ne charge pas
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%23999"%3EImage non disponible%3C/text%3E%3C/svg%3E';
            this.alt = 'Image non disponible';
        });
    });
});

// ============================================
// PERFORMANCE: DÉBOUNCE POUR LES ÉVÉNEMENTS
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimiser les événements de scroll et resize
const debouncedScroll = debounce(() => {
    handleHeaderScroll();
    if (scrollTopBtn) {
        handleScrollTopButton();
    }
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ============================================
// ANALYTICS (Google Analytics - optionnel)
// ============================================
function trackEvent(category, action, label) {
    // Si Google Analytics est installé
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Tracker les clics sur les boutons CTA
document.querySelectorAll('.btn--primary, .btn--secondary').forEach(btn => {
    btn.addEventListener('click', function() {
        const btnText = this.textContent.trim();
        trackEvent('CTA', 'click', btnText);
    });
});

// ============================================
// INITIALISATION AU CHARGEMENT COMPLET
// ============================================
window.addEventListener('load', () => {
    console.log('🚀 Shaoum Service Digital - Site chargé avec succès');
    
    // Retirer la classe de chargement si présente
    document.body.classList.remove('loading');
    
    // Log pour debug
    console.log('Version: 1.0.0');
    console.log('Dernière mise à jour: 2024');
});

// ============================================
// GESTION DES ERREURS GLOBALES
// ============================================
window.addEventListener('error', (e) => {
    console.error('Erreur détectée:', e.error);
    // En production, vous pourriez envoyer ces erreurs à un service de monitoring
});

// ============================================
// SUPPORT DES ANCIENS NAVIGATEURS
// ============================================
// Polyfill pour smooth scroll sur les anciens navigateurs
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
    document.head.appendChild(script);
}

// ============================================
// EXPORT POUR LES TESTS (optionnel)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        trackEvent,
        debounce
    };
}