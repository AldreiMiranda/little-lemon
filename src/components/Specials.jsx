import { Link } from 'react-router-dom';

export const specials = [
  {
    name: 'Greek Salad',
    price: '$12.99',
    description:
      'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
  },
  {
    name: 'Bruschetta',
    price: '$5.99',
    description:
      'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
  },
  {
    name: 'Lemon Dessert',
    price: '$5.00',
    description:
      "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
  },
];

function Specials() {
  return (
    <section className="specials container" aria-labelledby="specials-title">
      <div className="specials__header">
        <h2 id="specials-title">This week's specials!</h2>
        <Link to="/menu" className="button">Online Menu</Link>
      </div>
      <div className="specials__grid">
        {specials.map((dish) => (
          <article className="card" key={dish.name}>
            <div className="card__image placeholder" role="img" aria-label={dish.name} />
            <div className="card__body">
              <div className="card__title">
                <h3>{dish.name}</h3>
                <span className="card__price">{dish.price}</span>
              </div>
              <p>{dish.description}</p>
              <Link to="/order" className="card__link">Order a delivery 🛵</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Specials;
