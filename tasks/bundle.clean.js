"use strict";
exports.__esModule = true;
var gulp = require("gulp");
var path = require("path");
var replace = require("gulp-replace");
/**
 * Copies the package.json required for Electron to create package/bundles
 */
gulp.task('bundle.clean', function () {
    console.log(path.join(process.cwd(), 'dist', 'electron-app.js'));
    return gulp.src(path.join(process.cwd(), 'dist', 'electron-app.js'))
        .pipe(replace('var electron_connect_1 = require("electron-connect");', '', { logs: { enabled: true } }))
        .pipe(replace('electron_connect_1.client.create(applicationRef);', '', { logs: { enabled: true } }))
        .pipe(gulp.dest(path.join(process.cwd(), '/dist')));
});
