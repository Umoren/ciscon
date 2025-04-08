# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Development: `npm run dev` - Starts development server with live reload
- Production build: `npm run build` - Creates optimized files in dist/ directory
- Clean: `gulp clean` - Removes the dist/ directory
- Individual tasks: `gulp styles`, `gulp html`, `gulp scriptModules`, `gulp scriptMain`, etc.

## Code Style Guidelines

### HTML/Templates
- Use Nunjucks template syntax for HTML
- Extend base templates from partials (e.g., `{% extends "partials/layout.html" %}`)
- Use proper indentation (2 spaces)
- Follow _service_layout.html pattern for service pages

### JavaScript
- Use ES modules with import/export syntax
- Follow camelCase naming convention for variables and functions
- Implement proper error handling with try/catch blocks
- Use JSDoc comments for function documentation
- Initialize modules in main.js

### SCSS
- Follow the 7-1 architecture pattern
- Use lowercase with hyphens for naming (kebab-case)
- Import all files through main.scss
- Use nesting for component styles (max 3 levels deep)
- Use variables from _variables.scss for colors and spacing


When you creating a services page, ensure you take full account of everything including the styling        │
│   (_services.scss), the header and footer and wherever it's referenced. make sure they're no path issues or it's    │
│   breaking. Also make space for atleast 3-4 images.

Don't create any page until i give you the content, instructions and approve it!!!!