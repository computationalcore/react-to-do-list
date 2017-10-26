import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';
import ColumnList from './ColumnList';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import SwipeableViews from 'react-swipeable-views';

import sortBy from 'sort-by';
import CheckIcon from 'material-ui/svg-icons/action/check-circle';
import ListIcon from 'material-ui/svg-icons/action/list';
import TodoIcon from 'material-ui/svg-icons/action/today';

const styles = {
	headline: {
		fontSize: 24,
		paddingTop: 16,
		marginBottom: 12,
		fontWeight: 400,
	},
	slide: {
		padding: 10,
	},
};

/**
 * @description Main App component.
 * @constructor
 * @param {Object} props - The props that were defined by the caller of this component.
 */
class App extends Component {
	constructor(props) {
		super(props);

		/**
		 * @typedef {Object} ComponentState
		 * @property {Object[]} items - All list items of the app.
		 * @property {boolean} submitDisabled - Indicates whether the submit button is disabled.
		 */

		/** @type {ComponentState} */
		this.state = {
			items: [],
			submitDisabled: true,
			slideIndex: 0,
		};
	}

	/**
	 * Lifecycle event handler called just after the App loads into the DOM.
	 * Get any save items from the local storage and render it.
	 */
	componentWillMount() {
		const toDoListItems = window.localStorage.getItem('toDoListItems') || '[]';
		//Get
		this.setState(
			{
				items: JSON.parse(toDoListItems)
			}
		);
	}

	/**
	 * Add task to the To Do list.
	 */
	handleAddTask = () => {
		const input = this.taskInput.input || {};
		const { value = '' } = input;

		this.setState(previousState => {
			const { items = [] } = previousState;
			const newTask = {
				id: items.length + 1,
				title: value,
				status: 'To Do'
			};
			items.push(newTask);
			return {
				items: items.sort(sortBy('id')),
				submitDisabled: true,
			}
		}, function stateUpdateComplete() {
			this.taskInput.input.value = '';
			this.updateLocalStorage(this.state.items);
		}.bind(this));
	};

	/**
	 * Update task toggling between To Do/Done status.
	 * @param {Object} target - The checkbox element
	 * @param {Object} task - The task to be updated
	 */
	handleUpdateTask = (task) => {
		console.log(task);
		this.setState(previousState => {
			const { items } = previousState;
			const filteredItems = items.filter( item => item.id !== task.id);
			task.status = (task.status === 'To Do') ? 'Done' : 'To Do';
			filteredItems.push(task);
			return {
				items: filteredItems.sort(sortBy('id'))
			}
		}, function stateUpdateComplete() {
			this.updateLocalStorage(this.state.items);
		}.bind(this));
	};

	/**
	 * @description Handle the Account Key TextField input change. It enable the submit button if field is not empty or
	 * disable it otherwise.
	 * @param {Object} event -
	 * @param {value} value -
	 */
	handleTextFieldChange = (event, value) => {
		if((value.length > 0) && this.state.submitDisabled){
			this.setState({submitDisabled: false});
		}
		else if((value.length === 0) && !this.state.submitDisabled){
			this.setState({submitDisabled: true});
		}
	};

	/**
	 * Save items to local storage.
	 * @param {Object[]} items - Array of items to be saved.
	 */
	updateLocalStorage = (items) => {
		window.localStorage.setItem('toDoListItems', JSON.stringify(items));
	};

	handleChange = (value) => {
		this.setState({
			slideIndex: value,
		}, function stateUpdateComplete() {
			// Fix scroll in swipe transitions
			window.scrollTo(0, 0);
		}.bind(this));
	};

	render() {
		const { items = [] } = this.state;
		const columns = [
			{ title: 'To Do', items, icon: <TodoIcon />},
			{ title: 'Done', items, icon: <CheckIcon />},
			{ title: 'All', items, icon: <ListIcon />},
		];
		return (
			<MuiThemeProvider>
				<div className="App">
					<AppBar
						title={<span style={{color: 'white'}}>To-Do List</span>}
						showMenuIconButton={false}
						style={{backgroundColor: 'rgb(0, 151, 167)', position: 'fixed', zIndex: 9999,}}
					/>
					<div className="App-container">
						<div style={{position: 'fixed', width: '100%', paddingTop: 64, zIndex: 8888, backgroundColor: 'white'}}>
							<TextField
								hintText="Type task"
								floatingLabelText="Add Task"
								ref={(taskInput) => {
									this.taskInput = taskInput;
								}}
								style={{margin: 10, width: '60%', maxWidth: 300}}
								onChange={this.handleTextFieldChange}
							/>
							<RaisedButton
								style={{margin: 10, width: '30%', maxWidth: 56}}
								label="Create"
								onClick={this.handleAddTask}
								disabled={this.state.submitDisabled} />
							<Tabs
								onChange={this.handleChange}
								value={this.state.slideIndex}
							>
								{columns.map((column,index) => (
									<Tab
										key={index}
										value={index}
										icon={column.icon}
										label={
											<div>
												{column.title} ({(column.title !== 'All') ? column.items.filter(item => item.status === column.title).length: items.length})
											</div>
										}
									/>
								))}
							</Tabs>
						</div>
						<div className="app-separator">-</div>

						<div className="app-lists">
							<SwipeableViews
								index={this.state.slideIndex}
								onChangeIndex={this.handleChange}
								style={{width: '100%'}}
							>
								{columns.map((column,index) => (
									<div
										style={styles.slide}
										key={index}>
										<ColumnList
											title={column.title}
											items={column.items}
											addTask={this.handleAddTask}
											updateTask={this.handleUpdateTask}
										/>
									</div>
								))}
							</SwipeableViews>

						</div>
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
