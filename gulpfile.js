// modules
var _ = require('lodash');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var babelify = require("babelify");
var browserSync = require('browser-sync');
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var path = require('path');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');


// config defaults
var defaults = {
    templates: {
        watch: './app/templates/*'
    },
    scripts: {
        src: './app/assets/scripts/main.js',
        dest: './',
        watch: './app/assets/scripts/*'
    },
    styles: {
        src: './app/assets/styles/main.scss',
        dest: './',
        watch: './app/assets/styles/*',
        browsers: ['last 2 version']
    }
};

// merge user with default config
var config = _.merge(defaults, require('./package.json').config);
config.dev = gutil.env.dev;


// clean
gulp.task('clean', function (cb) {
});

// scripts
gulp.task('scripts', function () {
    return browserify(config.scripts.src)
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .on('error', function (error) {
            gutil.log(gutil.colors.red(error));
            this.emit('end');
        })
        .pipe(source(path.basename(config.scripts.src)))
        .pipe(gulpif(!config.dev, streamify(uglify())))
        .pipe(gulp.dest(config.scripts.dest));
});

// jshint telling me my js is bs
gulp.task('jshint', function (cb) {
    /* return gulp.src(config.scripts.watch)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'))
        .on('error', cb); */
});

// styles
gulp.task('styles', function () {
    return gulp.src(config.styles.src)
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(autoprefixer({
            browsers: config.styles.browsers
        }))
        .pipe(gulpif(!config.dev, csso()))
        .pipe(gulp.dest(config.styles.dest))
});

// server
gulp.task('browser-sync', function () {
    browserSync({
        proxy: "localhost:8888/ToDo2",
        notify: false,
        logPrefix: 'BrowserSync'
    });
});


// watch
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(config.scripts.watch, ['scripts', browserSync.reload]);
    gulp.watch(config.styles.watch, ['styles', browserSync.reload]);
    gulp.watch(config.templates.watch, ['styles', 'scripts', browserSync.reload]);
    gulp.watch('./*', ['styles', 'scripts', browserSync.reload]);
});


// default build task
gulp.task('default', ['clean', 'jshint'], function () {
    // define build tasks
    var tasks = [
        'scripts',
        'styles'
    ];

    // run build
    runSequence(tasks, function () {
        if (config.dev) {
            gulp.start('watch');
        }
    });

});
