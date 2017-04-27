import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from './Button';
import { Socket } from './Socket';

export class FriendsList extends Component {

	constructor(props) {
		super(props);
		this.state = {
            'friends': [],
            'all_movies': []
		}
	}
 componentDidMount() {
        Socket.on('friendsList', (data) => {this.setState({'friends': data['friends'],
                                                           'all_movies': data['all_movies']
                                            });});
 }
 
 renderClicks(n) {
     console.log("all movies", this.state.all_movies);
     let movies = this.state.all_movies[n].map((n, index) =>
        <li key={index}>{n}</li>
     );
     return (
         <div>
            {movies}
         </div>);
     
 }
render() {

        
        let friends = this.state.friends.map((n, index) =>
        
            <div key={index}>
            {console.log(n.IDs)}
                {n.names[0]}
                <ul>
                    {this.renderClicks(n.IDs[0])}
                </ul>
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