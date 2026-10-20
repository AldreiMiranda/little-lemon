import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__text">
          <h1 id="hero-title">Little Lemon</h1>
          <h2>Chicago</h2>
          <p>
            We are a family owned Mediterranean restaurant, focused on traditional
            recipes served with a modern twist.
          </p>
          <Link to="/booking" className="button">Reserve a Table</Link>
        </div>
        <div className="hero__image placeholder" role="img" aria-label="Chef presenting a plate of food" />
      </div>
    </section>
  );
}

export default Hero;
