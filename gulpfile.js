const gulp = require('gulp');
const path = require('path');
const del = require('del');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const webp = require('gulp-webp');
const hb = require('gulp-hb');
const prettify = require('gulp-prettify');
const rename = require('gulp-rename');


gulp.task('styles', () => {
    return gulp.src('assets/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('clean', () => {
    return del([
        'dist/**/**'
    ]);
});

gulp.task('compress-img', () => {
    return gulp.src('./assets/imgsrc/*.png')
        .pipe(webp())
        .pipe(gulp.dest('./assets/img/'))
});

gulp.task('html', () => {
    console.log('==================> Building HTML pages');

    return gulp.src('./assets/content/**/*.hbs')
        .pipe(hb({partials: './assets/template/**/*.hbs',helpers: './assets/template/_helpers/*.js',data: {"app": "RycoFilters"}}))
        .pipe(rename({extname: '.html'}))
        .pipe(rename({dirname: ''}))
        .pipe(prettify({indent_handlebars: true,indent_inner_html: true,preserve_newlines: true,end_with_newline: true,max_preserve_newlines: 0,brace_style: 'expand',indent_char: '  ',indent_size: 2}))
        .pipe(gulp.dest('./dist'))
        .on('end', function () {
            console.log('==================> Building HTML pages...DONE!');
        });
});
 

gulp.task('copy-everything', () => {
    return gulp.src(['assets/**/**', '!assets/content/**/**', '!assets/template/**/**','!assets/scss/**/**', '!assets/imgsrc/**/**'])
    .pipe(gulp.dest('./dist/assets/'));
});


gulp.task('stream', () => {
    console.log('==================> Watching file changes...');

    gulp.watch(['./assets/**/*.hbs'], gulp.series('html'))
        .on('change', function (event) {
            var file = path.parse(event);
            console.log('==================> File changed: ' + file.name + ' (' + file.ext + ')...');
        });

    gulp.watch(['assets/scss/**/*.scss'], gulp.series('styles'))
        .on('change', function (event) {
            var file = path.parse(event);
            console.log('==================> File changed: ' + file.name + ' (' + file.ext + ')...');
        });

})


gulp.task('default', gulp.series(['clean', 'copy-everything', 'styles', 'html']));

gulp.task('build', gulp.series(['clean', 'copy-everything', 'styles', 'html', 'stream']));
