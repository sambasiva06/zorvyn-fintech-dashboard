# Pulse — Finance Dashboard

A modern, interactive finance dashboard built with React to help users track income, expenses, and spending patterns through visual analytics and role-based access control.

## 🎯 Features

### Core
- **Dashboard Overview** — Summary cards (Total Balance, Income, Expenses) with real-time trend indicators derived from actual transaction data
- **Balance Trend Chart** — Time-based area chart showing cumulative balance progression with 3M/6M/All period selectors
- **Spending Breakdown** — Categorical pie chart with interactive legend showing expense distribution by category
- **Transactions Ledger** — Full transaction list with search, type/category filters, column sorting (date & amount), and empty state handling
- **Role-Based Access** — Toggle between `Viewer` (read-only) and `Admin` (add/delete transactions) modes with simulated permission loading
- **Smart Insights** — Automatically computed cards showing: top expense category, month-over-month spending comparison, financial health score, and income trend
- **Savings Goal** — Progress tracker towards a ₹2,00,000 savings target with status badges

### Optional Enhancements
- ✅ **Dark / Light Mode** — Theme toggle with smooth transitions, defaulting to dark
- ✅ **Data Persistence** — All transactions persist via `localStorage`
- ✅ **Export Functionality** — Download transactions as CSV or JSON from the top bar
- ✅ **Animations** — Smooth page transitions, staggered list entries, micro-interactions via Framer Motion
- ✅ **Advanced Filtering** — Filter by type (income/expense), category, text search, and sort by date or amount

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v4 + CSS Custom Properties |
| Animations | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |
| State | React Context API + `useMemo` for computed values |
| Persistence | localStorage |

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/         # Charts, summary cards, insights, savings goal
│   ├── layout/            # Sidebar, Topbar, Layout wrapper
│   └── transactions/      # Transaction table, add transaction form
├── context/
│   └── FinanceContext.jsx  # Global state, theme, computed values, persistence
├── data/
│   └── mockData.js        # 32 realistic INR transactions (Jan–Apr 2026)
├── pages/
│   ├── Dashboard.jsx      # Main overview with bento grid layout
│   ├── Transactions.jsx   # Full transaction ledger
│   ├── Analytics.jsx      # Deep analytics with charts + insights
│   └── PlaceholderPage.jsx# Coming soon pages (Cards, Settings)
├── utils/
│   └── formatters.js      # INR formatting, date helpers, CSV/JSON export
├── App.jsx                # Root component with view routing
├── main.jsx               # Entry point
└── index.css              # Design system (tokens, cards, bento grid, animations)
```

## 🚀 How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser (usually http://localhost:5173)
```

## 🧠 Design Approach

### Information Architecture
The dashboard follows a **"glanceable-to-detailed"** hierarchy:
1. **Summary cards** provide instant financial status
2. **Charts** reveal trends and patterns
3. **Insights** surface actionable observations
4. **Transaction table** offers full detail with filtering

### Color System
Uses CSS custom properties for a themeable design system:
- **Dark mode** (default): Warm midnight background (#09090b) with violet (#8b5cf6) as the primary accent
- **Light mode**: Clean white surfaces with deeper violet (#7c3aed) for contrast
- Semantic colors for income (green), expenses (red), and warnings (amber)

### State Management
All application state flows through a single React Context provider:
- **Transactions**: Array with localStorage sync
- **Role**: Viewer/Admin with simulated switch delay
- **Theme**: Dark/Light with `data-theme` attribute on `<html>`
- **Computed values**: Monthly aggregations, category totals, and trend percentages are memoized via `useMemo` for performance
- **Sort config**: Persistent sort state for the transaction table

### Role-Based UI
- **Viewer** mode: Read-only access to all dashboards and data
- **Admin** mode: Unlocks "Add Transaction" and "Delete Transaction" actions
- Role switch includes a brief loading overlay simulating authentication

### Responsiveness
Built mobile-first with:
- Collapsible sidebar with overlay on mobile
- Bento grid that adapts from 3-col → 2-col → 1-col
- Responsive table with horizontal scroll on small screens
- Touch-friendly controls and adequate tap targets

---

*Built as a demonstration of frontend design thinking, component architecture, and interactive data visualization.*
