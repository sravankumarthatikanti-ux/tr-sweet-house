import React from 'react';
import { Award, Shield, CheckCircle, Zap, Star } from 'lucide-react';
import { loyaltyTiers } from '../data/sweetsData';

export default function LoyaltyPanel({ points, onAddPoints }) {
  // Determine member tier details dynamically
  const getTierDetails = (pts) => {
    if (pts >= 1000) return { current: 'Platinum', next: 'Max Tier', min: 1000, max: 2000, color: '#e5e4e2' };
    if (pts >= 500) return { current: 'Gold', next: 'Platinum', min: 500, max: 1000, color: '#ffd700' };
    if (pts >= 200) return { current: 'Silver', next: 'Gold', min: 200, max: 500, color: '#c0c0c0' };
    return { current: 'Bronze', next: 'Silver', min: 0, max: 200, color: '#cd7f32' };
  };

  const tier = getTierDetails(points);
  const progressPercentage = tier.current === 'Platinum' ? 100 : ((points - tier.min) / (tier.max - tier.min)) * 100;

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', animation: 'fade-in-up 0.5s ease' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--gold-light)', fontFamily: 'var(--font-heading)', marginBottom: '0.8rem' }}>
          Royal Mithai Loyalty Club
        </h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)' }}>
          Accumulate points on every handcrafted sweet purchase at TR Sweet House. Upgrade your royal member tier to unlock massive perks and priority delivery in Jammikunta.
        </p>
        <div className="decorative-divider">
          <svg className="divider-mandala" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0C51.5 15 53 17 65 17C77 17 75 15 75 25C75 35 77 37 89 37C101 37 99 35 91 43C83 51 83 49 89 57C95 65 97 63 85 63C73 63 75 65 75 75C75 85 77 83 65 83C53 83 55 85 47 91C39 97 41 99 37 91C33 83 35 83 25 83C15 83 17 85 17 75C17 65 15 63 5 63C-5 63 -3 65 5 57C13 49 13 51 5 43C-3 35 -5 37 7 37C19 37 17 35 17 25C17 15 15 17 27 17C39 17 37 15 50 0Z" />
          </svg>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }} className="loyalty-layout">
        
        {/* Tier Status Card Panel */}
        <div 
          className="traditional-border" 
          style={{ 
            backgroundColor: 'rgba(33, 1, 5, 0.7)', 
            color: 'white', 
            padding: '2.5rem', 
            borderRadius: 'var(--radius-md)', 
            border: '2px solid var(--gold-accent)', 
            boxShadow: 'var(--shadow-lg), 0 0 25px rgba(212,175,55,0.1)', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.8rem', 
            position: 'relative', 
            overflow: 'hidden' 
          }}
        >
          {/* Background watermark */}
          <div style={{ position: 'absolute', top: '-25px', right: '-25px', width: '130px', height: '130px', borderRadius: '50%', border: '2px dashed rgba(212, 175, 55, 0.12)', pointerEvents: 'none' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <div 
              style={{ 
                width: '64px', height: '64px', 
                borderRadius: '50%', 
                backgroundColor: 'rgba(0, 0, 0, 0.4)', 
                border: `3px solid ${tier.color}`, 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 15px ${tier.color}55`
              }}
            >
              <Award size={36} style={{ color: tier.color }} />
            </div>
            
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold-accent)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '700' }}>Your Current Rank</span>
              <h3 style={{ color: 'white', fontSize: '1.8rem', margin: 0, fontFamily: 'var(--font-heading)' }}>
                {tier.current} Patron
              </h3>
            </div>
          </div>

          {/* Points accumulation displays */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(212, 175, 55, 0.15)', paddingTop: '1.2rem' }}>
            <div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Accumulated Member Points</span>
              <div style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1, margin: '0.2rem 0', color: 'var(--gold-light)' }}>
                {points} <span style={{ fontSize: '1.1rem', fontWeight: '500', color: 'white' }}>pts</span>
              </div>
            </div>

            {/* Simulated point adder trigger */}
            <button 
              onClick={() => {
                onAddPoints(150);
                alert("Simulated order completed! Added +150 points to your royal account.");
              }}
              className="btn-primary"
              style={{ 
                padding: '0.65rem 1.4rem', 
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              <Zap size={14} />
              Simulate ₹1500 Order (+150 pts)
            </button>
          </div>

          {/* Progress bar metrics */}
          {tier.current !== 'Platinum' && (
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                <span>Tier progress to {tier.next}</span>
                <span style={{ color: 'white', fontWeight: '700' }}>{points} / {tier.max} pts</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 'var(--radius-full)', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div 
                  style={{ 
                    width: `${progressPercentage}%`, 
                    height: '100%', 
                    backgroundColor: 'var(--gold-accent)', 
                    boxShadow: '0 0 8px var(--gold-accent)',
                    transition: 'width 0.5s ease' 
                  }} 
                />
              </div>
            </div>
          )}

        </div>

        {/* Tier benefits breakdown panels */}
        <div>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--gold-light)', marginBottom: '1.2rem', fontFamily: 'var(--font-heading)' }}>
            Loyalty Tiers &amp; Ghee-Rich Perks
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {loyaltyTiers.map((t) => {
              const isCurrent = tier.current === t.name;

              return (
                <div
                  key={t.name}
                  className={isCurrent ? "glass-panel" : ""}
                  style={{
                    backgroundColor: isCurrent ? 'rgba(116, 10, 29, 0.15)' : 'rgba(33, 1, 5, 0.25)',
                    border: isCurrent ? '1.5px solid var(--gold-accent)' : '1px solid rgba(212,175,55,0.1)',
                    padding: '1.2rem',
                    borderRadius: 'var(--radius-md)',
                    position: 'relative',
                    transition: 'var(--transition-smooth)',
                    boxShadow: isCurrent ? 'var(--shadow-gold)' : 'none'
                  }}
                >
                  {isCurrent && (
                    <span 
                      style={{ 
                        position: 'absolute', 
                        top: '12px', right: '12px', 
                        backgroundColor: 'var(--gold-accent)', 
                        color: 'var(--maroon-dark)', 
                        fontSize: '0.68rem', 
                        fontWeight: '800', 
                        padding: '0.2rem 0.6rem', 
                        borderRadius: 'var(--radius-full)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      Active Rank
                    </span>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                    <Shield size={20} style={{ color: t.color }} fill={t.color} />
                    <div>
                      <h4 style={{ fontSize: '1.05rem', color: 'white', margin: 0, fontFamily: 'var(--font-heading)' }}>
                        {t.name} Status
                      </h4>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Requirement: {t.range}</span>
                    </div>
                  </div>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: '0.5rem' }}>
                    {t.perks.map((perk, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <CheckCircle size={13} style={{ color: '#81c784', flexShrink: 0 }} />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              );
            })}
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .loyalty-layout {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 900px) {
          .loyalty-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
}
