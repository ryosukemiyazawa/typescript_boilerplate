# 05. TypeScript、ES6の共存

ES6で始めたプロジェクトをTypeScriptに移行する場合、コードが共存することがあります。

### 別プロジェクトとして作成して、TypeScriptからimportして使う

ES6で作成したプロジェクトをlib以下に配置して、コンパイルしてTypeScriptのプロジェクトから使う形です。

```
lib
└── es6sample
    └── src
        ├── Person.es6
        └── index.es6	//es6sample用のentry

src
├── app.ts
└── ts
    └── Group.ts

```

```Person.es6
'use strict';

export default class Person {

	constructor(name, age) {
		this.name = name
		this.age = age
	}
	
	greeting() {
		console.log('Hi, I am ', this.name, this.age, "years old");
	}
}
```

## HOWTO

簡単に説明すると、次のような流れで過去のES6のコードを利用します。

- ``lib/es6sample``を``es6smaple``というモジュールに変換
- ``src/app.ts``を``app``というモジュールに変換
- ``<script>``タグで上記モジュールを読み込む

HTML側では次のようにそれぞれのモジュールを読み込みます。

```
<script type="text/javascript" src="dist/lib/es6sample.bundle.js"></script>
<script type="text/javascript" src="dist/app.bundle.js"></script>
<script type="text/javascript">
var group = new app.Group("グループです");
var person = group.createPerson("山田", 20);
</script>
```

### es6sample/index.es6の作成

es6sampleのPersonクラスを外部から利用可能とするためのエントリースクリプトを作成します。

```lib/es6sample/src/index.es6
import Person from "./Person.es6"
export { Person }
```


#### gulpfile

WebpackでES6を変換するスクリプトを作成します。

``babel-loader``を利用するためにライブラリを追加でインストールします。

```
$ npm install --save-dev @babel/core @babel/preset-env babel-loader
```

続いて、gulpfileを書き換えてes6sampleモジュールを作成するためのタスクを設定します。

```gulpfile.js
gulp.task('es6', (done) => {
	
	gulp.src(["./lib/**/*.es6"])
	.pipe(webpackStream({
		mode: 'development',
		entry: ['./lib/es6sample/src/index.es6'],
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
```

gulp経由で実行し``lib/es6sample.bundle.js``が作成されればOKです。

```
$ gulp es6
```

``lib/es6sample.bundle.js``の先頭は次のようになっていて、モジュールがグローバルに設定されます。

```lib/es6sample.bundle.js
var es6sample =
/******/ (function(modules) { // webpackBootstrap
...
```

## TypeScriptからモジュールを利用する

TypeScriptから外部モジュールを利用するには、そのままではコンパイルエラーが発生します。

利用するモジュールに応じて型定義ファイルを作成する必要があります。

jQueryなど、有名なライブラリは型定義ファイルが用意されていますが、今回は自作クラスなので型定義ファイルを手動で用意する必要があります。


### 型定義ファイルの作成

TypeScriptのコンパイルができるように、型定義ファイルを設置します。

``src/@types/es6sample/``ディレクトリに型定義ファイルを設置します。

``@types``ディレクトリは型定義ファイルを設置する規定ディレクトリですが、設定ファイルなどで設置場所を変更することも可能です。

```@types/es6sample/index.d.ts
declare namespace es6sample {

	class Person {

		public name:string;
		public age:number;
	
		constructor(name: string, age: number);
	
		greeting(): this;
	
	}

}
```

### TypeScriptから上記クラスを利用する

```<reference path="利用するモジュールの型のパス" />```と書くことで、任意のモジュールを読み込むことができます。

```src/ts/Group.ts6
/// <reference path="../@types/es6sample/index.d.ts" />

export default class Group {

	private name : string;
	private _personList : es6sample.Person[] = [];

	constructor(name: string) {
		this.name = name
	}

	get personList(): es6sample.Person[] {
		return this._personList;
	}

	public createPerson(name: string, age: number) : es6sample.Person{
		return new es6sample.Person(name,age);
	}

	public join(person: es6sample.Person){
		this._personList.push(person)
	}

	public greeting(){
		console.log("group", this.name, this._personList.length, "members")
		for(let person of this._personList){
			person.greeting()
		}
	}

}
```

## webpackでappモジュールを書き出す

``webpack.config.js``と``app.ts``を書き換えて、作成したGroupクラスを書き出します。


```webpack.config.js
output: {
	library: "app",
	path: path.resolve(__dirname, 'dist'),
	filename: '[name].bundle.js'
},
```

```app.ts
import Group from './ts/Group';
export { Group }
```

## run & test

gulpで変換を実行し、ブラウザからテストします。

```
$ gulp es6
$ gulp webpack
```

次のように出力されたらOKです。

```
<script type="text/javascript" src="dist/lib/es6sample.bundle.js"></script>
<script type="text/javascript" src="dist/app.bundle.js"></script>
<script type="text/javascript">
var group = new app.Group("グループです");
var person = group.createPerson("山田", 20);
group.join(person);
group.greeting();
</script>
```

```
group グループです 1 members
Person.es6:12 Hi, I am  山田 20 years old
```