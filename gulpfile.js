var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefix = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    bower = require('gulp-bower');

var config = {
  sassPath: './stylesheets',
  bowerDir: './bower_components'
};

// Task for running bower
gulp.task('bower', function() {
  return bower().pipe(gulp.dest(config.bowerDir));
});
