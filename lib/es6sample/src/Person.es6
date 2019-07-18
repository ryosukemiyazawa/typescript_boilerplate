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