'use strict';

export default class Food {

	constructor(name) {
		this.name = name
	}
	
	greeting() {
		console.log('Hi, I am Food(', this.name, ")");
	}
}