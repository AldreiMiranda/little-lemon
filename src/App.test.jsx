import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('navigates from the home page to the booking page', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: "This week's specials!" })).toBeInTheDocument();
  await user.click(screen.getByRole('link', { name: 'Reserve a Table' }));
  expect(screen.getByRole('heading', { level: 1, name: 'Reserve a Table' })).toBeInTheDocument();
});
