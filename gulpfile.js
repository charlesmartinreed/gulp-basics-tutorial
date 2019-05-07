const gulp = require("gulp");
const imagemin = require("gulp-image");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const concat = require("gulp-concat");

const { series, parallel } = require("gulp");

// private task = not exported, used internally in series() or parallel() composition

// public task = exported, can be used via gulp command

/* .task(define tasks)
 .src (point to files to use)
  .dest(point to folder to output)
	 .watch(watch files/folders for changes)
*/

/* six ways to signal async completion in Gulp 4+: return a stream, return a promise, return a child process, callback, return an event emitter, return an observable. */

function message(cb) {
  console.log(
    "HTML files successfully copied, images minified, JS compiled/minified, SASS compiled"
  );
  // callback to signal async complete
  cb();
}

// copy all HTML files
function copyHTML(cb) {
  gulp.src("src/*.html").pipe(gulp.dest("dist"));
  cb();
}

// optimize images
function imageMin(cb) {
  gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
  cb();
}

// minify javascript
// combine js files into single, main js file
function minifyAndCompileJS(cb) {
  gulp
    .src("src/js/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
  cb();
}

// compile scss to css, with error handling
function compileStyles(cb) {
  gulp
    .src("src/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
  cb();
}

// setup gulp.watch
function watchFiles() {
  gulp.watch("src/js/*.js", minifyAndCompileJS);
  gulp.watch("src/images/*", imageMin);
  gulp.watch("src/sass/*.scss", compileStyles);
  gulp.watch("src/*.html", copyHTML);
}

const build = gulp.series(minifyAndCompileJS, compileStyles, copyHTML, message);
const watch = gulp.parallel(watchFiles);

exports.build = build;
exports.watch = watch;
exports.default = build;
