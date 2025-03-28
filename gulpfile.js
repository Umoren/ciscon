const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const del = require('del');
const nunjucksRender = require('gulp-nunjucks-render');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');

// File paths
const paths = {
    scss: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css',
        main: 'src/scss/main.scss'
    },
    js: {
        src: 'src/js/**/*.js',
        dest: 'dist/js',
        main: 'src/js/main.js'
    },
    html: {
        src: 'src/templates/pages/**/*.html',
        watch: 'src/templates/**/*.html',
        dest: 'dist'
    },
    assets: {
        images: {
            src: 'src/assets/images/**/*',
            dest: 'dist/assets/images'
        },
        fonts: {
            src: 'src/assets/fonts/**/*',
            dest: 'dist/assets/fonts'
        },
        icons: {
            src: 'src/assets/icons/**/*',
            dest: 'dist/assets/icons'
        }
    }
};

// Clean dist directory
function clean() {
    return del(['dist']);
}

// Process SCSS files
function styles() {
    return gulp.src(paths.scss.main)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(browserSync.stream());
}

// Process JavaScript files
function scripts() {
    return gulp.src(paths.js.src)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(terser())
        .pipe(concat('main.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browserSync.stream());
}

// Process HTML templates
function html() {
    return gulp.src(paths.html.src)
        .pipe(nunjucksRender({
            path: ['src/templates']
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
}

// Optimize images
function images() {
    return gulp.src(paths.assets.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.assets.images.dest));
}

// Copy fonts
function fonts() {
    return gulp.src(paths.assets.fonts.src)
        .pipe(gulp.dest(paths.assets.fonts.dest));
}

// Copy icons
function icons() {
    return gulp.src(paths.assets.icons.src)
        .pipe(gulp.dest(paths.assets.icons.dest));
}

// Watch for changes
function watch() {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        open: true
    });

    gulp.watch(paths.scss.src, styles);
    gulp.watch(paths.js.src, scripts);
    gulp.watch(paths.html.watch, html);
    gulp.watch(paths.assets.images.src, images);
    gulp.watch(paths.assets.fonts.src, fonts);
    gulp.watch(paths.assets.icons.src, icons);
}

// Development task
const dev = gulp.series(clean, gulp.parallel(styles, scripts, html, images, fonts, icons), watch);

// Build task
const build = gulp.series(clean, gulp.parallel(styles, scripts, html, images, fonts, icons));

// Export tasks
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.images = images;
exports.fonts = fonts;
exports.icons = icons;
exports.watch = watch;
exports.dev = dev;
exports.build = build;
exports.default = dev;