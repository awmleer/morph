const gulp = require('gulp');
const typescript = require('gulp-tsc');
const path = require("path");
const electronConnect = require("electron-connect");

const electron = electronConnect.server.create({
    path: path.join(process.cwd(), 'dist/electron', 'electron.js')
});

const options = {
    pattern: ['tasks/**/*.js']
};

require('load-gulp-tasks')(gulp, options, {});

gulp.task('default', [
    'build.default'
]);

gulp.task('build.default', ['build.watch']);

gulp.task('build.electron', () => {
    return gulp.src(['src/electron/*.ts'])
        .pipe(typescript())
        .pipe(gulp.dest('dist/'));
});

gulp.task('build.watch', () => {
    electron.start();
    return gulp.watch(path.join(process.cwd(), '/dist/**.*'), [
        'build.npm.copy',
        'build.restart'
    ]);
});

gulp.task('build.restart', electron.restart);

gulp.task('bundle.clean', () => {
    console.log(path.join(process.cwd(), 'dist', 'electron.js'));
    return gulp.src(path.join(process.cwd(), 'dist', 'electron.js'))
        .pipe(replace('var electron_connect_1 = require("electron-connect");', '', { logs: { enabled: true }}))
        .pipe(replace('electron_connect_1.client.create(applicationRef);', '', { logs: { enabled: true }}))
        .pipe(gulp.dest(path.join(process.cwd(), '/dist')));
});


gulp.task('build.npm.copy', () => {
    return gulp.src(path.join(process.cwd(), 'package.json'))
        .pipe(gulp.dest(path.join(process.cwd(), '/dist/')));
});
