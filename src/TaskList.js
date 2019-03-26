import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

function TaskList(props) {
	// Get category name
	const selectedCategory = props.selectedCategory.length
		? props.categories.filter(category => category.id === props.selectedCategory)[0].displayName
		: 'All Tasks';

	const [filter, setFilter] = useState('');
	const [showCompleted, setShowCompleted] = useState(true);
	const [newTaskText, setNewTaskText] = useState('');

	function createTask() {
		let newTask = {
			categoryId: props.selectedCategory.length ? props.selectedCategory : '',
			completed: false,
			dueDate: null,
			name: newTaskText,
			description: ''
		};

		props.updateTask(newTask);

		setNewTaskText('');
	}

	return (
		<div className="taskListContainer">
			<div className="taskTitle">
				<div className="flexRow" style={{ justifyContent: 'space-between' }}>
					<div className="title">{selectedCategory}</div>
					<div className="flexRow search">
						<i className="fas fa-search" />
						<input
							className="search"
							type="text"
							onChange={e => setFilter(e.target.value)}
							placeholder="Search Task..."
						/>
					</div>
				</div>
				<div className="toggleCompleted" onClick={() => setShowCompleted(!showCompleted)}>
					{showCompleted ? 'Show Completed' : 'Hide Completed'}
				</div>
			</div>
			<div className="taskItems">
				<div className="taskItem">
					<div style={{ paddingTop: 20, paddingLeft: 15 }}>
						<i className="fa fa-plus-circle" />
					</div>

					<div className="taskInfo flexCol">
						<div className="flexRow">
							<input
								type="text"
								placeholder="New Task"
								style={{ width: 400 }}
								onChange={e => setNewTaskText(e.target.value)}
								onKeyDown={e => {
									e.keyCode === 13 && createTask();
								}}
								value={newTaskText}
							/>
							<button style={{ marginLeft: 5 }} onClick={createTask}>
								Create
							</button>
						</div>
					</div>
				</div>
				{props.tasks
					.filter(task => {
						let good = task.name.toLowerCase().includes(filter.toLowerCase());
						if (showCompleted) good = good && !task.completed;
						return good;
					})
					// Sort earliest date and date first
					.sort((a, b) => !!b.dueDate - !!a.dueDate || new Date(a.dueDate) - new Date(b.dueDate))
					.map((task, i) => {
						let isSelected = !!props.selectedTask && task.id === props.selectedTask.id;
						return (
							<Task
								key={i}
								task={task}
								setSelectTask={() => props.setSelectTask(task)}
								selected={isSelected}
								updateTask={props.updateTask}
							/>
						);
					})}
			</div>
		</div>
	);
}

TaskList.propTypes = {
	selectedCategory: PropTypes.string,
	tasks: PropTypes.array,
	selectedTask: PropTypes.object,
	setSelectTask: PropTypes.func,
	updateTask: PropTypes.func,
	categories: PropTypes.array
};

export default TaskList;
