import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import BookingForm, { validate } from './BookingForm';
import BookingPage from './BookingPage';
import { initializeTimes, updateTimes, parseDate } from './Main';
import { fetchAPI } from '../api';

const times = ['17:00', '18:00', '19:00'];

const renderForm = (props = {}) => {
  const dispatch = vi.fn();
  const submitForm = vi.fn();
  render(<BookingForm availableTimes={times} dispatch={dispatch} submitForm={submitForm} {...props} />);
  return { dispatch, submitForm };
};

const futureDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

describe('BookingPage', () => {
  test('renders the static heading', () => {
    render(
      <MemoryRouter>
        <BookingPage availableTimes={times} dispatch={vi.fn()} submitForm={vi.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Reserve a Table' })).toBeInTheDocument();
  });
});

describe('initializeTimes / updateTimes', () => {
  test('initializeTimes returns the times from fetchAPI for today', () => {
    const result = initializeTimes();
    expect(result).toEqual(fetchAPI(new Date()));
    expect(result.length).toBeGreaterThan(0);
  });

  test('updateTimes returns the times for the selected date', () => {
    const date = parseDate('2030-01-15');
    expect(updateTimes([], { type: 'UPDATE_TIMES', date })).toEqual(fetchAPI(date));
  });

  test('updateTimes returns the same state for unknown actions', () => {
    const state = ['17:00'];
    expect(updateTimes(state, { type: 'UNKNOWN' })).toBe(state);
  });
});

describe('BookingForm HTML5 validation attributes', () => {
  test('fields have the expected validation attributes', () => {
    renderForm();
    const date = screen.getByLabelText(/choose date/i);
    expect(date).toBeRequired();
    expect(date).toHaveAttribute('type', 'date');
    expect(date).toHaveAttribute('min');

    expect(screen.getByLabelText(/choose time/i)).toBeRequired();

    const guests = screen.getByLabelText(/number of guests/i);
    expect(guests).toBeRequired();
    expect(guests).toHaveAttribute('min', '1');
    expect(guests).toHaveAttribute('max', '10');

    expect(screen.getByLabelText(/occasion/i)).toBeRequired();
  });

  test('renders the available times as options', () => {
    renderForm();
    times.forEach((t) => expect(screen.getByRole('option', { name: t })).toBeInTheDocument());
  });
});

describe('BookingForm JavaScript validation', () => {
  test('validate reports errors for invalid data', () => {
    const errors = validate({ date: '2000-01-01', time: '', guests: 0, occasion: '' }, '2026-10-19');
    expect(Object.keys(errors).sort()).toEqual(['date', 'guests', 'occasion', 'time']);
  });

  test('validate accepts valid data', () => {
    expect(validate({ date: '2026-10-20', time: '18:00', guests: 2, occasion: 'Birthday' }, '2026-10-19')).toEqual({});
  });

  test('submit button is disabled until the form is valid', async () => {
    const user = userEvent.setup();
    const { dispatch, submitForm } = renderForm();
    const button = screen.getByRole('button', { name: /make your reservation/i });
    expect(button).toBeDisabled();

    const date = futureDate();
    await user.type(screen.getByLabelText(/choose date/i), date);
    expect(dispatch).toHaveBeenCalledWith({ type: 'UPDATE_TIMES', date: parseDate(date) });

    await user.selectOptions(screen.getByLabelText(/choose time/i), '18:00');
    await user.clear(screen.getByLabelText(/number of guests/i));
    await user.type(screen.getByLabelText(/number of guests/i), '4');
    await user.selectOptions(screen.getByLabelText(/occasion/i), 'Anniversary');

    expect(button).toBeEnabled();
    await user.click(button);
    expect(submitForm).toHaveBeenCalledWith({ date, time: '18:00', guests: 4, occasion: 'Anniversary' });
  });

  test('shows an error message for an invalid number of guests', async () => {
    const user = userEvent.setup();
    renderForm();
    const guests = screen.getByLabelText(/number of guests/i);
    await user.clear(guests);
    await user.type(guests, '20');
    await user.tab();
    expect(screen.getByRole('alert')).toHaveTextContent(/between 1 and 10/i);
    expect(guests).toHaveAttribute('aria-invalid', 'true');
  });
});
