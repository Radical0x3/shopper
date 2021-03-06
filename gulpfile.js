const { src, dest } = require("gulp");
const gulp = require("gulp");
const browsersync = require("browser-sync").create();
const fileinclude = require("gulp-file-include");
const del = require("del");
const scss = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const group_media = require("gulp-group-css-media-queries");
const clean_css = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const webphtml = require("gulp-webp-html");
const webpcss = require("gulp-webpcss");
const svgSprite = require("gulp-svg-sprite");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
const fonter = require("gulp-fonter");
const webpackStream = require("webpack-stream");
const htmlmin = require("gulp-htmlmin");

const project_folder = "dist";
const source_folder = "src";
const fs = require("fs");

const path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css",
    js: project_folder + "/js",
    img: project_folder + "/img",
    fonts: project_folder + "/fonts",
    videos: project_folder + "/videos",
  },
  src: {
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    css: source_folder + "/scss/*.scss",
    js: source_folder + "/js/script.js",
    img: source_folder + "/img/**/*.+(jpg|png|svg|gif|ico|webp)",
    fonts: source_folder + "/fonts/*.ttf",
    videos: source_folder + "/videos/**/*.mp4",
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss" + "",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.+(jpg|png|svg|gif|ico|webp)",
    videos: source_folder + "/videos/**/*.mp4",
  },
  clean: "./" + project_folder + "/",
};

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/",
    },
    port: 3000,
    notify: false,
  });
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

function js() {
  return src(path.src.js)
    .pipe(
      webpackStream({
        mode: "production",
        entry: {
          main: "./src/js/script.js",
          general: "./src/js/general.js",
          shop: "./src/js/shop.js",
          product: "./src/js/product.js",
          cart: "./src/js/cart.js",
          checkout: "./src/js/checkout.js",
          auth: "./src/js/auth.js",
          orders: "./src/js/orders.js",
          details: "./src/js/details.js",
          personal: "./src/js/personal.js",
          address: "./src/js/address.js",
          addAddress: "./src/js/add-address.js",
          wishlist: "./src/js/wishlist.js",
          shipping: "./src/js/shipping.js",
          contact: "./src/js/contact.js",
          locator: "./src/js/locator.js",
          about: "./src/js/about.js",
          comingSoon: "./src/js/comingSoon.js",
          blog: "./src/js/blog.js",
          post: "./src/js/post.js",
          search: "./src/js/search.js",
        },
        output: {
          filename: "[name].js",
        },
        optimization: {
          runtimeChunk: "single",
          splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                  const packageName = module.context.match(
                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                  )[1];
                  return `npm.${packageName.replace("@", "")}`;
                },
              },
            },
          },
        },
        module: {
          rules: [
            {
              test: /\.(js)$/,
              exclude: /(node_modules)/,
              loader: "babel-loader",
              query: {
                presets: ["@babel/preset-env"],
              },
            },
          ],
        },
      })
    )
    .pipe(fileinclude())
    .pipe(uglify())
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

function css() {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: "expanded",
      })
    )
    .pipe(group_media())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true,
      })
    )
    .pipe(
      webpcss({
        webpClass: ".webp",
        noWebpClass: ".no-webp",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

function images() {
  return src(path.src.img)
    .pipe(
      webp({
        quality: 75,
      })
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3, //0 to 7
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

function videos() {
  return src(path.src.videos)
    .pipe(dest(path.build.videos))
    .pipe(src(path.src.videos))
    .pipe(browsersync.stream());
}

function fonts() {
  src(path.src.fonts).pipe(ttf2woff()).pipe(dest(path.build.fonts));
  return src(path.src.fonts).pipe(ttf2woff2()).pipe(dest(path.build.fonts));
}

gulp.task("svgSprite", function () {
  return gulp
    .src([source_folder + "/iconsprite/*.svg"])
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../icons/icons.svg",
            // example: true
          },
        },
      })
    )
    .pipe(dest(path.build.img));
});

gulp.task("otf2ttf", function () {
  return src([source_folder + "/fonts/*.otf"])
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(dest(source_folder + "/fonts/"));
});

function cb() {}

function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean(params) {
  return del(path.clean);
}

let build = gulp.series(
  clean,
  gulp.parallel(js, css, html, images, videos, fonts)
);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.videos = videos;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;
