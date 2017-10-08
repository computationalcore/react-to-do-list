import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h1 className="App-title">To-Do List</h1>
				</header>
				<div className="App-container">
					<div className="app-lists">
					</div>
				</div>
			</div>
		);
	}
}

export default App;
