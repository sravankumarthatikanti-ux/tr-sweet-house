import React from 'react';
import { ShoppingBag, Box, Award, ShieldCheck, Clock, MapPin, ArrowRight } from 'lucide-react';
import heroImage from '../assets/hero_sweets_banner.png';

export default function Hero({ onExploreClick, onCreateBoxClick, t }) {
  const translate = (key, defaultText) => {
    return t ? t(key) : defaultText;
  };

  return (
    <section 
      className="hero-section" 
      style={{ 
        padding: '4rem 0', 
        background: 'radial-gradient(circle at center, rgba(116, 10, 29, 0.2) 0%, rgba(22, 1, 4, 0.5) 100%)', 
        borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
        position: 'relative'
      }}
    >
      {/* Spotlight blur */}
      <div 
        style={{
          position: 'absolute',
          top: '20%', left: '30%',
          width: '300px', height: '300px',
          borderRadius: '50%',
          backgroundColor: 'rgba(212, 175, 55, 0.08)',
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3rem', alignItems: 'center' }}>
          
          {/* Left Column: Copy Content */}
          <div className="hero-content" style={{ animation: 'fade-in-up 0.8s ease' }}>
            
            {/* Jammikunta Heritage Badge */}
            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                padding: '0.45rem 1.1rem', 
                backgroundColor: 'rgba(212, 175, 55, 0.12)', 
                borderRadius: 'var(--radius-full)', 
                border: '1px solid rgba(212, 175, 55, 0.3)', 
                marginBottom: '1.5rem' 
              }}
            >
              <Award size={15} style={{ color: 'var(--gold-accent)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                {translate('heroBadge', "Jammikunta's Finest Ghee Mithai")}
              </span>
            </div>

            {/* Headline */}
            <h2 
              style={{ 
                fontSize: '3.4rem', 
                lineHeight: '1.15', 
                marginBottom: '1.5rem', 
                color: 'white', 
                fontFamily: 'var(--font-heading)',
                textShadow: '0 4px 15px rgba(0,0,0,0.6)'
              }}
            >
              {translate('heroTitle', 'Crafting Royal Indian Sweets')}
            </h2>

            {/* Subheadline */}
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '560px', lineHeight: '1.6' }}>
              {translate('heroSubtitle', 'Experience handcrafted luxury mithai from Jammikunta, made with purity, tradition, and premium ingredients.')}
            </p>

            {/* Order Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', marginBottom: '2.8rem' }}>
              <button 
                onClick={onExploreClick} 
                className="btn-primary" 
                style={{ padding: '0.95rem 2.2rem', fontSize: '1rem', cursor: 'pointer' }}
              >
                <ShoppingBag size={18} />
                {translate('exploreBtn', 'Explore Collection')}
              </button>
              
              <button 
                onClick={onExploreClick} 
                className="btn-secondary" 
                style={{ padding: '0.95rem 2.2rem', fontSize: '1rem', cursor: 'pointer' }}
              >
                {translate('orderNowBtn', 'Order Now')}
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Quality Seals */}
            <div className="hero-trust-factors" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', borderTop: '1px dashed rgba(212, 175, 55, 0.2)', paddingTop: '1.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <ShieldCheck size={20} style={{ color: 'var(--gold-accent)' }} />
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'white', margin: 0, fontFamily: 'var(--font-heading)' }}>
                    {translate('gheeSealTitle', '100% Desi Ghee')}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {translate('gheeSealDesc', 'Rich, traditional recipe logs')}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <Clock size={20} style={{ color: 'var(--gold-accent)' }} />
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'white', margin: 0, fontFamily: 'var(--font-heading)' }}>
                    {translate('freshSealTitle', 'Daily Fresh Batch')}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {translate('freshSealDesc', 'Handcrafted daily in store')}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <MapPin size={20} style={{ color: 'var(--gold-accent)' }} />
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'white', margin: 0, fontFamily: 'var(--font-heading)' }}>
                    {translate('localSealTitle', 'Local Jammikunta')}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {translate('localSealDesc', 'Fast delivery & boutique pickup')}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Framed Banner Graphic */}
          <div className="hero-media" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <div 
              className="traditional-border glass-panel" 
              style={{ 
                padding: '12px', 
                borderRadius: 'var(--radius-md)', 
                maxWidth: '460px', 
                width: '100%',
                border: '1.5px solid rgba(212, 175, 55, 0.35)',
                boxShadow: 'var(--shadow-lg), 0 0 25px rgba(212,175,55,0.15)'
              }}
            >
              <div style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '2px solid var(--gold-accent)', position: 'relative' }}>
                <img 
                  src={heroImage} 
                  alt="Royal Traditional Indian Sweets from TR Sweet House" 
                  style={{ width: '100%', height: 'auto', display: 'block', transform: 'scale(1.01)' }} 
                />
                
                {/* Float tag badge */}
                <div 
                  style={{ 
                    position: 'absolute', top: '15px', right: '15px', 
                    backgroundColor: 'var(--maroon-primary)', 
                    border: '1px solid var(--gold-accent)', 
                    padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', 
                    color: 'var(--gold-light)', fontSize: '0.72rem', fontWeight: '800', 
                    letterSpacing: '1px', textTransform: 'uppercase', 
                    boxShadow: '0 4px 10px rgba(0,0,0,0.5)' 
                  }}
                >
                  {translate('festiveTag', 'Festive Mithai')}
                </div>
              </div>
            </div>
            
            {/* Rotating water-mark Mandala in background */}
            <div 
              className="spinning-mandala-bg" 
              style={{ 
                position: 'absolute', 
                width: '420px', height: '420px', 
                opacity: 0.05, 
                color: 'var(--gold-accent)', 
                zIndex: -1, 
                animation: 'spin-mandala 45s linear infinite' 
              }}
            >
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 0C51.5 15 53 17 65 17C77 17 75 15 75 25C75 35 77 37 89 37C101 37 99 35 91 43C83 51 83 49 89 57C95 65 97 63 85 63C73 63 75 65 75 75C75 85 77 83 65 83C53 83 55 85 47 91C39 97 41 99 37 91C33 83 35 83 25 83C15 83 17 85 17 75C17 65 15 63 5 63C-5 63 -3 65 5 57C13 49 13 51 5 43C-3 35 -5 37 7 37C19 37 17 35 17 25C17 15 15 17 27 17C39 17 37 15 50 0Z" />
              </svg>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3.5rem;
            text-align: center;
          }
          .hero-trust-factors {
            justify-content: center;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-content h2 {
            font-size: 2.2rem !important;
            line-height: 1.25 !important;
          }
        }
        @media (max-width: 480px) {
          .hero-content h2 {
            font-size: 1.8rem !important;
          }
          .hero-trust-factors {
            gap: 1.2rem !important;
          }
        }
      `}} />
    </section>
  );
}
