import { useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { fetchAPI, submitAPI } from '../api';
import HomePage from './HomePage';
import About from './About';
import BookingPage from './BookingPage';
import ConfirmedBooking from './ConfirmedBooking';
import UnderConstruction from './UnderConstruction';

// "YYYY-MM-DD" -> Date in local time (new Date(string) would parse it as UTC).
export const parseDate = (value) => {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const initializeTimes = () => fetchAPI(new Date());

export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return fetchAPI(action.date);
    default:
      return state;
  }
};

function Main() {
  const [availableTimes, dispatch] = useReducer(updateTimes, undefined, initializeTimes);
  const navigate = useNavigate();

  const submitForm = (formData) => {
    if (submitAPI(formData)) {
      navigate('/confirmed', { state: formData });
    }
  };

  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/booking"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatch={dispatch}
              submitForm={submitForm}
            />
          }
        />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
        <Route path="/menu" element={<UnderConstruction title="Menu" />} />
        <Route path="/order" element={<UnderConstruction title="Order Online" />} />
        <Route path="/login" element={<UnderConstruction title="Login" />} />
        <Route path="*" element={<UnderConstruction title="Page not found" />} />
      </Routes>
    </main>
  );
}

export default Main;
