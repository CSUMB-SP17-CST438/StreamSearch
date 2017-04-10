import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { fetchShow, fetchSeasons, fetchBySeason } from '../actions';
import { convertMinutesToHoursString } from '../helpers';
import ShowDetails from './show_details'

class EpisodeList extends Component {

	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		this.props.fetchBySeason(this.props.params.id, 1);
		this.state = {
            'id': this.props.params.id,
            'episodes': []
        };
	}
	renderEpisodes(season) {
	    console.log("this is where the episodes are rendered.");
		const { episodes } = this.props;
		//var id = this.state.id;
		console.log("episodes = ", episodes);
		//const request = axios.get('https://api-public.guidebox.com/v2/shows/' + id + '/episodes?api_key=c338d925a0672acf243133ddc1d5d66fb0191391&include_links=true&platform=web')
    //console.log("request - ", request);
    return (
			<div className="show-details">
				<h2> this is where the episodes go: {season} </h2>
			</div>
		);
	}

	render() {

		//const show = this.props.show;
		return (
			<div className="container show">
				{this.renderEpisodes(1)}
			</div>
		);

	}
}

function mapStateToProps({ movies }) {
	return {
		episodes: movies.episodes
	};
}

export default connect(mapStateToProps, { fetchBySeason })(EpisodeList);