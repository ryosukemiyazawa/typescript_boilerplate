import Food from "./module/Food";

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
