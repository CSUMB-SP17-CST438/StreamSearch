import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

export class Login extends Component {

	componentDidMount(){
       FB.getLoginStatus((response) => {if (response.status == 'connected') 
            {
            	window.location.replace('/');
            }
       });
    }
    render() {
       FB.Event.subscribe("auth.login", function() {window.location = '/'});
        return(
            <div id="login_button">
                   <div className="fb-login-button" 
                   data-max-rows="1" 
                   data-size="large" 
                   data-button-type="continue_with" 
                   data-show-faces="true" 
                   data-auto-logout-link="false" 
                   data-use-continue-as="false"
                   data-scope="public_profile, user_friends"
                   ></div>
            </div>
        );
    }
	
}
function mapStateToProps({ movies }) {
	return {
	};
}

export default connect(mapStateToProps, { })(Login);