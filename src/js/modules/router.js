/**
 * Router Module
 * A lightweight client-side router using the History API
 * Provides SPA-like experience with smooth transitions between pages
 */

class Router {
    constructor(options = {}) {
        // Default options
        this.options = {
            linkSelector: 'a:not([target="_blank"]):not([href^="http"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"]):not([data-no-route])',
            animationDuration: 300,
            loadingClass: 'page-loading',
            activeClass: 'active',
            pageCache: {},
            onBeforePageLoad: null,
            onAfterPageLoad: null,
            ...options
        };

        // DOM elements
        this.body = document.body;
        this.contentContainer = document.getElementById('main-content');

        if (!this.contentContainer) {
            console.error('Router: No content container with id "main-content" found.');
            return;
        }

        // State
        this.isTransitioning = false;
        this.currentPath = window.location.pathname;

        // Initialize
        this.init();
    }

    /**
     * Initialize the router
     */
    init() {
        // Listen for link clicks
        document.addEventListener('click', this.handleLinkClick.bind(this));

        // Listen for popstate events (browser back/forward)
        window.addEventListener('popstate', this.handlePopState.bind(this));

        // Cache the initial page
        this.cacheCurrentPage();

        // Set active links for current page
        this.updateActiveLinks();
    }

    /**
     * Handle link clicks
     * @param {Event} e - Click event
     */
    handleLinkClick(e) {
        // Find if the clicked element is a link or within a link
        const link = e.target.closest(this.options.linkSelector);

        if (!link) return;

        // Don't handle if modifier keys are pressed
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        // Get the URL from the link
        const href = link.getAttribute('href');

        // Skip if this is a hash link on the current page
        if (href.startsWith('#') || href === '') return;

        // Only handle relative URLs
        if (href.startsWith('http') || href.startsWith('//')) return;

        // Prevent default link behavior
        e.preventDefault();

        // Navigate to the new page
        this.navigateTo(href);
    }

    /**
     * Handle browser back/forward navigation
     * @param {Event} e - Popstate event
     */
    handlePopState(e) {
        if (e.state && e.state.path) {
            this.navigateTo(e.state.path, false);
        }
    }

    /**
     * Navigate to a new page
     * @param {string} path - The path to navigate to
     * @param {boolean} pushState - Whether to push a new browser history state
     */
    async navigateTo(path, pushState = true) {
        // Don't navigate if we're already on this page
        if (this.currentPath === path) return;

        // Don't navigate if a transition is in progress
        if (this.isTransitioning) return;

        // Set transitioning flag
        this.isTransitioning = true;

        // Add loading class to body
        this.body.classList.add(this.options.loadingClass);

        // Call the before load callback if provided
        if (typeof this.options.onBeforePageLoad === 'function') {
            this.options.onBeforePageLoad(this.currentPath, path);
        }

        try {
            // Get the page content
            const pageContent = await this.getPage(path);

            // Fade out current content
            this.fadeOut(this.contentContainer, async () => {
                // Update the content container with new content
                this.updateContent(pageContent);

                // Update the browser history
                if (pushState) {
                    window.history.pushState({ path }, '', path);
                }

                // Update the current path
                this.currentPath = path;

                // Update active links
                this.updateActiveLinks();

                // Fade in new content
                this.fadeIn(this.contentContainer, () => {
                    // Reset transitioning flag
                    this.isTransitioning = false;

                    // Remove loading class from body
                    this.body.classList.remove(this.options.loadingClass);

                    // Call the after load callback if provided
                    if (typeof this.options.onAfterPageLoad === 'function') {
                        this.options.onAfterPageLoad(path);
                    }
                });
            });
        } catch (error) {
            console.error('Router: Navigation error:', error);

            // Fallback to traditional navigation on error
            window.location.href = path;
        }
    }

    /**
     * Get page content, either from cache or by fetching it
     * @param {string} path - The path to get
     * @returns {Promise<string>} - The page content
     */
    async getPage(path) {
        // Check if the page is in cache
        if (this.options.pageCache[path]) {
            return this.options.pageCache[path];
        }

        // Fetch the page
        try {
            const response = await fetch(path);

            if (!response.ok) {
                throw new Error(`Failed to fetch page: ${response.status} ${response.statusText}`);
            }

            const html = await response.text();

            // Extract the content container from the fetched HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const content = doc.getElementById('main-content').innerHTML;

            // Cache the content
            this.options.pageCache[path] = content;

            return content;
        } catch (error) {
            console.error('Router: Fetch error:', error);
            throw error;
        }
    }

