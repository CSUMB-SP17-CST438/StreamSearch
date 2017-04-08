import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { searchMovies, searchShows } from '../actions';
import { Socket } from './Socket';

class SearchBar extends Component {

	constructor(props) {
		super(props);
		this.state = { term: '', sendMovieQuery: _.debounce((term) => {this.props.searchShows(term)}, 300)};
	}

	render() {
		return (
			// component state to handle input
			// every 0.3 seconds, will search for movies based on query value
			<div className="search-bar inner-addon right-addon">
				<i className="glyphicon glyphicon-search"></i>
				<input 
					className="form-control movie-search"
					value={this.state.term}
					onChange={event => this.onInputChange(event.target.value)} />
			</div>
		);
	}

	onInputChange(value) {
		this.setState({ term: value });
		this.state.sendMovieQuery(value);
		Socket.emit('search1', {
                'text': value
            });
	}

}

function mapStateToProps({ movies }) {
	return {
		query: movies.query
	}
}

export default connect(mapStateToProps, { searchShows })(SearchBar);