import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import MobileTearSheet from './MobileTearSheet';
import './ColumnList.css';

/**
 * This object is used for type checking the props of the component.
 */
const propTypes = {
	title: PropTypes.string.isRequired,
	addTask: PropTypes.func.isRequired,
	updateTask: PropTypes.func.isRequired,
};

/**
 * This object sets default values to the optional props.
 */
const defaultProps = {
	items: [],
};

/**
 * This callback type is called `addTask` and is displayed as a global symbol.
 *
 * @callback addTask
 * @param {Object} event - The event generate by submit the form.
 */

/**
 * This callback type is called `updateTask` and is displayed as a global symbol.
 *
 * @callback updateTask
 * @param {Object} target - The event generate by onChange.
 * @param {Object} item - The item to be updated.
 */

/**
 * Represents the column list element.
 * @param {Object} props - The props that were defined by the caller of this component.
 * @param {string} props.title - The title of this column list.
 * @param {string[]} [props.items] - The items of this list.
 * @param {addTask} props.addTask - Callback executed when user submit item.
 * @param {updateTask} props.updateTask - Callback executed when when user the done checkbox.
 * @returns {XML} Return the stateless component markup
 * @constructor
 */
const ColumnList = ({title, items, addTask, updateTask}) => {
	const currentItems = items.filter(item => item.status === title);
	return (
		<div className="column-list">
			<h3>{title}</h3>
			<MobileTearSheet style={{pading: 10}}>
				<List>
					{currentItems.map(item => (
						<ListItem key={item.id}>
							<Checkbox
								label={item.title}
								checked={title === 'Done'}
								onCheck={(e) => updateTask(e.target, item)}
							/>
						</ListItem>
					))}
				</List>
			</MobileTearSheet>
			<ul className="list-items">

			</ul>
		</div>
	)
};

// Type checking the props of the component
ColumnList.propTypes = propTypes;

// Assign default values to the optional props
ColumnList.defaultProps = defaultProps;

export default ColumnList;
