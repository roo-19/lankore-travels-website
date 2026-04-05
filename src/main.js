/* =========================================
   LANKORE TRAVELS - MAIN JS
   ========================================= */

import './style.css';

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. STICKY NAVBAR
       ========================================= */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================
       2. MOBILE MENU TOGGLE
       ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto'; // Enable scrolling
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    /* =========================================
       3. HERO SLIDER
       ========================================= */
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 3000; // 3 seconds per slide

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Initialize slider if slides exist
    if (slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }

    /* =========================================
       4. SCROLL REVEAL ANIMATIONS
       ========================================= */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* =========================================
       5. COUNTER ANIMATION (Stats)
       ========================================= */
    const counters = document.querySelectorAll('.counter');
    const ctaSection = document.querySelector('.cta-section');
    let countersAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;

                    // Lower increment value for smoother, longer animation
                    const inc = target / 100;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        }
    }, { threshold: 0.5 });

    if (ctaSection && counters.length > 0) {
        counterObserver.observe(ctaSection);
    }

    /* =========================================
       6. FORM SUBMISSION (Prevent default for demo)
       ========================================= */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.style.opacity = '0.8';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Inquiry Sent!';
                btn.style.backgroundColor = '#25D366';
                btn.style.color = '#fff';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    /* =========================================
       6b. CONTACT PAGE FORM SUBMISSION
       ========================================= */
    const contactFormPage = document.getElementById('contactFormPage');
    if (contactFormPage) {
        contactFormPage.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactFormPage.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.style.opacity = '0.8';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Inquiry Sent!';
                btn.style.backgroundColor = '#25D366';
                btn.style.color = '#fff';
                contactFormPage.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    /* =========================================
       7. WHATSAPP FLOATING WIDGET
       ========================================= */
    const whatsappWidgetHTML = `
        <div class="whatsapp-widget">
            <div class="whatsapp-popup" id="whatsapp-popup">
                <div class="whatsapp-popup-header">
                    <div class="whatsapp-header-icon">
                        <i class="fab fa-whatsapp"></i>
                    </div>
                    <div class="whatsapp-header-text">
                        <h3>Start a Conversation</h3>
                        <p>Hi! Click one of our member below to chat on WhatsApp</p>
                    </div>
                </div>
                <div class="whatsapp-popup-body">
                    <p class="whatsapp-reply-time">The team typically replies in a few minutes.</p>
                    <div class="whatsapp-contact-card" id="whatsapp-contact-card">
                        <div class="whatsapp-contact-avatar">
                            <img src="/src/assets/images/logo1.png" alt="Lankore Travels">
                        </div>
                        <div class="whatsapp-contact-info">
                            <h4>Lankore Travels</h4>
                            <p>Customer Support</p>
                        </div>
                        <div class="whatsapp-contact-badge">
                            <i class="fab fa-whatsapp"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="whatsapp-button" id="whatsapp-button">
                <i class="fab fa-whatsapp" id="whatsapp-icon"></i>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', whatsappWidgetHTML);

    const whatsappBtn = document.getElementById('whatsapp-button');
    const whatsappPopup = document.getElementById('whatsapp-popup');
    const whatsappIcon = document.getElementById('whatsapp-icon');
    const contactCard = document.getElementById('whatsapp-contact-card');

    if (whatsappBtn && whatsappPopup && whatsappIcon && contactCard) {
        whatsappBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            whatsappPopup.classList.toggle('show');
            whatsappBtn.classList.toggle('active');
            
            if (whatsappBtn.classList.contains('active')) {
                whatsappIcon.classList.remove('fab', 'fa-whatsapp');
                whatsappIcon.classList.add('fas', 'fa-times');
            } else {
                whatsappIcon.classList.remove('fas', 'fa-times');
                whatsappIcon.classList.add('fab', 'fa-whatsapp');
            }
        });

        contactCard.addEventListener('click', () => {
            window.open('https://wa.me/94711444631', '_blank');
        });

        // Close popup when clicking outside
        document.addEventListener('click', (e) => {
            if (!whatsappBtn.contains(e.target) && !whatsappPopup.contains(e.target)) {
                whatsappPopup.classList.remove('show');
                whatsappBtn.classList.remove('active');
                whatsappIcon.classList.remove('fas', 'fa-times');
                whatsappIcon.classList.add('fab', 'fa-whatsapp');
            }
        });
    }
});
