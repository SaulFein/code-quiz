'use strict';

const gulp = require('gulp');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const mocha = require('gulp-mocha');

let paths = ['*.js', 'config/*.js', 'lib/*.js', 'models/*.js', 'routes/*.js', 'test/*.js'];

gulp.task('lint', function() {
  return gulp.src(paths)
    .pipe(jshint({
      "bitwise": true,
      "curly": true,
      "eqeqeq": true,
      "esversion": 6,
      "forin": true,
      "freeze": true,
      "noarg": true,
      "noempty": true,
      "nonbsp": true,
      "strict": true,
      "undef": true,
      "unused": true,
      "mocha": true,
      "node": true
    }))
    .pipe(jshint.reporter(stylish));
});

gulp.task('mocha', function() {
  return gulp.src('test/*.js', {read: false})
    .pipe(mocha());
});

gulp.task('default', ['lint', 'mocha']);

var watcher = gulp.watch(paths, ['lint', 'mocha']);

watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
