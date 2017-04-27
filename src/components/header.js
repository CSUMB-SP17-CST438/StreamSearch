import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import { Link } from 'react-router';
import { Socket } from './Socket';


export default class App extends Component {
	
	componentDidMount(){
		Socket.on('login', (data) => {this.setState({'token': data['token']});});
       FB.getLoginStatus((response) => {if (response.status == 'connected') 
            {
            	console.log(response);
                Socket.emit('friends', {'fb_access_token':response.authResponse.accessToken});
            }
       });
    }
	
	render() {
		return (
			
			<header className="header">
				<h1>STREAM SEARCH</h1>
			        <h2>Let us do the Searching for you!</h2>
			    
			</header>
		);
	}
}
