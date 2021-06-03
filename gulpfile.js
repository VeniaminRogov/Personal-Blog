const {
  src,
  watch,
  parallel,
  dest,
  series
} = require('gulp');
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');

function scripts() {
  return src(['app/js/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))

    .pipe(browserSync.stream());
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
  });
}

function styles() {
  return src(['node_modules/reset-css/reset.css',
      'app/scss/style.scss'
    ])
    .pipe(scss({
      outputStyle: 'expanded'
    }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
}

function images() {
  return src('app/img/**/*')
    .pipe(
      imagemin([
        // imagemin.gifsicle({
        //   interlaced: true
        // }),
        imagemin.mozjpeg({
          quality: 75,
          progressive: true
        }),
        imagemin.optipng({
          optimizationLevel: 5
        }),
        imagemin.svgo({
          plugins: [{
            removeViewBox: true
          }, {
            cleanupIDs: false
          }],
        }),
      ]),
    )
    .pipe(dest('dist/img'));
}

function build() {
  return src(['app/css/style.min.css',
      'app/fonts/**/*',
      'app/js/main.min.js',
      'app/*.html'
    ], {
      base: 'app'
    })
    .pipe(dest('dist'));
}

function cleanDist() {
  return del('dist');
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);