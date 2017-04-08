import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';

export default class App extends Component {

	render() {
		return (
			<header className="header">
				<h1>STREAM SEARCH</h1>
			        <h2>Let us do the Searching for you!</h2>
			</header>
		);
	}
}
