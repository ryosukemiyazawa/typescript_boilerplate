var gulp = require('gulp');

// webpack
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

gulp.task('webpack', (done) => {
    gulp.src(["./src/**/*.ts"])
	.pipe(webpackStream(webpackConfig, webpack))
	.pipe(gulp.dest('dist/'))
	.on('error', function(error) {
		console.log(error);
		this.emit('end');
	})
	done()
})


gulp.task("watch", (done) => {
	gulp.watch(["src/**/*.ts", "src/**/*.es6", "src/**/*.js"], gulp.series('default'));
	done()
})

gulp.task('default',gulp.parallel('webpack'))

