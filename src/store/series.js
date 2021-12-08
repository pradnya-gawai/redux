import axios from 'axios';
import { baseUrl } from '../config/config';

const API_KEY = process.env.REACT_APP_API_KEY;
const SERIES_SUCCESS = 'SERIES_SUCCESS';

// reducer
export const seriesReducer = (state = null, action) => {
  switch (action.type) {
    case SERIES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

// action creator
const seriesSuccess = (payload) => ({
  type: 'SERIES_SUCCESS',
  payload,
});

// data fetching
export const fetchSeries = (page) => async (dispatch) => {
  const { data } = await axios.get(
    `${baseUrl}/discover/tv?api_key=${API_KEY}&page=${page}`
  );
  // despacting action
  dispatch(seriesSuccess(data));
};
