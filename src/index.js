import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';

import { Router, browserHistory } from 'react-router';
import routes from './routes';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

console.log("index.js")

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Router history={browserHistory} routes={routes} />
	</Provider>
	, document.querySelector('#app')
);