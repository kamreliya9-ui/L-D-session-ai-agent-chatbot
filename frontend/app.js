/* ============================================================
   JUCAS CATERING — FRONTEND & AI AGENT CONTROLLER (app.js)
   Features:
   - Full Spring Boot 3.3 REST API Integration (/api/chat, /api/orders, /api/pricing)
   - Persistent H2 SQL Database integration with graceful offline fallback
   - Dynamic Price & Volume Discount Calculator Decision Tool
   - Interactive Smooth Follower Cursor System (Physics LERP)
   - Scroll-triggered Animations & Dynamic Number Counters
   - Admin Analytics Dashboard
============================================================ */

/* ============================================================
   CONFIG — Spring Boot Backend & Groq Direct Fallback
============================================================ */
const BACKEND_API_BASE = 'http://localhost:8085/api';

// Fallback direct Groq config if Spring Boot backend is not yet started
const GROK_API_KEY = 'YOUR_GROQ_API_KEY';
const GROK_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROK_MODEL   = 'qwen/qwen3.8-27b';
const DB_KEY       = 'jucas_orders';

/* ============================================================
   LOCAL DATABASE CONTROLLER (Fallback Storage)
============================================================ */
const DB = {
  getAll: () => {
    try {
      return JSON.parse(localStorage.getItem(DB_KEY) || '[]');
    } catch (e) {
      return [];
    }
  },
  save: (arr) => {
    localStorage.setItem(DB_KEY, JSON.stringify(arr));
  },
  add: (order) => {
    const all = DB.getAll();
    const saved = {
      orderCode: 'JUC-' + String(all.length + 1).padStart(4, '0'),
      ...order,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    all.push(saved);
    DB.save(all);
    return saved;
  }
};

/* ============================================================
   SYSTEM PROMPT (Used for direct fallback)
============================================================ */
const SYSTEM_PROMPT = `You are Jucas AI, a warm and professional catering assistant for Jucas Premium Catering Services.

JUCAS MENU & PRICING:
- Royal Indian Feast: Rs.500/head (min 100 guests)
- Continental Elegance: Rs.650/head (min 50 guests)
- Chinese Fiesta: Rs.450/head (min 50 guests)
- South Indian Delight: Rs.350/head (min 50 guests)
- Live BBQ & Grill: Rs.750/head (min 30 guests)
- Vegan & Wellness: Rs.550/head (min 30 guests)

ADD-ONS: Welcome Drinks +80/head, Dessert Counter +120/head, Live Pasta +100/head, Mocktail Bar +150/head

DYNAMIC PRICING & VOLUME DISCOUNT RULES:
- 100 to 249 guests: 5% volume discount
- 250 to 499 guests: 10% volume discount
- 500+ guests: 15% VIP volume discount
- Promo code 'JUCAS2026' or 'SATURDAY': +5% extra discount

COLLECT IN ORDER: 1) Name 2) Event Type 3) Date 4) Guests 5) Cuisine 6) Dietary (Veg/Non-Veg/Mixed/Vegan) 7) Budget/head 8) Recommend menu + calculate total 9) Add-ons 10) Phone number 11) Final summary + ask to confirm

After user confirms, output strictly:
ORDER_CONFIRMED:{"customerName":"...","phone":"...","eventType":"...","eventDate":"...","guests":NUMBER,"cuisine":"...","dietary":"...","budgetPerHead":NUMBER,"recommendedMenu":"...","addOns":"...","totalAmount":NUMBER,"discountAmount":NUMBER,"discountReason":"..."}

RULES: Be warm and friendly. Max 3 sentences per reply. Ask ONE question at a time. Use Rs. for prices. Use 1 emoji per message.`;

/* ============================================================
   APPLICATION STATE
============================================================ */
let chatOpen    = false;
let isTyping    = false;
let chatHistory = [];
let pendingMenu = null;
let chatStarted = false;
let backendOnline = null; // null: unknown, true: online, false: offline

/* ============================================================
   INTERACTIVE CURSOR SYSTEM WITH LERP ANIMATION
============================================================ */
const cursorDot  = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const cursorGlow = document.querySelector('.cursor-glow');

let mouseX = -100, mouseY = -100;
let ringX  = -100, ringY  = -100;
let glowX  = -100, glowY  = -100;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (cursorDot) {
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top  = `${mouseY}px`;
  }
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;

  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;

  if (cursorRing) {
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top  = `${ringY}px`;
  }
  if (cursorGlow) {
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top  = `${glowY}px`;
  }

  requestAnimationFrame(animateCursor);
}
animateCursor();

