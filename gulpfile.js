var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoPrefix = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    bower = require('gulp-bower');

var config = {
  sassPath: './src/sass',
  cssPath: './src/css',
  bowerDir: './bower_components'
};


// Run default Gulp task, which is executed when running the 'gulp' command from the node console.
gulp.task('default', ['bower', 'icons', 'css']);

// Task for running bower
gulp.task('bower', function() {
  return bower().pipe(gulp.dest(config.bowerDir));
});

// Move fontawesome fonts into src (public-facing website) directory
gulp.task('icons', function() {
	return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
		.pipe(gulp.dest('./src/fonts'));
});

// Setup sass. Link Bootstrap and FontAwesome into our path so our sass files can access them.
// This task handles the sass loadPath, which tells gulp-ruby-sass all the location it should look for files.
// The .on("error") uses the notify plugin to alert something failed in the build.
// The autoPrefix just automatically inserts CSS vendor prefixes into styles.
gulp.task('css', function() {
	return gulp.src(config.sassPath + '/style.scss')
		.pipe(sass({
			style: 'compressed',
			loadPath: [
				config.sassPath,
				config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
				config.bowerDir + '/fontawesome/scss'
				]
			})
			.on("error", notify.onError(function(error) {
				return "Error: " + error.message;
			})
		))
		.pipe(autoPrefix('last 2 version'))
		.pipe(gulp.dest(config.cssPath));
		
});

// Setup "watch" files/folders - which reruns the 'css' task when a file in the sass folder changes.
gulp.task('watch', function() {
	gulp.watch(config.sassPath + '**/*.scss', ['css']);
});
