# Nexa Capital

Nexa Capital is a modern finance and investment SPA built with Vue 3. It presents a dark fintech interface for exploring financial products, saving favorites, selecting a product, and contacting the team.

## Tech stack

- Vue 3 with Composition API and `<script setup lang="ts">`
- TypeScript with strict type checking
- Vue Router for three application routes
- Pinia for application state
- Vite for development and production builds
- Custom CSS with BEM naming, responsive layouts, and transitions

## Features

- Responsive home page with a portfolio overview widget
- Product catalog with category filters
- Favorite and product selection state managed by Pinia
- Contact form with client-side validation
- Animated page transitions and content reveal animations
- Mobile navigation menu
- Dark premium fintech visual system with no external UI framework

## Project structure

```text
src/
├── assets/
│   └── styles/
│       ├── animations.css
│       ├── components.css
│       └── variables.css
├── components/
│   ├── AppFooter.vue
│   ├── AppHeader.vue
│   └── ProductCard.vue
├── router/
│   └── index.ts
├── stores/
│   └── financeStore.ts
├── views/
│   ├── ContactsView.vue
│   ├── HomeView.vue
│   └── ProductsView.vue
├── App.vue
└── main.ts
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Product overview, portfolio widget, and benefits |
| `/products` | Filterable financial product catalog |
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
- The project intentionally uses custom CSS instead of Vuetify, Tailwind, or another UI library.
