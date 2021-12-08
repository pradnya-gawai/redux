import axios from 'axios';
import { baseUrl } from '../config/config';

const API_KEY = process.env.REACT_APP_API_KEY;
const TRENDING_SUCCESS = 'TRENDING_SUCCESS';

// reducer
export const trendingReducer = (state = null, action) => {
  switch (action.type) {
    case TRENDING_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

// action creator
const trendingSuccess = (payload) => ({
  type: 'TRENDING_SUCCESS',
  payload,
});

// data fetching
export const fetchTrending = (page) => async (dispatch) => {
  const { data } = await axios.get(
    `${baseUrl}/trending/all/day?api_key=${API_KEY}&page=${page}`
  );
  // despacting action
  dispatch(trendingSuccess(data));
};
