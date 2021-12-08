import axios from 'axios';
import { baseUrl } from '../config/config';

const API_KEY = process.env.REACT_APP_API_KEY;
const MOVIES_SUCCESS = 'MOVIES_SUCCESS';

// reducer
export const moviesReducer = (state = null, action) => {
  switch (action.type) {
    case MOVIES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

// action creator
const moviesSuccess = (payload) => ({
  type: 'MOVIES_SUCCESS',
  payload,
});

// data fetching
export const fetchMovies = (page) => async (dispatch) => {
  const { data } = await axios.get(
    `${baseUrl}/trending/all/day?api_key=${API_KEY}&page=${page}`
  );
  // despacting action
  dispatch(moviesSuccess(data));
};