function setupCursorHovers() {
  const interactives = document.querySelectorAll(
    'a, button, .menu-card, .step-card, .service-card, input, .qr-chip, .stat-item, .footer-admin'
  );
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}
setupCursorHovers();

/* ============================================================
   NAVBAR SCROLL BLUR
============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
});

/* ============================================================
   INTERSECTION OBSERVER — FADE-UP ANIMATIONS
============================================================ */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

/* ============================================================
   ANIMATED STATS COUNTER
============================================================ */
function animateCounter(el, target) {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + (target >= 100 ? '+' : '');
    if (current >= target) {
      clearInterval(timer);
    }
  }, 25);
}

const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('[data-count]').forEach(el => {
          animateCounter(el, +el.dataset.count);
        });
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.4 });
  statsObserver.observe(statsBar);
}

/* ============================================================
   CHAT WIDGET TOGGLE & CONTROLS
============================================================ */
function toggleChat() {
  chatOpen = !chatOpen;
  const panel  = document.getElementById('chat-panel');
  const toggle = document.getElementById('chat-toggle');
  
  if (panel) panel.classList.toggle('visible', chatOpen);
  if (toggle) toggle.innerHTML = chatOpen ? '&#10005;' : '&#128172;';

  const badge = toggle ? toggle.querySelector('.chat-badge') : null;
  if (badge) badge.remove();

  if (chatOpen && !chatStarted) {
    chatStarted = true;
    setTimeout(startConversation, 350);
  }
}

function openChat() {
  if (!chatOpen) toggleChat();
}

function openChatWithMenu(menu) {
  pendingMenu = menu;
  openChat();
}

/* ============================================================
   CONVERSATION INITIALIZATION
============================================================ */
function startConversation() {
  const greet = pendingMenu
    ? `Great choice! The ${pendingMenu} menu is amazing. I'm Jucas AI and I'll help you plan and order with live volume discounts. May I know your name? 😊`
    : `Welcome to Jucas Catering! I'm your AI assistant and I'll help you plan the perfect catering for your event with instant quotes and discounts. May I start with your name? 😊`;

  addMessage('bot', greet);
  chatHistory = [
    { role: 'assistant', content: greet }
  ];
  pendingMenu = null;
}

