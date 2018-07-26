/* Gulpfile.js */
const gulp = require('gulp')
const gutil =  require('gulp-util')
const sass = require('gulp-sass')
const webserver = require('gulp-webserver');
const path = require('path')
const gulpStylelint = require('gulp-stylelint');

/* tasks */
// gulp.task(
//   name : String,
//   deps : [] :: optional,
//   cb : fn
// )

gulp.task('styles',['lint'], () => {
    return gulp.src('src/scss/main.scss')
        .pipe(sass({includePaths: [
                path.join(__dirname, 'node_modules/bootstrap/scss/'),
                path.join(__dirname, 'src/scss')]
            , outputStyle: 'compressed'}))
        .pipe(gulp.dest('dist/css/'))
})

gulp.task('lint', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(gulpStylelint({
            reporters: [
                {formatter: 'string', console: true}
            ]
        }));
});

gulp.task('html',['basics','assets'], () => {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'))
})

gulp.task('basics', () => {
    return gulp.src(['src/favicon.ico','src/.htaccess'])
        .pipe(gulp.dest('dist/'))
})

gulp.task('assets', () => {
    return gulp.src('src/**/*.png')
        .pipe(gulp.dest('dist/assets/'))
})

gulp.task('js', () => {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.js','src/js/**/*.js'])
        .pipe(gulp.dest('dist/js/'))
})

gulp.task('watch', () => {
    gulp.watch('src/scss/**/*.scss', ['lint','styles'],cb => cb)
    gulp.watch('src/js/**/*.js', ['js'],cb => cb)
    gulp.watch('src/**/*.html', ['html'],cb => cb)
    gulp.watch('src/img/**/*.png', ['assets'],cb => cb)
})

gulp.task('server', () => {
    gulp.src('dist/')
        .pipe(webserver({
            livereload: true,
            open: true
        }))
})

gulp.task('start', [
    'html',
    'styles',
    'js',
    'server',
    'watch'
], cb => cb)