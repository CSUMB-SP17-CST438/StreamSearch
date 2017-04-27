import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import { fetchPopularMovies, fetchPopularShows, clearMovie } from '../actions';
import SearchBar from './search_bar_movies';

class MoviesList extends Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.fetchPopularMovies();
		//this.props.fetchPopularShows();
		this.props.clearMovie(); // reset fetched movie
	}

	renderMovie(movie, i) {
		const releaseDate = moment(movie.release_date).calendar();
		//console.log(movie)
		//<p className="item-title"><img src={"http://image.tmdb.org/t/p/w185/" + movie.poster_path} />{movie.title}</p>
		return (
			<Link key={i} to={`/movies/${movie.id}`} className="movie-item-link">
				<div className="movie-item">
					<p className="item-title">{movie.title}</p>
					<p className="item-release-date">{releaseDate}</p>
				</div>
			</Link>
		);
	}

	render() {
		var movies = this.props.movies.list.map(this.renderMovie);
		//var shows = this.props.shows.list.map(this.renderShow);
		return (
			<div className="movies-list">
				<SearchBar />
				<div id="movieList">
				{movies}
				</div>
				
			</div>
			
		);
	}
}

function mapStateToProps({ movies }) {
	return {
		movies
	}
}

export default connect(mapStateToProps, { fetchPopularMovies, clearMovie, fetchPopularShows })(MoviesList);