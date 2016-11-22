'use strict';

var gulp = require('gulp');
var del = require('del');
var svgstore = require('gulp-svgstore');
var replace = require('gulp-replace');
var electron = require('electron-connect').server.create();

gulp.task('clean:svgstore', function () {
    return del(['client/assets/icons/icons.svg']);
});

gulp.task('svgstore', ['clean:svgstore'], function () {
    return gulp
        .src('client/assets/icons/*.svg')
        .pipe(svgstore())
        .pipe(replace('<symbol', '<g'))
        .pipe(replace('</symbol>', '</g>'))
        .pipe(gulp.dest('client/assets/icons'));
});

// var electron = require('../../').server.create({
//   useGlobalElectron: true,
//   logLevel: 2
// });

gulp.task('serve', ['svgstore'], function () {
    // Start browser process
    electron.start();

    // // Add an argument
    // electron.start('Hoge!');

    // // Add list of arguments
    // electron.start(['Hoge', 'foo']);

    // // Callback
    // electron.start(function () {
    //   console.log('started');
    // });

    // Restart browser process
    gulp.watch([
        'main.js',
        'config.js'
    ],
        electron.restart);

    // Restart svgstore process
    gulp.watch([
        'client/assets/icons/**',
        '!client/assets/icons/icons.svg'
    ], ['svgstore']);

    // Reload renderer process
    gulp.watch([
        'client'
    ],
        electron.reload);
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
