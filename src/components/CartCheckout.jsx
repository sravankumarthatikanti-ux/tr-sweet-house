import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Send, CreditCard, Gift } from 'lucide-react';

export default function CartCheckout({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onPlaceOrder,
  loyaltyTier
}) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderType, setOrderType] = useState('Pickup'); // Pickup, Delivery

  if (!isOpen) return null;

  // Calculate prices
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate discount based on loyalty tier
  const getDiscountRate = () => {
    if (loyaltyTier === 'Silver') return 0.05;
    if (loyaltyTier === 'Gold') return 0.10;
    if (loyaltyTier === 'Platinum') return 0.15;
    return 0;
  };

  const discountRate = getDiscountRate();
  const discountAmount = subtotal * discountRate;

  // Delivery fee rules (Gold & Platinum get free delivery in Jammikunta)
  const shipping = orderType === 'Delivery' && loyaltyTier !== 'Gold' && loyaltyTier !== 'Platinum' ? 40 : 0;
  
  const total = subtotal - discountAmount + shipping;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    if (!customerName || !phone) {
      alert("Please enter your name and phone number.");
      return;
    }
    if (orderType === 'Delivery' && !address) {
      alert("Please provide your delivery address in Jammikunta.");
      return;
    }

    // Format WhatsApp Message with royal styling
    let itemsText = "";
    cart.forEach((item, index) => {
      if (item.isCustomGiftBox) {
        itemsText += `*${index + 1}. ${item.name}* (Qty: ${item.quantity}) - ₹${item.price * item.quantity}\n`;
        item.contents.forEach(subItem => {
          itemsText += `   • ${subItem.name} (${subItem.weight}g)\n`;
        });
        if (item.card) {
          itemsText += `   • _Card: "${item.card.message}"_\n`;
          itemsText += `     _(To: ${item.card.recipientName} | From: ${item.card.senderName})_\n`;
        }
      } else {
        itemsText += `*${index + 1}. ${item.name} (${item.selectedWeight})* (Qty: ${item.quantity}) - ₹${item.price * item.quantity}\n`;
      }
    });

    const waMessage = `*👑 TR SWEET HOUSE ORDER 👑*\n` +
                      `_Jammikunta's Handcrafted Royal Mithai_\n` +
                      `------------------------------------------\n` +
                      `*👑 Customer Name:* ${customerName}\n` +
                      `*📞 WhatsApp Phone:* ${phone}\n` +
                      `*🚚 Order Type:* ${orderType}\n` +
                      (orderType === 'Delivery' ? `*📍 Address:* ${address}, Jammikunta\n` : '*📍 Address:* In-Store Pickup, Jammikunta\n') +
                      `------------------------------------------\n` +
                      `*📦 Sweet Items Ordered:* \n${itemsText}` +
                      `------------------------------------------\n` +
                      (discountAmount > 0 ? `*Subtotal:* ₹${subtotal.toFixed(0)}\n*Loyalty Discount (${loyaltyTier}):* -₹${discountAmount.toFixed(0)}\n` : '') +
                      (shipping > 0 ? `*Delivery Charge:* ₹${shipping}\n` : `*Delivery Charge:* FREE\n`) +
                      `*💰 Grand Total Bill:* *₹${total.toFixed(0)}*\n\n` +
                      `Please accept my royal mithai order from TR Sweet House. Thank you! 🙏`;

    // Open WhatsApp targeting Jammikunta numbers
    const encodedText = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/919999999999?text=${encodedText}`;
    window.open(waUrl, '_blank');

    // Callback to record in tracker & state
    onPlaceOrder({
      customerName,
      phone,
      address: orderType === 'Delivery' ? `${address}, Jammikunta` : 'Store Pickup (Jammikunta)',
      type: orderType,
      items: cart.map(item => ({
        name: item.isCustomGiftBox ? item.name : `${item.name} (${item.selectedWeight})`,
        qty: item.quantity,
        price: item.price
      })),
      total: Math.round(total)
    });

    onClose();
  };

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer-content glass-panel-heavy" style={{ borderLeft: '2px solid var(--gold-accent)' }}>
        
        {/* Header Crest */}
        <div style={{ backgroundColor: 'rgba(33, 1, 5, 0.85)', padding: '1.2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--gold-accent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} style={{ color: 'var(--gold-accent)' }} />
            <h3 style={{ margin: 0, color: 'white', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Royal Cart</h3>
          </div>
          
          <button onClick={onClose} style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: '0.2rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Cart Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
              <ShoppingBag size={48} style={{ strokeWidth: 1.5, color: 'rgba(212,175,55,0.2)', marginBottom: '1rem' }} />
              <p style={{ fontWeight: '500', fontSize: '0.95rem' }}>Your royal cart is empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.cartId} 
                style={{ 
                  backgroundColor: 'rgba(33, 1, 5, 0.35)', 
                  border: '1px solid rgba(212, 175, 55, 0.15)', 
                  borderRadius: 'var(--radius-sm)', 
                  padding: '1rem', 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                
                {/* Product details */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    {item.isCustomGiftBox ? (
                      <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.3rem', fontSize: '0.65rem' }}>
                        <Gift size={10} />
                        Assorted Box
                      </span>
                    ) : (
                      <span className="badge badge-saffron" style={{ marginBottom: '0.3rem', fontSize: '0.65rem' }}>{item.selectedWeight} Portion</span>
                    )}
                    
                    <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'white', fontWeight: '700' }}>
                      {item.name}
                    </h4>
                    
                    {/* Custom Gift Box Content breakdown */}
                    {item.isCustomGiftBox && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem', borderLeft: '1.5px solid var(--gold-accent)', paddingLeft: '0.5rem' }}>
                        {item.contents.map((c, i) => (
                          <div key={i}>{c.name} ({c.weight}g)</div>
                        ))}
                        {item.card && (
                          <div style={{ fontStyle: 'italic', marginTop: '0.2rem', color: 'var(--gold-light)' }}>Card: &ldquo;{item.card.message}&rdquo;</div>
                        )}
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => onRemoveItem(item.cartId)}
                    style={{ color: 'rgba(212,175,55,0.6)', cursor: 'pointer', background: 'none' }}
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Price and quantity adjust controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed rgba(212, 175, 55, 0.15)', paddingTop: '0.6rem' }}>
                  <span style={{ fontWeight: '700', color: 'var(--gold-light)', fontSize: '0.95rem' }}>
                    ₹{item.price * item.quantity}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <button 
                      onClick={() => onUpdateQty(item.cartId, item.quantity - 1)}
                      style={{ 
                        width: '24px', height: '24px', 
                        border: '1px solid var(--border-color)', borderRadius: '50%', 
                        backgroundColor: 'rgba(33, 1, 5, 0.6)', color: 'white', 
                        fontWeight: 'bold', cursor: 'pointer' 
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: '700', fontSize: '0.85rem', width: '15px', textAlign: 'center', color: 'white' }}>
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => onUpdateQty(item.cartId, item.quantity + 1)}
                      style={{ 
                        width: '24px', height: '24px', 
                        border: '1px solid var(--border-color)', borderRadius: '50%', 
                        backgroundColor: 'rgba(33, 1, 5, 0.6)', color: 'white', 
                        fontWeight: 'bold', cursor: 'pointer' 
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Checkout Detail Form */}
        {cart.length > 0 && (
          <form 
            onSubmit={handleCheckoutSubmit}
            style={{ 
              padding: '1.2rem 1.5rem', 
              backgroundColor: 'rgba(22, 1, 4, 0.95)', 
              borderTop: '1.5px solid var(--gold-accent)', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.8rem' 
            }}
          >
            <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-light)', margin: 0, fontFamily: 'var(--font-heading)' }}>
              Delivery Placement (Jammikunta Zone)
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <input 
                type="text" 
                placeholder="Full Name" 
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem' }}
              />
              <input 
                type="tel" 
                placeholder="WhatsApp Phone" 
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem' }}
              />
            </div>

            {/* Delivery type selectors */}
            <div style={{ display: 'flex', gap: '0.8rem', margin: '0.1rem 0' }}>
              {['Pickup', 'Delivery'].map((type) => (
                <label 
                  key={type} 
                  style={{ 
                    flex: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.4rem', 
                    fontSize: '0.8rem', 
                    fontWeight: '700', 
                    padding: '0.5rem', 
                    border: orderType === type ? '1px solid var(--gold-accent)' : '1px solid rgba(212,175,55,0.15)', 
                    borderRadius: 'var(--radius-sm)', 
                    cursor: 'pointer',
                    backgroundColor: orderType === type ? 'rgba(212, 175, 55, 0.15)' : 'rgba(33, 1, 5, 0.3)',
                    color: orderType === type ? 'var(--gold-light)' : 'var(--text-muted)'
                  }}
                >
                  <input 
                    type="radio" 
                    name="orderType" 
                    value={type} 
                    checked={orderType === type}
                    onChange={(e) => setOrderType(e.target.value)}
                    style={{ margin: 0 }}
                  />
                  {type === 'Pickup' ? 'Store Pickup' : 'Home Delivery'}
                </label>
              ))}
            </div>

            {/* Address bar */}
            {orderType === 'Delivery' && (
              <input 
                type="text" 
                placeholder="Street name / landmark in Jammikunta" 
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem' }}
              />
            )}

            {/* Calculations Breakdown */}
            <div 
              style={{ 
                backgroundColor: 'rgba(33, 1, 5, 0.4)', 
                padding: '0.8rem 1rem', 
                borderRadius: 'var(--radius-sm)', 
                fontSize: '0.8rem', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.4rem', 
                marginTop: '0.2rem',
                border: '1px solid rgba(212,175,55,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Subtotal Sum</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#81c784', fontWeight: '600' }}>
                  <span>Loyalty Discount ({loyaltyTier})</span>
                  <span>-₹{discountAmount.toFixed(0)}</span>
                </div>
              )}

              {orderType === 'Delivery' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Jammikunta Delivery</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
              )}

              <div 
                style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                  fontWeight: '700', fontSize: '1rem', borderTop: '1px dashed rgba(212,175,55,0.15)', 
                  paddingTop: '0.4rem', marginTop: '0.2rem', color: 'var(--gold-light)' 
                }}
              >
                <span>Total bill</span>
                <span>₹{total.toFixed(0)}</span>
              </div>
            </div>

            {/* Confirm & order WhatsApp button */}
            <button 
              type="submit" 
              className="btn-primary"
              style={{ 
                width: '100%', 
                justifyContent: 'center', 
                padding: '0.75rem', 
                background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
                border: '1px solid #075e54',
                color: 'white',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.2)',
                cursor: 'pointer'
              }}
            >
              <Send size={15} />
              Place Order via WhatsApp
            </button>
          </form>
        )}

      </div>
    </>
  );
}
