import { FETCH_MOVIE_REVIEWS, FETCH_MOVIE_TRAILERS } from '../actions/types';

const initialState = { reviews: [], trailers: [] };
export default function(state = initialState, action) {

	switch (action.type) {
		case FETCH_MOVIE_REVIEWS: {
			return { ...state,
				reviews: action.payload
			};
		}
		case FETCH_MOVIE_TRAILERS: {
			return { ...state,
				trailers: action.payload
			};
		}
	}

	return state;
}