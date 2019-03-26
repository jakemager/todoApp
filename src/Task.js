import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Task(props) {
	const { name, completed } = props.task;
	const dueDate = !!props.task.dueDate ? new Date(props.task.dueDate).toLocaleDateString() : null;
	const passedDue =
		!!dueDate &&
		new Date(props.task.dueDate).getDate() !== new Date().getDate() &&
		new Date(props.task.dueDate) < new Date();
	const [checkHover, setCheckHover] = useState(false);

	return (
		<div className={`taskItem ${props.selected ? 'selected' : ''} ${completed ? 'completed' : ''}`}>
			<div style={{ paddingTop: 20, paddingLeft: 15 }}>
				<i
					className={`${checkHover || completed ? 'fa' : 'far'} fa-check-circle`}
					onMouseEnter={() => setCheckHover(true)}
					onMouseLeave={() => setCheckHover(null)}
					onClick={() => {
						let newTask = { ...props.task, completed: !completed };
						props.updateTask(newTask);
					}}
				/>
			</div>

			<div className="taskInfo flexCol" onClick={props.setSelectTask}>
				<p className="title">{name}</p>
				{!!dueDate && (
					<p className="dueDate" style={{ color: passedDue && !completed ? 'red' : '' }}>
						Due: {dueDate}
					</p>
				)}
			</div>
		</div>
	);
}

Task.propTypes = {
	selected: PropTypes.bool,
	task: PropTypes.object,
	setSelectTask: PropTypes.func,
	updateTask: PropTypes.func
};

export default Task;
