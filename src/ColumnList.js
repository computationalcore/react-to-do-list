import React from 'react';
import PropTypes from 'prop-types';
import {CSSTransitionGroup} from 'react-transition-group';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import MobileTearSheet from './MobileTearSheet';
import sortBy from 'sort-by';
import './ColumnList.css';

/**
 * This object is used for type checking the props of the component.
 */
const propTypes = {
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
const ColumnList = ({title, items, updateTask}) => {
	const currentItems = (title !== 'All') ? items.filter(item => item.status === title).sort(sortBy('title')): items.sort(sortBy('title'));
	return (
		<div className="column-list">
			<MobileTearSheet style={{pading: 10}}>
				<List>
					<CSSTransitionGroup
						transitionName="task-animation"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={300}>
						{currentItems.map(item => (
							<ListItem key={item.id} onClick={() => updateTask(item)}>
								<Checkbox
									label={item.title}
									checked={item.status === 'Done'}
								/>
							</ListItem>
						))}
					</CSSTransitionGroup>
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
