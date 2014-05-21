var gulp = require('gulp');

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname;
var LIVERELOAD_PORT = 35729;

// Let's make things more readable by
// encapsulating each part's setup
// in its own method
function startExpress() {

  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(EXPRESS_ROOT));
  app.listen(EXPRESS_PORT);
}

// We'll need a reference to the tinylr
// object to send notifications of file changes
// further down
var lr;
function startLivereload() {

  lr = require('tiny-lr')();
  lr.listen(LIVERELOAD_PORT);
}

// Notifies livereload of changes detected
// by `gulp.watch()`
function notifyLivereload(event) {
  // `gulp.watch()` events provide an absolute path
  // so we need to make it relative to the server root
  var fileName = require('path').relative(EXPRESS_ROOT, event.path);
    console.log('livereload: ' + fileName);

  lr.changed({
    body: {
      files: [fileName]
    }
  });
}

// Default task that will be run
// when no parameter is provided
// to gulp
gulp.task('default', function () {

  startExpress();
  startLivereload();
  gulp.watch(['public/**/*.html', 'public/**/*.js', 'public/**/*.css'], notifyLivereload);
  console.log('Server started on port: ' + EXPRESS_PORT + ' with livereload on port: ' + 35729);
});