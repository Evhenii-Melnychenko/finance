# Brand name

Brand name is a modern finance and investment SPA built with Vue 3. It presents a premium fintech interface for exploring financial products, saving favorites, selecting a product, and contacting the team.

## Demo link

[There is a demo link](https://finance-nu-sandy-30.vercel.app/)

## Tech stack

- Vue 3 with Composition API and `<script setup lang="ts">`
- TypeScript with strict type checking
- Vue Router for four application routes
- Pinia for application state
- Vite for development and production builds
- Custom CSS with BEM naming, responsive layouts, and transitions

## Features

- Responsive home page with a portfolio overview widget and animated statistics counters
- Product catalog with category filters and nine financial products
- Our team page with interactive neon/blur profile cards, tilt hover effects, and profile modals
- Show more and Show less controls for the product catalog
- Favorite and product selection state managed by Pinia
- Contact form with client-side validation
- Animated page transitions and content reveal animations
- Typewriter headings on the Products, Contacts, and Team pages
- Mobile navigation menu
- Light and dark themes with a persistent localStorage preference
- Partner marquee with theme-aware colors and edge fade masks
- Dynamic copyright year in the footer
- Premium fintech visual system with no external UI framework

## Project structure

```text
src/
├── assets/
│   └── styles/
│       ├── animations.css
│       ├── base.css
│       ├── contacts.css
│       ├── header-footer.css
│       ├── home.css
│       ├── products.css
│       ├── responsive.css
│       ├── team.css
│       └── variables.css
├── components/
│   ├── AppFooter.vue
│   ├── AppHeader.vue
│   ├── PartnerMarquee.vue
│   └── ProductCard.vue
├── router/
│   └── index.ts
├── stores/
│   └── financeStore.ts
├── views/
│   ├── ContactsView.vue
│   ├── HomeView.vue
│   ├── ProductsView.vue
│   └── TeamView.vue
├── App.vue
└── main.ts
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Product overview, portfolio widget, and benefits |
| `/products` | Filterable financial product catalog |
| `/team` | Team profiles with interactive neon/blur cards |
| `/contacts` | Validated contact form and company details |

## Setup

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Run type checking and create a production build:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Development notes

- Shared product data and UI state live in `src/stores/financeStore.ts`.
- Route components are lazy-loaded from `src/router/index.ts`.
- Component classes follow the BEM pattern, for example `product-card__title` and `product-card--featured`.
- Global styles are split by responsibility and imported from `src/assets/main.css`.
- The product page shows six products initially, reveals the remaining products with `Show more`, and restores the first six with `Show less`.
- The theme toggle stores the selected mode under the `nexa-theme` localStorage key.
- The partner marquee has dedicated light-theme colors so its cards and fade masks remain readable after switching themes.
- Team profile cards use CSS glow/blur layers and pointer-based tilt without an external animation library.
- The project intentionally uses custom CSS instead of Vuetify, Tailwind, or another UI library.
