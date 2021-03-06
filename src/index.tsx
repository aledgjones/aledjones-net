import React from 'react';
import ReactDOM from 'react-dom';

import { Shell } from './components/shell';

import * as serviceWorker from './serviceWorker';

import 'app-reset/app-reset.css';
import './ui/index.css';
import './index.css';

ReactDOM.render(<Shell />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
