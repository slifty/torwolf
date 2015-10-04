var mocha = require('gulp-mocha');
var coverage = require('gulp-coverage');
var gulp = require('gulp');

gulp.task('test', function () {
    return gulp.src('test/**/*Test.js', {read: false})
        .pipe(mocha())
        .once('error', function (error) {
            console.log(error);
            process.exit(1);
        })
        .once('end', function () {
            process.exit();
        });
});

gulp.task('coverage', function () {
    return gulp.src('test/**/*Test.js', {read: false})
	    .pipe(coverage.instrument({
	        pattern: ['app/**/*.js'],
	        debugDirectory: 'debug'
	    }))
	    .pipe(mocha())
	    .pipe(coverage.gather())
	    .pipe(coverage.format())
	    .pipe(gulp.dest('reports'));
});