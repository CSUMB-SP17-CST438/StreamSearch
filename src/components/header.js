import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import { Link } from 'react-router';

export default class App extends Component {

	render() {
		return (
			<header className="header">
				<h1>STREAM SEARCH</h1>
			        <h2>Let us do the Searching for you!</h2>
			
			<Link key='1' to={'/shows'}>
					<h1>Show</h1>
			</Link>
			<Link key='2' to={'/movies'}>
					<h1>Movies</h1>
			</Link>
			</header>
		);
	}
}
