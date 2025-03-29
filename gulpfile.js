// Convert gulpfile.js to use ES modules
import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import babel from 'gulp-babel';
import terser from 'gulp-terser';
import concat from 'gulp-concat';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
const bs = browserSync.create();
import del from 'del';
import nunjucksRender from 'gulp-nunjucks-render';
import sourcemaps from 'gulp-sourcemaps';
import htmlmin from 'gulp-htmlmin';
import rename from 'gulp-rename';

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
        .pipe(bs.stream());
}

// Process JavaScript module files - preserve ES module structure
function scriptModules() {
    return gulp.src('src/js/modules/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [['@babel/env', { modules: false }]] // Preserve ES modules
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js/modules'))
        .pipe(bs.stream());
}

// Process main JavaScript file - preserve ES module imports
function scriptMain() {
    return gulp.src(paths.js.main)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [['@babel/env', { modules: false }]] // Preserve ES modules
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(bs.stream());
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
        .pipe(bs.stream());
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
    bs.init({
        server: {
            baseDir: './dist'
        },
        open: true
    });

    gulp.watch(paths.scss.src, styles);
    gulp.watch('src/js/modules/*.js', scriptModules);
    gulp.watch(paths.js.main, scriptMain);
    gulp.watch(paths.html.watch, html);
    gulp.watch(paths.assets.images.src, images);
    gulp.watch(paths.assets.fonts.src, fonts);
    gulp.watch(paths.assets.icons.src, icons);
}

// Development task
const dev = gulp.series(clean, gulp.parallel(styles, scriptModules, scriptMain, html, images, fonts, icons), watch);

// Build task
const build = gulp.series(clean, gulp.parallel(styles, scriptModules, scriptMain, html, images, fonts, icons));

// Export tasks
export {
    clean,
    styles,
    scriptModules,
    scriptMain,
    html,
    images,
    fonts,
    icons,
    watch,
    dev,
    build
};

export default dev;