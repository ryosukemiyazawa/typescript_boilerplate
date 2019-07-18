# 04. testing

## handbook

書き方に迷ったらここを見ます。

- https://www.typescriptlang.org/docs/handbook/basic-types.html


## install 

mochaとpower-assertをインストールします。

```
$ npm install mocha @types/mocha power-assert @types/power-assert --save-dev
```

## テスト用のクラスを準備

```
src
└── todo
    ├── Task.ts
    └── TaskManager.ts
```

```Task.ts
export default class Task {

	public message : string;

	constructor(message: string) {
		this.message = message;
	}

}
```

```TaskManager.ts
import Task from './Task'

export default class TaskManager {

	private _taskList : Task[] = []

	constructor() {
		
	}

	get taskList() : Task[] {
		return this._taskList;
	}

	public add(message: string):Task{
		let task = new Task(message)
		this._taskList.push(task)
		return task
	}

	public remove(target : Task){
		this._taskList = this.taskList.filter(task => task != target)
	}

}

```


## テストコード

```
test
└── todo
    └── TodoTest.ts
```

```TodoTest.ts
import * as assert from 'power-assert';
import TaskManager from '../../src/todo/TaskManager';
import Task from '../../src/todo/Task';

describe('TodoTest', () => {
	it('タスク追加のテスト', () => {
		let manager = new TaskManager()
		let task:Task = manager.add("タスクの追加")
		assert.equal(manager.taskList.length, 1)
	});

	it('タスク追加 -> 削除テスト', () => {
		let manager = new TaskManager()
		let task:Task = manager.add("タスクの追加")
		manager.remove(task)
		assert.equal(manager.taskList.length, 0)
	});
});
```


## run

tscでコンパイルして、mocha経由でテストを実行します。

```
$ tsc
$ ./node_modules/mocha/bin/mocha dist/test/todo/TodoTest.js
```

``package.json``を編集しておくと、テストの実行が簡単になります。

```
"scripts": {
	"test": "./node_modules/mocha/bin/mocha dist/test/*"
},
```

```
$ npm test
```