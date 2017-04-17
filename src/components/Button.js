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
        Socket.emit('new message', {'message': text,});
        
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <button>Send Message</button>
            </form>
        );
    }
}