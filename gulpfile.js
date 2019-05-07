const gulp = require("gulp");
const { series } = require("gulp");

// private task = not exported, used internally in series() or parallel() composition

// public task = exported, can be used via gulp command

/* .task(define tasks)
 .src (point to files to use)
  .dest(point to folder to output)
	 .watch(watch files/folders for changes)
*/

/* six ways to signal async completion in Gulp 4+: return a stream, return a promise, return a child process, callback, return an event emitter, return an observable. */

function message(cb) {
  console.log("HTML files successfully copied");
  // callback to signal async complete
  cb();
}

// copy all HTML files
function copyHTML(cb) {
  gulp.src("src/*.html").pipe(gulp.dest("dist"));
  cb();
}

exports.message = message;
exports.default = series(copyHTML, message);
