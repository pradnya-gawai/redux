import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { trendingReducer } from './trending';
import { moviesReducer } from './movies'
import { seriesReducer } from './series'
import { searchReducer } from './search'
// import { pageReducer } from './page'

const rootReducer = combineReducers({
  trending: trendingReducer,
  movies:moviesReducer,
  series:seriesReducer,
  search: searchReducer,
});

const middlewareEnhancer = applyMiddleware(...[thunk]);

const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);

const store = createStore(rootReducer, {}, composedEnhancers);

export default store;
