const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const del = require('del');
const runSequence = require('run-sequence');

gulp.task('sass', function () {
  var plugins = [
    autoprefixer({
      browsers: ['last 2 version']
    }),
    cssnano()
  ];
  return gulp.src('app/sass/**/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream())
});

gulp.task('watch', ['sass'], function () {
  browserSync.init({
    server: {
      baseDir: './'
    },
  });

  gulp.watch('app/sass/**/*.scss', ['sass', browserSync.reload]);
  gulp.watch('app/js/**/*.js', ['js', browserSync.reload]);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch('app/img/**/*.+(png|jpg|jpeg|gif|svg)', ['images', browserSync.reload])
});

gulp.task('js', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('./js'))
});

gulp.task('clean:img', function () {
  return del.sync('img');
})

gulp.task('images', function () {
  runSequence('clean:img',
    function () {
      return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(gulp.dest('./img'))
    })
});

gulp.task('build', function () {
  runSequence('clean:img', ['sass', 'images', 'js', 'watch'])

});