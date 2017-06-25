"use strict";
exports.__esModule = true;
var gulp = require("gulp");
var typescript = require("gulp-tsc");
gulp.task('build.electron', function () {
    return gulp.src(['src/electron/**/*.ts'])
        .pipe(typescript())
        .pipe(gulp.dest('dist/'));
});
