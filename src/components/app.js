import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';

export default class App extends Component {

	render() {
		return (

			<div className="app container">
			<div                  
                    className="fb-login-button"     
                    data-max-rows="1"
                    data-size="medium"
                    data-show-faces="true" 
                    data-auto-logout-link="true">
            </div>  
				<Header />
				
				{this.props.children}
			</div>
		);
	}
}