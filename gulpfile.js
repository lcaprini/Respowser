'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var svgstore = require('gulp-svgstore');
var replace = require('gulp-replace');
var electron = require('electron-connect').server.create();

var iconsPath = 'client/icons';
gulp.task('clean:svgstore', function () {
    return del([iconsPath+'/icons.svg']);
});

gulp.task('svgstore', ['clean:svgstore'], function () {
    return gulp
        .src(iconsPath+'/*.svg')
        .pipe(svgstore())
        .pipe(replace('<symbol', '<g'))
        .pipe(replace('</symbol>', '</g>'))
        .pipe(gulp.dest(iconsPath));
});

gulp.task('sass', function() {
    gulp.src('client/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('client/'));
});

gulp.task('serve', ['svgstore', 'sass'], function () {
    // Start browser process
    electron.start();

    // Restart browser process
    gulp.watch([
        'main.js',
        'config.js'
    ], electron.restart);

    // Restart svgstore process
    gulp.watch([
        iconsPath+'/**/*.svg',
        '!'+iconsPath+'/icons.svg'
    ], ['svgstore']);

    // Restart svgstore process
    gulp.watch([
        'client/**/*.scss'
    ], ['sass']);

    // Reload renderer process
    gulp.watch([
        'client/**',
        'core/**'
    ], electron.reload);
});

gulp.task('reload:browser', function () {
    // Restart main process
    electron.restart();
});

gulp.task('reload:renderer', function () {
    // Reload renderer process
    electron.reload();
});

gulp.task('default', ['serve']);