/* ============================================================
   SEND MESSAGE
============================================================ */
async function sendMessage() {
  const input = document.getElementById('chat-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text || isTyping) return;

  input.value = '';
  clearQuickReplies();
  addMessage('user', text);
  chatHistory.push({ role: 'user', content: text });

  await getAIResponse();
}

const chatInputField = document.getElementById('chat-input');
if (chatInputField) {
  chatInputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
}

/* ============================================================
   AI API CALL (SPRING BOOT REST API WITH DIRECT FALLBACK)
============================================================ */
async function getAIResponse() {
  showTyping();
  try {
    // 1. Try Spring Boot Backend first
    let res;
    let usedSpring = false;
    try {
      res = await fetch(`${BACKEND_API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory }),
        signal: AbortSignal.timeout(6000)
      });
      if (res.ok) usedSpring = true;
    } catch (backendErr) {
      console.warn('Spring Boot backend not detected on port 8080, falling back to direct Groq client:', backendErr);
    }

    if (usedSpring) {
      backendOnline = true;
      const data = await res.json();
      hideTyping();

      const reply = data.reply || "I didn't get that. Could you try again?";
      chatHistory.push({ role: 'assistant', content: reply });
      addMessage('bot', reply);
      suggestChips(reply);

      // If Spring Boot backend booked and confirmed the order in H2 DB:
      if (data.confirmedOrder) {
        showConfirmCard(data.confirmedOrder, 'Spring Boot H2 SQL Database');
      }
      return;
    }

    // 2. Direct Groq fallback if Spring Boot is offline
    backendOnline = false;
    const directHistory = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...chatHistory
    ];

    const fallbackRes = await fetch(GROK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROK_API_KEY}`
      },
      body: JSON.stringify({
        model: GROK_MODEL,
        messages: directHistory,
        max_tokens: 450,
        temperature: 0.7
      })
    });

    if (!fallbackRes.ok) {
      const e = await fallbackRes.json().catch(() => ({}));
      throw new Error(e.error?.message || `API Error ${fallbackRes.status}`);
    }

    const fallbackData = await fallbackRes.json();
    let rawContent = fallbackData.choices?.[0]?.message?.content || "";
    rawContent = rawContent.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
    const reply = rawContent || "I didn't get that. Could you try again?";

    chatHistory.push({ role: 'assistant', content: reply });
    hideTyping();

    if (reply.includes('ORDER_CONFIRMED:')) {
      const idx  = reply.indexOf('ORDER_CONFIRMED:');
      const pre  = reply.substring(0, idx).trim();
      const rest = reply.substring(idx + 'ORDER_CONFIRMED:'.length).trim();
      const s = rest.indexOf('{'), e2 = rest.lastIndexOf('}');

      if (pre) addMessage('bot', pre);

      try {
        const order = JSON.parse(rest.substring(s, e2 + 1));
        const saved = DB.add(order);
        showConfirmCard(saved, 'Local Storage (Run Spring Boot for H2 DB)');
      } catch (err) {
        addMessage('bot', rest || 'Your order has been confirmed! ✅');
      }
    } else {
      addMessage('bot', reply);
      suggestChips(reply);
    }

  } catch (err) {
    hideTyping();
    addMessage('bot', `😕 Error: ${err.message}`);
  }
}

