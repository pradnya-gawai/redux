import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Series from '../Pages/Series/Series';
import { exploreSeriesPage1, exploreSeriesPage2 } from '../mocks/fixtures';

test('Series for the 1st page are loaded correctly', async () => {
  render(<Series />);

  // check if API call is successful
  expect((await screen.findAllByTestId('single'))[0]).toBeInTheDocument();

  // check if the 2nd page is the current page
  expect(screen.getByText('1')).toHaveAttribute('aria-current', 'true');

  // check if the data matches as per the API
  let title =
    exploreSeriesPage1.results[0].title || exploreSeriesPage1.results[0].name;
  let date =
    exploreSeriesPage1.results[0].first_air_date ||
    exploreSeriesPage1.results[0].release_date;
  expect(screen.getAllByTestId('title')[0]).toHaveTextContent(title);
  expect(screen.getAllByTestId('subTitle')[0]).toHaveTextContent(date);

  title =
    exploreSeriesPage1.results[1].title || exploreSeriesPage1.results[1].name;
  date =
    exploreSeriesPage1.results[1].first_air_date ||
    exploreSeriesPage1.results[1].release_date;
  expect(screen.getAllByTestId('title')[1]).toHaveTextContent(title);
  expect(screen.getAllByTestId('subTitle')[1]).toHaveTextContent(date);
});

test('Next set of Series are loaded when navigating to the 2nd page', async () => {
  await act(async () => render(<Series />));

  // click the second page
  await act(async () => {
    userEvent.click(await screen.findByText('2'));
  });

  // check if the 2nd page is the current page
  expect(screen.getByText('2')).toHaveAttribute('aria-current', 'true');

  // check if API call is successful
  expect((await screen.findByTestId('explore-series')).children.length).toEqual(
    20
  );
  expect((await screen.findAllByTestId('single'))[0]).toBeInTheDocument();

  // // check if the data matches as per the API
  let title =
    exploreSeriesPage2.results[0].title || exploreSeriesPage2.results[0].name;
  let date =
    exploreSeriesPage2.results[0].first_air_date ||
    exploreSeriesPage2.results[0].release_date;
  expect(screen.getAllByTestId('title')[0]).toHaveTextContent(title);
  expect(screen.getAllByTestId('subTitle')[0]).toHaveTextContent(date);

  title =
    exploreSeriesPage2.results[1].title || exploreSeriesPage2.results[1].name;
  date =
    exploreSeriesPage2.results[1].first_air_date ||
    exploreSeriesPage2.results[1].release_date;
  expect(screen.getAllByTestId('title')[1]).toHaveTextContent(title);
  expect(screen.getAllByTestId('subTitle')[1]).toHaveTextContent(date);
});
