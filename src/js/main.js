/**
 * Main JavaScript file
 * Imports and initializes all modules
 */

// Import modules
import './modules/navigation.js';
import './modules/slider.js';
import Accordion from './modules/accordion.js';
import Router from './modules/router.js';
import Animations from './modules/animation.js';

// Global module instances
let router;
let animations;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    console.log('Ciscon website initialized');

    // Let AOS initialize from the layout.html script
    // It's already being initialized there

    // Initialize animations
    animations = new Animations();

    try {
        // Initialize router with error handling
        router = new Router({
            animationDuration: 300,
            onBeforePageLoad: (fromPath, toPath) => {
                console.log(`Navigating from ${fromPath} to ${toPath}`);
                window.scrollTo(0, 0);
            },
            onAfterPageLoad: (path) => {
                console.log(`Loaded page: ${path}`);
                initPageSpecificFunctionality();

                // Refresh animations
                animations.refresh();

                // Refresh AOS
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            }
        });
        console.log("Router initialized successfully");

        // Enable prefetching on hover for faster navigation
        router.enablePrefetchOnHover();

        // Prefetch common pages
        router.prefetchPages([
            '/',
            '/index.html',
            '/about.html',
            '/services.html',
            '/projects.html',
            '/contact.html'
        ]);
    } catch (error) {
        console.error("Error initializing router:", error);
        // Simple fallback for navigation if router fails
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                // Let default navigation happen for links
                console.log("Using default browser navigation");
            });
        });
    }

    // Initialize counter 
    initCounter();

    // Initialize page-specific functionality
    initPageSpecificFunctionality();
});

/**
 * Initialize counter 
 */
function initCounter() {
    const counterElements = document.querySelectorAll('[data-count]');
    if (counterElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetValue = parseInt(element.getAttribute('data-count'), 10);

                if (!isNaN(targetValue)) {
                    animateCounter(element, targetValue);
                }

                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.2
    });

    counterElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Animate a counter from 0 to target value
 * @param {HTMLElement} element - The element to animate
 * @param {number} targetValue - The target number to count to
 */
function animateCounter(element, targetValue) {
    const duration = 2000; // ms
    const startTime = performance.now();
    const startValue = 0;

    const updateCounter = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = 1 - Math.pow(2, -10 * progress); // easeOutExpo
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easedProgress);

        element.textContent = currentValue.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = targetValue.toLocaleString();
        }
    };

    requestAnimationFrame(updateCounter);
}

// Store accordion instances to prevent memory leaks
let accordionInstances = [];

/**
 * Initialize page-specific functionality
 * This function will be called on initial page load and after each navigation
 */
function initPageSpecificFunctionality() {
    // Clear any existing accordion instances to prevent memory leaks
    accordionInstances.forEach(instance => {
        if (typeof instance.destroy === 'function') {
            instance.destroy();
        }
    });
    accordionInstances = [];

    // Initialize accordions
    const accordionContainers = document.querySelectorAll('.accordion');
    if (accordionContainers.length > 0) {
        accordionContainers.forEach((container, index) => {
            const accordionId = container.id || `accordion-${index}`;
            const accordion = new Accordion(`#${accordionId}`);
            accordionInstances.push(accordion);
        });
    }

    // Project filtering
    const filterButtons = document.querySelectorAll('.projects-filter button, .home-projects-filter button');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Get filter value
                const filterValue = this.getAttribute('data-filter');

                // Get the appropriate project items based on what's on the page
                const projectItems = document.querySelectorAll('.project-item, .project-card');

                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Form validation
    const forms = document.querySelectorAll('form');
    if (forms.length > 0) {
        forms.forEach(form => {
            form.addEventListener('submit', function (e) {
                e.preventDefault();

                // Simple validation
                let isValid = true;
                const requiredFields = this.querySelectorAll('[required]');

                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('is-invalid');
                    } else {
                        field.classList.remove('is-invalid');
                    }
                });

                if (isValid) {
                    // Show success message (in a real implementation, you would submit the form to your backend)
                    alert('Thank you for your message! We will get back to you soon.');
                    this.reset();
                } else {
                    alert('Please fill in all required fields.');
                }
            });
        });
    }

    // Smooth scroll for in-page links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Video play buttons
    const videoPlayButtons = document.querySelectorAll('.video-play-button, .home-why-us-video-play');
    if (videoPlayButtons.length > 0) {
        videoPlayButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                alert('Video player would open here in the production version.');
            });
        });
    }

    // Initialize testimonial sliders
    initTestimonialSliders();
}

/**
 * Initialize testimonial sliders
 */
function initTestimonialSliders() {
    const sliders = document.querySelectorAll('.testimonial-slider, .home-testimonials-slider');

    sliders.forEach(slider => {
        const wrapper = slider.querySelector('.slider-wrapper, .home-testimonials-slider-wrapper');
        const slides = slider.querySelectorAll('.slider-slide, .home-testimonials-slider-slide');
        const dots = slider.querySelectorAll('.slider-dots button, .home-testimonials-slider-dots button');
        const prevButton = slider.querySelector('.slider-arrow-prev, .home-testimonials-slider-arrow:first-child');
        const nextButton = slider.querySelector('.slider-arrow-next, .home-testimonials-slider-arrow:last-child');

        if (!wrapper || slides.length === 0) return;

        let currentSlide = 0;

        // Function to go to a specific slide
        const goToSlide = (index) => {
            // Wrap around if index is out of bounds
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;

            // Update current slide
            currentSlide = index;

            // Update wrapper position
            wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Update active dot
            if (dots.length > 0) {
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentSlide);
                });
            }
        };

        // Set up dot navigation
        if (dots.length > 0) {
            dots.forEach((dot, i) => {
                dot.addEventListener('click', () => goToSlide(i));
            });
        }

        // Set up arrow navigation
        if (prevButton) {
            prevButton.addEventListener('click', () => goToSlide(currentSlide - 1));
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => goToSlide(currentSlide + 1));
        }

        // Initialize by going to the first slide
        goToSlide(0);
    });
}