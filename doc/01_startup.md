00. startup
==================================

## enviroment

```
$ node -v
v12.3.1
$ npm -v
6.9.0
```

## install typescript

```
$ npm i typescript -g
$ tsc -v
Version 3.5.3
```

## init project

```
$ tsc --init
$ vi tsconfig.json
< 	"outDir": "dist",
```

``tsconfig.json``が生成される


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
