
var gulp = require('gulp');
var rename = require('gulp-rename');
var specGraph = require('./index.js');

gulp.task('default', function() {
  gulp.src('./test/test.css')
    .pipe(specGraph())
    .pipe(rename('results.json'))
    .pipe(gulp.dest('./test'));
});

