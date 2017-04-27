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
            <div key={index}>
                {n}
            </div>
        );
	return (
	   
		<div className="friend-box" >
            <input type="checkbox" />
            <label data-expanded="Close Friends List" data-collapsed="Friends List"></label>
            <div className="friend-box-content">
            {this.state.friends.length > 0 ? friends : "You have no friends"}
            	<ul className = 'myFL'>
            	    
                </ul>
                <input type = "text" id = "message_in"></input> <Button>Send</Button>
            </div>
        </div>
       
        );
	
    }
}