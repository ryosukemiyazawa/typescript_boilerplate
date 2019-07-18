import * as assert from 'power-assert';
import TaskManager from '../../src/todo/TaskManager';
import Task from '../../src/todo/Task';

describe('TodoTest', () => {
	it('タスク追加のテスト', () => {
		let manager = new TaskManager()
		let task:Task = manager.add("タスクの追加")
		assert.equal(manager.taskList.length, 1)
	});

	it('タスク追加 -> 削除テスト', () => {
		let manager = new TaskManager()
		let task:Task = manager.add("タスクの追加")
		manager.remove(task)
		assert.equal(manager.taskList.length, 0)
	});
});