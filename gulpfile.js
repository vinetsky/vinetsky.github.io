/* eslint-disable prettier/prettier */

const gulp = require('gulp');
const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const mergeStream = require('merge-stream');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const inject = require('gulp-inject');
const wrapper = require('gulp-wrapper');
const { Transform } = require('stream');
const browsersync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');


const defaultSrcDir = 'PAGES/maptest';

const presets = {
    locale: 'ru',
    URL: 'explore/wellbeing/are-you-resting-properly'
};

const paths = {
    html: `./${defaultSrcDir}/html/index.html`,
    css: `./${defaultSrcDir}/css/styles.css`,
    scssDir: `./${defaultSrcDir}/scss/**/*`,
    scss: `./${defaultSrcDir}/scss/styles.scss`,
    reset: `./${defaultSrcDir}/scss/reset.scss`,
    js: `./${defaultSrcDir}/js/**/*`,
    content: `./${defaultSrcDir}/html/content.html`,
    aemDir: './AEM',
    precompileDir: './dist',
    webDir: './web',
    precompiledBody: './dist/body.html',
    precompiledFooter: './dist/footer.js'
};

function doReplace(contents) {
    const pairs = [
        ["'img/", `'https://images.samsung.com/is/image/samsung/assets/${presets.locale}/${presets.URL}/`],
        ['"img/', `"https://images.samsung.com/is/image/samsung/assets/${presets.locale}/${presets.URL}/`],
        ['"video/', `"https://images.samsung.com/is/content/samsung/assets/${presets.locale}/${presets.URL}/`],
        ["'svg/", `'https://images.samsung.com/is/content/samsung/assets/${presets.locale}/${presets.URL}/`],
        ['"svg/', `"https://images.samsung.com/is/content/samsung/assets/${presets.locale}/${presets.URL}/`]
    ];

    let replaced = contents;
    pairs.forEach(([from, to]) => {
        replaced = replaced.split(from).join(to);
    });

    return replaced;
}

function addTimestampToUrls(contents) {
    const timestamp = Date.now().toString().slice(-5);
    const regex = /((["'])(img|svg)\/[^"']+["'])/g;
    return contents.replace(regex, (match, subst0, subst1) => `${subst1}${match.slice(1, -1)}?v=${timestamp}${subst1}`);
}

function convertImages() {
    return new Transform({
        objectMode: true,
        transform(file, encoding, callback) {
            const fileContents = doReplace(addTimestampToUrls(file.contents.toString()));
            file.contents = Buffer.from(fileContents);
            callback(null, file);
        }
    });
}

function footer() {
    const collectedJS = gulp.src([
        `./${defaultSrcDir}/js/meta.js`,
         `./${defaultSrcDir}/js/app.js`
    ]);
    const webTask = new Promise((resolve, reject) => {
        collectedJS
        .pipe(sourcemaps.init())
        .pipe(concat('footer.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.webDir))
        .on('end', resolve)
        .on('error', reject);
    });
    const aemTask = new Promise((resolve, reject) => {
        collectedJS
        .pipe(convertImages())
        .pipe(concat('footer.js'))
        .pipe(terser({
            mangle: {
                toplevel: true
            },
            compress: {
                comparisons: false,
                conditionals: false,
                drop_console: true,
                hoist_props: false,
                join_vars: false,
                sequences: 0
            },
            output: {
                ecma: '2015',
                keep_numbers: true
            }
        }))
        .pipe(dest(paths.aemDir))
        .on('end', resolve)
        .on('error', reject);
    });

    return Promise.all([webTask, aemTask]);
}

function stylesAndContent() {
    const webTask = new Promise((resolve, reject) => {
      const webStream = src([paths.scss])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('allstyles.css'))
        .pipe(sourcemaps.write())
        .pipe(
          wrapper({
            header: '<style class="included" type="text/css">\n',
            footer: '</style>\n'
          })
        )
        .pipe(src([paths.content]))
        .pipe(concat('body.html'))
        .pipe(dest(paths.precompileDir));
  
      webStream.on('end', resolve);
      webStream.on('error', reject);
    });
  
    const aemTask = new Promise((resolve, reject) => {
      const aemStream = src([paths.scss])
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(
          wrapper({
            header: '<style type="text/css">\n',
            footer: '</style>\n'
          })
        )
        .pipe(src([paths.content]))
        .pipe(convertImages())
        .pipe(concat('body.html'))
        .pipe(dest(paths.aemDir));
  
      aemStream.on('end', resolve);
      aemStream.on('error', reject);
    });
  
    return Promise.all([webTask, aemTask]);
  }
  
  exports.default = stylesAndContent;

function updateIndexFile() {
    return src(`./${defaultSrcDir}/html/index.html`)
        .pipe(
            inject(mergeStream(src(paths.precompiledBody).pipe(concat('body.html'))), {
                starttag: '<!-- inject:content -->',
                endtag: '<!-- endinject -->',
                transform: (filePath, file) => file.contents.toString()
            })
        )
        .pipe(
            wrapper({
                footer: '<script type="text/javascript" src="/footer.js"></script>'
            })
        )
        .pipe(dest(paths.webDir))
        .pipe(browsersync.stream());
}

function sync(cb) {
    browsersync.init({
        server: {
            baseDir: '.\\web\\',
            port: 3010,
            ui: {
                port: 8080
            }
        },
    });
    cb();
}

function watchFiles() {
    watch([paths.scssDir, paths.content, paths.js], series(cleanImages, copyImages, footer, stylesAndContent, updateIndexFile));
}

function cleanImages() {
    return src([`${paths.aemDir}/images`, `${paths.webDir}/img/*`, `${paths.webDir}/svg/*`], {
        read: false,
        allowEmpty: true
    }).pipe(clean());
}


function copyImages() {
    const imgStream = src(`./${defaultSrcDir}/img/*`).pipe(dest(`./${paths.webDir}/img/`));
    const svgStream = src(`./${defaultSrcDir}/svg/*`).pipe(dest(`./${paths.webDir}/svg/`));
    
    return Promise.all([imgStream, svgStream]).then(() =>
      src([`./${paths.webDir}/img/*`, `./${paths.webDir}/svg/*`]).pipe(
        dest(`./${paths.aemDir}/images`)
      )
    );
}

exports.build = series(
    cleanImages,
    copyImages,
    footer,
    stylesAndContent,
    updateIndexFile,
    sync,
    watchFiles
);
