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
