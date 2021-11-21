import { act, render, screen } from '@testing-library/react';
import { trendingData } from '../mocks/fixtures';
import Trending from '../Pages/Trending/Trending';

test('if trending movies are rendered correctly', async () => {
  act(() => {
    render(<Trending />);
  });

  expect((await screen.findAllByTestId('single'))[0]).toBeInTheDocument();
  expect(screen.getByTestId('trending').children.length).toEqual(19);
});

test('if the first two items are rendered with the correct name', async () => {
  act(() => {
    render(<Trending />);
  });

  expect((await screen.findAllByTestId('single'))[0]).toBeInTheDocument();

  let title = trendingData.results[0].title || trendingData.results[0].name;
  let date =
    trendingData.results[0].first_air_date ||
    trendingData.results[0].release_date;
  expect(screen.getAllByTestId('title')[0]).toHaveTextContent(title);
  expect(screen.getAllByTestId('subTitle')[0]).toHaveTextContent(date);

  title = trendingData.results[1].title || trendingData.results[1].name;
  date =
    trendingData.results[1].first_air_date ||
    trendingData.results[1].release_date;
  expect(screen.getAllByTestId('title')[1]).toHaveTextContent(title);
  expect(screen.getAllByTestId('subTitle')[1]).toHaveTextContent(date);
});
