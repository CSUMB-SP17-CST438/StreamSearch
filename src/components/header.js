import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';
<<<<<<< HEAD
import { Link } from 'react-router';
import { Socket } from './Socket';


=======
>>>>>>> 271ccfed04d43228ffa4cbd4620e69241064ef28

export default class App extends Component {
	componentDidMount(){
		Socket.on('login', (data) => {this.setState({'token': data['token']});});
       FB.getLoginStatus((response) => {if (response.status == 'connected') 
            {
                Socket.emit('token', {'facebook_user_token':response.authResponse.accessToken});
            }
       });
    }
	

	render() {
		return (
			
			<header className="header">
			
				<h1>STREAM SEARCH</h1>
			        <h2>Let us do the Searching for you!</h2>
			    <div                  
                    className="fb-login-button"     
                    data-max-rows="1"
                    data-size="medium"
                    data-show-faces="false" 
                    data-auto-logout-link="true">
                </div>  
			</header>
		);
	}
}
