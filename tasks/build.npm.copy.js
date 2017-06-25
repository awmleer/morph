"use strict";
exports.__esModule = true;
var gulp = require("gulp");
var path = require("path");
/**
 * Copies the package.json required for Electron to create package/bundles
 */
gulp.task('build.npm.copy', function () {
    return gulp.src(path.join(process.cwd(), 'package.json'))
        .pipe(gulp.dest(path.join(process.cwd(), '/dist/')));
});
