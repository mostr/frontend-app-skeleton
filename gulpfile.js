var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var url = require('url');
var proxy = require('proxy-middleware');

var ENTRY_POINT = './src/index.js';

var proxyOptions = url.parse('http://localhost:8888/api');
proxyOptions.route = '/api';

var bsDevOpts = {
  files: ['index.html', 'dist/**/*.js', 'css/**/*.css'],
  server: { 
    baseDir: ['./', 'dist/'],
    middleware: [proxy(proxyOptions)]
  }
};

gulp.task('watch', function() {
  watchify.args.fullPaths = false;  // don't use abs paths in bundle
  var bundler = watchify(browserify(ENTRY_POINT, watchify.args));
  // bundler.transform('brfs');

  bundler.on('update', rebundle);

  function rebundle() {
    return bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./dist'));
  }

  browserSync(bsDevOpts);

  return rebundle();
});