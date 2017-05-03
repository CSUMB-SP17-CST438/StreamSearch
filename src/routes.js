// mapping of URL's to routed components
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import MoviesList from './components/movies_list';
import ShowsList from './components/shows_list';
import MoviesShow from './components/movies_show';
import ShowDetails from './components/show_details';
import Login from './components/login';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={MoviesList} />
		<Route component={MoviesList} path="movies" />
		<Route component={ShowsList} path="shows" />
		<Route component={MoviesShow} path="movies/:id" />
		<Route component={ShowDetails} path="shows/:id" />
		<Route component={Login} path="login" />
	</Route>
	
);