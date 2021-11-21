import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

test('app rendering/navigating properly for all routes', async () => {
  const history = createMemoryHistory();
  act(() => {
    render(
      <Router history={history}>
        <App />
      </Router>
    );
  });

  // verify page content for expected route
  // often you'd use a data-testid or role query, but this is also possible
  expect(await screen.findByText(/trending today/i)).toBeInTheDocument();

  act(() => {
    userEvent.click(screen.getByTestId('movie-icon'));
  });
  expect(await screen.findByText(/discover movies/i)).toBeInTheDocument();

  act(() => {
    userEvent.click(screen.getByTestId('tv-icon'));
  });
  expect(await screen.findByText(/discover tv series/i)).toBeInTheDocument();

  act(() => {
    userEvent.click(screen.getByTestId('search-icon'));
  });
  expect(await screen.findByLabelText('Search')).toBeInTheDocument();
});
