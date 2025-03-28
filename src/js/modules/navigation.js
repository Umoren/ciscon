/**
 * Navigation Module
 * Handles all navigation related functionality
 */

class Navigation {
    constructor() {
        // Elements
        this.header = document.querySelector('.site-header');
        this.nav = document.querySelector('.site-header-nav');
        this.toggle = document.querySelector('.site-header-toggle');
        this.body = document.body;

        // Bind methods
        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
        this.handleStickyHeader = this.handleStickyHeader.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.closeMenuOnClickOutside = this.closeMenuOnClickOutside.bind(this);
        this.handleDropdowns = this.handleDropdowns.bind(this);

        // Initialize
        this.init();
    }

    /**
     * Initialize the navigation functionality
     */
    init() {
        if (this.toggle) {
            this.toggle.addEventListener('click', this.toggleMobileMenu);
        }

        // Sticky header functionality
        window.addEventListener('scroll', this.handleStickyHeader);

        // Handle window resize
        window.addEventListener('resize', this.handleResize);

        // Close menu when clicking outside
        document.addEventListener('click', this.closeMenuOnClickOutside);

        // Initialize dropdowns
        this.handleDropdowns();

        // Set active menu item based on current page
        this.setActiveMenuItem();
    }

    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        if (this.toggle.classList.contains('active')) {
            this.toggle.classList.remove('active');
            this.nav.classList.remove('active');
            this.body.classList.remove('menu-open');
        } else {
            this.toggle.classList.add('active');
            this.nav.classList.add('active');
            this.body.classList.add('menu-open');
        }
    }

    /**
     * Handle sticky header on scroll
     */
    handleStickyHeader() {
        const scrollPosition = window.scrollY;

        if (this.header) {
            if (scrollPosition > 100) {
                this.header.classList.add('sticky');
                document.body.style.paddingTop = this.header.offsetHeight + 'px';
            } else {
                this.header.classList.remove('sticky');
                document.body.style.paddingTop = 0;
            }
        }

        // Handle transparent header
        if (this.header && this.header.classList.contains('navbar-transparent')) {
            if (scrollPosition > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Reset mobile menu on window resize
        if (window.innerWidth >= 992 && this.nav && this.nav.classList.contains('active')) {
            this.toggle.classList.remove('active');
            this.nav.classList.remove('active');
            this.body.classList.remove('menu-open');
        }
    }

    /**
     * Close menu when clicking outside
     */
    closeMenuOnClickOutside(event) {
        if (
            this.nav &&
            this.nav.classList.contains('active') &&
            !this.nav.contains(event.target) &&
            !this.toggle.contains(event.target)
        ) {
            this.toggle.classList.remove('active');
            this.nav.classList.remove('active');
            this.body.classList.remove('menu-open');
        }
    }

    /**
     * Handle dropdowns
     */
    handleDropdowns() {
        // Add accessibility attributes to dropdown triggers
        const dropdownItems = document.querySelectorAll('.has-dropdown > a');

        dropdownItems.forEach(item => {
            // Add aria attributes
            item.setAttribute('aria-expanded', 'false');
            item.setAttribute('aria-haspopup', 'true');

            // For mobile - prevent default on click to not navigate away when opening dropdown
            item.addEventListener('click', function (e) {
                if (window.innerWidth < 992) {
                    e.preventDefault();

                    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
                    this.setAttribute('aria-expanded', !expanded);

                    const dropdown = this.nextElementSibling;
                    if (dropdown) {
                        dropdown.style.display = expanded ? 'none' : 'block';
                    }
                }
            });
        });
    }

    /**
     * Set active menu item based on current page
     */
    setActiveMenuItem() {
        const currentPath = window.location.pathname;
        const menuItems = document.querySelectorAll('.site-header-nav a');

        menuItems.forEach(item => {
            const href = item.getAttribute('href');

            // Handle home page
            if (currentPath === '/' && href === 'index.html') {
                item.classList.add('active');
                return;
            }

            // Handle other pages
            if (href && currentPath.includes(href) && href !== 'index.html') {
                item.classList.add('active');

                // If it's part of a dropdown, add active class to parent
                const parentLi = item.closest('li');
                if (parentLi && parentLi.parentElement.classList.contains('dropdown')) {
                    const parentDropdown = parentLi.parentElement.previousElementSibling;
                    if (parentDropdown) {
                        parentDropdown.classList.add('active');
                    }
                }
            }
        });
    }
}

// Initialize navigation
const navigation = new Navigation();

export default navigation;