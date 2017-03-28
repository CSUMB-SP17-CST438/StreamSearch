import { combineReducers } from 'redux';
import MoviesReducer from './movies';
import MovieDetailsReducer from './movie_details';

const reducers = combineReducers({
  movies: MoviesReducer,
  movie_details: MovieDetailsReducer
});

export default reducers;
