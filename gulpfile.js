const { watch, series, src, dest } = require("gulp");
const uglify = require("gulp-uglify");
const notify = require("gulp-notify");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const htmlMin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const ttf2woff = require("gulp-ttf2woff");
const image = require("gulp-image");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const browsersync = require("browser-sync").create();
const del = require("del");

function locale() {
  return src("src/locale/**.json").pipe(dest("dist/locale"));
}
function clean() {
  return del(["dist/"]);
}
function images() {
  return src([
    "src/images/**/*.jpg",
    "src/images/**/*.png",
    "src/images/**/*.svg",
  ])
    .pipe(image())
    .pipe(dest("dist/images/"));
}
function font() {
  return src("src/fonts/*.ttf").pipe(ttf2woff()).pipe(dest("dist/fonts"));
}

function styles() {
  return src("src/styles/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.init())
    .pipe(concat("main.css"))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest("dist/"))
    .pipe(browsersync.stream());
}
function scripts() {
  return src("src/scripts/*.js")
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(concat("app.js"))
    .pipe(
      uglify({
        toplevel: true,
      }).on("error", notify.onError())
    )
    .pipe(sourcemaps.write())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest("dist/"))
    .pipe(browsersync.stream());
}
function htmlMinify() {
  return src("src/**/*.html")
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(dest("dist/"))
    .pipe(browsersync.stream());
}
const watchFiles = () => {
  browsersync.init({
    server: {
      baseDir: "dist/",
    },
  });
};

watch("src/**/*.html", htmlMinify);
watch("src/styles/**/*.scss", styles);
watch("src/scripts/**/*.js", scripts);

exports.styles = styles;
exports.htmlMinify = htmlMinify;
exports.scripts = scripts;
exports.clean = clean;
exports.default = series(
  clean,
  font,
  locale,
  htmlMinify,
  scripts,
  styles,
  images,
  watchFiles
);
