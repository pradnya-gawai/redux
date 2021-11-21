import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Movies from '../Pages/Movies/Movies';
import { exploreMoviesPage1, exploreMoviesPage2 } from '../mocks/fixtures';

test('Movies for the 1st page are loaded correctly', async () => {
  render(<Movies />);

  // check if API call is successful
  expect((await screen.findAllByTestId('single'))[0]).toBeInTheDocument();

  // check if the 2nd page is the current page
  expect(screen.getByText('1')).toHaveAttribute('aria-current', 'true');

  // check if the data matches as per the API
  let title =
    exploreMoviesPage1.results[0].title || exploreMoviesPage1.results[0].name;
  let date =
    exploreMoviesPage1.results[0].first_air_date ||
    exploreMoviesPage1.results[0].release_date;
  expect(screen.getAllByTestId('title')[0]).toHaveTextContent(title);
  expect(screen.getAllByTestId('subTitle')[0]).toHaveTextContent(date);

  title =
    exploreMoviesPage1.results[1].title || exploreMoviesPage1.results[1].name;
  date =
    exploreMoviesPage1.results[1].first_air_date ||
    exploreMoviesPage1.results[1].release_date;
  expect(screen.getAllByTestId('title')[1]).toHaveTextContent(title);
  expect(screen.getAllByTestId('subTitle')[1]).toHaveTextContent(date);
});

test('Next set of movies are loaded when navigating to the 2nd page', async () => {
  await act(async () => render(<Movies />));

  // click the second page
  await act(async () => {
    userEvent.click(await screen.findByText('2'));
  });

  // check if the 2nd page is the current page
  expect(screen.getByText('2')).toHaveAttribute('aria-current', 'true');

  // check if API call is successful
  expect((await screen.findByTestId('explore-movies')).children.length).toEqual(
    20
  );
  expect((await screen.findAllByTestId('single'))[0]).toBeInTheDocument();

  // // check if the data matches as per the API
  let title =
    exploreMoviesPage2.results[0].title || exploreMoviesPage2.results[0].name;
  let date =
    exploreMoviesPage2.results[0].first_air_date ||
    exploreMoviesPage2.results[0].release_date;
  expect(screen.getAllByTestId('title')[0]).toHaveTextContent(title);
  expect(screen.getAllByTestId('subTitle')[0]).toHaveTextContent(date);

  title =
    exploreMoviesPage2.results[1].title || exploreMoviesPage2.results[1].name;
  date =
    exploreMoviesPage2.results[1].first_air_date ||
    exploreMoviesPage2.results[1].release_date;
  expect(screen.getAllByTestId('title')[1]).toHaveTextContent(title);
  expect(screen.getAllByTestId('subTitle')[1]).toHaveTextContent(date);
});
