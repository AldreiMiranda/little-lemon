import { Link, useLocation } from 'react-router-dom';

function ConfirmedBooking() {
  const { state } = useLocation();

  return (
    <section className="container page confirmed" aria-labelledby="confirmed-title">
      <h1 id="confirmed-title">Booking Confirmed!</h1>
      {state ? (
        <p>
          Thank you! Your table for <strong>{state.guests}</strong>{' '}
          {state.guests === 1 ? 'guest' : 'guests'} on <strong>{state.date}</strong> at{' '}
          <strong>{state.time}</strong> ({state.occasion}) has been reserved.
        </p>
      ) : (
        <p>Your reservation has been received. We look forward to seeing you!</p>
      )}
      <Link to="/" className="button">Back to Home</Link>
    </section>
  );
}

export default ConfirmedBooking;
