var gulp = require('gulp');
	uglify = require('gulp-uglify');
	watch = require('gulp-watch');
	concat = require('gulp-concat');
	minifycss = require('gulp-minify-css');
	copy = require('gulp-copy');
	connect = require('gulp-connect-php');
	livereload = require('gulp-livereload');
	imagemin = require('gulp-imagemin');

var outputDir = './dist/';

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
  .pipe(concat('all.min.js'))
  .pipe(gulp.dest(outputDir))
  .pipe(livereload()); 
});


gulp.task('fonts', function() { 
	return gulp.src('./src/fonts/**/*.*', {base: 'src/'})
  	.pipe(gulp.dest(outputDir))
  	.pipe(livereload());
});

gulp.task('img', function() { 
	return gulp.src('./src/img/**/*.*', {base: './src/'})
	.pipe(imagemin({ progressive: true }))
  	.pipe(gulp.dest(outputDir))
  	.pipe(livereload());
});

gulp.task('css', function() {
	return gulp.src('./src/css/*.css')
	.pipe(concat('all.min.css'))
	.pipe(minifycss({keepBreaks: true}))
	.pipe(gulp.dest(outputDir))
	.pipe(livereload());
});

gulp.task('html', function() {
	return gulp.src('./*.html')
	.pipe(copy(outputDir))
	.pipe(livereload());
});

gulp.task('php', function() {
	return gulp.src('./*.php')
	.pipe(copy(outputDir))
	.pipe(livereload());
});

gulp.task('connect', function() {
  connect.server({
    hostname: '0.0.0.0',
    bin: 'C:/php/php.exe',
    ini: 'C:/php/php.ini',
    port: 8000,
    base: outputDir,
    livereload: true
 	});
 });

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch('src/css/*.css', ['css', 'img']);
	gulp.watch('src/js/*.js', ['js']);
	gulp.watch('*.html', ['html', 'img']);
	gulp.watch('*.php', ['php', 'img']);
	gulp.watch('*.jpg', ['img']);
});
	
gulp.task('default', ['html', 'php', 'css', 'fonts', 'img', 'js', 'connect', 'watch']);