    /**
     * Update the content container with new content
     * @param {string} content - The new content
     */
    updateContent(content) {
        // Update the content container
        this.contentContainer.innerHTML = content;

        // Run scripts in the new content
        this.executeScripts(this.contentContainer);
    }

    /**
     * Execute scripts in the new content
     * @param {HTMLElement} container - The content container
     */
    executeScripts(container) {
        // Find all script tags in the new content
        const scripts = container.querySelectorAll('script');

        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');

            // Copy all attributes
            Array.from(oldScript.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });

            // Copy the script content
            newScript.textContent = oldScript.textContent;

            // Replace the old script with the new one
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }

    /**
     * Update active links based on current path
     */
    updateActiveLinks() {
        // Remove active class from all links
        document.querySelectorAll(this.options.linkSelector).forEach(link => {
            link.classList.remove(this.options.activeClass);
        });

        // Add active class to links matching the current path
        document.querySelectorAll(`${this.options.linkSelector}[href="${this.currentPath}"]`).forEach(link => {
            link.classList.add(this.options.activeClass);
        });
    }

    /**
     * Cache the current page
     */
    cacheCurrentPage() {
        // Get the current content
        const content = this.contentContainer.innerHTML;

        // Cache it
        this.options.pageCache[this.currentPath] = content;
    }

    /**
     * Fade out an element
     * @param {HTMLElement} element - The element to fade out
     * @param {Function} callback - Callback to run after fade out
     */
    fadeOut(element, callback) {
        element.style.opacity = '1';

        // Trigger a reflow to ensure the initial opacity is applied
        void element.offsetWidth;

        element.style.transition = `opacity ${this.options.animationDuration}ms ease`;
        element.style.opacity = '0';

        setTimeout(() => {
            if (typeof callback === 'function') {
                callback();
            }
        }, this.options.animationDuration);
    }

    /**
     * Fade in an element
     * @param {HTMLElement} element - The element to fade in
     * @param {Function} callback - Callback to run after fade in
     */
    fadeIn(element, callback) {
        element.style.opacity = '0';

        // Trigger a reflow to ensure the initial opacity is applied
        void element.offsetWidth;

        element.style.transition = `opacity ${this.options.animationDuration}ms ease`;
        element.style.opacity = '1';

        setTimeout(() => {
            if (typeof callback === 'function') {
                callback();
            }
        }, this.options.animationDuration);
    }

    /**
     * Prefetch pages for faster navigation
     * @param {string[]} paths - Array of paths to prefetch
     */
    prefetchPages(paths) {
        if (!Array.isArray(paths)) return;

        paths.forEach(path => {
            // Only prefetch if not already in cache
            if (!this.options.pageCache[path]) {
                // Use a low-priority fetch to not impact current page performance
                const prefetchPromise = fetch(path, { priority: 'low' })
                    .then(response => response.text())
                    .then(html => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const content = doc.getElementById('main-content').innerHTML;

                        // Cache the content
                        this.options.pageCache[path] = content;
                    })
                    .catch(error => {
                        console.warn(`Router: Failed to prefetch ${path}:`, error);
                    });
            }
        });
    }

    /**
     * Prefetch pages on link hover for instant navigation
     */
    enablePrefetchOnHover() {
        document.addEventListener('mouseover', e => {
            const link = e.target.closest(this.options.linkSelector);

            if (!link) return;

            const href = link.getAttribute('href');

            // Skip if this is a hash link, external link, etc.
            if (
                !href ||
                href.startsWith('#') ||
                href.startsWith('http') ||
                href.startsWith('//') ||
                href.startsWith('mailto:') ||
                href.startsWith('tel:')
            ) {
                return;
            }

            // Prefetch this page if not already in cache
            if (!this.options.pageCache[href]) {
                this.prefetchPages([href]);
            }
        });
    }
}

export default Router;