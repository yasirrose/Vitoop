var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var bro = require('gulp-bro');
var babelify = require('babelify');

const webpackRef = require('webpack');
var webpack = require('webpack-stream');
var ProvidePlugin = require('webpack-stream').webpack.ProvidePlugin;
var path = require('path');
var env = process.env.GULP_ENV;
const {VueLoaderPlugin} = require('vue-loader');

gulp.task('lexicon-js', function () {
    return gulp.src(['front/js/lexicon/lexicon-home.js'])
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulp.dest('public/js'));
});

gulp.task('tinymce-js', function () {
    return gulp.src([
        'front/js/tinymce/**/*.*',
        ])
        .pipe(gulp.dest('public/js/tinymce'));
});

gulp.task('datatables-js', function () {
    return gulp.src(['front/js/datatables/**/*.*'])
        .pipe(sourcemaps.init())
        .pipe(concat('datatables.js'))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulp.dest('public/js/datatables'));
});

gulp.task('jquery-js', function () {
   return gulp.src([
       'front/js/jquery/jquery.loader.js',
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
                new ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                    'window.jQuery': 'jquery',
                    'window.$': 'jquery',
                }),
            ],
            devtool: 'source-map'
       }))
    .pipe(gulp.dest('public/js'));
});

gulp.task('vitoop-store', function () {
    return gulp.src([
        'front/js/vitoopjs/store/*.js',
    ])
        .pipe(webpack({
            mode: 'production',
            output: {
                publicPath: "/js/",
                filename: 'vitoop-store.js'
            },
            performance: {
                hints: false
            }
        }))
        .pipe(concat('vitoop-store.js'))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulp.dest('public/js/'));
});

gulp.task('vitoop-app', function () {
    return gulp.src([
        'front/js/vitoopjs/components/Vue/*/*.vue',
        'front/js/vitoopjs/components/*.js',
        'front/js/vitoopjs/widgets/*.js',
        'front/js/vitoopjs/store/*.js',
        'front/js/vitoopjs/*.js',
        'front/js/vitoopjs/app/vitoop.js',
        'front/js/vitoopjs/app/boot.js'
        ])
        .pipe(webpack({
            mode: 'development', // change me to "production"
            output: {
                publicPath: "/js/",
                filename: 'vitoop-app.js'
            },
            module: {
                rules: [
                    {
                        test: /\.vue$/,
                        loader: 'vue-loader'
                    },
                    {
                        test: /\.scss$/,
                        use: [
                            'style-loader',
                            'css-loader',
                            'sass-loader'
                        ]
                    },
                    {
                        test: /\.css$/,
                        use: [
                            'style-loader',
                            'css-loader'
                        ]
                    },

                ]
            },
            plugins: [
                new VueLoaderPlugin(),
                new webpack.webpack.DefinePlugin({
                    __VUE_OPTIONS_API__: true,
                    __VUE_PROD_DEVTOOLS__: true,
                    'process.env.BUILD': JSON.stringify('web')
                })
            ],
            performance: {
                hints: false
            }
        }))
        .pipe(concat('vitoop-app.js'))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulp.dest('public/js/build'));
});

gulp.task('pdf-view', function () {
    return gulp.src([
        'front/js/vitoopjs/app/pdfView.js'
    ])
        .pipe(bro({
            transform: [
                babelify.configure({ presets: ['env'] }),
                [ 'uglifyify', { global: true } ]
            ]
        }))
        .pipe(concat('vitoop-pdf-view.js'))
        .pipe(gulp.dest('public/js/build'));
});


gulp.task('js', gulp.series(['lexicon-js', 'tinymce-js', 'datatables-js', 'vitoop-app'] , function () {
    return gulp.src([
        'front/js/jquery/*.js',
        'public/js/build/vitoop-app.js'])
        .pipe(concat('vitoop.js'))
        .pipe(gulp.dest('public/js'));
}));

gulp.task('pdf-view-js', gulp.series(['pdf-view'], function () {
    return gulp.src([
        'front/js/jquery/*.js',
        'public/js/build/vitoop-pdf-view.js'])
        .pipe(concat('vitoop-pdf-view.js'))
        .pipe(gulp.dest('public/js'));
}));

gulp.task('html-view', function () {
    return gulp.src([
        'front/js/vitoopjs/app/htmlView.js'
    ])
        .pipe(bro({
            transform: [
                babelify.configure({ presets: ['env'] }),
                [ 'uglifyify', { global: true } ]
            ]
        }))
        .pipe(concat('vitoop-html-view.js'))
        .pipe(gulp.dest('public/js/build'));
});

gulp.task('html-view-js', gulp.series(['html-view'], function () {
    return gulp.src([
        'front/js/jquery/*.js',
        'public/js/build/vitoop-html-view.js'])
        .pipe(concat('vitoop-html-view.js'))
        .pipe(gulp.dest('public/js'));
}));

gulp.task('tinymce-scss', function () {
    return gulp.src(
        ['front/css/vtp-tinymce.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('vtp-tinymce.css'))
        .pipe(gulpif(env === 'prod', uglifycss()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('scss', function () {
    return gulp.src(['front/css/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('vitoop.css'))
        .pipe(gulpif(env === 'prod', uglifycss()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('watch', () => {
    gulp.watch('front/css/**/*.scss', gulp.series('scss'));
    gulp.watch([
        'front/js/vitoopjs/components/Vue/*/*/*/*.vue',
        'front/js/vitoopjs/components/Vue/*/*/*.vue',
        'front/js/vitoopjs/components/Vue/*/*.vue',
        'front/js/vitoopjs/components/Vue/*.vue',
        'front/js/vitoopjs/components/*.js',
        'front/js/vitoopjs/widgets/*.js',
        'front/js/vitoopjs/store/*.js',
        'front/js/vitoopjs/*/*.js',
        'front/js/vitoopjs/*.js',
        'front/js/pdf.editor/UI/*.js',
        'front/js/vitoopjs/app/*.js',
    ], gulp.series(['js','pdf-view-js', 'pdf']));
});

gulp.task('img', function() {
    return gulp.src([
        'front/img/**/*.*',
        'front/css/cupertino/images/*.*'
    ]).pipe(gulp.dest('public/img'));
});

gulp.task('pdf', function () {
    return gulp.src('front/js/pdf.editor/pdf.editor.js')
        .pipe(webpack({
            mode: 'production',
            output: {
                publicPath: "/build/",
                filename: 'pdf.editor.js'
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        use: 'babel-loader',
                    }
                ]
            }
        }))
        .pipe(gulp.dest('public/build'));
});

gulp.task('default', gulp.series(['img', 'tinymce-scss', 'scss', 'js', 'pdf', 'pdf-view-js', 'html-view-js', 'vitoop-store']));

gulp.task('set-prod', function() {
    return env = 'prod';
});

gulp.task('prod', gulp.series(['set-prod', 'default']));
