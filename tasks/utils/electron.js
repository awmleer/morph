"use strict";
exports.__esModule = true;
var path = require("path");
var electronConnect = require("electron-connect");
/**
 * Sets up the default electron server instance from the dist directory
 */
exports.electron = electronConnect.server.create({
    path: path.join(process.cwd(), 'dist', 'electron-app.js')
});
