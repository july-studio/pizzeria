# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

La Casita Italiana is a static website for a pizza restaurant in Ibiza. The project is a front-end only site built with HTML, SCSS, and JavaScript, focused on presenting the restaurant's menu, story, and contact information.

## Technology Stack

- **HTML5**: Single page application ([index.html](index.html))
- **SCSS/Sass**: Modular stylesheet architecture
- **JavaScript**: Minimal client-side scripting ([script.js](script.js))
- **Live Server**: Development server with live reload
- **PostCSS/Autoprefixer**: CSS vendor prefixing for browser compatibility

## Development Commands

### Start Development Server
```bash
npm start
```
Runs both the live server and Sass watcher in parallel. The site will be available at `http://localhost:8080` (default) and automatically reload on file changes.

### Watch Sass Files
```bash
npm run watch:sass
```
Compiles [sass/main.scss](sass/main.scss) to `css/style.css` and watches for changes.

### Run Dev Server Only
```bash
npm run devserver
```
Starts live-server without Sass compilation.

### Build for Production
```bash
npm run build:css
```
This runs a complete build pipeline:
1. Compiles Sass to CSS (`compile:sass`)
2. Concatenates CSS files (`concat:css`)
3. Adds vendor prefixes (`prefix:css`)
4. Compresses/minifies CSS (`compress:css`)

Individual build steps:
- `npm run compile:sass` - Compile Sass to CSS
- `npm run concat:css` - Concatenate CSS files
- `npm run prefix:css` - Add vendor prefixes with PostCSS
- `npm run compress:css` - Minify CSS

## SCSS Architecture

The project follows a 7-1 SCSS architecture pattern with all partials imported through [sass/main.scss](sass/main.scss):

### Structure
```
sass/
├── abstracts/          # Variables, functions, mixins
│   ├── _functions.scss
│   ├── _mixins.scss
│   └── _variables.scss
├── base/               # Base styles, resets, typography
│   ├── _animations.scss
│   ├── _base.scss
│   ├── _typography.scss
│   └── _utilities.scss
├── components/         # Reusable components
│   └── _buttons.scss
├── layout/             # Layout components
│   ├── _footer.scss
│   ├── _grid.scss
│   ├── _header.scss
│   └── _navigation.scss
└── pages/              # Page-specific styles
    └── _home.scss
```

### Import Order
The [sass/main.scss](sass/main.scss) file imports partials in this specific order:
1. Abstracts (functions, mixins, variables)
2. Base styles (animations, base, typography, utilities)
3. Components (buttons, etc.)
4. Layout (footer, grid, header, navigation)
5. Pages (home)

When adding new styles, follow this architecture and import order.

## File Structure

- [index.html](index.html) - Main HTML file with semantic structure
- [script.js](script.js) - Client-side JavaScript (currently minimal)
- `sass/` - All SCSS source files
- `css/` - Compiled CSS output (do not edit directly)
- `img/` - Images with WebP optimization and 2x retina versions
- `fonts/` - Montserrat font family (weights: 300, regular, italic, 500, 600)

## Content Sections

The site is organized into these main sections:
1. **Header** - Logo and language switcher (IT/EN/ES)
2. **Hero** - Main landing section with restaurant name
3. **Story** - "Cucina Autentica" section with restaurant story
4. **Menu** - Pizza menu grid
5. **Footer** - Contact and additional information

## Working with Images

Images use responsive formats with WebP optimization:
- Primary format: WebP with 1x and 2x versions
- Fallback: PNG/JPG with 1x and 2x versions
- Use `<picture>` elements with `<source>` for WebP and `srcset` for retina displays

Example pattern from the header:
```html
<picture>
  <source srcset="img/header-logo.webp 1x, img/header-logo@2x.webp 2x" type="image/webp">
  <img src="img/header-logo.png" srcset="img/header-logo.png 1x, img/header-logo@2x.png 2x" alt="Logo">
</picture>
```

## Browser Support

The project uses Autoprefixer to ensure cross-browser compatibility. The browserslist configuration is managed through [package.json](package.json) defaults.

## Important Notes

- The compiled CSS in `css/` directory should not be edited directly - always modify SCSS source files
- Run `npm run build:css` before deploying to production
- The project uses semantic HTML5 structure with accessibility considerations (aria-labels on buttons)
- Multi-language support is implemented via language switcher buttons but requires JavaScript implementation
