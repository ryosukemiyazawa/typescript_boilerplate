const HOGE = '📛';

export function hello(word: string = HOGE): string {
  return `Tohu fired: ${word}! `;
}

class Person {

	public name: String;
	private _age : number;

	// getter／settter（プロパティ）
	get age(): number {
		return this._age;
	}
	set age(value: number) {
		this._age = value;
	}
	
	// コンストラクター
	constructor(name: string) {
		this.name = name;
		this._age = 10
	}

	// メンバーメソッド（パブリック）
	public say(): string {
		return this.getHelloString();
	}

	// メンバーメソッド（プライベート）
	private getHelloString(): string {
		return "Hello, " + this.name + "!";
	}

}

let taro = new Person("Taro");
taro.age = 17;
let words = taro.say(); // "Hello , " + name + "!"
let age = taro.age; // 17
console.log(words, age);

console.log("add gulp test")