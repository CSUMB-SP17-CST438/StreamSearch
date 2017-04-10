import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { fetchShow, fetchSeasons, fetchBySeason } from '../actions';
import { convertMinutesToHoursString } from '../helpers';

class ShowDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {
            'id': this.props.params.id,
            'episodes': []
        };
	}

	componentWillMount() {
		this.props.fetchShow(this.props.params.id);
		this.props.fetchSeasons(this.props.params.id);
		this.props.fetchBySeason(this.props.params.id, 1);
	}

	renderShow() {
		var fix = 0;
		const { show } = this.props;
		const { seasons } = this.props;
    	console.log("show - ", show);
    	console.log("seasons - ", seasons);
    	console.log("size of seasons - ", seasons.length)
    	console.log("fix == ", fix);
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
				<select onChange={event => this.props.fetchBySeason(this.state.id, event.target.value)}>
				{seasons.length != 0 ? this.renderSeasons() : <option>None</option>}
				</select>
				<div style={{overflow: 'hidden', width: '100%'}}>
					<div style={{'overflow-x': 'scroll', width: 'auto'}}>
						<div style={{display: "table"}}>
						{this.renderEpisodes()}
						</div>
					</div>
				</div>
			</div>
		);
	}
	
	renderSeasons() {
		//for (var i = 0; i < 3; i++){}
		const allSeasons = this.props.seasons.results.map((season, i) => {
			//const { key } = season;
			return (
				<option key={i} value={i+1}>Season {i+1}</option>
			);
		});
		return (allSeasons);
	}
	
	renderEpisodes() {
		const episodes  = this.props.episodes.results;
		/*
		const episodes  = this.props.episodes.results.map((episode, i) => {
			//const { key } = season;
			return (
				<option key={i} value={i+1}>episode {i+1}</option>
			);
		});
		*/
		if (episodes != null) {
			console.log("trying the map", episodes);
			const list = episodes.map((episode, i) => {
				console.log("list = ", episode);
				return (
					<div key={i} style={{display: 'table-cell'}} id="episode">
						<img src={episode.thumbnail_400x225} />
						<h2>{episode.title}</h2>
						<h3>Season {episode.season_number}, Episode {episode.episode_number}</h3>
					</div>
					);
			});
			return list;
		}
		var id = this.state.id;
		console.log("these are the episodes being rendered == ", episodes);
		//return episodes;
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

export default connect(mapStateToProps, { fetchShow, fetchSeasons, fetchBySeason })(ShowDetails);