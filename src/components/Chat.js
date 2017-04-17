import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from './Button';
import { Socket } from './Socket';

export class Chat extends Component {

	constructor(props) {
		super(props);
		this.state = {
            'messages': [],
		}
	}
 componentDidMount() {
        Socket.on('all messages', (data) => {this.setState({'messages': data['messages']});});
 }
render() {
    
        let messages = this.state.messages.map((n, index) =>
            <li key={index}>
                {n.message}
            </li>
        );
	return (
	   
		<div className="chat-box" >
            <input type="checkbox" />
            <label data-expanded="Close Chatbox" data-collapsed="Open Chatbox"></label>
            <div className="chat-box-content">
            	<ul className = 'myUL'>
            	    <li>
            	       <p align="left">Welcome to StreamSearch! I am chillbot! I can reccomend content to you based on shows and movies you like! for a full commmand list type "Help"</p>
            	    </li>
            	    {messages}
                </ul>
                <input type = "text" id = "message_in"></input> <Button>Send</Button>
            </div>
        </div>
       
        );
	
    }
}