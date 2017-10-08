import React from 'react';
import PropTypes from 'prop-types';
import './ColumnList.css';

/**
 * This object is used for type checking the props of the component.
 */
const propTypes = {
	title: PropTypes.string.isRequired,
	addTask: PropTypes.func.isRequired,
	//updateTask: PropTypes.func.isRequired,
};

/**
 * This object sets default values to the optional props.
 */
const defaultProps = {
	items: [],
};

/**
 * Represents the column list element.
 * @param {string} title - The title of the Column List\
 * @param {string[]} [items] - The title of the Column List
 * @param {} addTask -
 * @param {} updateTask -
 * @returns {XML} Return the stateless component markup
 * @constructor
 */
const ColumnList = ({title, items, addTask, updateTask}) => {
	const currentItems = items.filter(_ => _.status === title);
	return (
		<div className="column-list">
			<h3>{title}</h3>
			<form onSubmit={addTask}>
				<input type="text" placeholder="Create a task" />
				<button type="submit">
					Create
				</button>
			</form>
			<ul className="list-items">
				{currentItems.map(item => (
					<li key={item.id}>
						<input
							type="checkbox"
							checked={title === 'Done'}
							onChange={updateTask}
						/>
						<span>{item.title}</span>
					</li>
				))}
			</ul>
		</div>
	)
};

// Type checking the props of the component
ColumnList.propTypes = propTypes;

// Assign default values to the optional props
ColumnList.defaultProps = defaultProps;

export default ColumnList;
