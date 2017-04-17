import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import { Button } from './Button';
import {Chat} from './Chat';


export default class App extends Component {

	render() {
		return (
			<div className="app container">
				<Header />
				<div>
					<Chat />
				</div>
				{this.props.children}
			</div>
		);
	}
}