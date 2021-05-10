import del from 'del';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import pug from 'gulp-pug-3';

const {
  src, dest, series, parallel, watch,
} = gulp;
const server = browserSync.create();

const srcDir = 'src/';
const buildDir = 'build/';

const allowEmpty = { allowEmpty: true };

const localPath = {
  src: {
    pug: `${srcDir}pug/`,
    js: `${srcDir}js/`,
    img: `${srcDir}img/`,
    svg: `${srcDir}svg/`,
    css: `${srcDir}css/`,
    fonts: `${srcDir}fonts/`,
    video: `${srcDir}video/`,
    favicon: `${srcDir}favicon/`,
  },

  build: {
    root: buildDir,
    js: `${buildDir}js/`,
    img: `${buildDir}img/`,
    css: `${buildDir}css/`,
    fonts: `${buildDir}fonts/`,
    video: `${buildDir}video/`,
  },
};

const clear = () => del(buildDir);

const pugToHTML = () => {
  const source = [
    `${localPath.src.pug}**/*.pug`,
    `!${localPath.src.pug}**/_*.pug`,
  ];

  return src(source)
    .pipe(plumber())
    .pipe(pug({}))
    .pipe(dest(localPath.build.root));
};

const js = () => src(`${localPath.src.js}**/*.js`)
  .pipe(plumber())
  .pipe(dest(localPath.build.js));

const css = () => src(`${localPath.src.css}**/*.css`)
  .pipe(plumber())
  .pipe(dest(localPath.build.css));

const favicon = () => src(`${localPath.src.favicon}**/*.*`)
  .pipe(plumber())
  .pipe(dest(localPath.build.root));

const img = () => src(`${localPath.src.img}**/*.*`)
  .pipe(plumber())
  .pipe(dest(localPath.build.img));

const serve = () => {
  server.init({
    server: buildDir,
    port: 3000,
    notify: false,
  });

  const reload = (done) => {
    server.reload();
    done();
  };

  watch(`${localPath.src.pug}**/*.pug`,
    series(pugToHTML, reload));

  watch(`${localPath.src.css}**/*.css`,
    series(css, reload));

  watch(`${localPath.src.js}**/*.js`,
    series(js, reload));
};

export { clear };
export const build = series(clear, parallel(pugToHTML, js, css, favicon, img));

export default series(build, serve);
