# Smokey_Men_Catering

# Smokey Men Catering — Catering Menu Manager

A full-stack React + Express application for managing seasonal BBQ banquet menus, ingredients, and costings for Smokey Men Catering at 12 Anzac Parade, Bundanoon NSW 2578.

---

## Stack

| Layer    | Tech                                      |
|----------|-------------------------------------------|
| Frontend | React 18 + Vite 5                         |
| Backend  | Express 4 (Node.js ESM)                   |
| Data     | In-memory (seeded on start)               |
| Styling  | CSS variables, DM Sans + Playfair Display |

> Data resets on each backend restart. For persistence, swap the in-memory `db` object in `backend/src/data.js` for a SQLite or JSON-file store.

---

## Quick start

You need **Node.js 18+** installed.

### 1 — Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2 — Start the backend (port 3001)

```bash
cd backend
npm run dev
```

### 3 — Start the frontend (port 5173) — in a new terminal

```bash
cd frontend
npm run dev
```

### 4 — Open the app

```
http://localhost:5173
```

---

## Features

### Packages *(public-facing)*
- Browse all catering packages on a visual overview grid
- Five event types: Weekend Smoke & Fire, Corporate Lunch & Dinner, Midweek Major Meal, Birthday Dinner, and Wedding Feast
- Each package card shows: event type, price-from per head, guest range, availability, and a preview of what's included
- Click any card to open the full package detail page with tiered pricing, full includes list, optional add-ons, and an email enquiry CTA
- All package content is managed from `frontend/src/data/packagesData.js` — no component changes needed

### Menus
- Browse all menu cards by season (Summer / Autumn / Winter / Spring)
- Add, edit, and delete menu cards
- Each card has: service occasion, title, dish items, and an optional badge (BBQ/off-site, Local/regional, none)
- Season header shows description and marketing hook

### Ingredients
- Browse seasonal produce by season
- Add, edit, delete ingredients
- Each ingredient has: name, price per unit, unit, type (hero / local / standard), source (Flemington / Local)
- Summary bar shows count, hero items, and average hero price

### Costings
- View and edit Package A (Full weekend, 36 pax) and Package B (Celebration event) line-by-line
- Edit seasonal cost variance table (adjustment, cost driver, gross margin %)
- Operational notes panel

---

## API endpoints

| Method | Path                          | Description                     |
|--------|-------------------------------|---------------------------------|
| GET    | /api/seasons                  | All seasons                     |
| PUT    | /api/seasons/:id              | Update season metadata          |
| GET    | /api/ingredients?seasonId=    | Ingredients (optionally filtered)|
| POST   | /api/ingredients              | Create ingredient               |
| PUT    | /api/ingredients/:id          | Update ingredient               |
| DELETE | /api/ingredients/:id          | Delete ingredient               |
| GET    | /api/menus?seasonId=          | Menus (optionally filtered)     |
| POST   | /api/menus                    | Create menu card                |
| PUT    | /api/menus/:id                | Update menu card                |
| DELETE | /api/menus/:id                | Delete menu card                |
| GET    | /api/costings                 | All costings data               |
| PUT    | /api/costings                 | Update costings                 |

> The Packages page is entirely frontend-driven from `packagesData.js` and does not call the API. A future phase can add `GET /api/packages` and `PUT /api/packages/:id` when persistence is needed.

---

## Project structure

```
pill-factory-menus/
├── backend/
│   ├── package.json
│   └── src/
│       ├── index.js          ← Express server
│       └── data.js           ← Seed data (all seasons, menus, ingredients, costings)
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── App.jsx           ← Page routing and seasons loader
│       ├── index.css         ← Design tokens and all component styles
│       ├── main.jsx
│       ├── data/
│       │   └── packagesData.js   ← Catering packages content (edit here)
│       ├── hooks/
│       │   └── api.js            ← API helpers
│       ├── components/
│       │   ├── Header.jsx
│       │   ├── SeasonTabs.jsx
│       │   └── UI.jsx            ← Badge, Card, Btn, Modal, Toast, etc.
│       └── pages/
│           ├── PackagesPage.jsx      ← Public packages overview grid
│           ├── PackageDetailPage.jsx ← Single package detail + enquiry CTA
│           ├── MenusPage.jsx
│           ├── IngredientsPage.jsx
│           └── CostingsPage.jsx
└── README.md
```

---

## Adding or editing packages

All catering package content lives in `frontend/src/data/packagesData.js`. Each package object contains:

| Field           | Description                                      |
|-----------------|--------------------------------------------------|
| `id`            | URL-safe slug used for navigation                |
| `label`         | Short event type label (e.g. "Wedding")          |
| `tag`           | Badge text on the overview card                  |
| `title`         | Full package name                                |
| `accentVar`     | CSS variable name for the seasonal accent colour |
| `priceFrom`     | Lowest per-head price shown on the card          |
| `minGuests`     | Minimum guest count                              |
| `maxGuests`     | Maximum guest count                              |
| `includes`      | Array of included items                          |
| `addOns`        | Array of optional extras with per-head or flat price |
| `packages`      | Array of pricing tiers (name, guests, pricePerHead, description) |
| `availability`  | Days available string                            |
| `leadTime`      | Booking lead time string                         |

To add a new event type, copy an existing object, give it a unique `id`, and add it to the `packages` array. No component changes required.

---

## Visual design

The app uses a warm editorial hospitality aesthetic throughout:

- **Display font:** Playfair Display (headings)
- **Body font:** DM Sans (UI, labels, body copy)
- **Palette:** warm off-white background, white cards, thin 0.5px borders, restrained shadows
- **Seasonal accents:** Summer amber · Autumn coral · Winter blue · Spring green

All design tokens are defined in `frontend/src/index.css`. Do not replace tokens or introduce a new UI framework without a design phase approval.

---

## Known gaps and future phases

| Gap                          | Notes                                                    |
|------------------------------|----------------------------------------------------------|
| No persistence               | Backend resets on restart; swap `data.js` for SQLite/JSON |
| No auth                      | All pages currently public; internal pages need a gate   |
| Packages not in API          | Content is static in `packagesData.js` for now           |
| No automated tests           | Manual build and diff checks only                        |
| No enquiry form              | Package CTA currently opens a mailto link                |
