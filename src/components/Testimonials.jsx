const testimonials = [
  { name: 'Maria S.', rating: 5, review: 'Best Greek salad in Chicago!' },
  { name: 'John D.', rating: 4, review: 'Lovely atmosphere and friendly staff.' },
  { name: 'Aisha K.', rating: 5, review: 'The lemon dessert is unforgettable.' },
  { name: 'Lucas P.', rating: 5, review: 'Booking a table online was so easy.' },
];

function Testimonials() {
  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <h2 id="testimonials-title">Testimonials</h2>
        <div className="testimonials__grid">
          {testimonials.map((t) => (
            <article className="testimonial" key={t.name}>
              <p className="testimonial__rating" aria-label={`Rating: ${t.rating} out of 5`}>
                {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
              </p>
              <div className="testimonial__person">
                <div className="avatar placeholder" role="img" aria-label={`Photo of ${t.name}`} />
                <h3>{t.name}</h3>
              </div>
              <p>"{t.review}"</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
