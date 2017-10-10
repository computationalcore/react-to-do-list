import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import ColumnList from './ColumnList';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';

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
		 */

		/** @type {ComponentState} */
		this.state = { items: []};
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
	 * @param {Object} event
	 */
	handleAddTask = (event) => {
		event.preventDefault();
		const { target = {} } = event;
		const input = target.querySelector('input') || {};
		const { value = '' } = input;

		this.setState(previousState => {
			const { items = [] } = previousState;
			const newTask = {
				id: items.length + 1,
				title: value,
				status: 'To Do'
			};
			items.push(newTask);
			return { items };
		});
	};

	/**
	 * Update task to Done.
	 * @param target
	 * @param task
	 */
	handleUpdateTask = (target, task) => {
		this.setState(previousState => {
			const { items } = previousState;
			const filteredItems = items.filter( item => item.id !== task.id);
			task.status = target.checked ? 'Done' : 'To Do';
			filteredItems.push(task);
			return {
				items: filteredItems
			}
		}, function stateUpdateComplete() {
			this.updateLocalStorage(this.state.items);
		}.bind(this));
	};

	/**
	 * Save items to local storage.
	 * @param {Object[]} items - Array of items to be saved.
	 */
	updateLocalStorage = (items) => {
		window.localStorage.setItem('toDoListItems', JSON.stringify(items));
	};

	render() {
		const { items = [] } = this.state;
		const columns = [
			{ title: 'To Do', items },
			{ title: 'Done', items },
		];
		return (
			<MuiThemeProvider>
				<div className="App">
					<AppBar
						title={<span style={{color: 'white'}}>To-Do List</span>}
						showMenuIconButton={false}
						style={{backgroundColor: 'rgb(0, 151, 167)'}}
					/>
					<div className="App-container">
						<TextField
							hintText="Type task"
							floatingLabelText="Add Task"
							style={{margin: 10}}
						/>
						<RaisedButton label="Create" />
						<div className="app-lists">
							{columns.map((column,index) => (
								<ColumnList
									key={index}
									title={column.title}
									items={column.items}
									addTask={this.handleAddTask}
									updateTask={this.handleUpdateTask}
								/>
							))}
						</div>
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
