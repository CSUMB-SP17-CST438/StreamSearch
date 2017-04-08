import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchShow, fetchSeasons } from '../actions';
import { convertMinutesToHoursString } from '../helpers';

class ShowDetails extends Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.fetchShow(this.props.params.id);
		this.props.fetchSeasons(this.props.params.id);
	}

	renderShow() {
		const { show, seasons } = this.props;
	//	const genres = movies.genres.map(genre => genre.name).join(", ");
	//	const runTime = convertMinutesToHoursString(movies.runtime);
	//	const releaseDate = moment(movies.release_date).calendar();
	//	const rating = movies.vote_average;
    console.log("movies - ", show);
		return (
			<div className="show-details">
				<Link to="/" className="btn btn-primary" style={{ float: "right" }}>
					Back to List
				</Link>
				<h2 className="title" style={{marginBottom: "3px", fontSize:"36px"}}>{show.title}</h2>
				<h6 className="tagline" style={{marginTop: "0px", fontSize:"14px"}}>{show.tagline}</h6>
				<a href={show.homepage} target="_blank">{show.homepage}</a>
				<p className="summary">
					{show.overview}
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

export default connect(mapStateToProps, { fetchShow, fetchSeasons })(ShowDetails);