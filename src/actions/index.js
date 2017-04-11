import axios from 'axios';
import { FETCH_POPULAR_MOVIES, FETCH_MOVIE, SEARCH_MOVIES, CLEAR_MOVIE, FETCH_MOVIE_TRAILERS, FETCH_MOVIE_REVIEWS, SEARCH_SHOWS, FETCH_POPULAR_SHOWS, FETCH_BY_SEASON, FETCH_SHOW, FETCH_EPISODES, FETCH_SEASONS } from './types';
const API_KEY = '163c193e3f58f163c783eb87f2b002b5';
const ROOT_URL = `https://api.themoviedb.org/3`;
const GUIDEBOX_URL = 'https://api-public.guidebox.com/v2/search?';
const GUIDEBOX_API = 'c338d925a0672acf243133ddc1d5d66fb0191391'
const LANGUAGE = `en-US`;


export function fetchPopularMovies() {
<<<<<<< HEAD
=======


>>>>>>> fixed action/index.js
	const request = axios.get(`${ROOT_URL}/movie/popular`, {
		params: { api_key: API_KEY }
	});
	return (dispatch) => {
		request.then((res) => {
			dispatch({
				type: FETCH_POPULAR_MOVIES,
				payload: res.data.results
			});
		});
	}
<<<<<<< HEAD
=======

/*	console.log("inside fetchPopularMovies");
	
	const request = axios.get('${GB_ROOT_URL}/movies?api_key=${GB_API_KEY}');
	
	return (dispatch) => {
		request.then((res) => {
			dispatch({
				type: FETCH_POPULAR_MOVIES,
				payload: res.data.results
			});
		});
	}
*/
>>>>>>> fixed action/index.js
}

export function searchMovies(term) {
	let request;
	if (term) {
		request = axios.get(`${ROOT_URL}/search/movie`, {
			params: { api_key: API_KEY, language: LANGUAGE, query: term }
		});
	} else {
		// when blank term, return popular movies again
		request = axios.get(`${ROOT_URL}/movie/popular`, {
			params: { api_key: API_KEY }
		});
	}
	return (dispatch) => {
		request.then((res) => {
			dispatch({
				type: SEARCH_MOVIES,
				payload: res.data.results
			})
		})
	}

}

export function fetchMovie(id) {
	// fetch movie through id using movie api
	const request = axios.get(`${ROOT_URL}/movie/${id}`, {
		params: { api_key: API_KEY, language: LANGUAGE }
	});
	return (dispatch) => {
		request.then((res) => {
			dispatch({
				type: FETCH_MOVIE,
				payload: res.data
			})
		})
	}
}

export function clearMovie() {
	return {
		type: CLEAR_MOVIE
	}
}


export function fetchMovieTrailers(id) {
	const request = axios.get(`${ROOT_URL}/movie/${id}/videos`, {
		params: { api_key: API_KEY, language: LANGUAGE }
	});
	return (dispatch) => {
		request.then((res) => {
			dispatch({
				type: FETCH_MOVIE_TRAILERS,
				payload: res.data.results
			})
		})
	}
}

export function fetchMovieReviews(id) {
	const request = axios.get(`${ROOT_URL}/movie/${id}/reviews`, {
		params: { api_key: API_KEY, language: LANGUAGE }
	});
	return (dispatch) => {
		request.then((res) => {
			dispatch({
				type: FETCH_MOVIE_REVIEWS,
				payload: res.data.results
			})
		})
	}
}

export function fetchPopularShows() {
		const request = axios.get('https://api-public.guidebox.com/v2/shows?api_key=c338d925a0672acf243133ddc1d5d66fb0191391');
	return (dispatch) => {
		request.then((res) => {
			dispatch({
				type: FETCH_POPULAR_SHOWS,
				payload: res.data.results
			});
		});
	}
}

export function searchShows(term) {
	//http://api-public.guidebox.com/v2/search?api_key=c338d925a0672acf243133ddc1d5d66fb0191391&type=show&field=title&query=fresh
	let request;
	if (term) {
		request = axios.get('https://api-public.guidebox.com/v2/search?api_key=c338d925a0672acf243133ddc1d5d66fb0191391&type=show&field=title&query=' + encodeURI(term));
		//request = axios.get(`${GUIDEBOX_URL}`, {
			//params: { api_key: GUIDEBOX_API, type: 'show', field: 'title', query: term }
		//});
		//console.log(request);
	} else {
		// when blank term, return popular movies again
		request = axios.get('https://api-public.guidebox.com/v2/shows?api_key=c338d925a0672acf243133ddc1d5d66fb0191391');
	}

	return (dispatch) => {
		request.then((res) => {
			console.log('search shows - ', res.data.results)
			dispatch({
				type: SEARCH_SHOWS,
				payload: res.data.results
			})
		})
	}
}

export function fetchShow(id) {
	// fetch movie through id using movie api
	const request = axios.get('https://api-public.guidebox.com/v2/shows/' + id + '?api_key=c338d925a0672acf243133ddc1d5d66fb0191391&include_links=true&platform=web')
	return (dispatch) => {
		request.then((res) => {
			console.log('fetching show - ', res.data.results)
			dispatch({
				type: FETCH_SHOW,
				payload: res.data
			})
		})
	}
}

export function fetchEpisodes(id) {
	// fetch movie through id using movie api
	const request = axios.get('https://api-public.guidebox.com/v2/shows/' + id + '/episodes?api_key=c338d925a0672acf243133ddc1d5d66fb0191391&include_links=true&platform=web')
	return (dispatch) => {
		request.then((res) => {
			console.log('fetching episodes - ', res.data.results)
			dispatch({
				type: FETCH_EPISODES,
				payload: res.data
			})
		})
	}
}

export function fetchBySeason(id, season) {
	// fetch movie through id using movie api
	const request = axios.get('https://api-public.guidebox.com/v2/shows/' + id + '/episodes?api_key=c338d925a0672acf243133ddc1d5d66fb0191391&include_links=true&platform=web&season=' + season)
	return (dispatch) => {
		request.then((res) => {
			console.log('fetching by season - ', res.data.results)
			dispatch({
				type: FETCH_BY_SEASON,
				payload: res.data
			})
		})
	}
}

export function fetchSeasons(id) {
	//seasons
	const request = axios.get('https://api-public.guidebox.com/v2/shows/' + id + '/seasons?api_key=c338d925a0672acf243133ddc1d5d66fb0191391&include_links=true ')
	return (dispatch) => {
		request.then((res) => {
			console.log('fetching seasons - ', res.data.results)
			dispatch({
				type: FETCH_SEASONS,
				payload: res.data
			})
		})
	}
}