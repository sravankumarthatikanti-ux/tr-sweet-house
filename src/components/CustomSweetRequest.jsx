import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, CreditCard, Camera, CheckCircle2, AlertCircle, Search, MessageSquare, Loader, ArrowRight, X } from 'lucide-react';

export default function CustomSweetRequest({ 
  customRequests = [], 
  onAddRequest = () => {}, 
  onUpdateStatus = () => {} 
}) {
  const [searchId, setSearchId] = useState('');
  const [trackedRequest, setTrackedRequest] = useState(null);
  
  // Form states
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [sweetName, setSweetName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reqDate, setReqDate] = useState('');
  const [pickupTime, setPickupTime] = useState('05:00 PM');
  const [instructions, setInstructions] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [advanceAmount, setAdvanceAmount] = useState('200');
  const [paymentMethod, setPaymentMethod] = useState('UPI (GPay/PhonePe)');
  
  // Razorpay simulated states
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState('confirm'); // confirm -> processing -> success
  const [payingRequest, setPayingRequest] = useState(null);
  
  // Active view: 'request' or 'track'
  const [activeSubTab, setActiveSubTab] = useState('request');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !phone || !sweetName || !quantity || !reqDate) {
      alert("Please fill in all required fields.");
      return;
    }

    const newRequest = {
      id: `CR-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      phone,
      sweetName,
      quantity,
      requiredDate: reqDate,
      pickupTime,
      instructions,
      referenceImage: imagePreview,
      advanceAmount: parseFloat(advanceAmount) || 200,
      paymentMethod,
      status: 'Request Received', // Start state
      estimatedPrice: 0, // Set by admin later
      timestamp: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'short', day: 'numeric' })
    };

    onAddRequest(newRequest);
    alert(`Custom Sweet Request Submitted! Your tracking ID is: ${newRequest.id}`);
    
    // Automatically switch to tracking this request
    setTrackedRequest(newRequest);
    setSearchId(newRequest.id);
    setActiveSubTab('track');
    
    // Reset Form
    setCustomerName('');
    setPhone('');
    setSweetName('');
    setQuantity('');
    setReqDate('');
    setInstructions('');
    setImagePreview(null);
  };

  const handleTrackSearch = (e) => {
    e.preventDefault();
    const found = customRequests.find(r => r.id.trim().toUpperCase() === searchId.trim().toUpperCase());
    if (found) {
      setTrackedRequest(found);
    } else {
      setTrackedRequest(null);
      alert(`Request ID "${searchId}" not found. Try CR-1085 or CR-1086.`);
    }
  };

  // Trigger Razorpay Overlay
  const startPayment = (request) => {
    setPayingRequest(request);
    setPaymentStep('confirm');
    setIsRazorpayOpen(true);
  };

  const processPayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
      // Update state in app
      onUpdateStatus(payingRequest.id, 'Advance Paid');
      
      // Update locally tracked request reference if active
      if (trackedRequest && trackedRequest.id === payingRequest.id) {
        setTrackedRequest({ ...trackedRequest, status: 'Advance Paid' });
      }
    }, 2500);
  };

  // Compile WhatsApp message
  const getWhatsAppMessage = (req) => {
    const text = `*👑 TR SWEET HOUSE - CUSTOM SWEET REQUEST 👑*\n` +
                 `_Exclusive Mithai Crafting Service Jammikunta_\n` +
                 `-----------------------------------------------\n` +
                 `*📌 Request ID:* ${req.id}\n` +
                 `*👤 Name:* ${req.customerName}\n` +
                 `*📞 Phone:* ${req.phone}\n` +
                 `*🍬 Sweet requested:* ${req.sweetName}\n` +
                 `*⚖️ Quantity:* ${req.quantity}\n` +
                 `*📅 Prep Date:* ${req.requiredDate}\n` +
                 `*🕒 Pickup Time:* ${req.pickupTime}\n` +
                 `*💳 Advance Paid:* ₹${req.advanceAmount} via ${req.paymentMethod}\n` +
                 `*📝 Instructions:* ${req.instructions || 'None'}\n` +
                 `*⚡ Status:* ${req.status}\n` +
                 `-----------------------------------------------\n` +
                 `_Please confirm my custom preparation request. Dhanyavadalu!_`;
    return `https://api.whatsapp.com/send?phone=+919999999999&text=${encodeURIComponent(text)}`;
  };

  // Step-by-step status steps
  const steps = [
    { label: 'Request Received', desc: 'Analyzing recipe specs' },
    { label: 'Price Confirmed', desc: 'Pricing verified by chef' },
    { label: 'Advance Paid', desc: 'Simulated payment completed' },
    { label: 'Preparing', desc: 'Cooked fresh in Desi Ghee' },
    { label: 'Ready for Pickup', desc: 'Packed in velvet gift box' },
    { label: 'Completed', desc: 'Collected from Jammikunta store' }
  ];

  const getStepIndex = (status) => {
    if (status === 'Cancelled') return -1;
    return steps.findIndex(s => s.label === status);
  };

  const currentStepIdx = trackedRequest ? getStepIndex(trackedRequest.status) : 0;

  return (
    <div className="container" style={{ paddingTop: '2.5rem', animation: 'fade-in-up 0.5s ease' }}>
      
      {/* 1. Header Area */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Unique Gifting Special</span>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--gold-light)', fontFamily: 'var(--font-heading)', margin: '0 0 0.5rem 0' }}>
          Request Your Favorite Sweet
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', fontSize: '0.95rem', lineHeight: '1.6' }}>
          Can’t find your favorite traditional sweet in our menu today? Tell us what you want, pay a small advance, and our chefs will prepare it fresh using 100% pure ingredients.
        </p>
        <div className="decorative-divider">
          <svg className="divider-mandala" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0C51.5 15 53 17 65 17C77 17 75 15 75 25C75 35 77 37 89 37C101 37 99 35 91 43C83 51 83 49 89 57C95 65 97 63 85 63C73 63 75 65 75 75C75 85 77 83 65 83C53 83 55 85 47 91C39 97 41 99 37 91C33 83 35 83 25 83C15 83 17 85 17 75C17 65 15 63 5 63C-5 63 -3 65 5 57C13 49 13 51 5 43C-3 35 -5 37 7 37C19 37 17 35 17 25C17 15 15 17 27 17C39 17 37 15 50 0Z" />
          </svg>
        </div>
      </div>

      {/* Sub Tabs: Request Form or Track Request */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
        <button 
          onClick={() => setActiveSubTab('request')}
          className={activeSubTab === 'request' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '0.6rem 1.8rem', borderRadius: 'var(--radius-full)', fontSize: '0.9rem' }}
        >
          <Sparkles size={16} /> Request Sweet
        </button>
        <button 
          onClick={() => setActiveSubTab('track')}
          className={activeSubTab === 'track' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '0.6rem 1.8rem', borderRadius: 'var(--radius-full)', fontSize: '0.9rem' }}
        >
          <Search size={16} /> Track Request Status
        </button>
      </div>

      {/* 2. Sub-Tab View Content */}
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        
        {/* VIEW A: Request Form */}
        {activeSubTab === 'request' && (
          <div className="traditional-border glass-panel-heavy request-form-container">
            
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'white', margin: 0, fontFamily: 'var(--font-heading)' }}>Custom Sweet Prep Sheet</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Provide exact specifications to share with our master halwais</p>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div className="grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: '600' }}>Your Name *</label>
                  <input 
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: '600' }}>Mobile Number *</label>
                  <input 
                    type="tel"
                    required
                    placeholder="Enter 10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: '600' }}>Sweet Name *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Kakinada Kaja, Chandra Kala, Gujia"
                    value={sweetName}
                    onChange={(e) => setSweetName(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: '600' }}>Required Quantity *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. 1.5 kg, 20 pieces"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: '600' }}>Required Date *</label>
                  <input 
                    type="date"
                    required
                    value={reqDate}
                    onChange={(e) => setReqDate(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: '600' }}>Desired Pickup Time</label>
                  <select 
                    value={pickupTime} 
                    onChange={(e) => setPickupTime(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                    <option value="09:00 PM">09:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: '600' }}>Special Preparation Instructions</label>
                <textarea 
                  rows="3"
                  placeholder="Mention sugar preferences, extra dry fruits, shape preferences, or allergy details..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  style={{ width: '100%', resize: 'none' }}
                />
              </div>

              <div className="grid-2">
                
                {/* Upload reference image */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: '600' }}>Upload Reference Image (Optional)</label>
                  <div 
                    style={{ 
                      border: '1px dashed var(--border-color)', 
                      borderRadius: 'var(--radius-sm)', 
                      padding: '1.2rem', 
                      textAlign: 'center', 
                      backgroundColor: 'rgba(33, 1, 5, 0.35)', 
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                    />
                    {imagePreview ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <img src={imagePreview} alt="Preview" style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--gold-accent)' }} />
                        <span style={{ fontSize: '0.75rem', color: 'var(--gold-light)' }}>Change Image</span>
                      </div>
                    ) : (
                      <div style={{ color: 'var(--text-muted)' }}>
                        <Camera size={24} style={{ color: 'var(--gold-accent)', marginBottom: '0.4rem' }} />
                        <p style={{ fontSize: '0.75rem', margin: 0 }}>Drag or click to choose photo</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Advance Amount & Method */}
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: '600' }}>Advance (₹) *</label>
                      <input 
                        type="number"
                        min="100"
                        required
                        value={advanceAmount}
                        onChange={(e) => setAdvanceAmount(e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: '600' }}>Payment Mode</label>
                      <select 
                        value={paymentMethod} 
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        style={{ width: '100%', padding: '0.8rem 0.5rem' }}
                      >
                        <option value="UPI (GPay/PhonePe)">UPI Mode</option>
                        <option value="Credit/Debit Card">Card Pay</option>
                        <option value="Cash at Jammikunta Shop">Cash Shop</option>
                      </select>
                    </div>
                  </div>
                  <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold-accent)', marginTop: '0.5rem' }}>
                    * Minimal ₹200 advance required to avoid kitchen raw ingredient wastage.
                  </span>
                </div>

              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '1rem', marginTop: '1rem' }}
              >
                <Sparkles size={18} /> Send Custom Sweet Request
              </button>

            </form>
          </div>
        )}

        {/* VIEW B: Track Status */}
        {activeSubTab === 'track' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Search Bar container */}
            <div className="traditional-border glass-panel" style={{ padding: '1.8rem', borderRadius: 'var(--radius-md)' }}>
              <form onSubmit={handleTrackSearch} style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <input 
                    type="text"
                    placeholder="Enter Tracking ID (e.g. CR-1085)"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    style={{ width: '100%', paddingLeft: '3rem' }}
                  />
                  <Search size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold-accent)' }} />
                </div>
                <button type="submit" className="btn-primary" style={{ flexShrink: 0 }}>
                  Search Request
                </button>
              </form>
              <div style={{ marginTop: '0.8rem', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                Try tracking mock request: <span style={{ color: 'var(--gold-accent)', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { setSearchId('CR-1085'); setSearchId('CR-1085'); }}>CR-1085</span> or <span style={{ color: 'var(--gold-accent)', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { setSearchId('CR-1086'); }}>CR-1086</span>
              </div>
            </div>

            {/* Tracking Results */}
            {trackedRequest ? (
              <div className="traditional-border glass-panel-heavy animate-fade-in request-form-container">
                
                {/* Header status details */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px dashed rgba(212,175,55,0.2)', paddingBottom: '1.2rem', marginBottom: '2rem' }}>
                  <div>
                    <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>Request ID: {trackedRequest.id}</span>
                    <h3 style={{ fontSize: '1.6rem', color: 'white', margin: 0, fontFamily: 'var(--font-heading)' }}>
                      {trackedRequest.sweetName}
                    </h3>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Submitted on: {trackedRequest.timestamp}</span>
                  </div>
                  
                  {/* Status label */}
                  <div style={{ textAlign: 'right' }}>
                    <span className={`badge ${
                      trackedRequest.status === 'Cancelled' ? 'badge-maroon' :
                      trackedRequest.status === 'Completed' ? 'badge-green' : 'badge-gold'
                    }`} style={{ fontSize: '0.85rem', padding: '0.4rem 0.9rem' }}>
                      {trackedRequest.status}
                    </span>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                      Qty: <strong>{trackedRequest.quantity}</strong>
                    </div>
                  </div>
                </div>

                {/* Main details block */}
                <div className="grid-map-section" style={{ marginBottom: '2rem' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-light)', margin: '0 0 0.2rem 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer Info</h4>
                      <p style={{ margin: 0, fontSize: '0.88rem', color: 'white' }}>{trackedRequest.customerName} ({trackedRequest.phone})</p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-light)', margin: '0 0 0.2rem 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Required Prep & Pickup</h4>
                      <p style={{ margin: 0, fontSize: '0.88rem', color: 'white' }}>{trackedRequest.requiredDate} at {trackedRequest.pickupTime}</p>
                    </div>
                    {trackedRequest.instructions && (
                      <div>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-light)', margin: '0 0 0.2rem 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Instructions</h4>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>"{trackedRequest.instructions}"</p>
                      </div>
                    )}
                    <div>
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-light)', margin: '0 0 0.2rem 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Price Estimate</h4>
                      <p style={{ margin: 0, fontSize: '1.1rem', color: 'white', fontWeight: '700' }}>
                        {trackedRequest.estimatedPrice > 0 ? `₹${trackedRequest.estimatedPrice}` : 'Verifying Chef Quote...'}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', justifyContent: 'center', borderLeft: '1px dashed rgba(212,175,55,0.15)', paddingLeft: '1.5rem' }} className="no-border-left">
                    {/* Reference Image preview */}
                    {trackedRequest.referenceImage ? (
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Reference Image</span>
                        <img 
                          src={trackedRequest.referenceImage} 
                          alt="Reference" 
                          style={{ width: '130px', height: '130px', objectFit: 'cover', borderRadius: '8px', border: '1.5px solid var(--gold-accent)', boxShadow: 'var(--shadow-md)' }} 
                        />
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '1.5rem 0', color: 'var(--text-muted)' }}>
                        <Camera size={36} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
                        <span style={{ fontSize: '0.75rem' }}>No reference photo uploaded</span>
                      </div>
                    )}
                  </div>

                </div>

                {/* Step-by-Step Progress Timeline */}
                {trackedRequest.status !== 'Cancelled' ? (
                  <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
                    <h4 style={{ fontSize: '1rem', color: 'var(--gold-light)', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>
                      Royal Crafting Timeline
                    </h4>
                    
                    {/* Horizontal timeline lines */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', width: '100%' }}>
                      
                      {/* Background connection bar */}
                      <div 
                        style={{ 
                          position: 'absolute', top: '15px', left: '5%', right: '5%', 
                          height: '4px', backgroundColor: 'rgba(255,255,255,0.08)', zIndex: 0 
                        }} 
                      />
                      
                      {/* Active gold progress bar overlay */}
                      <div 
                        style={{ 
                          position: 'absolute', top: '15px', left: '5%', 
                          width: `${currentStepIdx >= 0 ? (currentStepIdx / (steps.length - 1)) * 90 : 0}%`, 
                          height: '4px', backgroundColor: 'var(--gold-accent)', zIndex: 0,
                          boxShadow: '0 0 10px var(--gold-accent)',
                          transition: 'width 0.8s ease'
                        }} 
                      />

                      {steps.map((st, idx) => {
                        const isDone = idx <= currentStepIdx;
                        const isCurrent = idx === currentStepIdx;
                        return (
                          <div 
                            key={st.label} 
                            style={{ 
                              display: 'flex', flexDirection: 'column', alignItems: 'center', 
                              width: '16%', zIndex: 1, position: 'relative', textAlign: 'center' 
                            }}
                          >
                            {/* Bullet dot */}
                            <div 
                              style={{ 
                                width: '32px', height: '32px', borderRadius: '50%', 
                                backgroundColor: isDone ? 'var(--gold-accent)' : '#160207', 
                                border: `2px solid ${isDone ? 'var(--gold-light)' : 'var(--border-color)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: isDone ? 'var(--maroon-dark)' : 'var(--text-muted)',
                                fontWeight: '700', fontSize: '0.8rem',
                                boxShadow: isCurrent ? '0 0 15px var(--gold-accent)' : 'none',
                                transition: 'all 0.4s ease'
                              }}
                            >
                              {isDone ? <CheckCircle2 size={16} strokeWidth={3} /> : idx + 1}
                            </div>
                            <span style={{ fontSize: '0.78rem', color: isDone ? 'white' : 'var(--text-muted)', fontWeight: isDone ? '700' : '400', marginTop: '0.6rem', lineHeight: '1.2' }}>
                              {st.label}
                            </span>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'none' }} className="tablet-show">
                              {st.desc}
                            </span>
                          </div>
                        );
                      })}

                    </div>
                  </div>
                ) : (
                  <div className="badge badge-maroon" style={{ padding: '1rem', width: '100%', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    <AlertCircle size={18} />
                    <span>This Custom Preparation Request has been Cancelled. Please contact the boutique for refunds.</span>
                  </div>
                )}

                {/* Operations buttons */}
                <div className="grid-2" style={{ borderTop: '1px dashed rgba(212,175,55,0.2)', paddingTop: '1.5rem' }}>
                  
                  {/* Action 1: Pay Advance (Active only if price is confirmed and status is 'Price Confirmed') */}
                  <button 
                    disabled={trackedRequest.status !== 'Price Confirmed'}
                    onClick={() => startPayment(trackedRequest)}
                    className="btn-primary"
                    style={{ 
                      flex: 1, 
                      justifyContent: 'center',
                      opacity: trackedRequest.status !== 'Price Confirmed' ? 0.4 : 1,
                      cursor: trackedRequest.status !== 'Price Confirmed' ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <CreditCard size={16} /> 
                    {trackedRequest.status === 'Request Received' ? 'Awaiting Price Quote' : 
                     trackedRequest.status === 'Price Confirmed' ? 'Pay Advance Amount' : 'Advance Payment Deposited'}
                  </button>

                  {/* Action 2: WhatsApp Contact */}
                  <a 
                    href={getWhatsAppMessage(trackedRequest)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ flex: 1, justifyContent: 'center', textDecoration: 'none' }}
                  >
                    <MessageSquare size={16} /> Contact Boutique on WhatsApp
                  </a>

                </div>

              </div>
            ) : (
              searchId && (
                <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                  <AlertCircle size={32} style={{ color: 'var(--maroon-light)', marginBottom: '0.8rem' }} />
                  <p>No custom sweet requests found with ID "{searchId}".</p>
                </div>
              )
            )}

          </div>
        )}

      </div>

      {/* 3. Simulated Razorpay Premium Modal */}
      {isRazorpayOpen && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div 
            className="glass-panel-heavy" 
            style={{ 
              width: '100%', 
              maxWidth: '400px', 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden', 
              border: '2px solid var(--gold-accent)',
              boxShadow: 'var(--shadow-lg), 0 0 35px rgba(212,175,55,0.2)'
            }}
          >
            {/* Razorpay Blue Header */}
            <div style={{ backgroundColor: '#0f172a', padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(212,175,55,0.2)' }}>
              <div>
                <span style={{ fontSize: '0.65rem', color: '#38bdf8', letterSpacing: '1px', textTransform: 'uppercase', display: 'block' }}>Simulated Checkout</span>
                <span style={{ fontSize: '1.1rem', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: '700' }}>TR SWEET HOUSE</span>
              </div>
              <button onClick={() => setIsRazorpayOpen(false)} style={{ color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            {/* Payment Steps */}
            <div style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
              
              {paymentStep === 'confirm' && (
                <div>
                  <CreditCard size={44} style={{ color: 'var(--gold-accent)', marginBottom: '1rem' }} />
                  <h4 style={{ fontSize: '1.15rem', color: 'white', marginBottom: '0.5rem' }}>Authorize Advance Deposit</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    You are paying a ₹<strong>{payingRequest.advanceAmount}</strong> advance for preparing the custom batch of <strong>{payingRequest.sweetName}</strong>.
                  </p>
                  <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border-color)', marginBottom: '1.5rem', fontSize: '0.82rem', textAlign: 'left' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Subtotal:</span>
                      <span style={{ color: 'white' }}>₹{payingRequest.estimatedPrice}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.2rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Advance Required:</span>
                      <span style={{ color: 'var(--gold-light)', fontWeight: '700' }}>₹{payingRequest.advanceAmount}</span>
                    </div>
                  </div>
                  <button onClick={processPayment} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Pay Now ₹{payingRequest.advanceAmount}
                  </button>
                </div>
              )}

              {paymentStep === 'processing' && (
                <div style={{ padding: '2rem 0' }}>
                  <Loader size={48} className="spin-mandala" style={{ color: 'var(--gold-accent)', marginBottom: '1.5rem', animationDuration: '3s' }} />
                  <h4 style={{ fontSize: '1.15rem', color: 'white', marginBottom: '0.5rem' }}>Contacting Bank Services</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Processing your secure simulated Razorpay transaction...</p>
                </div>
              )}

              {paymentStep === 'success' && (
                <div style={{ animation: 'fade-in-up 0.5s ease' }}>
                  <CheckCircle2 size={54} fill="#81c784" style={{ color: '#160207', marginBottom: '1rem' }} />
                  <h4 style={{ fontSize: '1.25rem', color: '#81c784', marginBottom: '0.5rem' }}>Transaction Successful!</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    Advance payment received. Receipt ID: <strong>pay_TR_{Math.floor(100000 + Math.random() * 900000)}</strong>.
                  </p>
                  <button 
                    onClick={() => setIsRazorpayOpen(false)} 
                    className="btn-secondary" 
                    style={{ width: '100%', justifyContent: 'center', borderColor: '#81c784', color: '#81c784' }}
                  >
                    Return to Timeline
                  </button>
                </div>
              )}

            </div>

            {/* Footer */}
            <div style={{ backgroundColor: '#0f172a', padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <span>Securely powered by simulated</span>
              <span style={{ fontWeight: '700', color: 'white' }}>Razorpay</span>
            </div>

          </div>
        </div>
      )}

      {/* Screen-size helper CSS styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media(max-width: 600px) {
          .no-border-left {
            border-left: none !important;
            padding-left: 0 !important;
          }
          .tablet-show {
            display: none !important;
          }
        }
      `}} />

    </div>
  );
}
