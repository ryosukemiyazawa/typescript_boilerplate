# 06. TypeScriptからJSを読み込む

前項での手法は外部モジュールにする煩雑さであったり、型定義ファイルを用意するという問題点があります。

1. JavaScriptファイルが多くて型定義ファイルを用意できない
2. コード補完や型チェックは必須でない
3. JS->TypeScriptの移行を徐々にすすめたい

といった場合にはallowJSを使う方法があります。

## allowJSオプション

tsconfig.jsonのオプションを変更することで、JSファイルを読み込むことができます。


```tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": false,
	"outDir": "dist",
	"charset": "utf8",
	"allowJs" : true,
	"declaration": false
  }
}
```

```"allowJs" : true,```と```"declaration": false```を追加しています。

## JSの読み込み

```
src
├── tsjsmix
│   ├── Food.js
│   └── Shop.ts
└── tsjsmix.ts
```

```tsjsmix.ts
import Shop from './tsjsmix/Shop';
export { Shop }
```

```tsjsmix/Shop.ts
import Food from "./Food";

export default class Shop {

	private name : string;
	private _foodList : Food[] = [];

	constructor(name: string) {
		this.name = name
	}

	get foodList(): Food[] {
		return this._foodList;
	}

	public createFood(name: string) : Food{
		return new Food(name);
	}

	public join(food: Food){
		this._foodList.push(food)
	}

	public greeting(){
		console.log("food", this.name, this._foodList.length, "foods")
		for(let food of this._foodList){
			food.greeting()
		}
	}

}
```

```tsjsmix/Food.js
'use strict';

export default class Food {

	constructor(name) {
		this.name = name
	}
	
	greeting() {
		console.log('Hi, I am Food(', this.name, ")");
	}
}
```

Shop.tsから他のモジュール同様にjsファイルをインポートできます。

型ファイルが無いため、warningとなりますが、コンパイルすることができます。


