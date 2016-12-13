var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var csso = require('gulp-csso');
var gif = require('gulp-if');
var gutil = require('gulp-util');
var run = require('run-sequence');
var sass = require('gulp-sass');
var uglyfly = require('gulp-uglyfly');
var webpack = require('gulp-webpack');


var config = {
  scripts: {
    watch: './app/assets/scripts/**.js',
    entry: './app/assets/scripts/main.js',
    dest: './app/assets/build/'
  },
  styles: {
    watch: './app/assets/styles/**.scss',
    entry: './app/assets/styles/main.scss',
    dest: './app/assets/build/'
  },
  templates: {
    watch: './app/**/*.php'
  },
  dev: !!(gutil.env.dev)
};

gulp.task('styles', function() {
  return gulp.src(config.styles.entry)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 version']
    }))
    .pipe(gif(!config.dev, csso()))
    .pipe(gulp.dest(config.styles.dest));
});

gulp.task('scripts', function() {
  return gulp.src(config.scripts.entry)
    .pipe(webpack({
      output: {
        filename: '[name].js',
      },
      module: {
        loaders: [
          {test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ['es2015']}}
        ],
      }
    }))
    .pipe(gif(!config.dev, uglyfly()))
    .pipe(gulp.dest(config.scripts.dest));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: "localhost:9000"
  });
});

gulp.task('watch', ['browser-sync'] , function() {
  gulp.watch(config.scripts.watch, ['scripts', browserSync.reload]);
  gulp.watch(config.styles.watch, ['styles', browserSync.reload]);
  gulp.watch(config.templates.watch, ['styles', 'scripts', browserSync.reload]);
});

gulp.task('default', function() {
  var tasks = ['scripts', 'styles'];

  run(tasks, function () {
    if (config.dev) {
      gulp.start('watch');
    }
  });
});
