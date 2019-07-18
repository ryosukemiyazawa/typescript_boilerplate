# 00. startup

ES6での開発が中心したが、TypeScriptでの移行を検討しているための備忘録です。

ES6での開発での不満がそこまであるわけではないですが、Babelのバージョン変更で書き方が大きくかわったり、大規模化するにあたってクラスが複雑になってきたりがあるので、部分的でも良いのでTypeScriptが導入できないものかと、下調べをしています。

## enviroment

環境について。

2019-07-16時点での開発環境(Mac)のバージョンです。

```
$ node -v
v12.3.1
$ npm -v
6.9.0
```

## install typescript

TypeScriptをインストールします。

```
$ npm i typescript -g
$ tsc -v
Version 3.5.3
```

TypeScriptは``tsc``コマンドでやり取りするようです。

## init project

```
$ tsc --init
$ vi tsconfig.json
< 	"outDir": "dist",
```

``tsconfig.json``が生成されるので、書き出し先を設定します。


## add new script

```
$ mkdir src
$ touch src/index.ts
```

```src/index.ts
const HOGE = '📛';

export function hello(word: string = HOGE): string {
  return `Tohu fired: ${word}! `;
}
```

## run & watch

```
$ tsc
$ node dist/index.js
```

watch mode

```
$ tsc -w
```
