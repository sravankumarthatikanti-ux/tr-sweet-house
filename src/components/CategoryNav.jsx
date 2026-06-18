import React from 'react';
import * as Icons from 'lucide-react';
import { categories } from '../data/sweetsData';

export default function CategoryNav({ activeCategory, setActiveCategory }) {
  return (
    <div 
      className="category-nav-wrapper" 
      style={{ 
        margin: '2rem 0',
        padding: '0.5rem 0',
        overflowX: 'auto',
        display: 'flex',
        justifyContent: 'center',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      <div 
        className="category-scroll-container"
        style={{ 
          display: 'flex', 
          gap: '1rem', 
          padding: '0.2rem 1.5rem',
          maxWidth: '100%',
          width: 'max-content'
        }}
      >
        {categories.map((cat) => {
          // Dynamic icon loader from Lucide library
          const IconComponent = Icons[cat.icon] || Icons.Sparkles;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.6rem 1.2rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: '600',
                fontSize: '0.9rem',
                whiteSpace: 'nowrap',
                transition: 'var(--transition-bounce)',
                border: isActive ? '1px solid var(--gold-accent)' : '1px solid var(--border-color)',
                backgroundColor: isActive ? 'var(--maroon-primary)' : 'var(--cream-bg)',
                color: isActive ? 'var(--gold-light)' : 'var(--charcoal)',
                boxShadow: isActive ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                transform: isActive ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <IconComponent size={16} style={{ color: isActive ? 'var(--gold-light)' : 'var(--maroon-primary)' }} />
              {cat.name}
            </button>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .category-nav-wrapper::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 768px) {
          .category-nav-wrapper {
            justify-content: flex-start !important;
          }
        }
      `}} />
    </div>
  );
}
