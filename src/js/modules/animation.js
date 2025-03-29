/**
 * Animations Module
 * Handles scroll animations and transitions
 */

class Animations {
    constructor(options = {}) {
        // Default options
        this.options = {
            counterDuration: 2000, // Duration for counter animations in ms
            counterEasing: 'easeOutExpo', // Easing function for counter animations
            ...options
        };

        // Initialize
        this.init();
    }

    /**
     * Initialize animations
     */
    init() {
        // Initialize AOS if it's loaded
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: false,
                mirror: false,
                offset: 50,
                disable: 'mobile'
            });
        }

        // Initialize number counters
        this.initCounters();

        // Initialize other animations
        this.initMiscAnimations();
    }

    /**
     * Initialize counter animations
     */
    initCounters() {
        const counterElements = document.querySelectorAll('[data-count]');

        if (counterElements.length === 0) return;

        // Set up Intersection Observer to trigger counters when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);

                    // Unobserve after triggering
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2 // Trigger when at least 20% of the element is visible
        });

        // Observe all counter elements
        counterElements.forEach(element => {
            observer.observe(element);
        });
    }

    /**
     * Animate a counter element
     * @param {HTMLElement} element - The counter element to animate
     */
    animateCounter(element) {
        const targetValue = parseInt(element.getAttribute('data-count'), 10);
        if (isNaN(targetValue)) return;

        const duration = this.options.counterDuration;
        const startTime = performance.now();
        const startValue = 0;

        // Animation frame function
        const updateCounter = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = this.easing(progress, this.options.counterEasing);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easedProgress);

            // Update the element text
            element.textContent = this.formatNumber(currentValue);

            // Continue animation if not complete
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Ensure the final value is exactly the target value
                element.textContent = this.formatNumber(targetValue);
            }
        };

        // Start the animation
        requestAnimationFrame(updateCounter);
    }

    /**
     * Format a number with commas for thousands
     * @param {number} number - The number to format
     * @returns {string} - The formatted number
     */
    formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    /**
     * Easing function calculator
     * @param {number} progress - Progress value between 0 and 1
     * @param {string} type - Type of easing function
     * @returns {number} - Eased progress value
     */
    easing(progress, type) {
        switch (type) {
            case 'linear':
                return progress;
            case 'easeInQuad':
                return progress * progress;
            case 'easeOutQuad':
                return progress * (2 - progress);
            case 'easeInOutQuad':
                return progress < 0.5
                    ? 2 * progress * progress
                    : -1 + (4 - 2 * progress) * progress;
            case 'easeOutExpo':
                return progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            default:
                return progress;
        }
    }

    /**
     * Initialize miscellaneous animations
     */
    initMiscAnimations() {
        // Navbar scroll effect
        this.initNavbarScrollEffect();

        // Image hover effects
        this.initImageHoverEffects();
    }

    /**
     * Initialize navbar scroll effect
     */
    initNavbarScrollEffect() {
        const navbar = document.querySelector('.site-header');
        if (!navbar) return;

        const handleScroll = () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };

        // Initial check
        handleScroll();

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
    }

    /**
     * Initialize image hover effects
     */
    initImageHoverEffects() {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            const image = card.querySelector('img');
            if (!image) return;

            // Add subtle zoom effect on hover
            card.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.05)';
                image.style.transition = 'transform 0.5s ease';
            });

            card.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1)';
            });
        });
    }

    /**
     * Refresh animations, e.g., after dynamic content changes
     */
    refresh() {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

        // Re-initialize counters
        this.initCounters();
    }
}

// Export the class - make sure to export the class itself, not an instance
export default Animations;