/* ============================================================
   UI RENDERING HELPERS
============================================================ */
function addMessage(role, html) {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = 'msg ' + role;

  if (role === 'bot') {
    msgDiv.innerHTML = `
      <div class="msg-avatar">&#129302;</div>
      <div class="msg-bubble">${formatText(html)}</div>
    `;
  } else {
    msgDiv.innerHTML = `
      <div class="msg-bubble">${escapeHtml(html)}</div>
    `;
  }

  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

function formatText(t) {
  return t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
}

function escapeHtml(t) {
  return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function showTyping() {
  isTyping = true;
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const typingDiv = document.createElement('div');
  typingDiv.className = 'msg bot';
  typingDiv.id = 'typing-el';
  typingDiv.innerHTML = `
    <div class="msg-avatar">&#129302;</div>
    <div class="msg-bubble">
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
  `;
  container.appendChild(typingDiv);
  container.scrollTop = container.scrollHeight;
}

function hideTyping() {
  isTyping = false;
  const el = document.getElementById('typing-el');
  if (el) el.remove();
}

/* ============================================================
   SUGGESTED QUICK REPLIES
============================================================ */
function suggestChips(text) {
  const lower = text.toLowerCase();
  let chips = [];

  if (lower.includes('event type') || lower.includes('occasion')) {
    chips = ['💒 Wedding', '🏢 Corporate', '🎂 Birthday', '🎊 Anniversary'];
  } else if (lower.includes('cuisine') || lower.includes('menu')) {
    chips = ['🍛 Indian (Rs.500)', '🥩 Continental (Rs.650)', '🥟 Chinese (Rs.450)', '🌴 South Indian (Rs.350)'];
  } else if (lower.includes('dietary')) {
    chips = ['🥗 Veg Only', '🍗 Non-Veg', '🔀 Mixed', '🌱 Vegan'];
  } else if (lower.includes('add-on') || lower.includes('station')) {
    chips = ['Yes, add Welcome Drinks (+80)', 'Yes, add Dessert Counter (+120)', 'No thanks, keep it simple'];
  } else if (lower.includes('confirm')) {
    chips = ['✅ Yes, confirm order!', '✏️ Let me modify details'];
  }

  clearQuickReplies();
  if (chips.length) {
    const qrContainer = document.getElementById('quick-replies');
    chips.forEach(chipText => {
      const btn = document.createElement('button');
      btn.className = 'qr-chip';
      btn.textContent = chipText;
      btn.onclick = () => {
        const input = document.getElementById('chat-input');
        if (input) input.value = chipText;
        sendMessage();
      };
      qrContainer.appendChild(btn);
    });
    setupCursorHovers();
  }
}

function clearQuickReplies() {
  const qrContainer = document.getElementById('quick-replies');
  if (qrContainer) qrContainer.innerHTML = '';
}

/* ============================================================
   ORDER CONFIRMATION CARD
============================================================ */
function showConfirmCard(order, storageEngine) {
  const code = order.orderCode || order.id || 'JUC-0001';
  const html = `
    ✅ <strong>Order Booked &amp; Saved!</strong><br><br>
    🆔 <strong>${code}</strong><br>
    👤 ${order.customerName || '—'}<br>
    📱 ${order.phone || '—'}<br>
    🎉 ${order.eventType || '—'} &mdash; ${order.eventDate || '—'}<br>
    👥 ${order.guests || 0} guests<br>
    🍽️ ${order.recommendedMenu || order.cuisine || '—'}<br>
    ${order.discountAmount ? `🏷️ Discount: <strong>-&#8377;${Number(order.discountAmount).toLocaleString('en-IN')}</strong> (${order.discountReason || 'Volume discount'})<br>` : ''}
    💰 Total: <strong>&#8377;${(order.totalAmount || 0).toLocaleString('en-IN')}</strong><br>
    🗄️ Storage: <span style="color:#34d399">${storageEngine || 'H2 Database'}</span><br><br>
    Our team will reach out within 2 hours to finalize! 🙌
  `;
  addMessage('bot', html);

  const adminBtn = document.getElementById('admin-btn');
  if (adminBtn) {
    adminBtn.style.color = '#34d399';
    setTimeout(() => adminBtn.style.color = '', 4000);
  }
}

/* ============================================================
   ADMIN DASHBOARD MODAL (SYNCS WITH SPRING BOOT H2 DB)
============================================================ */
async function openAdmin() {
  const body = document.getElementById('admin-body');
  if (!body) return;

  body.innerHTML = `<div class="admin-empty">Loading orders from Spring Boot database...</div>`;
  const modal = document.getElementById('admin-modal');
  if (modal) modal.classList.add('visible');

  let orders = [];
  let isSpring = false;

  try {
    const res = await fetch(`${BACKEND_API_BASE}/orders`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      orders = await res.json();
      isSpring = true;
    }
  } catch (e) {
    console.warn('Spring Boot offline, falling back to local orders:', e);
  }

  // Fallback to local DB if Spring Boot is offline or has no data
  if (!isSpring) {
    orders = DB.getAll();
  }

  if (!orders.length) {
    body.innerHTML = `
      <div class="admin-empty">
        <div class="empty-icon">&#128203;</div>
        No orders found in database.<br>Use the chat widget to place a test booking!
        <br><br>
        <span style="font-size:0.8rem;color:${isSpring ? '#34d399' : '#fbbf24'}">
          ${isSpring ? '🟢 Connected to Spring Boot H2 SQL Database' : '🟡 Standalone Mode (localStorage). Start Spring Boot for H2 DB.'}
        </span>
      </div>
    `;
  } else {
    const revenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const guests  = orders.reduce((sum, o) => sum + (o.guests || 0), 0);

    body.innerHTML = `
      <div style="margin-bottom:14px;font-size:0.82rem;color:${isSpring ? '#34d399' : '#fbbf24'};display:flex;align-items:center;gap:6px;">
        <span style="width:8px;height:8px;border-radius:50%;background:${isSpring ? '#34d399' : '#fbbf24'}"></span>
        ${isSpring ? 'Connected to Spring Boot H2 Database (Persistent SQL)' : 'Offline / LocalStorage Mode'}
      </div>
      <div class="admin-stats-bar">
        <div class="admin-stat">
          <div class="admin-stat-val">${orders.length}</div>
          <div class="admin-stat-lbl">Total Orders</div>
        </div>
        <div class="admin-stat">
          <div class="admin-stat-val">&#8377;${revenue.toLocaleString('en-IN')}</div>
          <div class="admin-stat-lbl">Total Revenue</div>
        </div>
        <div class="admin-stat">
          <div class="admin-stat-val">${guests}</div>
          <div class="admin-stat-lbl">Total Guests</div>
        </div>
      </div>
      <div class="orders-table-wrap">
        <table class="orders-table">
          <thead>
            <tr>
              <th>Order Code</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Event</th>
              <th>Date</th>
              <th>Guests</th>
              <th>Menu</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${orders.map(o => `
              <tr>
                <td>${o.orderCode || o.id || '—'}</td>
                <td>${o.customerName || '—'}</td>
                <td>${o.phone || '—'}</td>
                <td>${o.eventType || '—'}</td>
                <td>${o.eventDate || '—'}</td>
                <td>${o.guests || '—'}</td>
                <td>${o.recommendedMenu || o.cuisine || '—'}</td>
                <td>&#8377;${(o.totalAmount || 0).toLocaleString('en-IN')}</td>
                <td><span class="status-badge status-${o.status || 'confirmed'}">${o.status || 'confirmed'}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
}

function closeAdmin() {
  const modal = document.getElementById('admin-modal');
  if (modal) modal.classList.remove('visible');
}

function closeAdminOnBackdrop(e) {
  if (e.target === document.getElementById('admin-modal')) {
    closeAdmin();
  }
}

/* ============================================================
   INTERACTIVE LIVE CALCULATOR CONTROLLER
============================================================ */
let calcSelectedPkg = 'Royal Indian Feast';
let calcBaseRate    = 500;
let calcGuests      = 200;
let calcAddons      = [];
let calcPromo       = '';

async function updateLiveCalculator() {
  const display = document.getElementById('calc-guest-display');
  if (display) display.textContent = `${calcGuests} Guests`;

  const pkgNameEl = document.getElementById('quote-pkg-name');
  if (pkgNameEl) pkgNameEl.textContent = calcSelectedPkg;

  const baseRateEl = document.getElementById('quote-base-rate');
  if (baseRateEl) baseRateEl.textContent = `₹${calcBaseRate} / head`;

  // Collect checked add-on stations
  const checkedBoxes = document.querySelectorAll('.calc-addon-input:checked');
  calcAddons = Array.from(checkedBoxes).map(cb => cb.value);

  // Update check styling
  document.querySelectorAll('.calc-addon-check').forEach(label => {
    const input = label.querySelector('input');
    label.classList.toggle('active', input && input.checked);
  });

  // Call Spring Boot API (/api/pricing/calculate)
  try {
    const res = await fetch(`${BACKEND_API_BASE}/pricing/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        menuName: calcSelectedPkg,
        guests: calcGuests,
        addOns: calcAddons,
        promoCode: calcPromo
      }),
      signal: AbortSignal.timeout(3000)
    });

    if (res.ok) {
      const data = await res.json();
      renderQuoteCard(data);
      return;
    }
  } catch (err) {
    console.warn('Backend pricing calculation fallback to local logic:', err);
  }

  // Local calculation fallback if backend offline
  let addonsRate = 0;
  if (calcAddons.includes('Welcome Drinks')) addonsRate += 80;
  if (calcAddons.includes('Dessert Counter')) addonsRate += 120;
  if (calcAddons.includes('Live Pasta')) addonsRate += 100;
  if (calcAddons.includes('Mocktail Bar')) addonsRate += 150;

  const grossPerHead = calcBaseRate + addonsRate;
  const subtotal = grossPerHead * calcGuests;
  let discountPct = 0;
  if (calcGuests >= 500) discountPct += 15;
  else if (calcGuests >= 250) discountPct += 10;
  else if (calcGuests >= 100) discountPct += 5;

  if (['JUCAS2026', 'SATURDAY', 'DIVYANG'].includes(calcPromo.toUpperCase())) {
    discountPct += 5;
  }

  const discountAmount = Math.round(subtotal * (discountPct / 100));
  const finalTotal = subtotal - discountAmount;
  const effectiveRate = Math.round(finalTotal / calcGuests);

  renderQuoteCard({
    addOnsPricePerHead: addonsRate,
    subtotal: subtotal,
    discountPercentage: discountPct,
    discountAmount: discountAmount,
    finalTotal: finalTotal,
    effectivePricePerHead: effectiveRate
  });
}

