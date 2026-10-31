# 🍽️ Jucas Royale Atelier — Haute Cuisine & AI Banquet Concierge

> An enterprise-grade, agency-designed full-stack web application featuring an intelligent ReAct AI Sommelier & Banquet Concierge, dynamic tiered pricing engine, Spring Boot 3.3.4 REST backend, and persistent H2 SQL database. Built for the **L&D Saturday Task** on AI Agents.

---

## 🎯 Architecture Overview

```
[Luxury React 19 + TypeScript + Vite Frontend] (Port 3000)
    │  - Haute Aesthetics: Velvet Obsidian (#0B0A09) & Champagne Gold (#D4AF37)
    │  - Editorial Typography: Cormorant Garamond & Plus Jakarta Sans
    │  - Magnetic Custom Follower Cursor with LERP dynamics
    │  - Live Interactive Tiered Pricing & Volume Discount Estimator
    │  - Floating AI Sommelier & Banquet Concierge Widget
    │  - Live Admin SQL Console with Instant H2 Telemetry
    │
    ▼ (HTTP / JSON REST API with CORS & Backoff Retry)
[Spring Boot 3.3.4 Backend] (Port 8085)
    ├── ChatAgentController (/api/chat)
    ├── PricingController   (/api/pricing/calculate)
    ├── OrderController     (/api/orders, /api/orders/stats)
    │
    ├── 🤖 AgentService (ReAct Reasoning Engine via Groq LLM: qwen/qwen3.8-27b)
    ├── 💡 PricingDecisionService (Tiered Volume Discounts & Promo Engine)
    └── 💾 OrderService & Spring Data JPA
           │
           ▼
    [Persistent H2 SQL Database] (./backend/data/jucasdb.mv.db)
```

---

## 🤖 AI Agent & Decision-Making Tools

The AI Agent employs the **ReAct (Reason + Act) pattern**:

1. **Natural Language Understanding & Sommelier Knowledge**: Powered by Groq ultra-low-latency inference running `qwen/qwen3.8-27b`.
2. **Context Memory & Inquiry Handling**: Suggests wine pairings, chef tastings, allergen menus, and venue cadence across multi-turn dialogs.
3. **Dynamic Decision Tool: Tiered Volume & Promo Engine**:
   - Automatically computes tiered bulk discounts based on guest volume:
     - **100 – 249 guests**: 5% volume discount
     - **250 – 499 guests**: 10% volume discount
     - **500+ guests**: 15% VIP volume discount
   - Promotional Code evaluator (`JUCAS2026`, `SATURDAY`, `DIVYANG` adds +5% promotional allowance).
   - Computes base package rate, live station add-ons, gross subtotal, savings, and effective per-head rate.
4. **Autonomous Booking & Tool Execution**:
   - Saves confirmed orders directly to the **H2 SQL database** with an auto-generated order code (e.g. `JUC-842918`).
   - Accessible immediately via the built-in **Admin Database Console**.

---

## 📁 Repository Structure

```
d:/L&D_Saturday/
├── frontend/                     # Modern React 19 + TypeScript + Vite Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx                # Responsive luxury header & admin trigger
│   │   │   ├── Hero.tsx                  # High-impact editorial typography & CTA
│   │   │   ├── MenuShowcase.tsx          # 6 curated banquet collections & tasting menus
│   │   │   ├── LiveCalculator.tsx        # Real-time Spring Boot pricing estimator
│   │   │   ├── ExperiencePhilosophy.tsx  # 4 pillars of culinary mastery & audit stats
│   │   │   ├── Testimonials.tsx          # Verified patron chronicles & reviews
│   │   │   ├── FaqSection.tsx            # Technical, culinary & database FAQ
│   │   │   ├── Footer.tsx                # Brand atelier footer & salon contacts
│   │   │   ├── ChatWidget.tsx            # Floating Groq AI Sommelier widget
│   │   │   ├── AdminDashboardModal.tsx   # Live H2 order records & financial analytics
│   │   │   ├── BookingModal.tsx          # 1-click commission reservation to H2 DB
│   │   │   └── CursorFollower.tsx        # Sleek magnetic gold trailing cursor
│   │   ├── services/
│   │   │   └── api.ts                    # Typed client API with graceful fallbacks
│   │   ├── App.tsx                       # Master atelier orchestrator
│   │   └── index.css                     # Tailwind tokens, gold glows & styling
│   ├── package.json
│   └── vite.config.ts
│
├── frontend-legacy/              # Backup of initial vanilla HTML/CSS prototype
│
├── backend/                      # Java 17/21 & Spring Boot 3.3.4 REST API
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/jucas/catering/
│       │   ├── JucasCateringApplication.java
│       │   ├── config/CorsConfig.java
│       │   ├── controller/               # Chat, Order, Pricing controllers
│       │   ├── model/                    # Order entity, DTOs
│       │   ├── repository/               # OrderRepository (Spring Data JPA)
│       │   └── service/                  # AgentService, OrderService, PricingService
│       └── resources/
│           ├── application.properties    # Server port 8085, persistent H2 config
│           └── local.properties          # (Git-ignored) local credentials
│
├── .gitignore                    # Protects secrets, node_modules, H2 data, target
└── README.md                     # Documentation
```

---

## 🚀 How to Run

### 1. Start the Spring Boot Backend (Port 8085)

```bash
cd backend
mvn spring-boot:run
```

- **Backend API**: `http://localhost:8085`
- **H2 Web Console**: `http://localhost:8085/h2-console`
  - JDBC URL: `jdbc:h2:file:./data/jucasdb`
  - Username: `sa`
  - Password: *(empty)*

### 2. Start the Modern React Frontend (Port 3000)

```bash
cd frontend
npm install
npm run dev -- --port 3000 --host
```

Then open your browser at **[http://localhost:3000](http://localhost:3000)**.

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/chat` | Send conversational prompt to the Groq AI Sommelier Agent |
| `POST` | `/api/pricing/calculate` | Execute dynamic tiered pricing & volume discount engine |
| `GET` | `/api/orders` | Retrieve all persistent catering commissions from H2 SQL DB |
| `POST` | `/api/orders` | Create and persist a catering commission directly |
| `GET` | `/api/orders/stats` | Analytics summary (total orders, total revenue, total guests) |

---

## 🎨 Design & Aesthetic Excellence

- **Color Palette**: Velvet Obsidian (`#0B0A09`), Champagne Gold Royale (`#D4AF37`, `#F5EED5`), Charcoal Noir (`#12100E`).
- **Typography**: Cormorant Garamond (Editorial Serif) paired with Plus Jakarta Sans (Clean Modern Sans-Serif).
- **Physics**: Smooth magnetic cursor following with responsive scale on interactive elements.
- **Production Ready**: Zero AI template cliches; designed with the elegance of high-end luxury atelier houses like LVMH, Aman, or Oberoi.
