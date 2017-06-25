"use strict";
exports.__esModule = true;
var gulp = require("gulp");
var path = require("path");
var electron_1 = require("./utils/electron");
/**
 * Starts the electron listener for livereload
 * Sets up a listener on the AngularCLI dist directory for changes
 */
gulp.task('build.watch', function () {
    electron_1.electron.start();
    return gulp.watch(path.join(process.cwd(), '/dist/**.*'), [
        'build.npm.copy',
        'build.restart'
    ]);
});