function renderQuoteCard(data) {
  const addonsEl = document.getElementById('quote-addons-rate');
  if (addonsEl) addonsEl.textContent = `+₹${data.addOnsPricePerHead || 0} / head`;

  const subtotalEl = document.getElementById('quote-subtotal');
  if (subtotalEl) subtotalEl.textContent = `₹${(data.subtotal || 0).toLocaleString('en-IN')}`;

  const discRow = document.getElementById('quote-discount-row');
  const discLbl = document.getElementById('quote-discount-label');
  const discVal = document.getElementById('quote-discount-val');
  if (data.discountAmount > 0) {
    if (discRow) discRow.style.display = 'flex';
    if (discLbl) discLbl.textContent = `🏷️ Volume Discount (${data.discountPercentage}%)`;
    if (discVal) discVal.textContent = `-₹${Number(data.discountAmount).toLocaleString('en-IN')}`;
  } else {
    if (discRow) discRow.style.display = 'none';
  }

  const finalTotalEl = document.getElementById('quote-final-total');
  if (finalTotalEl) finalTotalEl.textContent = `₹${(data.finalTotal || 0).toLocaleString('en-IN')}`;

  const effectiveEl = document.getElementById('quote-effective-rate');
  if (effectiveEl) effectiveEl.textContent = `₹${data.effectivePricePerHead || 0} / head`;
}

