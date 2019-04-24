import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function EditTask(props) {
	const { task, categories, updateTask, back } = props;

	const [name, setName] = useState(task.name);
	const [description, setDescription] = useState(task.description);
	const [dueDate, setDueDate] = useState(task.dueDate);
	const [categoryId, setCategoryId] = useState(task.categoryId);
	const [error, setError] = useState({});

	function validate() {
		let newErrors = {};

		if (name.length === 0) {
			newErrors.name = 'Name Required';
		}

		setError(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	function save() {
		if (validate()) {
			const _dueDate = new Date(dueDate);
			_dueDate.setMinutes(_dueDate.getMinutes() + _dueDate.getTimezoneOffset());

			let _task = {
				...task,
				name,
				description,
				dueDate: !!dueDate ? new Date(_dueDate).toISOString() : null,
				categoryId
			};
			updateTask(_task);
		}
	}

	return (
		<div className="taskInfoContainerEdit flexCol">
			<div className={`formGroup ${!!error.name ? 'hasError' : ''}`}>
				<label>{!!error.name ? error.name : 'Name'}</label>
				<input type="text" value={name} onChange={e => setName(e.target.value)} />
			</div>
			<div className="formGroup">
				<label>Description</label>
				<textarea value={description} onChange={e => setDescription(e.target.value)} />
			</div>
			<div className="formGroup">
				<label>Due Date</label>
				<input
					type="date"
					value={!!dueDate ? new Date(dueDate).toISOString().substr(0, 10) : ''}
					onChange={e => setDueDate(e.target.value)}
				/>
			</div>
			<div className="formGroup">
				<label>Category</label>
				<select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
					<option value="">None</option>
					{categories.map((category, i) => (
						<option key={i} value={category.id}>
							{category.displayName}
						</option>
					))}
				</select>
			</div>
			<div className="flexRow" style={{ justifyContent: 'flex-start', paddingLeft: 10 }}>
				<button onClick={back}>Cancel</button>
				<button style={{ margin: '0 5px' }} onClick={save}>
					Save
				</button>
			</div>
		</div>
	);
}

function TaskInfo(props) {
	const { task, updateTask, categories, deleteTask } = props;
	const [checkHover, setCheckHover] = useState(false);
	const [isEdit, setIsEdit] = useState(props.isEdit);

	useEffect(() => {
		setIsEdit(props.isEdit);
	}, [task]);

	if (!!!task)
		return (
			<div className="taskInfoContainer">
				<h3 style={{ paddingLeft: 15 }}>No task selected</h3>
			</div>
		);
	else if (isEdit) {
		return (
			<EditTask
				task={task}
				back={() => setIsEdit(false)}
				updateTask={updateTask}
				categories={categories}
			/>
		);
	} else
		return (
			<div className="taskInfoContainer flexCol">
				<div>
					<div className="flexRow title">
						<div style={{ paddingTop: 2 }}>
							<i
								className={`${checkHover ? 'fa' : 'far'} fa-check-circle`}
								onMouseEnter={() => setCheckHover(true)}
								onMouseLeave={() => setCheckHover(null)}
							/>
						</div>
						<div>
							<p className="title">{task.name}</p>
							{!!task.dueDate && (
								<div className="dueDate">Due: {new Date(task.dueDate).toLocaleDateString()}</div>
							)}
						</div>
					</div>
					<div className="description">{task.description}</div>
				</div>
				<div className="flexRow" style={{ justifyContent: 'flex-end', marginBottom: 5 }}>
					<button onClick={() => setIsEdit(true)}>
						<i className="fa fa-pencil-alt" />
						Edit
					</button>
					<button style={{ margin: '0 5px' }} onClick={() => deleteTask(task.id)}>
						<i className="fa fa-trash" />
						Delete
					</button>
				</div>
			</div>
		);
}

TaskInfo.propTypes = {
	task: PropTypes.object,
	isEdit: PropTypes.bool,
	deleteTask: PropTypes.func,
	updateTask: PropTypes.func,
	categories: PropTypes.array
};

export default TaskInfo;
