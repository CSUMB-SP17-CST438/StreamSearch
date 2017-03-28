import { FETCH_POPULAR_MOVIES, SEARCH_MOVIES, FETCH_MOVIE, CLEAR_MOVIE, FETCH_MOVIE_REVIEWS, FETCH_MOVIE_TRAILERS } from '../actions/types';

const initialState = { list: [], movie: null };
export default function(state = initialState, action) {

	switch (action.type) {
		case FETCH_POPULAR_MOVIES: {
			return { ...state,
				list: action.payload
			};
		}
		case SEARCH_MOVIES: {
			return { ...state,
				list: action.payload
			}
		}
		case FETCH_MOVIE: {
			return { ...state,
				movie: action.payload
			}
		}
		case CLEAR_MOVIE: {
			return { ...state,
				movie: initialState.movie
			}
		}
	}

	return state;
}