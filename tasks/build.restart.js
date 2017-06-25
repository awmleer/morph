"use strict";
exports.__esModule = true;
var gulp = require("gulp");
var electron_1 = require("./utils/electron");
/**
 * Restarts the current electron window instance with the changes
 */
gulp.task('build.restart', electron_1.electron.restart);
