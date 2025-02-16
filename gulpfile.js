/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');


//task which copy the swagger json in dist directory
gulp.task('swagger-copy', function() {
    return gulp.src('./src/swagger.json')
      .pipe(gulp.dest('./build'));
});

//task which copy the swagger json in dist directory
gulp.task('public-copy', function() {
    return gulp.src('./src/public/**/*')
      .pipe(gulp.dest('./build/public'));
});

gulp.task('i18n-copy', function() {
    return gulp.src('./src/i18n/*')
      .pipe(gulp.dest('./build/i18n'));
});

gulp.task('template-copy', function() {
    return gulp.src('./src/views/*')
      .pipe(gulp.dest('./build/views'));
});

// The default task which runs at start of the gulpfile.js
gulp.task("default", gulp.series("swagger-copy", "public-copy", "i18n-copy", "template-copy"), () => {
    console.log("Done");
});