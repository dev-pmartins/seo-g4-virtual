var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imageop = require('gulp-image-optimization');

// Diretorios e arquivos
var paths = {

	scss : {

		src : 'assets/scss/**/*.scss',
		dest : 'assets/scss/',

	},

	css : {

		src : 'assets/css/**/*.css',
		dest : 'assets/css/',

	},

	js 	: {

		src : 'assets/js/**/*.js',
		dest : 'assets/js/',

	},

	images : {

		src : ['assets/images/**/*.png','assets/images/**/*.jpg','assets/images/**/*.gif','assets/images/**/*.jpeg'],
		dest : 'assets/images/',

	},

	// icons : {

	// 	src : 'assets/icons/',
	// 	dest : 'assets/icons/'

	// }	

};

// Organização de tasks
var options = {

	build : { 
	
		tasks 	: 	['minify-css', 'images', 'uglify']
	
	},
	
	watch : {
	
		tasks 	: 	['sass:watch', 'css:watch']
	
	},

};

// Tasks

gulp.task('sass', function () {
  gulp.src(paths.scss.src)
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(paths.css.dest));
});
 
gulp.task('sass:watch', function () {
  gulp.watch(paths.scss.src, ['sass']);
});
	
gulp.task('minify-css', function() {
  return gulp.src(paths.css.src)
    .pipe(sourcemaps.init())
    .pipe(minifyCss())
    .pipe(sourcemaps.write('./'))
    .pipe(rename('style-minify.css'))
    .pipe(gulp.dest(paths.css.dest));
});

gulp.task('images', function(cb) {
    gulp.src(paths.images.src)
    .pipe(imageop({
        optimizationLevel: 10,
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest(paths.images.dest)).on('end', cb).on('error', cb);
});

gulp.task('uglify', function(){
    return gulp.src(paths.js.src)
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(rename('uglify.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.js.dest));
});

gulp.task('autoprefixer', function() {
    return gulp.src(paths.css.src)
    	.pipe(autoprefixer({
    	    browsers: ['last 2 versions', '> 0%'], //'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
    	    cascade: false
    	}))
    	.pipe(gulp.dest(paths.css.dest));
});

gulp.task('css:watch', function() {
    gulp.watch(paths.css.src, ['autoprefixer']);
});



// Tasks para utilizar

gulp.task( 'build', function() {

  options.build.tasks.forEach( function( task ) {
    gulp.start( task );

  });

});

gulp.task( 'watch', function() {

  options.watch.tasks.forEach( function( task ) {
    gulp.start( task );

  });

});

// Executa builds
gulp.task('default', ['build'], function() {
    
});