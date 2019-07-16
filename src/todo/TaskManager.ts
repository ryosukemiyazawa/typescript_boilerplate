import Task from './Task'

export default class TaskManager {

	private taskList : Task[] = []

	constructor() {
		
	}

	public add(message: string){
		this.taskList.push(new Task(message))
	}

	public remove(target : Task){
		this.taskList = this.taskList.filter(task => task != target)
	}

}
