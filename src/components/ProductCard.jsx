import React from 'react';
import { Star, Heart, Eye, ShoppingCart, Award } from 'lucide-react';
import SweetVisual from './SweetVisual';

export default function ProductCard({
  product,
  onViewDetails,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) {
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;

  // Render rating stars in gold
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} size={13} fill="currentColor" />);
      } else {
        stars.push(<Star key={i} size={13} />);
      }
    }
    return stars;
  };

  return (
    <div 
      className="glass-panel product-card" 
      style={{
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'var(--transition-smooth)',
        position: 'relative'
      }}
    >
      <div 
        style={{ 
          padding: '6px', 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ position: 'relative' }}>
          {/* Card Top: Visual Sweet Plate Spotlight */}
          <div 
            style={{ 
              height: '170px', 
              background: product.gradient || 'radial-gradient(circle, rgba(116, 10, 29, 0.25) 0%, rgba(22, 1, 4, 0.6) 100%)', 
              borderRadius: 'calc(var(--radius-sm) + 4px) calc(var(--radius-sm) + 4px) 0 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              borderBottom: '1px solid rgba(212, 175, 55, 0.15)'
            }}
          >
            {/* Spinning Mandala background lines */}
            <div 
              style={{
                position: 'absolute',
                width: '130px',
                height: '130px',
                border: '1px dashed rgba(212, 175, 55, 0.15)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'spin-mandala 50s linear infinite'
              }}
            >
              <div 
                style={{
                  width: '100px',
                  height: '100px',
                  border: '1.5px double rgba(212, 175, 55, 0.1)',
                  borderRadius: '50%'
                }}
              />
            </div>

            {/* Custom 3D CSS Sweet Render / Real Image */}
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  zIndex: 1
                }}
                className="product-card-image"
              />
            ) : (
              <SweetVisual id={product.id} size="medium" />
            )}

            {/* Availability Stock Badges */}
            <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2 }}>
              {isOutOfStock ? (
                <span className="badge badge-gray">Sold Out</span>
              ) : isLowStock ? (
                <span className="badge badge-maroon">Low Stock</span>
              ) : product.tag ? (
                <span className="badge badge-gold">{product.tag}</span>
              ) : null}
            </div>

            {/* Wishlist Heart button */}
            <button 
              onClick={onToggleWishlist}
              style={{
                position: 'absolute',
                top: '10px', right: '10px',
                zIndex: 2,
                backgroundColor: 'rgba(33, 1, 5, 0.8)',
                border: '1px solid var(--border-color)',
                width: '32px', height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isWishlisted ? 'var(--gold-accent)' : 'var(--text-muted)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
                cursor: 'pointer'
              }}
              aria-label="Wishlist"
            >
              <Heart size={15} fill={isWishlisted ? 'var(--gold-accent)' : 'none'} />
            </button>
          </div>

          {/* Card Body Details */}
          <div style={{ padding: '1.2rem 0.9rem 0.8rem 0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--charcoal)', fontWeight: '700', fontFamily: 'var(--font-heading)', margin: 0, lineHeight: '1.2' }}>
                {product.name}
              </h3>
              {product.isGheeRich && (
                <span title="Pure Desi Ghee preparation" style={{ color: 'var(--gold-accent)', display: 'inline-flex', filter: 'drop-shadow(0 0 4px rgba(212,175,55,0.4))' }}>
                  <Award size={18} fill="var(--gold-accent)" />
                </span>
              )}
            </div>

            {/* Reviews Rating summary */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
              <div className="rating-stars" style={{ color: 'var(--gold-accent)' }}>
                {renderStars(product.rating)}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>{product.rating}</span>
            </div>

            {/* Truncated Description */}
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', height: '54px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', marginBottom: '0.5rem', lineHeight: '1.4' }}>
              {product.description}
            </p>
          </div>
        </div>

        {/* Card Footer: Pricing and Order controls */}
        <div style={{ padding: '0 0.9rem 0.8rem 0.9rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderTop: '1px dashed rgba(212, 175, 55, 0.15)', paddingTop: '0.8rem' }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Price per kg</span>
              <span style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--gold-light)' }}>₹{product.pricePerKg}</span>
            </div>
            
            <button 
              onClick={onViewDetails} 
              className="btn-outline"
              style={{
                padding: '0.4rem 0.8rem',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                cursor: 'pointer'
              }}
            >
              <Eye size={13} />
              Customize
            </button>
          </div>

          {/* Quick Add To Cart */}
          <button
            onClick={() => onAddToCart(product, '500g')}
            disabled={isOutOfStock}
            className="btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '0.65rem',
              fontSize: '0.85rem',
              opacity: isOutOfStock ? 0.4 : 1,
              cursor: isOutOfStock ? 'not-allowed' : 'pointer'
            }}
          >
            <ShoppingCart size={15} />
            {isOutOfStock ? 'Sold Out' : 'Quick Add 500g'}
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .product-card:hover {
          transform: translateY(-5px);
          border-color: var(--gold-accent) !important;
          box-shadow: var(--shadow-gold) !important;
        }
        .product-card:hover .product-card-image {
          transform: scale(1.08);
        }
      `}} />
    </div>
  );
}
