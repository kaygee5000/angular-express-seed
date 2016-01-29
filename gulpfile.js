var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    pkg = require('./package.json'),
    replace = require('gulp-replace-task'),
    del = require('del');

var website_dest = 'front/';
var dashboard_dest = 'dash/';

gulp.task('web_index', function () {
    var pagesArray = [
        {src : 'website_dev/index.html', dest : 'web.html'},
        {src : 'website_dev/gallery.html', dest : 'gallery.html'},
        {src : 'website_dev/testimonials.html', dest : 'testimonials.html'},
        {src : 'website_dev/trends.html', dest : 'trends.html'},
        {src : 'website_dev/privacy.html', dest : 'privacy.html'}
    ];
    pagesArray.forEach(function (page, index) {
        gulp.src(page.src)
            .pipe(replace({
                patterns: [
                    {
                        match: 'timestamp',
                        replacement: new Date().getTime()
                        //var fs = require('fs');
                        //replacement: fs.readFileSync('./includes/content.html', 'utf8')
                    }
                ]
            }))
            .pipe(rename(page.dest))
            .pipe(gulp.dest(website_dest));
    });

});

gulp.task('web_clean', function() {
    return del([website_dest]);
});

gulp.task('web_styles', function() {
    var styleArray = ['website_dev/css/bootstrap.css' , 'website_dev/css/**/*.css'];
    return gulp.src(styleArray)
        .pipe(concat('mogo.css'))
        .pipe(minifycss({compatibility: 'ie8'}))
        //.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(website_dest))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('web_scripts', function() {
    var scriptArray = ['website_dev/js/jquery.js', 'website_dev/js/**/!(custom)*.js', 'website_dev/js/custom.js'];
    return gulp.src(scriptArray)
        .pipe(concat('mogo.js'))
        .pipe(gulp.dest(website_dest))
        //.pipe(rename({suffix: '.min'}))
        //.pipe(uglify())
        //.pipe(gulp.dest(website_dest))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('web_images', function() {
    return gulp.src('website_dev/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest(website_dest+'assets/img'))
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('default', ['web_clean'], function() {
    gulp.start('web_styles', 'web_scripts', 'web_images');
});

gulp.task('web_move_assets', function(){
    return gulp.src('website_dev/fonts/**/*')
        .pipe(gulp.dest(website_dest+'assets/fonts'))
});

gulp.task('watch', function() {

    // Watch main html file
    gulp.watch('website_dev/index.html', ['web_index']);

    // Watch .css files
    gulp.watch('website_dev/css/**/*.css', ['web_styles']);

    // Watch .js files
    gulp.watch('website_dev/js/**/*.js', ['web_scripts']);

    // Watch image files
    gulp.watch('website_dev/images/**/*', ['web_images']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch([website_dest]).on('change', livereload.changed);
});

/**********************DASHBOARD STARTS HERE*************************/

//gulp.task('dash_default', ['dash_clean'], function() {
//    gulp.start('dash_styles', 'dash_scripts', 'dash_images');
//});

gulp.task('dash_index', function () {
    var pagesArray = [
        {src : 'dashboard_dev/dashboard.html', dest : 'dash.html'}
    ];
    pagesArray.forEach(function (page, index) {
        gulp.src(page.src)
            .pipe(replace({
                patterns: [
                    {
                        match: 'timestamp',
                        replacement: new Date().getTime()
                        //var fs = require('fs');
                        //replacement: fs.readFileSync('./includes/content.html', 'utf8')
                    }
                ]
            }))
            .pipe(rename(page.dest))
            .pipe(gulp.dest(dashboard_dest));
    });

});

gulp.task('dash_clean', function() {
    return del([dashboard_dest]);
});

gulp.task('dash_styles', function() {
    var styleArray = ['dashboard_dev/css/**/*.css', 'vendor_libraries/**/*.css'];
    return gulp.src(styleArray)
        .pipe(concat('dash.css'))
        .pipe(minifycss({compatibility: 'ie8'}))
        //.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dashboard_dest))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('dash_scripts', function() {
    var scriptArray = [
        'dashboard_dev/vendor_libraries/jquery/**.js',
        'dashboard_dev/vendor_libraries/!(custom)**/*.js',
        'dashboard_dev/vendor_libraries/custom/**/*.js'];
    return gulp.src(scriptArray)
        .pipe(concat('dash.js'))
        .pipe(gulp.dest(dashboard_dest))
        //.pipe(rename({suffix: '.min'}))
        //.pipe(uglify())
        //.pipe(gulp.dest(dashboard_dest))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('dash_images', function() {
    return gulp.src('dashboard_dev/img/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest(dashboard_dest+'img'))
        .pipe(notify({ message: 'Images task complete' }));
});
