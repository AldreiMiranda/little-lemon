function About() {
  return (
    <section id="about" className="about container" aria-labelledby="about-title">
      <div className="about__text">
        <h2 id="about-title">Little Lemon</h2>
        <h3>Chicago</h3>
        <p>
          Little Lemon is owned by two Italian brothers, Mario and Adrian, who moved
          to the United States to pursue their shared dream of owning a restaurant.
        </p>
        <p>
          To craft the menu, Mario relies on family recipes and his experience as a
          chef in Italy. Adrian does all the marketing for the restaurant and led the
          effort to expand the menu beyond classic Italian to incorporate additional
          cuisines from the Mediterranean region.
        </p>
      </div>
      <div className="about__images">
        <div className="placeholder about__img about__img--a" role="img" aria-label="Mario and Adrian in the kitchen" />
        <div className="placeholder about__img about__img--b" role="img" aria-label="Mario and Adrian laughing" />
      </div>
    </section>
  );
}

export default About;
