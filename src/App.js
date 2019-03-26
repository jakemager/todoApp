import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import Categories from './Categories';
import TaskList from './TaskList';
import TaskInfo from './TaskInfo';

import { getTask } from './FakeData';
import { getCategories } from './FakeData';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedCategory: '',
			selectedTask: null,
			tasks: getTask,
			categories: getCategories
		};
	}

	updateTask = task => {
		let newTasks = [...this.state.tasks];
		let newTask = task;
		let editTask = false;

		// Find index of task
		const index = newTasks.findIndex(obj => obj.id === task.id);

		// If no index create the task else modify it
		if (index < 0) {
			newTask = { ...task, id: Math.floor(Math.random() * 50) };
			newTasks.push(newTask);
			editTask = true;
		} else {
			newTasks[index] = task;
		}

		// Set edit so the user can update the other information
		this.setState({ tasks: newTasks, selectedTask: newTask, editTask });
	};

	deleteTask = taskId => {
		this.setState({
			tasks: this.state.tasks.filter(task => task.id !== taskId),
			selectedTask: null
		});
	};

	updateCategory = category => {
		let newCategories = [...this.state.categories];
		let newCategory = category;

		// Find index of category
		const index = newCategories.findIndex(obj => obj.id === newCategory.id);

		// If no index create the new category else modify it
		if (index < 0) {
			newCategory = { ...newCategory, id: Math.floor(Math.random() * 50) + '' };
			newCategories.push(newCategory);
		} else {
			newCategories[index] = newCategory;
		}

		this.setState({ categories: newCategories });
	};

	// Delete category and remove category from all task
	deleteCategory = categoryId => {
		this.setState({
			categories: this.state.categories.filter(category => category.id !== categoryId),
			tasks: this.state.tasks.map(task => {
				if (task.categoryId === categoryId) return { ...task, categoryId: '' };
				else return task;
			}),
			selectedTask: null
		});
	};

	filterTasks = () => {
		const { selectedCategory, tasks } = this.state;
		if (selectedCategory) {
			// Filter tasks by selcted categoryId
			return tasks.filter(task => task.categoryId === selectedCategory);
		} else {
			return tasks;
		}
	};

	render() {
		const { selectedCategory, selectedTask, editTask, categories } = this.state;

		return (
			<div className="todoContainer">
				<Categories
					selectedCategory={selectedCategory}
					setSelectedCategory={e =>
						this.setState({ selectedCategory: e, selectedTask: null, editTask: false })
					}
					categories={categories}
					updateCategory={this.updateCategory}
					deleteCategory={this.deleteCategory}
				/>
				<TaskList
					selectedCategory={selectedCategory}
					tasks={this.filterTasks()}
					selectedTask={selectedTask}
					setSelectTask={e => this.setState({ selectedTask: e, editTask: false })}
					updateTask={this.updateTask}
					categories={categories}
				/>
				<TaskInfo
					task={selectedTask}
					deleteTask={this.deleteTask}
					updateTask={this.updateTask}
					isEdit={editTask}
					categories={categories}
				/>
			</div>
		);
	}
}

export default App;
