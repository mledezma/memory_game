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
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const workbox = require('workbox-build');
const dist = './dist';

gulp.task('sass:prod', function() {
  var plugins = [
    autoprefixer({
      browsers: ['last 2 version']
    }),
    cssnano()
  ];
  return gulp.src('app/sass/**/styles.scss')
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('sass:dev', function () {
  var plugins = [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ];
  return gulp.src('app/sass/**/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./.tmp/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: './.tmp'
    },
  });

  gulp.watch('app/sass/**/*.scss', ['sass:dev', browserSync.reload]);
  gulp.watch('app/js/**/*.js', ['js:dev', browserSync.reload]);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch('app/img/**/*.+(png|jpg|jpeg|gif|svg)', ['img:dev', browserSync.reload]);
  gulp.watch('app/img/**/*.+(png|jpg|jpeg|gif|svg)', function () {
    runSequence('clean:img', ['img:dev', browserSync.reload]);
  });
  gulp.watch('app/*.html', ['html:dev', browserSync.reload]);
});

gulp.task('js:dev', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./.tmp/js'));
});

gulp.task('js:prod', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(eslint())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('clean:img', function () {
  return del.sync('.tmp/img');
});

gulp.task('img:prod', function () {
  return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg|ico)')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('img:dev', function () {
  return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg|ico)')
    .pipe(gulp.dest('./.tmp/img'));
});

gulp.task('html:dev', function () {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('./.tmp/'));
});

gulp.task('html:prod', function () {
  return gulp.src('app/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('generate-service-worker', () => {
  return workbox.generateSW({
    globDirectory: dist,
    globPatterns: ['**\/*.{html,js,css}'],
    swDest: `${dist}/js/sw.js`,
    clientsClaim: true,
    skipWaiting: true
  }).then(() => {
    console.info('Service worker generation completed.');
  }).catch((error) => {
    console.warn('Service worker generation failed: ' + error);
  });
});

gulp.task('prod', function () {
  runSequence('clean:img', ['html:prod', 'sass:prod', 'img:prod', 'js:prod'], 'generate-service-worker');
});

gulp.task('dev', function () {
  runSequence('clean:img', ['html:dev', 'sass:dev', 'img:dev', 'js:dev', 'watch']), 'generate-service-worker';
});

gulp.task('clean:tmp', function () {
  del.sync('.tmp');
});