var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var reload = browserSync.reload;
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var runSequence = require('gulp-run-sequence');

var src = {
    scss: ['app/scss/*.scss', 'app/**/*.scss'],
    html: ['app/*.html', 'app/**/*.html', 'app/pages/**/*.html'],
    js: ['app/**/*.js', 'app/app.js', 'app/**/**/*.js']
};

// Static Server + watching scss/html files
gulp.task('build', function (cb) {
    runSequence('clean', ['sass', 'indexhtml', 'html', 'lib', 'scripts'], cb)
});

gulp.task('serve', function () {

    browserSync.init({
        server: "www/build"
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html,['html']);
    gulp.watch(src.js, ['scripts']);
});

// Compile sass into CSS
gulp.task('sass', function () {
    return gulp.src('app/app.core.scss')
        .pipe(sass())
        .pipe(gulp.dest('www/build/css'))
        .pipe(reload({stream: true}));
});

gulp.task('html', function () {
    return gulp.src(['app/pages/**/*.html'])
        .pipe(gulp.dest('www/build/pages'))
        .pipe(reload({stream: true}));
})

gulp.task('indexhtml', function () {
    return gulp.src(['app/index.html'])
        .pipe(gulp.dest('www/build'))
})

gulp.task('scripts', function () {
    return gulp.src(['app/app.js', 'app/pages/**/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('www/build'))
        .pipe(reload({stream: true}));
});

gulp.task('lib', function () {
    return gulp.src(['app/lib/**/*'], {base: 'app'})
        .pipe(gulp.dest('www/build'));
});

gulp.task('clean', function () {
    return gulp.src(['www/build/*', 'www/*.html'], {read: false})
        .pipe(clean());
});

gulp.task('default', ['serve']);