import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import { Button } from './Button';
import {Chat} from './Chat';


export default class App extends Component {

	componentDidMount(){
		
		FB.getLoginStatus((response) => {
			if (response.status == 'connected') {
				var uid = response.authResponse.userID;
				//console.log("user id: " + uid);
				//console.log("AccessToken: " + response.authResponse.accessToken);
				//Socket.emit('token', {
				//	'facebook_user_token': response.authResponse.accessToken
				//});

				FB.api(
					"/" + uid + "/friends",
					function(response) {
						if (response && !response.error) {
							console.log("friends response no error");
						}
					}
				);

			}
		});
		
		/*Socket.on('login', (data) => {
			this.setState({
				'token': data['token']
			});
		});
		*/
	}

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
				<div>
					<Chat />
				</div>
				{this.props.children}
			</div>
		);
	}
}