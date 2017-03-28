import axios from 'axios';
import { FETCH_POPULAR_MOVIES, FETCH_MOVIE, SEARCH_MOVIES, CLEAR_MOVIE, FETCH_MOVIE_TRAILERS, FETCH_MOVIE_REVIEWS } from './types';
const API_KEY = '163c193e3f58f163c783eb87f2b002b5';
const ROOT_URL = `https://api.themoviedb.org/3`;
const LANGUAGE = `en-US`;

export function fetchPopularMovies() {

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
