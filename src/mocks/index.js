import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { baseUrl } from '../config/config';
import {
  exploreMoviesPage1,
  exploreMoviesPage2,
  movieData,
  trendingData,
  tvData,
  exploreSeriesPage1,
  exploreSeriesPage2,
} from './fixtures';

const API_KEY = process.env.REACT_APP_API_KEY;

export const handlers = [
  rest.get(`${baseUrl}/trending/all/day`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(trendingData))
  ),
  rest.get(`${baseUrl}/search/tv`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(tvData))
  ),
  rest.get(`${baseUrl}/search/movie`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(movieData))
  ),
  rest.get(`${baseUrl}/discover/movie`, (req, res, ctx) => {
    let page = req.url.searchParams.get('page');
    if (page === '1') {
      return res(ctx.status(200), ctx.json(exploreMoviesPage1));
    } else {
      return res(ctx.status(200), ctx.json(exploreMoviesPage2));
    }
  }),
  rest.get(`${baseUrl}/discover/tv`, (req, res, ctx) => {
    let page = req.url.searchParams.get('page');
    if (page === '1') {
      return res(ctx.status(200), ctx.json(exploreSeriesPage1));
    } else {
      return res(ctx.status(200), ctx.json(exploreSeriesPage2));
    }
  }),
];

export const server = setupServer(...handlers);
