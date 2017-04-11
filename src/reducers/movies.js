import { FETCH_POPULAR_MOVIES, SEARCH_MOVIES, FETCH_MOVIE, CLEAR_MOVIE, FETCH_MOVIE_REVIEWS, FETCH_MOVIE_TRAILERS, FETCH_POPULAR_SHOWS, SEARCH_SHOWS, FETCH_SHOW, FETCH_BY_SEASON, FETCH_SEASONS, FETCH_EPISODES} from '../actions/types';

const initialState = { list: [], movie: null, show: [] , seasons: [], episodes: []};
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
		
		case FETCH_POPULAR_SHOWS: {
			return { ...state,
				list: action.payload
			}
		}
		case SEARCH_SHOWS: {
			return { ...state,
				list: action.payload
			}
		}
		
		case FETCH_SHOW: {
			return { ...state,
				show: action.payload
			}
		}
		
		case FETCH_BY_SEASON: {
			return { ...state,
				episodes: action.payload
			}
		}
		case FETCH_SEASONS: {
			return { ...state,
				seasons: action.payload
			}
		}
		
		case FETCH_EPISODES: {
			return { ...state,
				episodes: action.payload
			}
		}
	}

	return state;
}