// mapping of URL's to routed components
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import MoviesList from './components/movies_list';
import MoviesShow from './components/movies_show';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={MoviesList} />
		<Route component={MoviesShow} path="movies/:id" />
	</Route>
);