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
    FacebookInviteFriends()
				{
				FB.ui({
				  method: 'send',
				  link: 'https://overlook-stream-search.herokuapp.com/',
				});
				/**
				 FB.ui({
				  method: 'share',
				  mobile_iframe: true,
				  href: 'https://developers.facebook.com/docs/',
				}, function(response){});
				*/
				}
	
	render() {
		FB.Event.subscribe("auth.logout", function() {window.location = '/login'});
		return (
			<div className="app container">
			<table>
			<tbody>
				<tr>
					<td>
						<a href='#' onClick={event => this.FacebookInviteFriends()}> 
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
					<td align="right">
						<div id="fb-button"                 
			                className="fb-login-button"     
			                data-max-rows="1"
			                data-size="medium"
			                data-show-faces="true" 
			                data-auto-logout-link="true">
			            </div>
		            </td>
	            </tr>
	            </tbody>
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