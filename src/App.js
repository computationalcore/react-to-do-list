import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import ColumnList from './ColumnList';
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
		 * @property {boolean} submitDisabled - Indicates whether the submit button is disabled.
		 */

		/** @type {ComponentState} */
		this.state = {
			items: [],
			submitDisabled: true,
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
				items: items,
				submitDisabled: true,
			}
		}, function stateUpdateComplete() {
			this.taskInput.input.value = '';
		}.bind(this));
	};

	/**
	 * Update task toggling between To Do/Done status.
	 * @param {Object} target - The checkbox element
	 * @param {Object} task - The task to be updated
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
							ref={(taskInput) => {
								this.taskInput = taskInput;
							}}
							style={{margin: 10}}
							onChange={this.handleTextFieldChange}
						/>
						<RaisedButton
							label="Create"
							onClick={this.handleAddTask}
							disabled={this.state.submitDisabled} />
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
