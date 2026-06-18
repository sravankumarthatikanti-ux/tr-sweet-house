import React, { useState } from 'react';
import { ShoppingBag, Heart, Menu, X, Sparkles, MessageSquare, Box, Award, ShieldAlert, Truck } from 'lucide-react';
import RoyalCrestLogo from './RoyalCrestLogo';

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  toggleCart,
  toggleWishlist,
  language,
  setLanguage,
  t
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const translate = (key, defaultText) => {
    return t ? t(key) : defaultText;
  };

  const navItems = [
    { id: 'shop', label: translate('catalogNav', 'Sweets Catalog'), icon: Sparkles },
    { id: 'giftbox', label: translate('giftboxNav', 'Luxury Gift Box'), icon: Box },
    { id: 'custom-request', label: translate('customRequestNav', 'Custom Request'), icon: Sparkles },
    { id: 'assistant', label: translate('assistantNav', 'Mithai Assistant'), icon: MessageSquare },
    { id: 'loyalty', label: translate('rewardsNav', 'Royal Rewards'), icon: Award },
    { id: 'tracker', label: translate('trackerNav', 'Track Order'), icon: Truck },
    { id: 'admin', label: translate('adminNav', 'Admin Dashboard'), icon: ShieldAlert },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar-wrapper">
      <div className="container nav-container">
        
        {/* Logo Crest Section */}
        <a href="#home" className="logo-section" onClick={() => handleNavClick('shop')}>
          <RoyalCrestLogo size={46} animated={true} />
          
          <div className="logo-text">
            <h1>TR SWEET HOUSE</h1>
            <span>{translate('logoSubtitle', 'Jammikunta\'s Finest')}</span>
          </div>
        </a>

        {/* Desktop Navigation Link items */}
        <div className="nav-links-desktop" style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.9rem',
                  padding: '0.4rem 0.6rem',
                  color: isActive ? 'var(--gold-light)' : 'var(--text-muted)'
                }}
              >
                <Icon size={15} style={{ color: isActive ? 'var(--gold-accent)' : 'inherit' }} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Action controls (Cart, Language selector, and Mobile hamburger toggler) */}
        <div className="nav-actions">
          
          {/* Trilingual Language Selector */}
          <div className="language-selector" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <select
              value={language || 'en'}
              onChange={(e) => setLanguage && setLanguage(e.target.value)}
              style={{
                background: 'rgba(33, 1, 5, 0.75)',
                color: 'var(--gold-light)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.45rem 1.8rem 0.45rem 0.75rem',
                cursor: 'pointer',
                outline: 'none',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-body)',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
              }}
            >
              <option value="en" style={{ backgroundColor: 'var(--maroon-dark)', color: 'var(--gold-light)' }}>English</option>
              <option value="te" style={{ backgroundColor: 'var(--maroon-dark)', color: 'var(--gold-light)' }}>తెలుగు</option>
              <option value="hi" style={{ backgroundColor: 'var(--maroon-dark)', color: 'var(--gold-light)' }}>हिंदी</option>
            </select>
            <div style={{
              position: 'absolute',
              right: '0.6rem',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              color: 'var(--gold-accent)',
              fontSize: '0.7rem'
            }}>▼</div>
          </div>
          
          <button
            onClick={toggleCart}
            className="action-btn"
            title="Royal Cart"
            aria-label="Royal Cart"
            style={{
              padding: '0.6rem',
              borderColor: 'rgba(212, 175, 55, 0.4)',
              background: 'rgba(33, 1, 5, 0.5)'
            }}
          >
            <ShoppingBag size={20} style={{ color: 'var(--gold-light)' }} />
            {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
          </button>

          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: 'white', display: 'none' }}
          >
            {mobileMenuOpen ? <X size={26} style={{ color: 'var(--gold-accent)' }} /> : <Menu size={26} style={{ color: 'var(--gold-accent)' }} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer-like Navigation Panel */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-panel glass-panel-heavy"
          style={{
            position: 'absolute',
            top: '85px',
            left: 0,
            right: 0,
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            zIndex: 99,
            borderBottom: '2px solid var(--gold-accent)'
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  fontSize: '1.05rem',
                  padding: '0.6rem 0',
                  width: '100%',
                  textAlign: 'left',
                  color: isActive ? 'var(--gold-light)' : 'var(--text-muted)'
                }}
              >
                <Icon size={18} style={{ color: isActive ? 'var(--gold-accent)' : 'inherit' }} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Responsive overrides */}
      <style dangerouslySetInnerHTML={{__html: `
        .nav-links-desktop {
          display: flex;
        }
        .mobile-toggle-btn {
          display: none;
        }
        @media (min-width: 1241px) and (max-width: 1400px) {
          .nav-links-desktop {
            gap: 0.5rem !important;
          }
          .nav-link-btn {
            font-size: 0.8rem !important;
            padding: 0.3rem 0.4rem !important;
          }
        }
        @media (max-width: 1240px) {
          .nav-links-desktop {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: block !important;
          }
        }
      `}} />
    </nav>
  );
}
