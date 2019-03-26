import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Cateorgies(props) {
	const { setSelectedCategory, selectedCategory } = props;
	const [newCategoryText, setNewCategoryText] = useState('');
	const [isEdit, setIsEdit] = useState(false);
	const [currentEdit, setCurrentEdit] = useState(null);
	const [filter, setFilter] = useState('');

	useEffect(() => {
		const textbox = document.getElementById('categoryText');
		if (!!currentEdit) {
			setNewCategoryText(currentEdit.displayName);
			textbox.focus();
			textbox.scrollIntoView();
		} else {
			textbox.blur();
		}
	}, [currentEdit]);

	useEffect(() => {
		if (!isEdit) {
			setNewCategoryText('');
			setCurrentEdit(null);
		}
	}, [isEdit]);

	function addEditCategory() {
		if (newCategoryText.length) {
			props.updateCategory({
				displayName: newCategoryText,
				id: !!currentEdit ? currentEdit.id : null
			});

			setNewCategoryText('');
			setCurrentEdit(null);
			setIsEdit(false);
		}
	}

	return (
		<div className="categoryContainer">
			<div className="flexRow search" style={{ justifyContent: 'center', margin: '10px 0' }}>
				<i className="fas fa-search" />
				<input
					className="search"
					type="text"
					placeholder="Search Categories..."
					onChange={e => setFilter(e.target.value)}
				/>
			</div>
			<div
				className={`categoryItem ${selectedCategory.length === 0 ? 'selected' : ''}`}
				onClick={() => setSelectedCategory('')}
			>
				Show All Task
			</div>

			<hr />
			<div style={{ marginBottom: 20 }}>
				{props.categories
					.filter(category => category.displayName.toLowerCase().includes(filter.toLowerCase()))
					.map((category, i) => (
						<div
							key={i}
							className={`categoryItem ${selectedCategory === category.id ? 'selected' : ''}`}
						>
							{isEdit ? (
								<React.Fragment>
									<i className="fa fa-pencil-alt" onClick={() => setCurrentEdit(category)} />
									<i className="fa fa-trash" onClick={() => props.deleteCategory(category.id)} />
								</React.Fragment>
							) : (
								<i className="fa fa-list" />
							)}
							<div onClick={() => setSelectedCategory(category.id)}>{category.displayName}</div>
						</div>
					))}
			</div>
			{!!currentEdit && <div className="updateText">{`Updating ${currentEdit.displayName}`}</div>}
			<div className="newCategory flexRow">
				<input
					type="text"
					id="categoryText"
					placeholder="New Category"
					style={{ width: '45%' }}
					onChange={e => setNewCategoryText(e.target.value)}
					onKeyDown={e => {
						e.keyCode === 13 && addEditCategory();
					}}
					value={newCategoryText}
				/>
				<button style={{ marginLeft: 5 }} onClick={addEditCategory}>
					{!!currentEdit ? 'Update' : 'Create'}
				</button>
			</div>
			<div className="editCategories flexRow">
				<button onClick={() => setIsEdit(!isEdit)}>{isEdit ? 'Cancel' : 'Edit Categories'}</button>
			</div>
		</div>
	);
}

Cateorgies.propTypes = {
	selectedCategory: PropTypes.string,
	setSelectedCategory: PropTypes.func,
	categories: PropTypes.array,
	updateCategory: PropTypes.func,
	deleteCategory: PropTypes.func
};

export default Cateorgies;
