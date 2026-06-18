import React, { useState } from 'react';
import { Box, HelpCircle, Plus, Trash2, Heart, Award, Sparkles } from 'lucide-react';
import { sweets, giftBoxDesigns } from '../data/sweetsData';
import SweetVisual from './SweetVisual';

export default function GiftBoxBuilder({ onAddGiftBoxToCart }) {
  const [selectedDesign, setSelectedDesign] = useState(giftBoxDesigns[0].id);
  const [selectedCapacity, setSelectedCapacity] = useState(500); // 500g, 1000g (1kg), 2000g (2kg)
  const [boxContents, setBoxContents] = useState([]); // Array of { sweetId: '', weight: 100 }
  const [greetingCard, setGreetingCard] = useState('');
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');

  const activeDesign = giftBoxDesigns.find(d => d.id === selectedDesign);

  // Total weight currently filled
  const totalWeightFilled = boxContents.reduce((sum, item) => sum + item.weight, 0);

  // Calculate prices
  const calculateSweetsPrice = () => {
    return boxContents.reduce((sum, item) => {
      const sweet = sweets.find(s => s.id === item.sweetId);
      if (!sweet) return sum;
      return sum + ((item.weight / 1000) * sweet.pricePerKg);
    }, 0);
  };

  const sweetsPrice = calculateSweetsPrice();
  const totalPrice = activeDesign.price + sweetsPrice;

  // Add 100g of sweet to the box
  const handleAddSweet = (sweetId) => {
    if (totalWeightFilled + 100 > selectedCapacity) {
      alert(`The box is full! Maximum capacity is ${selectedCapacity}g.`);
      return;
    }

    const existingIndex = boxContents.findIndex(item => item.sweetId === sweetId);
    if (existingIndex > -1) {
      const updated = [...boxContents];
      updated[existingIndex].weight += 100;
      setBoxContents(updated);
    } else {
      setBoxContents([...boxContents, { sweetId, weight: 100 }]);
    }
  };

  // Reduce sweet by 100g
  const handleRemoveSweetPortion = (sweetId) => {
    const existingIndex = boxContents.findIndex(item => item.sweetId === sweetId);
    if (existingIndex === -1) return;

    const updated = [...boxContents];
    if (updated[existingIndex].weight > 100) {
      updated[existingIndex].weight -= 100;
      setBoxContents(updated);
    } else {
      updated.splice(existingIndex, 1);
      setBoxContents(updated);
    }
  };

  const handleRemoveSweetFull = (sweetId) => {
    setBoxContents(boxContents.filter(item => item.sweetId !== sweetId));
  };

  const handleClearBox = () => {
    setBoxContents([]);
  };

  const handleAddToCart = () => {
    if (totalWeightFilled === 0) {
      alert("Please add delicious sweets to your box first!");
      return;
    }
    if (totalWeightFilled < selectedCapacity) {
      if (!window.confirm(`Your box has space for ${selectedCapacity - totalWeightFilled}g more. Add to cart anyway?`)) {
        return;
      }
    }

    const compiledBox = {
      id: `GIFTBOX-${Date.now()}`,
      name: `${activeDesign.name} (${selectedCapacity / 1000}kg Size)`,
      price: totalPrice,
      design: activeDesign,
      capacity: selectedCapacity,
      contents: boxContents.map(item => {
        const sw = sweets.find(s => s.id === item.sweetId);
        return {
          id: item.sweetId,
          name: sw.name,
          weight: item.weight,
          priceShare: (item.weight / 1000) * sw.pricePerKg
        };
      }),
      card: greetingCard ? { senderName, recipientName, message: greetingCard } : null,
      isCustomGiftBox: true,
      quantity: 1
    };

    onAddGiftBoxToCart(compiledBox);
    
    // Reset state
    setBoxContents([]);
    setGreetingCard('');
    setSenderName('');
    setRecipientName('');
  };

  // Convert contents list to flat slots array (1 slot per 100g)
  const getBoxSlots = () => {
    const totalSlots = selectedCapacity / 1000 * 10; // 500g = 5 slots, 1kg = 10 slots, 2kg = 20 slots
    const filledSlots = [];
    
    boxContents.forEach(item => {
      const sweet = sweets.find(s => s.id === item.sweetId);
      const portions = item.weight / 100;
      for (let i = 0; i < portions; i++) {
        filledSlots.push({
          sweetId: item.sweetId,
          name: sweet ? sweet.name : 'Mithai',
          gradient: sweet ? sweet.gradient : null
        });
      }
    });

    const slots = [];
    for (let i = 0; i < totalSlots; i++) {
      if (i < filledSlots.length) {
        slots.push({ isEmpty: false, ...filledSlots[i] });
      } else {
        slots.push({ isEmpty: true });
      }
    }
    return slots;
  };

  const slots = getBoxSlots();
  const percentageFilled = (totalWeightFilled / selectedCapacity) * 100;

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', animation: 'fade-in-up 0.5s ease' }}>
      
      {/* Tab Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--gold-light)', fontFamily: 'var(--font-heading)', marginBottom: '0.8rem' }}>
          Royal Gift Box Builder
        </h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)' }}>
          Design a premium velvet gifting box. Select your favorite pure ghee and dry fruit sweets, customize the size, and write a royal greeting note.
        </p>
        <div className="decorative-divider">
          <svg className="divider-mandala" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0C51.5 15 53 17 65 17C77 17 75 15 75 25C75 35 77 37 89 37C101 37 99 35 91 43C83 51 83 49 89 57C95 65 97 63 85 63C73 63 75 65 75 75C75 85 77 83 65 83C53 83 55 85 47 91C39 97 41 99 37 91C33 83 35 83 25 83C15 83 17 85 17 75C17 65 15 63 5 63C-5 63 -3 65 5 57C13 49 13 51 5 43C-3 35 -5 37 7 37C19 37 17 35 17 25C17 15 15 17 27 17C39 17 37 15 50 0Z" />
          </svg>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }} className="builder-layout">
        
        {/* Left Side: Configuration Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Step 1: Design select */}
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--gold-light)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'var(--font-heading)' }}>
              <span style={{ backgroundColor: 'var(--gold-accent)', color: 'var(--maroon-dark)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>1</span>
              Select Box Design Velvet
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {giftBoxDesigns.map((design) => (
                <div
                  key={design.id}
                  onClick={() => setSelectedDesign(design.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: selectedDesign === design.id ? '1px solid var(--gold-accent)' : '1px solid rgba(212,175,55,0.1)',
                    backgroundColor: selectedDesign === design.id ? 'rgba(116, 10, 29, 0.2)' : 'rgba(33, 1, 5, 0.4)',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <div 
                    style={{ 
                      width: '46px', height: '46px', 
                      backgroundColor: design.bgColor, 
                      borderRadius: 'var(--radius-sm)', 
                      border: `1.5px solid ${design.borderColor}`, 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
                    }}
                  >
                    <Box size={22} style={{ color: design.textColor }} />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '1rem', color: 'white', margin: 0 }}>{design.name}</h4>
                      <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--gold-light)' }}>+₹{design.price}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>{design.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Weight select */}
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--gold-light)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'var(--font-heading)' }}>
              <span style={{ backgroundColor: 'var(--gold-accent)', color: 'var(--maroon-dark)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>2</span>
              Choose Box Weight Capacity
            </h3>

            <div style={{ display: 'flex', gap: '1rem' }}>
              {[
                { weight: 500, label: '0.5 kg Box', desc: 'Fits 5 items' },
                { weight: 1000, label: '1.0 kg Box', desc: 'Fits 10 items' },
                { weight: 2000, label: '2.0 kg Box', desc: 'Fits 20 items' }
              ].map((cap) => (
                <button
                  key={cap.weight}
                  onClick={() => {
                    setSelectedCapacity(cap.weight);
                    if (totalWeightFilled > cap.weight) {
                      setBoxContents([]);
                      alert(`Capacity updated to ${cap.weight}g. Cleared box contents because they exceeded the new weight limit.`);
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '1rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: selectedCapacity === cap.weight ? '1.5px solid var(--gold-accent)' : '1px solid rgba(212,175,55,0.15)',
                    backgroundColor: selectedCapacity === cap.weight ? 'rgba(212, 175, 55, 0.15)' : 'rgba(33, 1, 5, 0.4)',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  <h4 style={{ fontSize: '1.05rem', margin: '0 0 0.2rem 0', color: selectedCapacity === cap.weight ? 'var(--gold-light)' : 'var(--text-muted)' }}>{cap.label}</h4>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{cap.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Add sweets */}
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--gold-light)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'var(--font-heading)' }}>
              <span style={{ backgroundColor: 'var(--gold-accent)', color: 'var(--maroon-dark)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>3</span>
              Add Handcrafted Sweets (100g)
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
              Select from the menu below. Each addition contributes 100g of sweets.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }} className="sweets-select-grid">
              {sweets.filter(s => s.stock > 0 && !s.isFestivalSpecial).map((sweet) => {
                const inBox = boxContents.find(item => item.sweetId === sweet.id);
                const quantityInBox = inBox ? inBox.weight : 0;

                return (
                  <div
                    key={sweet.id}
                    style={{
                      backgroundColor: 'rgba(33, 1, 5, 0.4)',
                      border: '1px solid rgba(212,175,55,0.15)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.6rem 0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.5rem'
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '0.85rem', color: 'white', margin: 0 }}>{sweet.name}</h4>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>₹{sweet.pricePerKg}/kg</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {quantityInBox > 0 && (
                        <>
                          <button
                            onClick={() => handleRemoveSweetPortion(sweet.id)}
                            style={{
                              width: '24px', height: '24px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(116, 10, 29, 0.2)',
                              border: '1px solid var(--maroon-light)',
                              color: 'white',
                              fontWeight: 'bold',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                          >
                            -
                          </button>
                          <span style={{ fontSize: '0.8rem', fontWeight: '700', width: '36px', textAlign: 'center', color: 'var(--gold-light)' }}>
                            {quantityInBox}g
                          </span>
                        </>
                      )}
                      
                      <button
                        onClick={() => handleAddSweet(sweet.id)}
                        disabled={totalWeightFilled >= selectedCapacity}
                        style={{
                          width: '24px', height: '24px',
                          borderRadius: '50%',
                          backgroundColor: totalWeightFilled >= selectedCapacity ? 'rgba(255,255,255,0.1)' : 'var(--gold-accent)',
                          border: 'none',
                          color: 'var(--maroon-dark)',
                          fontWeight: 'bold',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: totalWeightFilled >= selectedCapacity ? 'not-allowed' : 'pointer'
                        }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Side: Virtual Box Visualizer & Bill summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Visual Gifting Box Plate Container */}
          <div 
            className="traditional-border" 
            style={{ 
              backgroundColor: activeDesign.bgColor, 
              color: activeDesign.textColor, 
              padding: '2rem', 
              borderRadius: 'var(--radius-md)', 
              border: `3px solid ${activeDesign.borderColor}`, 
              boxShadow: 'var(--shadow-lg), 0 0 25px rgba(212,175,55,0.1)', 
              minHeight: '360px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', 
              position: 'relative' 
            }}
          >
            
            {/* Spinning Mandala water-mark */}
            <div style={{ position: 'absolute', top: '15px', right: '15px', opacity: 0.08, animation: 'spin-mandala 60s linear infinite' }}>
              <svg width="120" height="120" fill="currentColor" viewBox="0 0 100 100">
                <path d="M50 0C51.5 15 53 17 65 17C77 17 75 15 75 25C75 35 77 37 89 37C101 37 99 35 91 43C83 51 83 49 89 57C95 65 97 63 85 63C73 63 75 65 75 75C75 85 77 83 65 83C53 83 55 85 47 91C39 97 41 99 37 91C33 83 35 83 25 83C15 83 17 85 17 75C17 65 15 63 5 63C-5 63 -3 65 5 57C13 49 13 51 5 43C-3 35 -5 37 7 37C19 37 17 35 17 25C17 15 15 17 27 17C39 17 37 15 50 0Z" />
              </svg>
            </div>

            <div>
              {/* Box Title Crest */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', borderBottom: `1px dashed rgba(255, 255, 255, 0.2)`, paddingBottom: '0.8rem', marginBottom: '1.5rem' }}>
                <Box size={28} style={{ color: activeDesign.textColor }} />
                <div>
                  <h3 style={{ color: activeDesign.textColor, fontSize: '1.25rem', fontFamily: 'var(--font-heading)', margin: 0 }}>
                    {activeDesign.name}
                  </h3>
                  <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Assorted Gifting Box Visualizer</span>
                </div>
              </div>

              {/* INTERACTIVE SWEET GRID DISPLAY: 1 slot = 100g */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.8rem', color: activeDesign.textColor, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.8rem', fontWeight: 'bold' }}>
                  Sweet Assortment Chamber Grid:
                </h4>
                
                <div 
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(5, 1fr)', 
                    gap: '0.6rem',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {slots.map((slot, index) => (
                    <div 
                      key={index}
                      style={{
                        aspectRatio: '1',
                        borderRadius: '50%',
                        border: slot.isEmpty ? '1px dashed rgba(255,255,255,0.2)' : `1px solid ${activeDesign.borderColor}`,
                        backgroundColor: slot.isEmpty ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        transition: 'var(--transition-smooth)'
                      }}
                      title={slot.isEmpty ? 'Empty 100g Slot' : `${slot.name} (100g)`}
                    >
                      {slot.isEmpty ? (
                        <span style={{ fontSize: '0.7rem', opacity: 0.3 }}>+</span>
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => handleRemoveSweetPortion(slot.sweetId)}>
                          {/* Mini Visual sweet inside slot */}
                          <SweetVisual id={slot.sweetId} size="small" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Text list overview */}
              {boxContents.length > 0 && (
                <div style={{ borderTop: '1px dashed rgba(255,255,255,0.15)', paddingTop: '0.8rem' }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {boxContents.map((item) => {
                      const sweet = sweets.find(s => s.id === item.sweetId);
                      if (!sweet) return null;
                      return (
                        <li 
                          key={item.sweetId} 
                          style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            fontSize: '0.85rem',
                            backgroundColor: 'rgba(0, 0, 0, 0.25)',
                            padding: '0.3rem 0.6rem',
                            borderRadius: '4px'
                          }}
                        >
                          <span>{sweet.name} ({item.weight}g)</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span>₹{((item.weight / 1000) * sweet.pricePerKg).toFixed(0)}</span>
                            <button
                              onClick={() => handleRemoveSweetFull(item.sweetId)}
                              style={{ color: activeDesign.textColor, opacity: 0.6, cursor: 'pointer', background: 'none' }}
                              aria-label="Delete"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

            </div>

            {/* Capacity Progress slider bar */}
            <div style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.4rem', fontWeight: '700' }}>
                <span>Velvet Box Capacity</span>
                <span>{totalWeightFilled}g / {selectedCapacity}g</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    width: `${percentageFilled}%`, 
                    height: '100%', 
                    backgroundColor: percentageFilled === 100 ? '#4caf50' : 'var(--gold-accent)', 
                    transition: 'width 0.3s ease' 
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Step 4: Gifting Card */}
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--gold-light)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              Attach Complimentary Royal Note
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <label style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-muted)' }}>From (Name)</label>
                  <input 
                    type="text" 
                    placeholder="Sender name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    style={{ padding: '0.45rem 0.8rem', fontSize: '0.85rem' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <label style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-muted)' }}>To (Name)</label>
                  <input 
                    type="text" 
                    placeholder="Recipient name"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    style={{ padding: '0.45rem 0.8rem', fontSize: '0.85rem' }}
                  />
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <label style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-muted)' }}>Greeting Message</label>
                <textarea 
                  rows={2} 
                  placeholder="E.g. Wishing you a Ghee-rich happy festival! Enjoy these sweets!"
                  value={greetingCard}
                  onChange={(e) => setGreetingCard(e.target.value)}
                  style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem', resize: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* Billing & Action triggers */}
          <div className="glass-panel-heavy" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(212, 175, 55, 0.15)', paddingBottom: '0.8rem', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Royal Box Base Velvet</span>
              <span style={{ fontSize: '0.88rem', fontWeight: '700' }}>₹{activeDesign.price}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(212, 175, 55, 0.15)', paddingBottom: '0.8rem', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Assorted Sweets ({totalWeightFilled}g)</span>
              <span style={{ fontSize: '0.88rem', fontWeight: '700' }}>₹{sweetsPrice.toFixed(0)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <span style={{ fontSize: '1.1rem', color: 'var(--gold-accent)', fontWeight: '700', fontFamily: 'var(--font-heading)' }}>Grand Total Box Bill</span>
              <span style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--gold-light)' }}>₹{totalPrice.toFixed(0)}</span>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button 
                onClick={handleClearBox}
                className="btn-outline"
                style={{ flex: 1, padding: '0.75rem 0', cursor: 'pointer' }}
              >
                Clear Box
              </button>
              
              <button 
                onClick={handleAddToCart}
                className="btn-primary"
                style={{ flex: 2, padding: '0.75rem 0', justifyContent: 'center', cursor: 'pointer' }}
              >
                Add Box to Cart
              </button>
            </div>
          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .builder-layout {
          grid-template-columns: 1.15fr 0.85fr;
        }
        @media (max-width: 1024px) {
          .builder-layout {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .sweets-select-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
}
