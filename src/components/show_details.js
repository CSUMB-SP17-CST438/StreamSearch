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
            'num': 0,
        	modalActive: false };
	  }
	
	  openModal () {
	    this.setState({ modalActive: true })
	  }
	
	  closeModal () {
	    this.setState({ modalActive: false })
	  }
	
	componentWillMount() {
		this.props.fetchShow(this.props.params.id);
		this.props.fetchSeasons(this.props.params.id);
		this.props.fetchBySeason(this.props.params.id, 1);
	}

	renderShow() {
		const { show } = this.props;
		const { seasons } = this.props;
    	console.log("show - ", show);
    	console.log("seasons - ", seasons);
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
					<div style={{overflowX: 'scroll', width: 'auto'}}>
						<div style={{display: "table"}}>
						{this.renderEpisodes()}
						</div>
					</div>
				</div>
			</div>
		);
	}
	
	renderSeasons() {
		const allSeasons = this.props.seasons.results.map((season, i) => {
			return (
				<option key={i} value={i+1}>Season {i+1}</option>
			);
		});
		return (allSeasons);
	}
	
	renderEpisodes() {
		const episodes  = this.props.episodes.results;
		if (episodes != null) {
			console.log("episode number = ", this.state.num)
			console.log("trying the map", episodes);
			const list = episodes.map((episode, i) => {
				console.log("list = ", episode);
				var id = i;
				return (
					<div key={i} style={{display: 'table-cell'}} id="episode">
						<a href="#openModal" value={i} onClick={() => this.setState({num: {i}.i})}>
						<img src={episode.thumbnail_400x225} />
						<h2>{episode.title}</h2>
						<h3>Season {episode.season_number}, Episode {episode.episode_number}</h3>
						</a>
					          <div id="openModal" className="modalDialog">
									<div>
										<a href="#close" title="Close" className="close">X</a>
										<h2>{episodes[this.state.num].title}</h2>
										<p>{episodes[this.state.num].first_aired}</p>
										<p>{episodes[this.state.num].overview}</p>
										{episodes[this.state.num].free_web_sources.map((service,i) => {
											return(<div><a href={service.link} > {service.display_name} </a><br /></div>);})}
										{episodes[this.state.num].subscription_web_sources.map((service,i) => {
											return(<div><a href={service.link} > {service.display_name} </a><br /></div>);})}
										{episodes[this.state.num].tv_everywhere_web_sources.map((service,i) => {
											return(<div><a href={service.link} > {service.display_name} </a><br /></div>);})}
										{episodes[this.state.num].purchase_web_sources.map((service,i) => {
											return(<div><a href={service.link} > {service.display_name} </a><br /></div>);})}
										
										
									</div>
								</div>
					</div>
					);
			});
			return list;
		}
	    return (<div className="show-details"></div>);
		}
		
	renderEpisodeInfo() {
		const episodes  = this.props.episodes.results;
		return(
			<div>
		
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