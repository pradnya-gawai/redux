import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { moviesURL, searchURL, trendingURL,tvURL } from '../config/config';
import {
  exploreMoviesPage1,
  exploreMoviesPage2,
  movieData,
  trendingData,
  tvData,
  exploreSeriesPage1,
  exploreSeriesPage2,
} from './fixtures';

export const handlers = [
  rest.get(trendingURL, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(trendingData))
  ),
  rest.get(`${searchURL}tv`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(tvData))
  ),
  rest.get(`${searchURL}movie`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(movieData))
  ),
  rest.get(moviesURL, (req, res, ctx) => {
    let page = req.url.searchParams.get('page');
    if (page === '1') {
      return res(ctx.status(200), ctx.json(exploreMoviesPage1));
    } else {
      return res(ctx.status(200), ctx.json(exploreMoviesPage2));
    }
  }),
  rest.get(tvURL, (req, res, ctx) => {
    let page = req.url.searchParams.get('page');
    if (page === '1') {
      return res(ctx.status(200), ctx.json(exploreSeriesPage1));
    } else {
      return res(ctx.status(200), ctx.json(exploreSeriesPage2));
    }
  }),
];

export const server = setupServer(...handlers);
