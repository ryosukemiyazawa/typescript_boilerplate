# 03. webpack

## initialize

```
$ npm install --save-dev webpack webpack-cli webpack-stream ts-loader
```

## create webpack.js

```
$ vi webpack.config.js
```

```webpack.config.js
var path = require('path');
module.exports = {
    entry: {
        app :'./src/app.ts'
    },
    output: {
		path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions:['.ts', '.webpack.js', '.web.js', '.js']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
}
```

## run 

```
$ ./node_modules/webpack-cli/bin/cli.js
$ cat ./dist/app.bundle.js
```


## gulp-webpack

```
$ vi gulpfile.js
```

```
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
```

## run & watch

```
$ gulp
$ gulp watch
```


## warning

下記のようなwarningが出る

```
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
```

webpack.config.jsに下記1行を追加することで対応が可能。

```
module.exports = {
	mode: "development",
}
```

productionモードと切り替える方法は別記する。