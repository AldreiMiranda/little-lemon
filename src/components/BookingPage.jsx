import BookingForm from './BookingForm';

function BookingPage({ availableTimes, dispatch, submitForm }) {
  return (
    <section className="booking container page" aria-labelledby="booking-title">
      <h1 id="booking-title">Reserve a Table</h1>
      <p>Book your table at Little Lemon. We look forward to welcoming you!</p>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />
    </section>
  );
}

export default BookingPage;
