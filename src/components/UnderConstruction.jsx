import { Link } from 'react-router-dom';

function UnderConstruction({ title }) {
  return (
    <section className="container page" aria-labelledby="page-title">
      <h1 id="page-title">{title}</h1>
      <p>This page is under construction. Please check back soon!</p>
      <Link to="/" className="button">Back to Home</Link>
    </section>
  );
}

export default UnderConstruction;
