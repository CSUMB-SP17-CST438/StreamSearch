import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from './Button';
import { Socket } from './Socket';

export class FriendsList extends Component {

	constructor(props) {
		super(props);
		this.state = {
            'friends': [],
		}
	}
 componentDidMount() {
        Socket.on('friendsList', (data) => {this.setState({'friends': data['friends']});});
 }
render() {
    
        let friends = this.state.friends.map((n, index) =>
            <li key={index}>
                {n}
            </li>
        );
	return (
	   
		<div className="friend-box" >
            <input type="checkbox" />
            <label data-expanded="Close Chatbox" data-collapsed="Friends"></label>
            <div className="friend-box-content">
            	<ul className = 'myFL'>
            	    <li>
            	       <p align="left">You have no friends</p>
            	    </li>
            	    {friends}
                </ul>
                <input type = "text" id = "message_in"></input> <Button>Send</Button>
            </div>
        </div>
       
        );
	
    }
}