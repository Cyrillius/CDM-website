var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 5000,
    less = require('gulp-less'),
    path = require('path'),
    minifyCSS = require('gulp-minify-css');
    concatCSS = require('gulp-concat-css');

// Set up an express server (but not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
    res.sendFile('index.html', { root: 'dist' });
});

// JSHint task
gulp.task('lint', function() {
  gulp.src('./app/scripts/*.js')
  .pipe(jshint())
  // You can look into pretty reporters as well, but that's another story
  .pipe(jshint.reporter('default'));
});

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
  gulp.src(['app/scripts/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('dist/js'));
});

//Less task
gulp.task('less', function () {
  gulp.src('app/styles/style.less')
  .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
  }))
  .pipe(minifyCSS())
  .pipe(concatCSS("bundle.css"))
  .pipe(gulp.dest('dist/css'));
});

// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('app/index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('dist/'));

  // Add templates
  gulp.src('./app/templates/**/*')
  .pipe(gulp.dest('dist/templates/'));

  gulp.src('./app/articles/**/templates/*.html')
  .pipe(gulp.dest('dist/templates/'));

  // Add images
  gulp.src(['app/images/**/*.jpg','app/images/**/*.png'])
  .pipe(gulp.dest('dist/images/'));
  gulp.src(['app/articles/**/images/*.jpg','app/articles/**/images/*.png'])
  .pipe(gulp.dest('dist/images/'));

  // Add fonts
  gulp.src('./app/fonts/**/*')
  // Will be put in the dist/views folder
  .pipe(gulp.dest('dist/fonts/'))
  .pipe(refresh(lrserver)); // Tell the lrserver to refresh
});


// Watch task
gulp.task('watch', ['lint'], function() {
  // Watch our scripts
  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'],[
    'lint',
    'browserify'
  ]);
  gulp.watch(['app/styles/*.less', 'app/styles/**/*.less'],[
    'less'
  ]);
  gulp.watch(['app/index.html', 'app/templates/**/*.html','app/images/**/*.jpg','app/images/**/*.png'], [
    'views'
  ]);
});

// Dev task
gulp.task('dev', function() {
  // Start webserver
  server.listen(serverport);
  // Start live reload
  lrserver.listen(livereloadport);
  // Run the watch task, to keep taps on changes
  gulp.run('watch');
});

