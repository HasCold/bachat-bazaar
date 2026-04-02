# 🛒 Bachat Bazaar — بچت بازار

> Pakistan's Most Trusted Online Deals Platform  
> Full-stack MERN e-commerce — React · Express · MongoDB · Zustand

---

## 🚀 Quick Start (3 commands)

```bash
# 1. Install all dependencies
npm install && npm run install:all

# 2. Seed MongoDB with 30 products
npm run seed

# 3. Start both servers simultaneously
npm run dev
```

- **Frontend** → http://localhost:5173  
- **Backend API** → http://localhost:5000/api  

> **Requires:** Node.js 18+ · MongoDB running locally (or set `MONGODB_URI` in `backend/.env`)

---

## ✨ Features

| Page | What's inside |
|------|--------------|
| **Home** | Animated hero, scrolling promo marquee, trust badges, mini promo banners (Eid/Tech/Kitchen), Flash Deals horizontal strip, category filter grid, paginated product grid (10/page), brand strip, newsletter CTA |
| **Product Detail** | 2–3 image gallery with arrows + counter, highlights chips, qty picker (with stock cap), Add to Cart / Buy Now, Wishlist + Share, delivery info cards, tabbed Description / Specifications / Reviews, animated rating bar chart, 12-month price history chart (Recharts), related products |
| **Cart Drawer** | Slide-in from right, qty controls, free delivery threshold bar, order total, COD note |
| **404** | Custom Urdu/English not found page |

### Backend API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/products` | Paginated list — params: `page`, `limit`, `category`, `search`, `sort` |
| GET | `/api/products/featured` | Featured products (Flash Deals strip) |
| GET | `/api/products/categories` | Distinct category list |
| GET | `/api/products/:slug` | Full product detail |
| GET | `/api/products/:slug/related` | Same-category recommendations |
| GET | `/api/categories` | Categories with product counts |
| GET | `/api/health` | Health check |

---

## 📁 Project Structure

```
bachat-bazaar/
├── package.json                 ← Root: runs both servers via concurrently
│
├── backend/
│   ├── .env                     ← PORT, MONGODB_URI, FRONTEND_URL
│   ├── server.js                ← Express + MongoDB
│   ├── models/Product.js        ← Mongoose schema (images, reviews, priceHistory, specs)
│   ├── controllers/
│   │   └── productController.js ← Pagination, filtering, slug lookup, related
│   ├── routes/
│   │   ├── productRoutes.js
│   │   └── categoryRoutes.js
│   └── seed/seed.js             ← 30 realistic Pakistani market products
│
└── frontend/
    ├── .env                     ← VITE_API_URL
    ├── public/favicon.svg       ← Custom ب icon
    ├── index.html
    ├── vite.config.js           ← Proxy /api → :5000
    ├── tailwind.config.js       ← Saffron palette, Playfair + Jakarta Sans
    └── src/
        ├── App.jsx              ← Routes: / · /product/:slug · *→404
        ├── store/
        │   └── cartStore.js     ← Zustand + persist, selectTotal/selectCount exports
        ├── utils/api.js         ← Axios instance with all API calls
        ├── pages/
        │   ├── HomePage.jsx     ← Full home layout
        │   ├── ProductPage.jsx  ← Full product detail
        │   └── NotFound.jsx     ← 404 page
        └── components/
            ├── Navbar.jsx           ← Sticky, search, cart badge, mobile menu
            ├── HeroBanner.jsx       ← Dark animated hero with floating tags
            ├── PromoBanner.jsx      ← CSS marquee strip
            ├── FeaturedStrip.jsx    ← Horizontal scroll Flash Deals
            ├── CategoryBar.jsx      ← 10-category emoji grid with active state
            ├── ProductCard.jsx      ← Card with wishlist, add to cart, badges
            ├── ProductGrid.jsx      ← Paginated grid, sort, skeleton, empty state
            ├── PriceHistoryChart.jsx ← Recharts area chart, min/avg/max stats
            ├── CartDrawer.jsx       ← Framer Motion slide drawer
            └── Footer.jsx           ← Links, contact, payment methods
```

---

## 🛠 Tech Stack

| | Technology |
|-|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS (custom saffron palette) |
| Animations | Framer Motion |
| State | **Zustand** with `persist` middleware |
| Charts | **Recharts** (AreaChart for price history) |
| Routing | React Router v6 |
| Toasts | react-hot-toast |
| Backend | Express.js |
| Database | MongoDB + Mongoose |
| HTTP | Axios |
| Dev | concurrently, nodemon |

---

## 🎨 Design

- **Primary**: Saffron orange `#ff7c0a` — Pakistani market warmth  
- **Display font**: Playfair Display — elegant headings  
- **Body font**: Plus Jakarta Sans — clean, modern  
- **Dark hero**: `#1a0a00` deep brown with glowing saffron orbs  
