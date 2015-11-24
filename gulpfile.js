var gulp = require('gulp');
var webserver = require('gulp-webserver');
var mainBowerFiles = require('main-bower-files');

gulp.task('serve', function() {
  gulp.src('')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
      // path : "/src"
    }));
});

gulp.task('bowercopy', function(){
  gulp.src(mainBowerFiles()).pipe(gulp.dest('src/lib'))
});