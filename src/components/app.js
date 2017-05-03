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
			<table>
				<tr>
					<td>
						<a href='#' onclick="FacebookInviteFriends();"> 
						Facebook Invite Friends Link
						</a><p></p>
						<div className="fb-like" 
							data-href="https://overlook-stream-search.herokuapp.com/" 
							data-layout="standard" 
							data-action="like" 
							data-size="small" 
							data-show-faces="false" 
							data-share="true">
						</div>
					</td>
					<td align="right" id="fb-button">
						<div id="fb-button"                 
			                className="fb-login-button"     
			                data-max-rows="1"
			                data-size="medium"
			                data-show-faces="true" 
			                data-auto-logout-link="true">
			            </div>
		            </td>
	            </tr>
            </table>
				
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