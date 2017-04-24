import React, {	Component }from 'react';
import { connect } from 'react-redux';
import Facebook from './facebook';
import Header from './header';
import { Button } from './Button';
import { Chat } from './Chat';

export default class App extends Component {

	
	render() {
		return (
			<div className="app container">
				
				<Facebook />
				<Header />
				<div>
					<Chat />
				</div>
				
				{this.props.children}
			</div>
		);
	}
}
