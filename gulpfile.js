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

gulp.task('es6', (done) => {
	
	gulp.src(["./lib/**/*.es6"])
	.pipe(webpackStream({
		mode: 'development',
		entry: ['./lib/es6sample/src/index.es6'], // polyfill はIE11などで必要
		output: {
			library: "es6sample",
			path: `${__dirname}/dist`,
			filename: 'lib/es6sample.bundle.js'
		},
		module: {
			rules: [
				{loader: 'babel-loader'}
			]
		}
	}, webpack))
	.pipe(gulp.dest('dist/'))
	.on('error', function(error) {
		console.log(error);
		this.emit('end');
	})
	done()

})

gulp.task('tsjsmix', (done) => {
	
	gulp.src(["./src/**/*.ts"])
	.pipe(webpackStream({
		mode: 'development',
		entry: ['./src/tsjsmix.ts'],
		output: {
			library: "tsjsmix",
			path: `${__dirname}/dist`,
			filename: 'tsjsmix.bundle.js'
		},
		resolve: {
			extensions:['.ts', '.webpack.js', '.web.js', '.js']
		},
		module: {
			rules: [
				{ 
					test: /\.ts$/,
					loader: 'ts-loader',
					options: {
						configFile: "tsconfig.tsjsmix.json"
					}
				}
			]
		}
	}, webpack))
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

