/* gulpfile.js */
'use strict';

// define gulp packages
var gulp = require('gulp'),
    gulpif = require('gulp-if'),
	sass = require('gulp-sass'),
	sourceMaps = require('gulp-sourcemaps'),
	autoPrefixer = require('gulp-autoprefixer'),
	cssNano = require('gulp-cssnano'),
	browserSync = require('browser-sync');

// project variables
var config = {
	sassLib: 'bower_components',
	autoPrefixer: {
		browsers: ['last 2 versions', 'ie 9'],
		cascade: false
	},
    build: false
}

// Compile CSS
gulp.task('compile-css', function() {
	return gulp.src('sass/style.scss')
		.pipe(gulpif(!config.build, sourceMaps.init())) // process original sources
			.pipe(sass({
				includePaths: config.sassLib
			})) // Compile Sass
			.pipe(autoPrefixer(config.autoPrefixer)) // add vendor prefixes
			.pipe(gulpif(config.build, cssNano())) // make it small
		.pipe(gulpif(!config.build, sourceMaps.write())) // write source mapping
		// Output to 'css' folder
		.pipe(gulp.dest('stylesheets'))
		// Reload the browser CSS after every change
    	.pipe(browserSync.reload({stream:true}));
});

/* Reload task */
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function() {
    browserSync.init(['_site/stylesheets/*.css'], {
    	proxy: 'localhost:4000'
    });
});

// make 'watch' the default task
gulp.task('default', ['compile-css', 'browser-sync'], function () {
	gulp.watch(['sass/**/**'], ['compile-css'])
	 /* Watch .html files, run the bs-reload task on change. */
    gulp.watch(['_site/*.html'], ['bs-reload']);
});

/* 
    Prepend your build command with 'production' to set production conditions 
    e.g. 'gulp production build' vs 'gulp build'
*/
gulp.task('production', function () {
    config.build = true;
});