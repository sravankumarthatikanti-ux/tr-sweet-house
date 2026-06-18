import React, { useState, useEffect } from 'react';
import { Sparkles, Gift, Heart, HelpCircle, ArrowRight, ShieldCheck, Clock, MapPin, Search } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import GiftBoxBuilder from './components/GiftBoxBuilder';
import CartCheckout from './components/CartCheckout';
import AISweetAssistant from './components/AISweetAssistant';
import LoyaltyPanel from './components/LoyaltyPanel';
import OrderTracker from './components/OrderTracker';
import AdminPanel from './components/AdminPanel';
import SweetVisual from './components/SweetVisual';
import CustomSweetRequest from './components/CustomSweetRequest';
import { sweets, initialOrders } from './data/sweetsData';
import showcaseImage from './assets/royal_sweets_showcase.png';
import packagingImage from './assets/royal_gift_packaging.png';
import { translations } from './data/translations';
import RoyalCrestLogo from './components/RoyalCrestLogo';

export default function App() {
  const [activeTab, setActiveTab] = useState('shop');
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState(initialOrders);
  const [loyaltyPoints, setLoyaltyPoints] = useState(150);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customRequests, setCustomRequests] = useState([
    {
      id: 'CR-1085',
      customerName: 'K. Rama Rao',
      phone: '9848099887',
      sweetName: 'Chandra Kala',
      quantity: '1 kg',
      requiredDate: '2026-06-12',
      pickupTime: '06:00 PM',
      instructions: 'Make it extra sweet with dry fruit stuffing',
      referenceImage: null,
      advanceAmount: 200,
      paymentMethod: 'UPI (GPay/PhonePe)',
      status: 'Price Confirmed',
      estimatedPrice: 650,
      timestamp: '2026-06-08 10:00 AM'
    },
    {
      id: 'CR-1086',
      customerName: 'P. Sujatha',
      phone: '9440511223',
      sweetName: 'Kakinada Kaja',
      quantity: '2 kg',
      requiredDate: '2026-06-15',
      pickupTime: '04:00 PM',
      instructions: 'Keep it juicy, pack in double layered box',
      referenceImage: null,
      advanceAmount: 300,
      paymentMethod: 'Credit/Debit Card',
      status: 'Preparing',
      estimatedPrice: 1100,
      timestamp: '2026-06-08 09:30 AM'
    }
  ]);
  
  // Luxury Loading Screen State
  const [isLoading, setIsLoading] = useState(true);

  // Simulate luxury loading screen fade-out
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Generate random positions for gold particles in background
  const [particles] = useState(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${12 + Math.random() * 12}s`,
      size: `${2 + Math.random() * 4}px`
    }))
  );

  // Cart operations
  const handleAddToCart = (product, weight, qty = 1) => {
    // Determine price based on selected weight
    let price = product.pricePerKg;
    if (weight === '250g') price = product.price250g || (product.pricePerKg * 0.25);
    else if (weight === '500g') price = product.price500g || (product.pricePerKg * 0.5);
    else if (weight === '1kg') price = product.price1kg || product.pricePerKg;
    else if (weight === '2kg') price = product.price2kg || (product.pricePerKg * 2);

    const cartId = `${product.id}-${weight}`;
    const existingIndex = cart.findIndex(item => item.cartId === cartId);

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += qty;
      setCart(updated);
    } else {
      setCart([...cart, {
        cartId,
        id: product.id,
        name: product.name,
        price,
        quantity: qty,
        selectedWeight: weight,
        isCustomGiftBox: false
      }]);
    }
  };

  const handleAddGiftBoxToCart = (compiledBox) => {
    setCart([...cart, {
      cartId: compiledBox.id,
      id: compiledBox.id,
      name: compiledBox.name,
      price: compiledBox.price,
      quantity: compiledBox.quantity,
      isCustomGiftBox: true,
      contents: compiledBox.contents,
      card: compiledBox.card
    }]);
  };

  const handleUpdateCartQty = (cartId, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartId);
      return;
    }
    setCart(cart.map(item => item.cartId === cartId ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveCartItem = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  // Place order from cart checkout: Clear cart, award points, record order
  const handlePlaceOrder = (orderDetails) => {
    const newOrder = {
      id: `TR-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: orderDetails.customerName,
      address: orderDetails.address,
      phone: orderDetails.phone,
      type: orderDetails.type,
      items: orderDetails.items,
      total: orderDetails.total,
      status: 'Pending',
      timestamp: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'short', day: 'numeric' })
    };

    // Add order to trackable orders database
    setOrders([newOrder, ...orders]);
    
    // Earn points: 1 point per ₹10 spent
    const earnedPoints = Math.round(orderDetails.total / 10);
    setLoyaltyPoints(prev => prev + earnedPoints);

    // Clear shopping cart
    setCart([]);
    
    alert(`Dhanyavadalu! Your order ${newOrder.id} has been recorded. Redirecting to WhatsApp for confirmation...`);
    
    // Route tab to order tracker instantly to show progress
    setActiveTab('tracker');
  };

  // Wishlist operations
  const handleToggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  // Admin status modifier
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
  };

  const handleUpdateStock = (productId, newStock) => {
    // Local stock modification inside catalog
    const product = sweets.find(s => s.id === productId);
    if (product) {
      product.stock = newStock;
    }
  };

  const handleAddCustomRequest = (newRequest) => {
    setCustomRequests([newRequest, ...customRequests]);
  };

  const handleUpdateCustomRequestStatus = (id, newStatus) => {
    setCustomRequests(customRequests.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const handleConfirmCustomRequestPrice = (id, price) => {
    setCustomRequests(customRequests.map(r => r.id === id ? { ...r, estimatedPrice: price } : r));
  };

  // Determine loyalty tier level
  const getLoyaltyTier = (pts) => {
    if (pts >= 1000) return 'Platinum';
    if (pts >= 500) return 'Gold';
    if (pts >= 200) return 'Silver';
    return 'Bronze';
  };

  const currentTier = getLoyaltyTier(loyaltyPoints);

  // Filter sweets based on category and search query
  const filteredSweets = sweets.filter(sweet => {
    const matchesCategory = activeCategory === 'all' || sweet.category === activeCategory;
    const matchesSearch = sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sweet.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Background Visual Effects Wrapper (Restricted bounds to prevent layout height stretching) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: -1 }}>
        {/* 1. Cinematic Spotlights */}
        <div className="cinematic-spotlight" />

        {/* 2. Gold Dust Particles drifting in background */}
        {particles.map(p => (
          <div 
            key={p.id} 
            className="gold-particle" 
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}

        {/* 3. Parallax Floating Sweets (Royal Mithai) in Background */}
        <div className="floating-sweet-bg" style={{ top: '18%', left: '3%', transform: 'scale(1.3)' }}>
          <SweetVisual id="kaju-katli" size="small" />
        </div>
        <div className="floating-sweet-bg" style={{ top: '38%', right: '4%', transform: 'scale(1.4)' }}>
          <SweetVisual id="motichoor-laddu" size="small" />
        </div>
        <div className="floating-sweet-bg" style={{ top: '70%', left: '5%', transform: 'scale(1.2)' }}>
          <SweetVisual id="mysore-pak" size="small" />
        </div>
        <div className="floating-sweet-bg" style={{ top: '95%', right: '5%', transform: 'scale(1.3)' }}>
          <SweetVisual id="gulab-jamun" size="small" />
        </div>
      </div>

      {/* 4. Luxury Loading Screen */}
      {isLoading && (
        <div 
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: '#160207',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
            transition: 'opacity 0.6s ease'
          }}
        >
          {/* Spinning Royal Gold Crest Monogram Logo */}
          <div style={{ position: 'relative', width: '130px', height: '130px', marginBottom: '2rem' }}>
            <RoyalCrestLogo size={130} animated={true} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--charcoal)', letterSpacing: '4px', fontSize: '1.8rem', margin: '0 0 0.5rem 0' }}>
            TR SWEET HOUSE
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--gold-light)', letterSpacing: '5px', textTransform: 'uppercase', fontWeight: '500' }}>
            {t('heroBadge')}
          </span>

          <div style={{ width: '120px', height: '1px', background: 'linear-gradient(to right, transparent, var(--gold-accent), transparent)', marginTop: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '40px', height: '100%', backgroundColor: 'var(--gold-light)', animation: 'gold-pulse 1.8s infinite' }} />
          </div>
        </div>
      )}

      {/* 5. Main Content Wrapper */}
      {!isLoading && (
        <>
          {/* Navbar */}
          <Navbar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
            wishlistCount={wishlist.length}
            toggleCart={() => setIsCartOpen(!isCartOpen)}
            toggleWishlist={() => {
              // Quick route to catalog to browse favorites
              setActiveTab('shop');
              setActiveCategory('all');
              alert("Browse your favorites! Look for wishlisted sweets in the main catalog.");
            }}
            language={language}
            setLanguage={setLanguage}
            t={t}
          />

          {/* Tab Routing */}
          <main style={{ minHeight: 'calc(100vh - 85px)', paddingBottom: '4rem' }}>
            
            {activeTab === 'shop' && (
              <>
                {/* Hero Section */}
                <Hero 
                  onExploreClick={() => {
                    const el = document.getElementById('catalog-anchor');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  onCreateBoxClick={() => setActiveTab('giftbox')} 
                  t={t}
                />

                {/* Sweets Showcase Gallery */}
                <div className="container" style={{ padding: '3rem 1.5rem 0 1.5rem', animation: 'fade-in-up 0.5s ease' }}>
                  <div className="grid-2">
                    
                    {/* Showcase Banner 1 */}
                    <div className="traditional-border glass-panel" style={{ padding: '1.2rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1.5px solid var(--gold-accent)', height: '220px', position: 'relative' }}>
                        <img 
                          src={showcaseImage} 
                          alt="Royal Sweets Showcase" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                        />
                        <div style={{ position: 'absolute', bottom: '15px', left: '15px', backgroundColor: 'rgba(33, 1, 5, 0.85)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', color: 'var(--gold-light)', fontSize: '0.75rem', fontWeight: '700', border: '1px solid var(--gold-accent)' }}>
                          {t('showcaseBadge1')}
                        </div>
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', color: 'white', fontFamily: 'var(--font-heading)', margin: '0.2rem 0' }}>{t('showcaseTitle1')}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                          {t('showcaseDesc1')}
                        </p>
                      </div>
                    </div>

                    {/* Showcase Banner 2 */}
                    <div className="traditional-border glass-panel" style={{ padding: '1.2rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1.5px solid var(--gold-accent)', height: '220px', position: 'relative' }}>
                        <img 
                          src={packagingImage} 
                          alt="Luxury Gift Boxes" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                        />
                        <div style={{ position: 'absolute', bottom: '15px', left: '15px', backgroundColor: 'rgba(33, 1, 5, 0.85)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', color: 'var(--gold-light)', fontSize: '0.75rem', fontWeight: '700', border: '1px solid var(--gold-accent)' }}>
                          {t('showcaseBadge2')}
                        </div>
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', color: 'white', fontFamily: 'var(--font-heading)', margin: '0.2rem 0' }}>{t('showcaseTitle2')}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                          {t('showcaseDesc2')}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Custom Sweet Request Homepage Highlight Banner */}
                <div className="container" style={{ paddingTop: '3rem', animation: 'fade-in-up 0.5s ease' }}>
                  <div className="traditional-border glass-panel-heavy custom-request-banner">
                    <div style={{ flex: '1 1 500px' }}>
                      <span className="badge badge-gold" style={{ marginBottom: '0.6rem' }}>{t('customFeatureBadge')}</span>
                      <h2 style={{ fontSize: '2rem', color: 'var(--gold-light)', fontFamily: 'var(--font-heading)', marginBottom: '0.6rem', lineHeight: '1.2' }}>
                        {t('customRequestHighlightTitle')}
                      </h2>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.5' }}>
                        {t('customRequestHighlightDesc')}
                      </p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <button 
                        onClick={() => setActiveTab('custom-request')}
                        className="btn-primary"
                        style={{ fontSize: '0.9rem', padding: '0.75rem 1.6rem' }}
                      >
                        <Sparkles size={16} /> {t('requestCustomSweetBtn')}
                      </button>
                      <button 
                        onClick={() => {
                          setActiveTab('custom-request');
                          alert("Welcome to the Custom Request hub! Click on 'Track Request Status' at the top to track your orders.");
                        }}
                        className="btn-secondary"
                        style={{ fontSize: '0.9rem', padding: '0.75rem 1.6rem' }}
                      >
                        <Search size={16} /> {t('trackRequestBtn')}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Catalog Anchor */}
                <div id="catalog-anchor" style={{ height: '2px' }} />

                {/* Sweets Shop Catalog */}
                <div className="container" style={{ paddingTop: '3rem', animation: 'fade-in-up 0.5s ease' }}>
                  
                  {/* Section Title */}
                  <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--gold-light)', fontFamily: 'var(--font-heading)', margin: '0 0 0.5rem 0' }}>
                      {t('menuTitle')}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                      {t('menuSubtitle')}
                    </p>
                    <div className="decorative-divider">
                      <svg className="divider-mandala" viewBox="0 0 100 100" fill="currentColor">
                        <path d="M50 0C51.5 15 53 17 65 17C77 17 75 15 75 25C75 35 77 37 89 37C101 37 99 35 91 43C83 51 83 49 89 57C95 65 97 63 85 63C73 63 75 65 75 75C75 85 77 83 65 83C53 83 55 85 47 91C39 97 41 99 37 91C33 83 35 83 25 83C15 83 17 85 17 75C17 65 15 63 5 63C-5 63 -3 65 5 57C13 49 13 51 5 43C-3 35 -5 37 7 37C19 37 17 35 17 25C17 15 15 17 27 17C39 17 37 15 50 0Z" />
                      </svg>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div style={{ maxWidth: '480px', margin: '0 auto 2.5rem auto', position: 'relative' }}>
                    <input 
                      type="text"
                      placeholder={t('searchPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.9rem 1rem 0.9rem 3rem',
                        backgroundColor: 'rgba(33, 1, 5, 0.6)',
                        border: '1px solid rgba(212,175,55,0.3)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '1rem',
                        color: 'white'
                      }}
                    />
                    <Search size={20} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold-accent)' }} />
                  </div>

                  {/* Category Selection Filter */}
                  <CategoryNav activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

                  {/* Product Catalog Grid */}
                  {filteredSweets.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                      <p style={{ fontSize: '1.2rem' }}>No royal sweets found matching your description.</p>
                      <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="btn-secondary" style={{ marginTop: '1rem' }}>Clear Filters</button>
                    </div>
                  ) : (
                    <div className="grid-4">
                      {filteredSweets.map((sweet) => (
                        <ProductCard 
                          key={sweet.id} 
                          product={sweet}
                          onViewDetails={() => setSelectedProduct(sweet)}
                          onAddToCart={handleAddToCart}
                          isWishlisted={wishlist.includes(sweet.id)}
                          onToggleWishlist={() => handleToggleWishlist(sweet.id)}
                        />
                      ))}
                    </div>
                  )}

                </div>

                {/* Google Map Section */}
                <div className="container" style={{ paddingTop: '4rem', paddingBottom: '2rem', animation: 'fade-in-up 0.5s ease' }}>
                  <div className="grid-map-section">
                    
                    {/* Live Google Map iframe */}
                    <div 
                      className="traditional-border glass-panel" 
                      style={{ 
                        padding: '0.6rem', 
                        borderRadius: 'var(--radius-md)', 
                        border: '1.5px solid rgba(212, 175, 55, 0.35)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-lg), 0 0 20px rgba(212,175,55,0.1)'
                      }}
                    >
                      <iframe
                        title="TR Sweet House Location Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1894.0418784291367!2d79.4718692!3d18.2804522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a33313382a9976f%3A0x98d71c1a06b2a3eb!2sTR%20sweet%20house!5e0!3m2!1sen!2sin!4v1717820000000!5m2!1sen!2sin"
                        width="100%"
                        height="320"
                        style={{ border: 0, borderRadius: 'calc(var(--radius-sm) + 2px)', display: 'block' }}
                        allowFullScreen=""
                        loading="lazy"
                      />
                    </div>

                    {/* Location details */}
                    <div>
                      <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>{t('visitBoutique')}</span>
                      <h2 style={{ fontSize: '2.2rem', color: 'var(--gold-light)', fontFamily: 'var(--font-heading)', marginBottom: '1rem', lineHeight: '1.2' }}>
                        {t('boutiqueTitle')}
                      </h2>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                        {t('boutiqueDesc')}
                      </p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-accent)', flexShrink: 0 }}>
                            <MapPin size={18} />
                          </div>
                          <div>
                            <h4 style={{ fontSize: '0.9rem', color: 'white', margin: 0, fontFamily: 'var(--font-heading)' }}>{t('addressTitle')}</h4>
                            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{t('addressVal')}</span>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-accent)', flexShrink: 0 }}>
                            <Clock size={18} />
                          </div>
                          <div>
                            <h4 style={{ fontSize: '0.9rem', color: 'white', margin: 0, fontFamily: 'var(--font-heading)' }}>{t('hoursTitle')}</h4>
                            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{t('hoursVal')}</span>
                          </div>
                        </div>

                        <a 
                          href="https://maps.app.goo.gl/F9CnGJKVkhdE7nvf6" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn-primary"
                          style={{ 
                            marginTop: '0.5rem', 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            gap: '0.5rem',
                            fontSize: '0.85rem',
                            padding: '0.6rem 1.2rem',
                            width: 'fit-content',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid var(--gold-accent)',
                            cursor: 'pointer',
                            textDecoration: 'none'
                          }}
                        >
                          <MapPin size={14} /> {t('openMapsBtn')}
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </>
            )}

            {activeTab === 'giftbox' && (
              <GiftBoxBuilder onAddGiftBoxToCart={handleAddGiftBoxToCart} />
            )}

            {activeTab === 'assistant' && (
              <AISweetAssistant />
            )}

            {activeTab === 'loyalty' && (
              <LoyaltyPanel points={loyaltyPoints} onAddPoints={(pts) => setLoyaltyPoints(prev => prev + pts)} />
            )}

            {activeTab === 'tracker' && (
              <OrderTracker orders={orders} />
            )}

            {activeTab === 'custom-request' && (
              <CustomSweetRequest 
                customRequests={customRequests}
                onAddRequest={handleAddCustomRequest}
                onUpdateStatus={handleUpdateCustomRequestStatus}
              />
            )}

            {activeTab === 'admin' && (
              <AdminPanel 
                orders={orders} 
                onUpdateStatus={handleUpdateOrderStatus}
                onUpdateStock={handleUpdateStock}
                customRequests={customRequests}
                onUpdateCustomRequestStatus={handleUpdateCustomRequestStatus}
                onConfirmCustomRequestPrice={handleConfirmCustomRequestPrice}
              />
            )}

          </main>

          {/* Footer Branding */}
          <footer style={{ backgroundColor: 'rgba(12, 1, 3, 0.95)', borderTop: '2px solid var(--gold-accent)', padding: '3.5rem 0 2rem 0', color: 'white', position: 'relative' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--gold-light)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>TR SWEET HOUSE</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '300px' }}>
                  {t('footerDesc')}
                </p>
              </div>
              
              <div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--gold-light)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{t('purePromiseTitle')}</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  <li>{t('purePromise1')}</li>
                  <li>{t('purePromise2')}</li>
                  <li>{t('purePromise3')}</li>
                  <li>{t('purePromise4')}</li>
                </ul>
              </div>

              <div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--gold-light)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{t('royalBoutiqueHours')}</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  <li>{t('footerHoursVal')}</li>
                  <li>{t('footerLocationVal')}</li>
                  <li>{t('footerContactVal')}</li>
                  <li>{t('footerEmailVal')}</li>
                </ul>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(212,175,55,0.1)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              &copy; {new Date().getFullYear()} {t('footerCopyright')}
            </div>
          </footer>

          {/* Product Detail Modal */}
          {selectedProduct && (
            <ProductDetail 
              product={selectedProduct} 
              onClose={() => setSelectedProduct(null)} 
              onAddToCart={handleAddToCart}
            />
          )}

          {/* Cart Drawer */}
          <CartCheckout 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            onUpdateQty={handleUpdateCartQty}
            onRemoveItem={handleRemoveCartItem}
            onPlaceOrder={handlePlaceOrder}
            loyaltyTier={currentTier}
          />
        </>
      )}

    </div>
  );
}
