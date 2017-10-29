
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(<BrowserRouter basename="/react-to-do-list"><App /></BrowserRouter>, document.getElementById('root'));
