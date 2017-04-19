import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchMovie, fetchMovieReviews, fetchMovieTrailers, fetchMovieForGB, fetchMovieGB } from '../actions';
import { convertMinutesToHoursString } from '../helpers';

class MoviesShow extends Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.fetchMovie(this.props.params.id);
		this.props.fetchMovieReviews(this.props.params.id);
		this.props.fetchMovieTrailers(this.props.params.id);
		this.props.fetchMovieGB(this.props.params.id);
	}

	renderTrailers() {

		const { trailers } = this.props.movie_details;

		const trailersView = trailers.map((trailer, i) => {
			const { key } = trailer;
			const url = `https://www.youtube.com/embed/${key}`;
			return (
				<div className="trailer" key={i} >
					<iframe width="560" height="315" src={url} frameBorder="0" allowFullScreen></iframe>
				</div>
			);
		});

		return (
			<div className="trailers">
				{trailersView}
			</div>
		);

	}

	renderReviews() {
		const { reviews } = this.props.movie_details;

		const reviewsView = reviews.map((review, i) => {
			const { author, content } = review;
			return (
				<div key={i} className="review-detail">
					<p className="content">
						"{content}"
					</p>
					<p className="author">
						by {author}
					</p>
				</div>
			);
		});

		return (
			<div className="reviews">
				<h4 className="title">Reviews</h4>
				{reviewsView}
			</div>
		);

	}
	
	renderLinks() {
		const movieGB = this.props.movieGB;
		console.log("heres the movie - ", movieGB);
	}

	renderMovie() {
		const { movie, movie_details } = this.props;
		const { trailers, reviews } = movie_details;
		const genres = movie.genres.map(genre => genre.name).join(", ");
		const runTime = convertMinutesToHoursString(movie.runtime);
		const releaseDate = moment(movie.release_date).calendar();
		const rating = movie.vote_average;

		return (
			<div className="movie-details">
				<Link to="/" className="btn btn-primary" style={{ float: "right" }}>
					Back to List
				</Link>
				<h2 className="title" style={{marginBottom: "3px", fontSize:"36px"}}>{movie.title}</h2>
				<h6 className="tagline" style={{marginTop: "0px", fontSize:"14px"}}>{movie.tagline}</h6>
				<a href={movie.homepage} target="_blank">{movie.homepage}</a>
				<div className="header-details">
					{runTime} | {genres} | {releaseDate} | {rating}/10
				</div>
				<p className="summary">
					{movie.overview}
				</p>
				{this.renderLinks()}
				{trailers.length > 0 ? this.renderTrailers() : ''}
				{reviews.length > 0 ? this.renderReviews() : ''}
			</div>
		);
	}

	render() {
		const movie = this.props.movie;
		return (
			<div className="container movie">
				{movie ? this.renderMovie() : ''}
				
			</div>
		);

	}
}

function mapStateToProps({ movies, movie_details }) {
	return {
		movie: movies.movie,
		movieGB: movies.movieGB,
		movie_details
	}
}

export default connect(mapStateToProps, { fetchMovie, fetchMovieTrailers, fetchMovieReviews, fetchMovieForGB, fetchMovieGB})(MoviesShow);