import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuShowcase } from './components/MenuShowcase';
import { LiveCalculator } from './components/LiveCalculator';
import { ExperiencePhilosophy } from './components/ExperiencePhilosophy';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { BookingModal } from './components/BookingModal';
import { CursorFollower } from './components/CursorFollower';
import { PricingResponse, Order } from './services/api';

export function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Royal Indian Feast');
  const [activeQuote, setActiveQuote] = useState<PricingResponse | null>(null);
  const [chatContext, setChatContext] = useState<string>('');

  const handleSelectMenu = (menuName: string) => {
    setSelectedMenu(menuName);
    const target = document.getElementById('estimator');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreEstimator = () => {
    const target = document.getElementById('estimator');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookWithQuote = (quote: PricingResponse) => {
    setActiveQuote(quote);
    setIsBookingOpen(true);
  };

  const handleOrderConfirmed = (order: Order) => {
    // Optionally alert or pass to chat
    setChatContext(`Confirmed booking ${order.orderCode} for ${order.customerName} (${order.guests} guests, ${order.cuisine}).`);
  };

  return (
    <div className="min-h-screen bg-noir-950 text-stone-100 selection:bg-gold-400 selection:text-noir-950 relative overflow-x-hidden font-sans">
      {/* Precision Custom Cursor */}
      <CursorFollower />

      {/* Main Luxury Navigation Bar */}
      <Navbar
        onOpenChat={() => setIsChatOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Hero Section */}
      <main>
        <Hero
          onOpenChat={() => setIsChatOpen(true)}
          onExploreEstimator={handleExploreEstimator}
        />

        {/* Curated Haute Menus */}
        <MenuShowcase onSelectMenu={handleSelectMenu} />

        {/* Dynamic Spring Boot Pricing Calculator */}
        <LiveCalculator
          initialPackage={selectedMenu}
          onBookWithQuote={handleBookWithQuote}
        />

        {/* Atelier Philosophy & Culinary Pillars */}
        <ExperiencePhilosophy />

        {/* Verified Patron Chronicles */}
        <Testimonials />

        {/* Technical Architecture & Database FAQ */}
        <FaqSection />
      </main>

      {/* Atelier Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Floating Groq AI Sommelier Widget */}
      <ChatWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        presetContext={chatContext}
      />

      {/* Persistent H2 SQL Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Booking Commission Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        quote={activeQuote}
        onOrderConfirmed={handleOrderConfirmed}
      />
    </div>
  );
}

export default App;
