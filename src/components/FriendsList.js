import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from './Button';
import { Socket } from './Socket';
import { Link } from 'react-router';

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
     //console.log("all movies", this.state.all_movies);
     //<Link key={i} to={`/shows/${movie.id}`} className="movie-item-link">
     let movies = this.state.all_movies[n].map((n, index) =>
        <li key={index}><Link to={"/"+ n.types + "/" + n.movie_ids + ""} className="movie-item-link">{n.movies}</Link>
        {console.log(n)}</li>
     );
     return (
         <div>
            {movies}
         </div>);
     
 }
render() {

        
        let friends = this.state.friends.map((n, index) =>
        
            <div key={index}>
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