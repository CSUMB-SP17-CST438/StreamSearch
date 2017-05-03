import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from './Button';
import { Socket } from './Socket';
import { Link } from 'react-router';
import graph from 'fb-react-sdk';

export class FriendsList extends Component {

	constructor(props) {
		super(props);
		this.state = {
		    'fb_ids': [],
            'friends': [],
            'all_movies': []
		}
	}
 componentDidMount() {
    Socket.on('friendsList', (data) => {this.setState({'friends': data['friends'],
                                                    'all_movies': data['all_movies']
                                          });});
    FB.getLoginStatus((response) => {if (response.status == 'connected') 
        {
            graph.setAccessToken(response.authResponse.accessToken);
            graph.get('me/friends', {access_token: response.authResponse.accessToken}, function(err, res) {
                console.log("this is the paging",res.paging);
              if(res.paging && res.paging.next) {
                  console.log("starting paging");
                graph.get(res.paging.next, function(err, res) {
                  console.log("next page", res);
                });
              }
              //console.log("graph api resp: ", res);
              this.setState({fb_ids: res.data});
            }.bind(this));
            
        }
    });
 }
 
 checkFriend(id) {
     const movies = this.state.all_movies;
     for (var i=0;i<movies.length;i++)
     {
         //console.log("the for loop - ", movies[i]);
         if (movies[i][id] != null)
            return i;
     }
     return -1;
 }

 renderClicks(id) {
     //console.log("all movies", this.state.all_movies);
     //<Link key={i} to={`/shows/${movie.id}`} className="movie-item-link">
     
     var index = this.checkFriend(id);
     //console.log("this is the index", index);
     //console.log("movies:",this.state.all_movies);
     if (index == -1){
         return (
         <div>
            <li>Has not looked up anything</li>
         </div>
         );
     }
     //<Link to={"/"+ n.types + "/" + n.movie_ids + ""} className="movie-item-link"></Link>
     else if (index != -1) {
     let movies = this.state.all_movies[index][id].map((n, index) =>
        <li key={index}>
            <a href={('/' + n.types +"/" + n.movie_ids)}>{n.movies}</a>
        </li>
     );
     return (
         <div>
            {movies}
         </div>
         );
     }
     
     
 }
render() {

        
        let friends = this.state.fb_ids.map((n, index) =>
            <div key={index}>
            {n.name}
                <ul>
                    {this.renderClicks(n.id)}
                </ul>
            </div>
        );
	return (
	   
		<div className="friend-box" >
            <input type="checkbox" />
            <label data-expanded="Close Friends List" data-collapsed="Friends List"></label>
            <div className="friend-box-content">
            {this.state.fb_ids.length > 0 ? friends : "You have no friends"}
            	<ul className = 'myFL'>
                </ul>
            </div>
        </div>
       
        );
	
    }
}