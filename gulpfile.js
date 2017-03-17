var gulp = require('gulp');
var webpack = require('webpack');
var webpackGulp = require('gulp-webpack');
var rename = require("gulp-rename");
var webpackMiddleware = require("webpack-dev-middleware");
var CSON = require('cson');
var path = require('path')
var buildConfig = CSON.parseCSONFile(path.resolve(__dirname,'./build.cson'))

gulp.task('build', ['webpack'], function () {
});

gulp.task('server', ['webpack-server'], function () {
});

gulp.task('webpack', function () {
  return gulp.src('./src/main.tsx')
    .pipe(webpackGulp(require('./webpack.config.prod.js')))
    .pipe(gulp.dest('./dist'))
}
)

gulp.task('webpack-server', function () {
  try {
    var express = require('express');
    var app = express();
    var compiler = webpack(require('./webpack.config.js'));
    app.use(webpackMiddleware(compiler, {
      publicPath: "/",
      noInfo: true,

    }));
    app.use(require('webpack-hot-middleware')(compiler));

    var server = app.listen(3000, function () {
      var host = server.address().address;
      var port = server.address().port;
      console.log('Example app listening at http://%s:%s', host, port);
    });
  } catch (err) {
    console.log(err);
  }
}
)

gulp.task('copysource', function () {
  return gulp.src('./dist/**/*')
    .pipe(gulp.dest('./hexo/source'));
})

gulp.task('copyHexo', ['copysource'], function () {
  return gulp.src('./hexo/**/*')
    .pipe(gulp.dest(buildConfig.hexoThemePath));
})

gulp.task('hexo', ['copyHexo'], function () {
})