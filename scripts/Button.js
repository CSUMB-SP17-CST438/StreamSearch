import * as React from 'react';

import { Socket } from './Socket';

export class Button extends React.Component {
    handleSubmit(event) {
        
        event.preventDefault();
        var text = document.getElementById("message_in").value;
        if (text == '')
        {
            return;
        }
        document.getElementById("message_in").value = "";
        FB.getLoginStatus((response) => {
            if (response.status == 'connected') 
            {
                Socket.emit('new number', {'facebook_user_token':response.authResponse.accessToken,'number': text,});
            } 
            else {
                let auth = gapi.auth2.getAuthInstance();
                let user = auth.currentUser.get();
                
                if (user.isSignedIn()) 
                {
                    Socket.emit('new number', {'google_user_token':user.getAuthResponse().id_token,'facebook_user_token': '','number': text,});
                }
            }
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <button>Send Message</button>
            </form>
        );
    }
}
