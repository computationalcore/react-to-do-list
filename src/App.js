import React, {Component} from 'react';
import ColumnList from './ColumnList';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { items: []};
	}


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

	handleUpdateTask = (target, task) => {
		this.setState(previousState => {
			const { items } = previousState;
			const filteredItems = items.filter( item => item.id !== task.id);
			task.status = target.checked ? 'Done' : 'To Do';
			filteredItems.push(task);
			return {
				items: filteredItems
			}
		});
	};


	render() {
		const { items = [] } = this.state;
		const columns = [
			{ title: 'To Do', items },
			{ title: 'Done', items },
		];
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h1 className="App-title">To-Do List</h1>
				</header>
				<div className="App-container">
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
		);
	}
}

export default App;
