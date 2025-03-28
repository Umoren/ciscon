/**
 * Main JavaScript file
 * Imports and initializes all modules
 */

// Import modules
import './modules/navigation.js';
import './modules/slider.js';
import Router from './modules/router.js';
import Animations from './modules/animations.js';

// Global module instances
let router, animations;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    console.log('Ciscon website initialized');

    // Initialize animations
    animations = new Animations();

    // Initialize the router
    router = new Router({
        animationDuration: 300,
        onBeforePageLoad: (fromPath, toPath) => {
            console.log(`Navigating from ${fromPath} to ${toPath}`);
            // Reset scroll position
            window.scrollTo(0, 0);
        },
        onAfterPageLoad: (path) => {
            console.log(`Loaded page: ${path}`);
            // Reinitialize any modules that need to be reinitialized
            initPageSpecificFunctionality();

            // Refresh animations for new content
            if (animations) {
                animations.refresh();
            }
        }
    });

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

    // Initialize page-specific functionality
    initPageSpecificFunctionality();
});

/**
 * Initialize page-specific functionality
 * This function will be called on initial page load and after each navigation
 */
function initPageSpecificFunctionality() {
    // Project filtering
    const filterButtons = document.querySelectorAll('.projects-filter button');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Get filter value
                const filterValue = this.getAttribute('data-filter');

                // Filter projects
                const projectItems = document.querySelectorAll('.project-item');
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

    // Accordion functionality
    const accordionButtons = document.querySelectorAll('.accordion-button');
    if (accordionButtons.length > 0) {
        accordionButtons.forEach(button => {
            button.addEventListener('click', function () {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                const targetId = this.getAttribute('data-bs-target');
                const target = document.querySelector(targetId);

                // Close all other accordion items
                document.querySelectorAll('.accordion-collapse.show').forEach(item => {
                    if (item !== target) {
                        item.classList.remove('show');
                        const header = document.querySelector(`[data-bs-target="#${item.id}"]`);
                        if (header) {
                            header.classList.add('collapsed');
                            header.setAttribute('aria-expanded', 'false');
                        }
                    }
                });

                // Toggle the clicked accordion item
                if (isExpanded) {
                    this.classList.add('collapsed');
                    this.setAttribute('aria-expanded', 'false');
                    target.classList.remove('show');
                } else {
                    this.classList.remove('collapsed');
                    this.setAttribute('aria-expanded', 'true');
                    target.classList.add('show');
                }
            });
        });
    }

    // Form validation
    const forms = document.querySelectorAll('form');
    if (forms.length > 0) {
        forms.forEach(form => {
            form.addEventListener('submit', function (e) {
                if (!form.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                }

                form.classList.add('was-validated');
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
    const videoPlayButtons = document.querySelectorAll('.video-play-button');
    if (videoPlayButtons.length > 0) {
        videoPlayButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                alert('Video player would open here in the production version.');
            });
        });
    }

    // Testimonial sliders
    initTestimonialSliders();
}

/**
 * Initialize testimonial sliders
 */
function initTestimonialSliders() {
    const sliders = document.querySelectorAll('.testimonial-slider');

    sliders.forEach(slider => {
        const wrapper = slider.querySelector('.slider-wrapper');
        const slides = slider.querySelectorAll('.slider-slide');
        const dots = slider.querySelectorAll('.slider-dots button');
        const prevButton = slider.querySelector('.slider-arrow-prev');
        const nextButton = slider.querySelector('.slider-arrow-next');

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