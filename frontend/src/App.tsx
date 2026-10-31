import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStory } from './components/BrandStory';
import { MenuShowcase } from './components/MenuShowcase';
import { LiveCalculator } from './components/LiveCalculator';
import { ExperiencePhilosophy } from './components/ExperiencePhilosophy';
import { GalleryShowcase } from './components/GalleryShowcase';
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
  const [selectedMenu, setSelectedMenu] = useState('Royal Awadhi & Mughlai');
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
    setChatContext(`Confirmed booking ${order.orderCode} for ${order.customerName} (${order.guests} guests, ${order.cuisine}).`);
  };

  return (
    <div className="min-h-screen bg-ivory text-espresso selection:bg-gold/20 selection:text-espresso relative overflow-x-hidden font-sans">
      {/* Precision Quiet Cursor */}
      <CursorFollower />

      {/* Luxury Navigation */}
      <Navbar
        onOpenChat={() => setIsChatOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Experience Stream */}
      <main>
        {/* Hero Section (Warm Ivory) */}
        <Hero
          onOpenChat={() => setIsChatOpen(true)}
          onExploreEstimator={handleExploreEstimator}
        />

        {/* Chapter I: The Atelier Philosophy (Deep Espresso Contrast) */}
        <BrandStory />

        {/* Chapter II: Curated Haute Menus (Warm Ivory) */}
        <MenuShowcase onSelectMenu={handleSelectMenu} />

        {/* Chapter III: Real-Time Dynamic Pricing Engine (Champagne Cream) */}
        <LiveCalculator
          initialPackage={selectedMenu}
          onBookWithQuote={handleBookWithQuote}
        />

        {/* Chapter IV: Haute Standards & Pillars (Warm Ivory) */}
        <ExperiencePhilosophy />

        {/* Chapter V: Architectural & Culinary Gallery (Deep Espresso Contrast) */}
        <GalleryShowcase />

        {/* Chapter VI: Patron Chronicles (Warm Ivory) */}
        <Testimonials />

        {/* Chapter VII: Technical Governance & FAQ (Champagne Cream) */}
        <FaqSection />
      </main>

      {/* Atelier Footer (Deep Espresso Grounding) */}
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

      {/* Persistent H2 SQL Admin Registry Console */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Booking Commission Reservation Modal */}
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
