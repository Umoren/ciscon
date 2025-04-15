#!/bin/bash

# Create main directories
mkdir -p src/scss/{abstracts,base,components,layout,pages}
mkdir -p src/js/{modules,vendors}
mkdir -p src/assets/{images,fonts,icons}
mkdir -p src/templates/{partials,pages}
mkdir -p dist
mkdir -p config

# Create initial SCSS files
touch src/scss/main.scss
touch src/scss/abstracts/_variables.scss
touch src/scss/abstracts/_mixins.scss
touch src/scss/abstracts/_functions.scss
touch src/scss/base/_reset.scss
touch src/scss/base/_typography.scss
touch src/scss/base/_utilities.scss
touch src/scss/components/_buttons.scss
touch src/scss/components/_cards.scss
touch src/scss/components/_navigation.scss
touch src/scss/layout/_header.scss
touch src/scss/layout/_footer.scss
touch src/scss/layout/_grid.scss
touch src/scss/pages/_home.scss
touch src/scss/pages/_services.scss
touch src/scss/pages/_about.scss
touch src/scss/pages/_contact.scss

# Create initial JS files
touch src/js/main.js
touch src/js/modules/navigation.js
touch src/js/modules/slider.js

# Create initial HTML templates
touch src/templates/partials/header.html
touch src/templates/partials/footer.html
touch src/templates/partials/navigation.html
touch src/templates/pages/index.html
touch src/templates/pages/services.html
touch src/templates/pages/about.html
touch src/templates/pages/contact.html

echo "Directory structure created successfully!"