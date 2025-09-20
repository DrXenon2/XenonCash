# XenonCash
```bash
afrilink-pro/
├── .gitignore                # Ignore node_modules, .env, etc.
├── README.md                 # Instructions setup, run, deploy
├── .env.example              # Template pour secrets
├── package.json              # Dépendances root (Next.js, Express, etc.)
├── next.config.js            # Config Next.js (proxy API)
│
├── /backend/                 # API Node.js/Express
│   ├── server.js             # Entry point (routes + Flutterwave)
│   ├── /routes/              # Toutes les routes API
│   │   ├── auth.js           # Login/register (JWT)
│   │   ├── dashboard.js      # /api/dashboard (stats)
│   │   ├── offers.js         # /api/offers (produits)
│   │   ├── transactions.js   # /api/transactions (ventes/leads)
│   │   ├── withdrawals.js    # /api/withdraw (paiements)
│   │   └── index.js          # Export routes
│   ├── /models/              # Modèles DB (queries SQL)
│   │   ├── userModel.js      # Queries pour users
│   │   ├── productModel.js   # Pour products
│   │   ├── affiliateModel.js # Pour affiliates
│   │   ├── transactionModel.js
│   │   └── withdrawalModel.js
│   ├── /controllers/         # Logique business
│   │   ├── authController.js # Gestion auth
│   │   ├── dashboardController.js
│   │   ├── offerController.js
│   │   ├── transactionController.js
│   │   └── withdrawalController.js  # Intègre Flutterwave
│   ├── /utils/               # Helpers
│   │   ├── db.js             # Connexion Pool PostgreSQL
│   │   ├── flutterwave.js    # Wrapper API Flutterwave
│   │   └── antiFraud.js      # Checks basiques (IP, etc.)
│   ├── /config/              # Configs
│   │   └── config.js         # Env vars
│   └── package.json          # Dépendances backend (express, pg, axios)
│
├── /frontend/                # Next.js app
│   ├── /app/                 # Pages Next.js
│   │   ├── layout.js         # Layout global (sidebar, header)
│   │   ├── page.js           # Landing page
│   │   ├── dashboard/        # Dashboard section
│   │   │   ├── page.jsx      # Dashboard principal (avec fetch)
│   │   │   ├── offers/       # Sous-page offers
│   │   │   │   └── page.jsx  # Liste produits
│   │   │   ├── earnings/     # Sous-page earnings
│   │   │   │   └── page.jsx  # Reports
│   │   │   ├── referrals/    # Sous-page referrals
│   │   │   │   └── page.jsx
│   │   │   ├── withdrawals/  # Sous-page withdrawals
│   │   │   │   └── page.jsx  # Form paiement
│   │   │   └── profile/      # Sous-page profile
│   │   │       └── page.jsx
│   │   ├── merchant/         # Dashboard merchant
│   │   │   └── page.jsx
│   │   └── admin/            # Panel admin
│   │       └── page.jsx
│   ├── /components/          # UI réutilisables
│   │   ├── DashboardOverview.jsx  # Vue principale dashboard
│   │   ├── OfferCard.jsx     # Carte produit
│   │   ├── EarningsChart.jsx # Graphiques (Chart.js)
│   │   ├── WithdrawalForm.jsx # Form paiement
│   │   ├── Sidebar.jsx       # Navigation latérale
│   │   ├── Header.jsx        # Top bar
│   │   └── Footer.jsx        # Footer
│   ├── /lib/                 # Utils frontend
│   │   ├── api.js            # Fetchers API (axios)
│   │   └── auth.js           # Gestion tokens (JWT)
│   ├── /public/              # Assets statiques
│   │   ├── images/           # Logos, icons (e.g., logo.png)
│   │   └── favicon.ico
│   ├── /styles/              # CSS (Tailwind config)
│   │   ├── globals.css       # Styles globaux
│   │   └── tailwind.css      # Config Tailwind
│   ├── next.config.js        # Proxy API backend
│   └── package.json          # Dépendances frontend (next, react, chart.js)
│
├── /database/                # Scripts DB
│   ├── schema.sql            # Schéma complet (tables, indexes, triggers)
│   ├── seed.sql              # Data test (users, products)
│   └── /migrations/          # Évolutions DB
│       ├── 001_initial.sql
│       └── 002_add_column.sql
│
├── /docs/                    # Documentation
│   ├── api-docs.md           # Swagger-like endpoints
│   ├── wireframes.md         # Descriptions pages
│   └── /legal-templates/     # TOS, Privacy Policy
│       ├── tos.md
│       └── privacy.md
│
└── docker-compose.yml        # Optionnel : Dev/prod (Postgres + app)
```
Website Designed By Dr Xenon
