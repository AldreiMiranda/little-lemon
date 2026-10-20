# Little Lemon

Meta Front-End Developer Capstone (Coursera): the website and table reservation system for Little Lemon, a Mediterranean restaurant in Chicago.

## Scripts

```bash
npm install
npm run dev     # development server
npm test        # unit tests (Vitest + React Testing Library)
npm run build   # production build
```

## Features

- Home page: Hero, This week's specials, Testimonials and About
- Navigation with React Router and a responsive hamburger menu
- Booking form (`/booking`) with available times managed by `useReducer` (`initializeTimes` / `updateTimes`)
- Mock API (`src/api.js`) with `fetchAPI(date)` and `submitAPI(formData)`
- Confirmation page (`/confirmed`)
- HTML5 and JavaScript validation, with accessible error messages (ARIA)
- Unit tests for the form, the reducer and navigation

## Images

The image areas are gradient placeholders (`.placeholder`). Put the course images in `src/assets/` and replace the placeholder `div`s with `<img>` in `Hero.jsx`, `Specials.jsx`, `Testimonials.jsx` and `About.jsx`.
