import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';

export default class App extends Component {

	render() {
		return (
			<div className="app container">
				<Header />
				{this.props.children}
			</div>
		);
	}
}