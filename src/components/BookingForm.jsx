import { useState } from 'react';
import { parseDate } from './Main';

const toInputDate = (date) => {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

export const validate = ({ date, time, guests, occasion }, today = toInputDate(new Date())) => {
  const errors = {};
  if (!date) errors.date = 'Please choose a date.';
  else if (date < today) errors.date = 'The date cannot be in the past.';
  if (!time) errors.time = 'Please choose a time.';
  const n = Number(guests);
  if (!guests || !Number.isInteger(n) || n < 1 || n > 10) {
    errors.guests = 'Number of guests must be between 1 and 10.';
  }
  if (!occasion) errors.occasion = 'Please choose an occasion.';
  return errors;
};

function BookingForm({ availableTimes = [], dispatch, submitForm }) {
  const today = toInputDate(new Date());
  const [form, setForm] = useState({ date: '', time: '', guests: 1, occasion: '' });
  const [touched, setTouched] = useState({});

  const errors = validate(form, today);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value, ...(name === 'date' ? { time: '' } : {}) }));
    if (name === 'date' && value) {
      dispatch({ type: 'UPDATE_TIMES', date: parseDate(value) });
    }
  };

  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      setTouched({ date: true, time: true, guests: true, occasion: true });
      return;
    }
    submitForm({ ...form, guests: Number(form.guests) });
  };

  const fieldError = (name) =>
    touched[name] && errors[name] ? (
      <p id={`${name}-error`} className="form__error" role="alert">{errors[name]}</p>
    ) : null;

  const describedBy = (name) => (touched[name] && errors[name] ? `${name}-error` : undefined);

  return (
    <form className="form" onSubmit={handleSubmit} noValidate aria-label="Table reservation form">
      <div className="form__field">
        <label htmlFor="res-date">Choose date</label>
        <input
          type="date"
          id="res-date"
          name="date"
          min={today}
          required
          value={form.date}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(touched.date && errors.date)}
          aria-describedby={describedBy('date')}
        />
        {fieldError('date')}
      </div>

      <div className="form__field">
        <label htmlFor="res-time">Choose time</label>
        <select
          id="res-time"
          name="time"
          required
          value={form.time}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(touched.time && errors.time)}
          aria-describedby={describedBy('time')}
        >
          <option value="" disabled>
            {availableTimes.length ? 'Select a time' : 'No times available'}
          </option>
          {availableTimes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {fieldError('time')}
      </div>

      <div className="form__field">
        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          id="guests"
          name="guests"
          placeholder="1"
          min="1"
          max="10"
          required
          value={form.guests}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(touched.guests && errors.guests)}
          aria-describedby={describedBy('guests')}
        />
        {fieldError('guests')}
      </div>

      <div className="form__field">
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          required
          value={form.occasion}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(touched.occasion && errors.occasion)}
          aria-describedby={describedBy('occasion')}
        >
          <option value="" disabled>Select an occasion</option>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Other">Other</option>
        </select>
        {fieldError('occasion')}
      </div>

      <button type="submit" className="button" disabled={!isValid}>
        Make Your Reservation
      </button>
    </form>
  );
}

export default BookingForm;
