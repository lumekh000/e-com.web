# VIVA — Live Better (E-Commerce Store)

> A modern, editorial, production-ready e-commerce store built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**.

---

## ✨ Features

- 🌿 **Luxury Botanical & Editorial Design System**: Custom palette (`#063D30` Dark Forest Green, `#022C23` Deep Green, `#DCE6D2` Sage Green, `#F8F7F2` Warm Ivory, `#F0787B` Accent Coral Red), Doppelrand double-bezel cards, glassmorphism pills, and typography (`Playfair Display` + `Plus Jakarta Sans`).
- 🛍️ **Comprehensive E-Commerce Capabilities**:
  - **Shop Page**: Dynamic price range slider, multi-category filter, brand selection checkboxes, minimum star rating filter, in-stock & sale filters, sorting, and pagination.
  - **Product Detail**: Multi-image interactive gallery, variant selection (color/size), specs table, customer reviews, review submission form, and related items grid.
  - **Quick View Modal**: Rapid product preview without navigating away.
  - **Cart Drawer & Checkout**: Free shipping meter, coupon discount calculations, multi-step checkout with address validation, and celebration confetti upon order placement.
  - **Order Tracking**: Visual 5-step timeline tracking orders by ID.
  - **User Account Dashboard**: Order history, profile management, and saved addresses.
  - **Wishlist**: Real-time wishlist toggling with persistent storage.
  - **Admin Control Center**: Live metrics analytics, real-time product CRUD management modal, stock level updates, and order status workflow updates.
  - **22+ Navigable Pages**: Home, Shop, Category, Product Detail, Deals, New Arrivals, Brands, Cart, Checkout, Order Confirmation, Track Order, Login, Account, Orders, About Us, Contact Us, FAQ Accordion, Shipping & Returns, Privacy Policy, Terms & Conditions, and Custom 404 page.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: `canvas-confetti`

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/lumekh000/e-com.web.git
cd e-com.web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/         # Header, Footer, AnnouncementBar, ProductCard, QuickViewModal, CartDrawer, etc.
│   ├── home/           # HeroBanner, ShopByCategory, TopPicksSection, PromoBannersSection, etc.
├── context/
│   └── StoreContext.tsx # Central context for routing, cart, wishlist, coupons, orders, & admin CRUD
├── data/
│   ├── products.ts     # Multi-category product dataset
│   ├── categories.ts   # Category definitions & imagery
│   ├── brands.ts       # Partner brand definitions
│   └── reviews.ts      # Customer reviews dataset
├── pages/              # 22 full application pages & Admin dashboard
├── types/              # TypeScript interface definitions
├── App.tsx             # Main router component
└── index.css           # Tailwind CSS v4 design system tokens & custom utilities
```

---

## 📄 License

MIT License
