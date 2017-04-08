import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchShow, fetchSeasons, fetchEpisodes } from '../actions';
import { convertMinutesToHoursString } from '../helpers';

class ShowDetails extends Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.fetchShow(this.props.params.id);
		this.props.fetchSeasons(this.props.params.id);
		this.props.fetchEpisodes(this.props.params.id);
	}

	renderShow() {
		const { show } = this.props;
		const { seasons } = this.props;
    	console.log("show - ", show);
    	console.log("seasons - ", seasons);
    	console.log("size of seasons - ", seasons.length)
	//	const genres = movies.genres.map(genre => genre.name).join(", ");
	//	const runTime = convertMinutesToHoursString(movies.runtime);
	//	const releaseDate = moment(movies.release_date).calendar();
	//	const rating = movies.vote_average;
	
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
				<select>
				{seasons.length != 0 ? this.renderSeasons() : <option>None</option>}
				</select>
				{1==1 ? this.renderEpisodes() : ''}
			</div>
		);
	}
	
	renderSeasons() {
		//for (var i = 0; i < 3; i++){}
		const allSeasons = this.props.seasons.results.map((season, i) => {
			//const { key } = season;
			return (
				<option key={i}>Season {i+1}</option>
			);
		});
		return (allSeasons);
	}
	
	
	renderEpisodes() {
		const { episodes } = this.props;
		
    console.log("episodes - ", episodes);
    return (
			<div className="show-details">
				
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
		show: movies.show,
		seasons: movies.seasons,
		episodes: movies.episodes
	};
}

export default connect(mapStateToProps, { fetchShow, fetchSeasons, fetchEpisodes })(ShowDetails);