import React, { useState } from 'react';
import { Search, MapPin, Package, Clock, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';

export default function OrderTracker({ orders }) {
  const [searchId, setSearchId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchId.trim().toUpperCase();
    const found = orders.find(o => o.id === query);
    setTrackedOrder(found || null);
    setSearched(true);
  };

  const getStatusStep = (status) => {
    if (status === 'Pending') return 0;
    if (status === 'Preparing') return 1;
    if (status === 'Packing') return 2;
    if (status === 'Out for Delivery' || status === 'Ready for Pickup') return 3;
    if (status === 'Completed') return 4;
    return 0;
  };

  const steps = [
    { label: 'Order Placed', desc: 'Received at Jammikunta office', icon: Clock },
    { label: 'Kitchen Crafting', desc: 'Prepared with 100% pure desi ghee', icon: ShieldCheck },
    { label: 'Royal Packaging', desc: 'Packed in velvet luxury box', icon: Package },
    { label: 'Dispatched / Ready', desc: 'Out for delivery or ready for pickup', icon: MapPin },
    { label: 'Delivered', desc: 'Enjoy your fresh royal sweets!', icon: CheckCircle2 }
  ];

  const currentStepIndex = trackedOrder ? getStatusStep(trackedOrder.status) : 0;

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '800px', animation: 'fade-in-up 0.5s ease' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2.4rem', color: 'var(--gold-light)', fontFamily: 'var(--font-heading)', marginBottom: '0.8rem' }}>
          Track Your Royal Order
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Enter your unique TR Order ID to monitor the handcrafting, packing, and dispatch progress of your fresh sweets in Jammikunta.
        </p>
        <div className="decorative-divider">
          <svg className="divider-mandala" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0C51.5 15 53 17 65 17C77 17 75 15 75 25C75 35 77 37 89 37C101 37 99 35 91 43C83 51 83 49 89 57C95 65 97 63 85 63C73 63 75 65 75 75C75 85 77 83 65 83C53 83 55 85 47 91C39 97 41 99 37 91C33 83 35 83 25 83C15 83 17 85 17 75C17 65 15 63 5 63C-5 63 -3 65 5 57C13 49 13 51 5 43C-3 35 -5 37 7 37C19 37 17 35 17 25C17 15 15 17 27 17C39 17 37 15 50 0Z" />
          </svg>
        </div>
      </div>

      {/* Tracker Search input form */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.8rem', marginBottom: '3rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Enter Order ID (e.g. TR-1082, TR-1081)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={{
              width: '100%',
              padding: '0.9rem 1rem 0.9rem 1.2rem',
              fontSize: '1rem',
              backgroundColor: 'rgba(33, 1, 5, 0.5)',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: 'var(--radius-sm)',
              color: 'white'
            }}
          />
        </div>
        <button 
          type="submit" 
          className="btn-primary"
          style={{ padding: '0 2rem', height: '52px', cursor: 'pointer' }}
        >
          <Search size={18} />
          Track
        </button>
      </form>

      {/* Track Result panel */}
      {searched && (
        trackedOrder ? (
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(212,175,55,0.25)' }}>
            
            {/* Order Brief */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px dashed rgba(212, 175, 55, 0.15)', paddingBottom: '1.2rem', marginBottom: '2rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--gold-accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tracking Active Order</span>
                <h3 style={{ fontSize: '1.5rem', color: 'white', margin: '0.2rem 0', fontFamily: 'var(--font-heading)' }}>{trackedOrder.id}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Placed on {trackedOrder.timestamp}</span>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Total bill</span>
                <span style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--gold-light)' }}>₹{trackedOrder.total}</span>
                <span className="badge badge-gold" style={{ display: 'block', marginTop: '0.4rem', fontSize: '0.7rem' }}>{trackedOrder.status.toUpperCase()}</span>
              </div>
            </div>

            {/* Custom Interactive timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
              
              {/* Timeline Connector Line */}
              <div 
                style={{
                  position: 'absolute',
                  top: '15px',
                  left: '20px',
                  bottom: '15px',
                  width: '3px',
                  backgroundColor: 'rgba(212,175,55,0.15)',
                  zIndex: 0
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  top: '15px',
                  left: '20px',
                  height: `${(currentStepIndex / 4) * 100}%`,
                  maxHeight: 'calc(100% - 30px)',
                  width: '3px',
                  backgroundColor: 'var(--gold-accent)',
                  boxShadow: '0 0 8px var(--gold-accent)',
                  transition: 'height 0.8s ease',
                  zIndex: 0
                }}
              />

              {/* Steps Renders */}
              {steps.map((step, idx) => {
                const StepIcon = step.icon;
                const isCompleted = idx < currentStepIndex;
                const isActive = idx === currentStepIndex;
                
                return (
                  <div key={idx} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', zIndex: 1 }}>
                    {/* Circle Node */}
                    <div 
                      style={{
                        width: '42px', height: '42px',
                        borderRadius: '50%',
                        backgroundColor: isCompleted ? 'var(--gold-accent)' : isActive ? 'var(--maroon-primary)' : 'rgba(22, 1, 4, 0.9)',
                        border: isCompleted || isActive ? '2px solid var(--gold-light)' : '2px solid rgba(212,175,55,0.2)',
                        color: isCompleted ? 'var(--maroon-dark)' : isActive ? 'var(--gold-light)' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isActive ? '0 0 15px rgba(212, 175, 55, 0.4)' : 'none',
                        transition: 'var(--transition-smooth)'
                      }}
                    >
                      <StepIcon size={20} />
                    </div>

                    {/* Step details */}
                    <div>
                      <h4 
                        style={{ 
                          fontSize: '1.1rem', 
                          margin: 0, 
                          color: isCompleted || isActive ? 'white' : 'var(--text-muted)',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: isActive ? '800' : '600'
                        }}
                      >
                        {step.label}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: isCompleted || isActive ? 'var(--text-muted)' : 'rgba(255,255,255,0.2)', margin: '0.1rem 0 0 0' }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Order details overview */}
            <div style={{ marginTop: '2.5rem', backgroundColor: 'rgba(33, 1, 5, 0.4)', padding: '1.2rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(212,175,55,0.1)' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-light)', marginBottom: '0.6rem', fontFamily: 'var(--font-heading)' }}>Royal Package Summary</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
                {trackedOrder.items.map((item, i) => (
                  <li key={i} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                    <span>{item.qty}x {item.name}</span>
                    <span style={{ color: 'white' }}>₹{item.price * item.qty}</span>
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed rgba(212,175,55,0.15)', paddingTop: '0.6rem', marginTop: '0.6rem', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Delivery Point:</span>
                <span style={{ color: 'white', fontWeight: '600' }}>{trackedOrder.address}</span>
              </div>
            </div>

          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.1rem' }}>Order ID *{searchId}* was not found. Please verify the ID and try again.</p>
            <span style={{ fontSize: '0.8rem', display: 'block', marginTop: '0.5rem' }}>Hint: Try typing "TR-1082" or "TR-1081"</span>
          </div>
        )
      )}

      {/* Helpful tracking hints */}
      {!searched && (
        <div style={{ textAlign: 'center', backgroundColor: 'rgba(33, 1, 5, 0.35)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(212,175,55,0.15)' }}>
          <h4 style={{ color: 'var(--gold-light)', margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontFamily: 'var(--font-heading)' }}>Patron Order Logs</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            Active orders available for simulation tracking: <br />
            <strong>TR-1082</strong> (Preparing) &nbsp;&bull;&nbsp; <strong>TR-1081</strong> (Pending) &nbsp;&bull;&nbsp; <strong>TR-1080</strong> (Completed)
          </p>
        </div>
      )}

    </div>
  );
}
