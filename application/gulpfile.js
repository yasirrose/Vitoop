var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack-stream');
var ProvidePlugin = require('webpack-stream').webpack.ProvidePlugin;
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');
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

gulp.task('jquery-js', function () {
   return gulp.src([
       'src/Vitoop/InfomgmtBundle/Resources/public/js/jquery/jquery.loader.js',
       ])
       .pipe(webpack({
            output: {
                publicPath: "/js/",
                filename: 'vitoop-jquery.js'
            },
            resolve: {
                modules: [
                    path.resolve('./'),
                    path.resolve('./node_modules'),
                ],
            },
            module: {
                loaders: [
                    /*{
                        test: require.resolve('angular'),
                        loader: "exports-loader?window.angular"
                    },*/
                    {
                        test: require.resolve('jquery'),
                        loader: 'imports-loader?$=jquery'
                    },
                    {   test: /jquery-mousewheel/, loader: "imports-loader?define=>false&this=>window" },
                    {   test: /malihu-custom-scrollbar-plugin/, loader: "imports-loader?define=>false&this=>window" },
                    {   test: /jquery.ba-bbq/, loader: "imports-loader?jQuery=jquery!./jquery/jquery.ba-bbq.js"},
                    {   test: /jquery.scrolltable/, loader: "imports-loader?jQuery=jquery!./jquery/jquery.scrolltable.js"},
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                    }
                ]
            },
            plugins: [
                //new UglifyJsPlugin(),
                new ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                    'window.jQuery': 'jquery',
                    'window.$': 'jquery',
                    /*angular: 'angular',
                    DataTable: 'datatables.net'*/
                }),
            ],
            devtool: 'source-map'
       }))
    .pipe(gulp.dest('web/js'));
});

gulp.task('js', ['angular-js', 'lexicon-js', 'tinymce-js', 'datatables-js'], function () {
    return gulp.src([
        'src/Vitoop/InfomgmtBundle/Resources/public/js/jquery/*.js',
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