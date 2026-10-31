# 🍽️ Jucas AI Catering Agent (Full-Stack Spring Boot & Modern Frontend)

> An enterprise-grade AI-powered catering platform featuring an intelligent conversational agent, dynamic pricing & volume discount decision-making tools, Spring Boot 3.3 REST backend, and persistent H2 SQL database. Built for the **L&D Saturday Task** on AI Agents.

---

## 🎯 Architecture Overview

This project implements a complete **Full-Stack AI Agent System**:

```
[Modern Web Frontend] (Port 3000)
    │  - Interactive Follower Cursor (LERP Physics)
    │  - Glassmorphism & Animated Background Orbs
    │  - Real-time Floating Chat Widget
    │
    ▼ (HTTP / JSON REST API)
[Spring Boot 3.3 Backend] (Port 8085)
    ├── ChatAgentController (/api/chat)
    ├── PricingController   (/api/pricing/calculate)
    ├── OrderController     (/api/orders, /api/orders/stats)
    │
    ├── 🤖 AgentService (ReAct Reasoning Engine via Groq LLM)
    ├── 💡 PricingDecisionService (Tiered Volume Discounts & Promo Engine)
    └── 💾 OrderService & Spring Data JPA
           │
           ▼
    [Persistent H2 SQL Database] (./backend/data/jucasdb.mv.db)
```

---

## 🤖 AI Agent & Decision-Making Tools

The AI Agent employs the **ReAct (Reason + Act) pattern**:

1. **Natural Language Understanding**: Powered by Groq ultra-fast LLM (`qwen/qwen3.8-27b`).
2. **Conversation State & Memory**: Maintains chat history across multi-turn interactions.
3. **Dynamic Decision Tool: Tiered Volume & Promo Calculator**:
   - Evaluates guest count and applies automatic bulk discounts:
     - **100 – 249 guests**: 5% volume discount
     - **250 – 499 guests**: 10% volume discount
     - **500+ guests**: 15% VIP volume discount
   - Promotional Code evaluator (e.g. `JUCAS2026`, `SATURDAY` adds +5% extra discount).
   - Dynamically calculates base cost, add-on additions, gross rate, total savings, and effective per-head price.
4. **Autonomous Booking & Tool Execution**:
   - When the client confirms, the agent issues an `ORDER_CONFIRMED` structured event.
   - The backend service captures it and persists the booking directly into the **H2 SQL database** with an auto-generated order code (e.g., `JUC-0001`).

---

## 📁 Project Structure

```
d:/L&D_Saturday/
├── frontend/
│   ├── index.html         # Semantic HTML markup (cards, chat widget, admin modal)
│   ├── style.css          # Design system, glassmorphism, micro-animations & cursor
│   └── app.js             # Controller connecting to Spring Boot API with offline fallback
│
├── backend/
│   ├── pom.xml            # Spring Boot 3.3.4 (Web, JPA, H2, Validation, DevTools)
│   └── src/main/
│       ├── java/com/jucas/catering/
│       │   ├── JucasCateringApplication.java
│       │   ├── config/
│       │   │   └── CorsConfig.java               # Global CORS configuration
│       │   ├── controller/
│       │   │   ├── ChatAgentController.java      # POST /api/chat
│       │   │   ├── OrderController.java          # GET/POST /api/orders, /api/orders/stats
│       │   │   └── PricingController.java        # POST /api/pricing/calculate
│       │   ├── model/
│       │   │   ├── Order.java                    # JPA Entity
│       │   │   ├── ChatRequest.java / ChatResponse.java
│       │   │   └── PricingRequest.java / PricingResponse.java
│       │   ├── repository/
│       │   │   └── OrderRepository.java          # Spring Data JPA Repository
│       │   └── service/
│       │       ├── AgentService.java             # AI ReAct loop & Groq integration
│       │       ├── OrderService.java             # Database operations & analytics
│       │       └── PricingDecisionService.java   # Dynamic pricing decision engine
│       └── resources/
│           └── application.properties            # Port 8085, H2 persistent config
│
├── .gitignore             # Git ignore for Maven target & H2 database files
└── README.md              # Project documentation
```

---

## 🚀 How to Run

### 1. Start the Spring Boot Backend (Port 8085)

```bash
cd backend
mvn spring-boot:run
```

- Backend URL: `http://localhost:8085`
- H2 Web Console: `http://localhost:8085/h2-console`
  - JDBC URL: `jdbc:h2:file:./data/jucasdb`
  - Username: `sa`
  - Password: *(empty)*

### 2. Start the Frontend (Port 3000)

```bash
# In the root directory:
npx serve . -l 3000
```
Then open your browser at **[http://localhost:3000](http://localhost:3000)**.

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/chat` | Send conversational message to the AI Catering Agent |
| `POST` | `/api/pricing/calculate` | Run the dynamic pricing & volume discount decision tool |
| `GET` | `/api/orders` | Retrieve all catering bookings stored in H2 database |
| `POST` | `/api/orders` | Create/confirm a catering booking directly |
| `GET` | `/api/orders/stats` | Analytics summary (total orders, total revenue, total guests) |

---

## 🎨 UI/UX Features

- **Interactive Follower Cursor**: Physics-based LERP trailing ring, high-precision luminous dot, and ambient glow that scales on hoverable elements.
- **Dark Glassmorphism**: Tailored color palette (`#06060f`), frosted cards with backdrop blur, and animated floating gradient orbs.
- **Admin Dashboard**: Click **"🔐 Admin Orders"** in the footer to inspect live H2 database records and revenue analytics.
- **Contextual Quick-Reply Chips**: The chat widget dynamically surfaces quick action chips according to the conversational state.

---

## 📧 Notes for Submission (Divyang Sir)

- **AI Agent Pattern**: ReAct (Reasoning + Acting) with decision-making tools
- **LLM**: Groq High-Speed API (`qwen/qwen3.8-27b`)
- **Backend**: Java 17/21 · Spring Boot 3.3 · Spring Data JPA · H2 SQL Database
- **Frontend**: Semantic HTML5 · Vanilla CSS3 (Custom Design System) · ES6+ JavaScript
