import React, { useState } from 'react';
import { X, Star, ShoppingCart, ShieldAlert, Award, Clock } from 'lucide-react';
import SweetVisual from './SweetVisual';

export default function ProductDetail({ product, onClose, onAddToCart }) {
  const [selectedWeight, setSelectedWeight] = useState('500g');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  // Premium mock customer reviews from Jammikunta locals
  const mockReviews = [
    { name: 'Srinivas M. (Jammikunta)', rating: 5, date: '2 days ago', text: 'Fresh and perfectly sweetened. The ghee aroma is absolutely divine! TR Sweet House never disappoints.' },
    { name: 'Kavitha R. (Gandhi Nagar)', rating: 5, date: '1 week ago', text: 'Finally a premium website for TR Sweet House! Order was ready for pickup in 15 minutes, taste is top tier.' }
  ];

  // Dynamic price calculation supporting 250g, 500g, 1kg, 2kg
  const getPrice = () => {
    if (selectedWeight === '250g') return product.price250g || (product.pricePerKg * 0.25);
    if (selectedWeight === '500g') return product.price500g || (product.pricePerKg * 0.5);
    if (selectedWeight === '1kg') return product.price1kg || product.pricePerKg;
    if (selectedWeight === '2kg') return product.price2kg || (product.pricePerKg * 2);
    return product.pricePerKg;
  };

  const currentPrice = getPrice();
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    onAddToCart(product, selectedWeight, quantity);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel-heavy modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2rem', maxWidth: '780px', border: '2px solid var(--gold-accent)' }}
      >
        <button 
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="Close modal"
          style={{ cursor: 'pointer', background: 'none' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          
          <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            
            {/* Left side: Visual spotlight preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div 
                style={{ 
                  height: '260px', 
                  background: product.gradient || 'radial-gradient(circle, rgba(116, 10, 29, 0.3) 0%, rgba(22, 1, 4, 0.8) 100%)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(212,175,55,0.25)',
                  position: 'relative'
                }}
              >
                {/* 3D Sweet Visualizer / Real Image */}
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-md)'
                    }}
                  />
                ) : (
                  <SweetVisual id={product.id} size="large" />
                )}

                {product.isGheeRich && (
                  <div 
                    style={{ 
                      position: 'absolute', bottom: '15px', right: '15px', 
                      backgroundColor: 'var(--maroon-primary)', 
                      border: '1px solid var(--gold-accent)', 
                      display: 'flex', alignItems: 'center', gap: '0.4rem', 
                      padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', 
                      color: 'var(--gold-light)', fontSize: '0.75rem', fontWeight: '700',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
                    }}
                  >
                    <Award size={14} fill="var(--gold-accent)" style={{ color: 'var(--gold-accent)' }} />
                    Pure Ghee
                  </div>
                )}
              </div>

              {/* Shelf-life and Allergen statistics */}
              <div 
                style={{ 
                  display: 'flex', flexDirection: 'column', gap: '0.5rem', 
                  backgroundColor: 'rgba(33, 1, 5, 0.4)', padding: '1rem', 
                  borderRadius: 'var(--radius-sm)', border: '1px solid rgba(212, 175, 55, 0.15)' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--charcoal)' }}>
                  <Clock size={16} style={{ color: 'var(--gold-accent)' }} />
                  <span><strong>Shelf Life:</strong> {product.shelfLife}</span>
                </div>
                {product.allergens && product.allergens.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--gold-light)' }}>
                    <ShieldAlert size={16} style={{ color: 'var(--gold-accent)' }} />
                    <span><strong>Allergen Info:</strong> Contains {product.allergens.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Ordering adjustments and info */}
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>{product.category.toUpperCase()} CATEGORY</span>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--gold-light)', marginBottom: '0.4rem', fontFamily: 'var(--font-heading)' }}>{product.name}</h2>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <div className="rating-stars" style={{ color: 'var(--gold-accent)' }}>
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(Royal Quality Standard)</span>
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                {product.description}
              </p>

              {/* Recipe Ingredients */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-light)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Pure Ingredients:</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {product.ingredients.map((ing, i) => (
                    <span 
                      key={i} 
                      style={{ 
                        backgroundColor: 'rgba(33, 1, 5, 0.4)', 
                        border: '1px solid rgba(212,175,55,0.2)', 
                        borderRadius: 'var(--radius-full)', 
                        padding: '0.25rem 0.65rem', 
                        fontSize: '0.78rem', 
                        color: 'var(--charcoal)' 
                      }}
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Weight Selector supporting 250g, 500g, 1kg, 2kg */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-light)', marginBottom: '0.6rem', fontFamily: 'var(--font-heading)' }}>Select Quantity / Weight:</h4>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {['250g', '500g', '1kg', '2kg'].map((wt) => (
                    <button
                      key={wt}
                      onClick={() => setSelectedWeight(wt)}
                      style={{
                        flex: 1,
                        minWidth: '60px',
                        padding: '0.6rem 0',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        border: selectedWeight === wt ? '1px solid var(--gold-accent)' : '1px solid var(--border-color)',
                        backgroundColor: selectedWeight === wt ? 'rgba(212, 175, 55, 0.15)' : 'rgba(33, 1, 5, 0.4)',
                        color: selectedWeight === wt ? 'var(--gold-light)' : 'var(--text-muted)',
                        cursor: 'pointer'
                      }}
                    >
                      {wt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Incrementer & Live Pricing */}
              <div 
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                  marginBottom: '1.8rem', backgroundColor: 'rgba(33, 1, 5, 0.4)', 
                  padding: '1rem', borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(212, 175, 55, 0.1)'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Subtotal Amount</span>
                  <span style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--gold-light)' }}>₹{(currentPrice * quantity).toFixed(0)}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ 
                      width: '32px', height: '32px', 
                      border: '1px solid var(--border-color)', borderRadius: '50%', 
                      backgroundColor: 'rgba(33, 1, 5, 0.6)', color: 'white', 
                      fontWeight: 'bold', cursor: 'pointer' 
                    }}
                  >
                    -
                  </button>
                  <span style={{ fontWeight: '700', fontSize: '1.1rem', width: '20px', textAlign: 'center', color: 'white' }}>{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ 
                      width: '32px', height: '32px', 
                      border: '1px solid var(--border-color)', borderRadius: '50%', 
                      backgroundColor: 'rgba(33, 1, 5, 0.6)', color: 'white', 
                      fontWeight: 'bold', cursor: 'pointer' 
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="btn-primary"
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    padding: '0.8rem',
                    opacity: isOutOfStock ? 0.4 : 1,
                    cursor: isOutOfStock ? 'not-allowed' : 'pointer'
                  }}
                >
                  <ShoppingCart size={18} />
                  {isOutOfStock ? 'Sold Out' : 'Add to Shopping Cart'}
                </button>
              </div>
            </div>

          </div>

          {/* Customer Reviews Section */}
          <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.15)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--gold-light)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Royal Patron Reviews</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {mockReviews.map((rev, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    backgroundColor: 'rgba(33, 1, 5, 0.3)', padding: '1rem', 
                    borderRadius: 'var(--radius-sm)', border: '1px solid rgba(212,175,55,0.08)' 
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: '600', fontSize: '0.85rem', color: 'white' }}>{rev.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                  </div>
                  <div className="rating-stars" style={{ color: 'var(--gold-accent)', marginBottom: '0.4rem' }}>
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>{rev.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .detail-grid {
          grid-template-columns: 0.95fr 1.05fr;
        }
        @media (max-width: 768px) {
          .detail-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem;
          }
        }
      `}} />
    </div>
  );
}
