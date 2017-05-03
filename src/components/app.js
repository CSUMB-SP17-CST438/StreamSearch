import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import { Button } from './Button';
import {Chat} from './Chat';
import {FriendsList} from './FriendsList';

export default class App extends Component {
	componentDidMount(){
       FB.getLoginStatus((response) => {if (response.status == 'connected') 
            {
            }
            else {
            	if (window.location.pathname != ('/login'))
            	window.location.replace('/login');
            }
       });
    }
	
	render() {
		FB.Event.subscribe("auth.logout", function() {window.location = '/login'});
		return (
			<div className="app container">
				<div className="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>
				<div id="fb-button"                 
                    className="fb-login-button"     
                    data-max-rows="1"
                    data-size="medium"
                    data-show-faces="true" 
                    data-auto-logout-link="true">
                </div>
				
				<Header />
				<div>
					<FriendsList />
					<Chat />
				</div>
				
				{this.props.children}
			</div>
		);
	}
}