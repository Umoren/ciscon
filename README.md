# Ciscon Nigeria Website

Modern professional website for Ciscon Nigeria Limited.

## Project Overview

This project is a complete rebuild of the Ciscon Nigeria Limited website, featuring:

- Modern responsive design that works on all devices
- Client-side routing for a smooth, app-like experience
- Animated transitions and scroll effects
- Optimized performance with bundled and minified assets
- Clean, maintainable code structure
- SEO-friendly static HTML output

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd ciscon-website

# Install dependencies
npm install

# Create the directory structure
chmod +x setup-directories.sh
./setup-directories.sh

# Create placeholder images (development only)
chmod +x create-placeholder-images.sh
./create-placeholder-images.sh
```

### Development

```bash
# Start development server with live reload
npm run dev
```

The development server will start, and your browser will automatically open to `http://localhost:3000` (or another port if 3000 is in use).

### Build for Production

```bash
# Create production-ready files
npm run build
```

The production-ready files will be in the `dist` directory, ready to be uploaded to your hosting provider.

## Project Structure

```
ciscon-website/
├── src/                    # Source files
│   ├── scss/               # SCSS files
│   │   ├── abstracts/      # Variables, mixins, functions
│   │   ├── base/           # Reset, typography, utilities
│   │   ├── components/     # Buttons, cards, navigation
│   │   ├── layout/         # Header, footer, grid systems
│   │   ├── pages/          # Page-specific styles
│   │   └── main.scss       # Main file that imports all others
│   ├── js/
│   │   ├── modules/        # Modular JS functionality
│   │   │   ├── animations.js  # Scroll animations
│   │   │   ├── navigation.js  # Navigation functionality
│   │   │   ├── router.js      # Client-side routing
│   │   │   └── slider.js      # Slider components
│   │   └── main.js         # Entry point
│   ├── assets/
│   │   ├── images/         # Images
│   │   ├── fonts/          # Custom fonts
│   │   └── icons/          # SVG icons, favicons
│   └── templates/          # HTML templates
│       ├── partials/       # Reusable HTML components
│       │   ├── header.html
│       │   ├── footer.html
│       │   └── ...
│       └── pages/          # Page templates
│           ├── index.html
│           ├── services.html
│           └── ...
├── dist/                   # Compiled, production-ready files
├── .gitignore
├── package.json
├── README.md               # Documentation
└── gulpfile.js             # Build system
```

## Features

### Client-Side Routing

The website uses a custom client-side router built with the History API to provide a smooth, app-like experience without full page reloads. Key features include:

- Smooth page transitions
- Prefetching on hover for instant navigation
- Content caching to minimize repeat downloads
- Preserves browser history and direct URL access

### Animations

The website incorporates several types of animations:

- Page transition animations
- Scroll-triggered animations using AOS (Animate On Scroll)
- Counter animations for statistics
- Hover effects for interactive elements

### Responsive Design

The website is fully responsive and works on all device sizes:

- Mobile-first approach
- Flexible grid system
- Responsive typography
- Optimized images

## Customization

### Changing Colors

The main color scheme is defined in `src/scss/abstracts/_variables.scss`. You can modify the following variables to change the color scheme:

```scss
$color-primary: #f97116;    // Orange
$color-secondary: #023f88;  // Deep blue
$color-tertiary: #0a2540;   // Dark blue for text
```

### Adding Pages

To add a new page:

1. Create a new HTML file in `src/templates/pages/`
2. Extend the layout template: `{% extends "partials/layout.html" %}`
3. Add your content within the content block: `{% block content %}{% endblock %}`
4. Add page-specific styles in `src/scss/pages/`

## Deployment

To deploy the website to iPage hosting:

1. Build the production files: `npm run build`
2. Upload the contents of the `dist` directory to your iPage hosting via FTP or their file manager
3. Ensure that all files and directories are uploaded correctly

## Browser Support

This website is built to support modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
- iOS Safari (latest)
- Android Chrome (latest)

## License

This project is private and proprietary to Ciscon Nigeria Limited.