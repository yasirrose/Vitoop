var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack-stream');
var env = process.env.GULP_ENV;

gulp.task('angular-js', function () {
    return gulp.src(['src/Vitoop/InfomgmtBundle/Resources/public/js/angular/*.js'])
        .pipe(concat('angular-modules.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('web/js'));
});

gulp.task('lexicon-js', function () {
    return gulp.src(['src/Vitoop/InfomgmtBundle/Resources/public/js/lexicon/lexicon-home.js'])
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulp.dest('web/js'));
});

gulp.task('tinymce-js', function () {
    return gulp.src([
        'src/Vitoop/InfomgmtBundle/Resources/public/js/tinymce/**/*.*',
        ])
        .pipe(gulp.dest('web/js/tinymce'));
});

gulp.task('datatables-js', function () {
    return gulp.src(['src/Vitoop/InfomgmtBundle/Resources/public/js/datatables/**/*.*'])
        .pipe(sourcemaps.init())
        .pipe(concat('datatables.js'))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulp.dest('web/js/datatables'));
});

gulp.task('js', ['angular-js', 'lexicon-js', 'tinymce-js', 'datatables-js'], function () {
    return gulp.src(['src/Vitoop/InfomgmtBundle/Resources/public/js/jquery/*.js',
        'src/Vitoop/InfomgmtBundle/Resources/public/js/vitoopjs/components/*.js',
        'src/Vitoop/InfomgmtBundle/Resources/public/js/vitoopjs/widgets/*.js',
        'src/Vitoop/InfomgmtBundle/Resources/public/js/vitoopjs/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('vitoop.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('web/js'));
});

gulp.task('tinymce-scss', function () {
    return gulp.src(
        ['src/Vitoop/InfomgmtBundle/Resources/public/css/vtp-tinymce.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('vtp-tinymce.css'))
        .pipe(gulpif(env === 'prod', uglifycss()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('web/css'));
});

gulp.task('scss', function () {
    return gulp.src(['src/Vitoop/InfomgmtBundle/Resources/public/css/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('vitoop.css'))
        .pipe(gulpif(env === 'prod', uglifycss()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('web/css'));
});

gulp.task('img', function() {
    return gulp.src([
        'src/Vitoop/InfomgmtBundle/Resources/public/img/**/*.*',
        'src/Vitoop/InfomgmtBundle/Resources/public/css/cupertino/images/*.*'
    ]).pipe(gulp.dest('web/img'));
});

gulp.task('pdf', function () {
    return gulp.src('src/Vitoop/InfomgmtBundle/Resources/public/js/pdf.editor/pdf.editor.js')
        .pipe(webpack({
            output: {
                publicPath: "/build/",
                filename: 'pdf.editor.js'
            },
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                    }
                ]
            }
        }))
        .pipe(gulp.dest('web/build'));
});

gulp.task('default', ['img', 'tinymce-scss', 'scss', 'js', 'pdf']);

gulp.task('prod', ['set-prod', 'default']);

gulp.task('set-prod', function() {
    return env = 'prod';
});