function bookFromCalculator() {
  const promoText = calcPromo ? ` with promo code ${calcPromo}` : '';
  const addonsText = calcAddons.length ? ` plus ${calcAddons.join(', ')}` : '';
  const message = `Hi Jucas Royale AI! I would like to book the ${calcSelectedPkg} package for ${calcGuests} guests${addonsText}${promoText}. Please help me confirm my reservation! 😊`;

  openChat();
  setTimeout(() => {
    const input = document.getElementById('chat-input');
    if (input) {
      input.value = message;
      sendMessage();
    }
  }, 400);
}

/* ============================================================
   FAQ ACCORDION CONTROLLER
============================================================ */
function setupFaqAccordion() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-question');
    if (q) {
      q.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });
}

/* ============================================================
   INITIALIZATION & EVENT BINDINGS
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Calculator Package Buttons
  document.querySelectorAll('.calc-pkg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.calc-pkg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calcSelectedPkg = btn.dataset.pkg;
      calcBaseRate    = Number(btn.dataset.rate);
      updateLiveCalculator();
    });
  });

  // Guest Slider
  const slider = document.getElementById('guest-slider');
  if (slider) {
    slider.addEventListener('input', (e) => {
      calcGuests = Number(e.target.value);
      updateLiveCalculator();
    });
  }

  // Add-on checkboxes
  document.querySelectorAll('.calc-addon-input').forEach(cb => {
    cb.addEventListener('change', updateLiveCalculator);
  });

  // Promo code button
  const promoBtn = document.getElementById('calc-apply-promo');
  const promoInput = document.getElementById('calc-promo');
  if (promoBtn && promoInput) {
    promoBtn.addEventListener('click', () => {
      calcPromo = promoInput.value.trim();
      updateLiveCalculator();
    });
  }

  // FAQ Accordion
  setupFaqAccordion();

  // Initial calculation
  updateLiveCalculator();
});

// Run immediate initialization if DOM is already ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setupFaqAccordion();
  setTimeout(updateLiveCalculator, 100);
}

/* ============================================================
   PROACTIVE ATTENTION BADGE
============================================================ */
setTimeout(() => {
  const toggle = document.getElementById('chat-toggle');
  if (toggle && !chatOpen) {
    const badge = document.createElement('div');
    badge.className = 'chat-badge';
    badge.textContent = '1';
    toggle.appendChild(badge);
  }
}, 3500);

