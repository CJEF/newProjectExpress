const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const nodemon = require('nodemon');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');

function css() { 
  return gulp
      .src('./dev/scss/**/*.scss') 
      .pipe(plumber())
      .pipe(sass())
      .pipe(
          autoprefixer(['last 3 versions', '> 1%', 'ie 8', 'ie 7'], {
              cascade: true
          })
      )
      .pipe(cssnano()) 
      .pipe(gulp.dest('./public/css'))
}

function scripts() {
    return gulp
    .src([
        'dev/js/auth.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
}

function serveR() {
  nodemon({
      script: 'app.js',
      watch: ["app.js", "gulpfile.js", 'public/*', 'public/**/*', 'dev/js/**/*'],
      ext: 'js'
  }).on('restart', () => {
      gulp.src('index.js')
  });
  gulp.watch('dev/scss/**/*.scss', css);
  gulp.watch('dev/js/**/*.js', scripts);
}

// task('default', () => gulp.series(serveR, css))
// gulp.task('default', [serveR, css]);
module.exports.default = gulp.series(serveR, css, scripts);
// gulp.task("default", function () {
//     gulp.series(serveR, css);
//   });
// gulp.task('default', () => gulp.series(serveR, css));
// module.exports.default

// gulp.task('scss', () => {
//   return (
//     gulp
//       .src('dev/scss/**/*.scss')
//       .pipe(plumber())
//       .pipe(sass())
//       .pipe(
//         autoprefixer(['last 2 versions', '> 1%', 'ie 8', 'ie 7'], {
//           cascade: true
//         })
//       )
//       .pipe(cssnano())
//       .pipe(gulp.dest('public/css'))
//   );
// });

// gulp.task('default', ['scss'], () => {
//   gulp.watch('dev/scss/**/*.scss', ['scss']);
//   gulp.watch('dist/*.html');
// });