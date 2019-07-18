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
