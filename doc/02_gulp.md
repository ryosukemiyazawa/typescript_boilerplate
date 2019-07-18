# 01. gulp

## enviroment

```
$ gulp -version
CLI version: 2.2.0
Local version: Unknown
```

its too old...but i can't not replace gulp other projects...

## init

```
$ npm init
$ npm install --save-dev typescript gulp@4.0.0 gulp-typescript
$ gulp -version
CLI version: 2.2.0
Local version: 4.0.0
```

## create gulpfile

```
$ touch gulpfile.js
```

```gulpfile.js
var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', (done) => {
    tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
	done()
})

gulp.task("watch", (done) => {
	gulp.watch(["src/**/*.ts", "src/**/*.es6", "src/**/*.js"], gulp.series('default'));
	done()
})
```

## run & watch

```
$ gulp
$ node dist/index.ts
```

watch mode

```
$ gulp watch
```
