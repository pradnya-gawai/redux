import axios from 'axios';
import { baseUrl } from '../config/config';

const API_KEY = process.env.REACT_APP_API_KEY;
const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
// reducer
export const searchReducer = (state = null, action) => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
// action creator
const searchSuccess = (payload) => ({
  type: 'SEARCH_SUCCESS',
  payload,
});
// data fetching
export const fetchSearch = (type, page, searchText) => async (dispatch) => {
  const { data } = await axios.get(
    `${baseUrl}/search/${
      type ? 'tv' : 'movie'
    }?api_key=${API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
  );
  // despacting action
  console.log(data.results)

  dispatch(searchSuccess(data));

};
