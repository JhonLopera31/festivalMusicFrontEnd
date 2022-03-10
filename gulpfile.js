// Taks in gulp are just functions in JS

/* function task(done) {
    console.log('primera tarea');
    done();
}
exports.nuevatarea = task; //  This way is possible to execute the task 'nuevatarea' from a terminal
 */

//**Firs is necessary to install the dependency gulp-sass */

const { src, dest, watch, parallel } = require('gulp')

//CSS
const sass = require('gulp-sass')(require('sass')) // El doble parentesis es por que gulp - sass requiere de sass para compilar sass, gulp-sass solo permite la conexion
const plumber = require('gulp-plumber');// sirve para poder usar codigo de css dentro de sass
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');

//JS
const terser = require('gulp-terser-js');

// Images
const imageMin = require("gulp-imagemin")
const imageAvif = require('gulp-avif');
const cache = require("gulp-cache")
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const sourcemaps = require('gulp-sourcemaps');

function css(done) {
    console.log('Compilando SASS');

    src('src/scss/**/*.scss') // Identudy scss diles inside the content folder sass 
        .pipe(sourcemaps.init())
        .pipe(plumber()) //allows to use css code in a sass file
        .pipe(sass()) //to compile sass
        .pipe(postcss([autoprefixer(), cssnano()])) // minificar
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))  //starging css file after compile it
    done();
    // cuando finalizo con un pipe() significa que estoy mandando a llamar la siguiente acción
}

function convertTowebp(done) {
    const options = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}') // Inverted commas can give some probles in the recursivity. Please use simple quotation marks
        .pipe(webp(options))
        .pipe(dest('build/img'))
    done();
}

function convertToAvif(done) {
    const options = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}') // Inverted commas can give some probles in the recursivity. Please use simple quotation marks
        .pipe(avif(options))
        .pipe(dest('build/img'))
    done();
}

function optimizationImage(done) {

    const options = {
        optimizationlevel: 3 //check pacgkage for more info
    };

    src('src/img/**/*.{png,jpg}') // Inverted commas can give some probles in the recursivity. Please use simple quotation marks
        .pipe(cache(imageMin(options)))
        .pipe(dest('build/img'))
    done();
}

function javascript(done) {
    src('src/js/**/*.js')
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css) // sensing changes in the .scss files
    watch('src/js/**/*.js', javascript)
    done();
}

exports.css = css;
exports.javascript = javascript;
exports.optimizationImage = optimizationImage;
exports.convertTowebp = convertTowebp;
exports.convertToAvif = convertToAvif;
exports.dev = parallel(convertTowebp, optimizationImage, convertToAvif, javascript, dev); //It this efficient? How many time you need to do this conversion?

