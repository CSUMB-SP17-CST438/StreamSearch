import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchShow } from '../actions';
import { convertMinutesToHoursString } from '../helpers';

class ShowDetails extends Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.fetchShow(this.props.params.id);
	}

	renderShow() {
		const { movies, movie_details } = this.props;
		const genres = movies.genres.map(genre => genre.name).join(", ");
		const runTime = convertMinutesToHoursString(movies.runtime);
		const releaseDate = moment(movies.release_date).calendar();
		const rating = movies.vote_average;

		return (
			<div className="show-details">
				<Link to="/" className="btn btn-primary" style={{ float: "right" }}>
					Back to List
				</Link>
				<h2 className="title" style={{marginBottom: "3px", fontSize:"36px"}}>{movies.title}</h2>
				<h6 className="tagline" style={{marginTop: "0px", fontSize:"14px"}}>{movies.tagline}</h6>
				<a href={movies.homepage} target="_blank">{movies.homepage}</a>
				<div className="header-details">
					{runTime} | {genres} | {releaseDate} | {rating}/10
				</div>
				<p className="summary">
					{movies.overview}
				</p>
			</div>
		);
	}

	render() {

		const show = this.props.show;
		return (
			<div className="container show">
				{show ? this.renderShow() : ''}
			</div>
		);

	}
}

function mapStateToProps({ movies }) {
	return {
		show: movies.show
	}
}

export default connect(mapStateToProps, { fetchShow })(ShowDetails);