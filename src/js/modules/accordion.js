/**
 * Accordion Module
 * Handles the functionality for accordion/collapsible elements
 */

class Accordion {
    /**
     * Constructor
     * @param {string} selector - The accordion container selector
     * @param {Object} options - The options for the accordion
     */
    constructor(selector, options = {}) {
        // Default options
        this.defaults = {
            itemSelector: '.accordion-item',
            headerSelector: '.accordion-header',
            buttonSelector: '.accordion-button',
            contentSelector: '.accordion-collapse',
            activeClass: 'show',
            collapsedClass: 'collapsed',
            singleOpen: true, // Whether only one item can be open at a time
            onToggle: null // Callback function when an item is toggled
        };

        // Merge options with defaults
        this.options = { ...this.defaults, ...options };

        // Find accordion element
        this.accordion = document.querySelector(selector);

        // If accordion doesn't exist, exit
        if (!this.accordion) return;

        // Find accordion items
        this.items = this.accordion.querySelectorAll(this.options.itemSelector);

        // Exit if no items
        if (!this.items.length) return;

        // Bind methods
        this.handleClick = this.handleClick.bind(this);

        // Initialize
        this.init();
    }

    /**
     * Initialize the accordion
     */
    init() {
        // Add click event listeners to all buttons
        this.accordion.querySelectorAll(this.options.buttonSelector).forEach(button => {
            button.addEventListener('click', this.handleClick);
        });
    }

    /**
     * Handle button click
     * @param {Event} e - The click event
     */
    handleClick(e) {
        const button = e.currentTarget;
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        // Find the target content
        const targetId = button.getAttribute('data-bs-target') ||
            button.getAttribute('href') ||
            `#${button.closest(this.options.headerSelector).id}-collapse`;

        const target = document.querySelector(targetId);

        if (!target) return;

        // If single open mode is enabled, close all other items
        if (this.options.singleOpen && !isExpanded) {
            this.closeAll(target);
        }

        // Toggle the clicked accordion item
        this.toggleItem(button, target, !isExpanded);

        // Call onToggle callback if provided
        if (typeof this.options.onToggle === 'function') {
            this.options.onToggle(button, target, !isExpanded);
        }
    }

    /**
     * Toggle an accordion item
     * @param {HTMLElement} button - The button element
     * @param {HTMLElement} content - The content element
     * @param {boolean} open - Whether to open or close the item
     */
    toggleItem(button, content, open) {
        if (open) {
            // Open the item
            button.classList.remove(this.options.collapsedClass);
            button.setAttribute('aria-expanded', 'true');
            content.classList.add(this.options.activeClass);

            // Set explicit display for browsers without CSS transition support
            content.style.display = 'block';
        } else {
            // Close the item
            button.classList.add(this.options.collapsedClass);
            button.setAttribute('aria-expanded', 'false');
            content.classList.remove(this.options.activeClass);

            // Set explicit display for browsers without CSS transition support
            content.style.display = 'none';
        }
    }

    /**
     * Close all accordion items except the specified one
     * @param {HTMLElement} exceptContent - The content element to exclude
     */
    closeAll(exceptContent) {
        this.items.forEach(item => {
            const button = item.querySelector(this.options.buttonSelector);
            const content = item.querySelector(this.options.contentSelector);

            if (content && content !== exceptContent) {
                this.toggleItem(button, content, false);
            }
        });
    }

    /**
     * Open a specific accordion item by index
     * @param {number} index - The index of the item to open
     */
    openItem(index) {
        if (index < 0 || index >= this.items.length) return;

        const item = this.items[index];
        const button = item.querySelector(this.options.buttonSelector);
        const content = item.querySelector(this.options.contentSelector);

        if (button && content) {
            // Close other items if single open mode is enabled
            if (this.options.singleOpen) {
                this.closeAll(content);
            }

            // Open the specified item
            this.toggleItem(button, content, true);
        }
    }

    /**
     * Refresh the accordion (useful after dynamic content changes)
     */
    refresh() {
        // Remove existing event listeners
        this.accordion.querySelectorAll(this.options.buttonSelector).forEach(button => {
            button.removeEventListener('click', this.handleClick);
        });

        // Find accordion items again (in case they changed)
        this.items = this.accordion.querySelectorAll(this.options.itemSelector);

        // Reinitialize
        this.init();
    }

    /**
     * Destroy the accordion (remove event listeners)
     */
    destroy() {
        this.accordion.querySelectorAll(this.options.buttonSelector).forEach(button => {
            button.removeEventListener('click', this.handleClick);
        });
    }
}

export default Accordion;