# SkyMart 🛒⚡

A modern, full-featured e-commerce storefront built with React, Redux Toolkit, and Tailwind CSS v4 — featuring an interactive animated background, spotlight-effect product cards, and a complete shopping flow from browsing to checkout.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?logo=redux&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)

---

## ✨ Features

- **Authentication** — register/login with persisted sessions (localStorage-backed, no external auth provider required)
- **Product Catalog** — 50+ products across 6 categories with search, category filtering, and sorting (price, rating)
- **Shopping Cart** — slide-out cart drawer with quantity controls, persisted across sessions
- **Product Details** — full detail view with related products, prev/next navigation, and wishlist toggle
- **Protected Routes** — logged-out users are redirected away from the app; logged-in users can't revisit auth pages
- **Fully Responsive** — mobile-first layout across every page
- **Animated Interactive Background** — a cursor-reactive dot field rendered on every page (see [Animations](#-animations--react-bits) below)
- **Spotlight Product Cards** — product cards reveal color on hover against a grayscale base, powered by GSAP

---

## 🧱 Tech Stack

| Layer            | Technology                                          |
| ---------------- | --------------------------------------------------- |
| UI Library       | React 18                                            |
| State Management | Redux Toolkit                                       |
| Routing          | React Router v6                                     |
| Styling          | Tailwind CSS v4 (CSS-first config, no PostCSS file) |
| Icons            | lucide-react, Font Awesome                          |
| WebGL / 3D       | Three.js                                            |
| Animation        | GSAP                                                |
| Notifications    | react-hot-toast                                     |
| Build Tool       | Vite                                                |
| Font             | JetBrains Mono (Google Fonts)                       |

---

## 🎨 Animations — React Bits

This project uses two components adapted from **[React Bits](https://reactbits.dev)**, a library of animated UI components. Both were customized to fit SkyMart's dark/purple theme and integrated with the app's routing and Redux state.

### 1. DotField — Global Background

A canvas-based, cursor-reactive dot grid rendered behind every page via `Layout.jsx`. Dots bulge away from the cursor in real time, with a soft radial glow following mouse movement.

- **Location:** `src/components/DotField.jsx` + `DotField.css`
- **Rendering:** HTML5 Canvas + SVG glow overlay
- **Adapted for:** fixed-position, full-viewport usage across route changes (patched to track cursor position via `getBoundingClientRect()` on every move, so the effect stays accurate regardless of scroll position)

### 2. ChromaGrid — Product Card Spotlight

Wraps the product grid (Products page + Related Products) to create a grayscale base layer that reveals full color in a spotlight radius around the cursor, with each card also getting its own localized shine effect.

- **Location:** `src/components/ChromaGrid.jsx` + `ChromaGrid.css`
- **Powered by:** GSAP (`gsap.quickSetter`, `gsap.to`) for smooth, performant cursor tracking
- **Adapted for:** a responsive `auto-fill` grid (instead of a fixed column count) and a tightened reveal radius so the spotlight effect stays contained within the hovered card instead of bleeding into neighbors

### 3. LiquidEther — Login Page Background

+A WebGL fluid-simulation background rendered behind the Login page, using a real-time Navier–Stokes-based shader to create flowing, ink-like liquid motion that reacts to cursor movement — with an idle "auto demo" mode that animates on its own when the user isn't interacting.

- **Location:** `src/components/LiquidEther.jsx` + `LiquidEther.css`
- **Powered by:** Three.js (WebGL shaders, render-to-texture fluid simulation)
- **Adapted for:** fixed full-page placement behind both login panels, with pointer-events disabled on the wrapper so it never blocks form interaction (mouse tracking is bound to `window`, so this doesn't break the cursor-reactive effect)
- **Performance:** automatically pauses rendering when the tab is hidden or the component scrolls off-screen, so it doesn't burn GPU cycles when not visible

---

## 📁 Project Structure

```
SKYMART/
├── dist/                       # production build output (generated)
├── node_modules/                # dependencies (generated)
├── src/
│   ├── components/
│   │   ├── CartDrawer.jsx       # slide-out cart panel
│   │   ├── ChromaGrid.jsx       # React Bits — spotlight product grid wrapper
│   │   ├── ChromaGrid.css
│   │   ├── DotField.jsx         # React Bits — animated background
│   │   ├── DotField.css
│   │   ├── Layout.jsx           # shared page shell (navbar + background + footer)
│   │   ├── LiquidEther.jsx      # React Bits — WebGL fluid background (Login page)
│   │   ├── LiquidEther.css
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx      # individual product card (chroma-grid child)
│   │   └── ProductSkeleton.jsx  # loading placeholder
│   ├── data/
│   │   └── mockData.js          # product catalog (50 products, 6 categories)
│   ├── hooks/
│   │   └── useProducts.js       # simulated data-fetching hooks
│   ├── pages/
│   │   ├── AboutPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── ProductsPage.jsx
│   │   └── RegisterPage.jsx
│   ├── routes/
│   │   └── ProtectedRoute.jsx   # auth route guards
│   ├── store/
│   │   ├── authSlice.js         # Redux slice — auth state (localStorage-backed)
│   │   ├── cartSlice.js         # Redux slice — cart state (localStorage-backed)
│   │   └── store.js             # Redux store config
│   ├── App.jsx                  # route definitions
│   ├── index.css                # Tailwind v4 theme + global styles
│   └── main.jsx                 # app entry point
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes bundled with Node.js)

### Installation

```bash
# install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

Output is generated in the `dist/` folder.

### Previewing the Production Build

```bash
npm run preview
```

---

## 🔑 Environment Variables

None required — this project uses localStorage to simulate authentication and persist cart data, so there's no backend or API key setup needed to run it.

---

## 📦 Deployment

This project is deploy-ready for [Vercel](https://vercel.com):

1. Push the repository to GitHub.
2. Import the repo in the Vercel dashboard.
3. Vercel auto-detects the Vite framework preset:
    - **Build Command:** `npm run build`
    - **Output Directory:** `dist`
4. Deploy — no environment variables needed.

---

## 🗂️ Key Design Decisions

- **No real backend** — `mockData.js` serves as the product source of truth; `useProducts.js` wraps it with an artificial delay so loading states behave like a real API call.
- **localStorage-based auth** — accounts and sessions are stored client-side for demo purposes. This is **not** production-grade authentication (passwords are stored in plaintext) and should be replaced with a real backend + hashed credentials before any real-world use.
- **Tailwind v4, CSS-first config** — theme tokens (colors, fonts, animations) live in `index.css` under `@theme` rather than a separate `tailwind.config.js`, and PostCSS is handled internally by the `@tailwindcss/vite` plugin.

---

## 📄 License

This project is open-source and available for personal or educational use.
