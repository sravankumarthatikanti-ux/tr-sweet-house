import React, { useState } from 'react';
import { DollarSign, ShoppingBag, Users, AlertTriangle, RefreshCw, BarChart2, Calendar, TrendingUp, CheckCircle, Sparkles } from 'lucide-react';
import { sweets, loyaltyTiers } from '../data/sweetsData';

export default function AdminPanel({ 
  orders, 
  onUpdateStatus, 
  onUpdateStock,
  customRequests = [],
  onUpdateCustomRequestStatus = () => {},
  onConfirmCustomRequestPrice = () => {}
}) {
  const [adminSubTab, setAdminSubTab] = useState('overview');
  const [restockSuccess, setRestockSuccess] = useState('');

  // 1. Calculate Analytics Overview Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalSalesCount = orders.length;
  const averageOrderValue = totalSalesCount > 0 ? Math.round(totalRevenue / totalSalesCount) : 0;
  const uniqueCustomers = new Set(orders.map(o => o.phone)).size;

  // Mock sales data for the SVG Sales Chart
  const salesHistory = [
    { day: 'Mon', value: 4500 },
    { day: 'Tue', value: 5800 },
    { day: 'Wed', value: 5100 },
    { day: 'Thu', value: 7200 },
    { day: 'Fri', value: 9500 },
    { day: 'Sat', value: 12000 },
    { day: 'Sun', value: 15400 }
  ];

  // SVG Chart Dimensions & Calculations
  const chartHeight = 120;
  const chartWidth = 500;
  const padding = 20;
  const maxVal = Math.max(...salesHistory.map(d => d.value));
  const pointsString = salesHistory.map((d, i) => {
    const x = padding + (i * (chartWidth - padding * 2) / (salesHistory.length - 1));
    const y = chartHeight - padding - (d.value * (chartHeight - padding * 2) / maxVal);
    return `${x},${y}`;
  }).join(' ');

  // 2. Festival Sales Projections Mock Model
  const festivalProjections = [
    { festival: 'Diwali Specials', multiplier: '2.5x', projectedVolume: '₹4,50,000', demandCategory: 'Dry Fruit & Ghee Box' },
    { festival: 'Sankranti Harvest', multiplier: '3.0x', projectedVolume: '₹5,10,000', demandCategory: 'Traditional & Ghee' },
    { festival: 'Wedding Peak Season', multiplier: '2.8x', projectedVolume: '₹6,80,000', demandCategory: 'Luxury Platters & Platings' },
    { festival: 'Corporate Diwali Gifting', multiplier: '2.0x', projectedVolume: '₹3,20,000', demandCategory: 'Anjeer & Kaju Rolls' }
  ];

  // 3. Inventory low stock calculation
  const lowStockThreshold = 10;
  const lowStockCount = sweets.filter(s => s.stock < lowStockThreshold).length;

  const handleRestockClick = (productId) => {
    onUpdateStock(productId, 50);
    setRestockSuccess(productId);
    setTimeout(() => setRestockSuccess(''), 1500);
  };

  return (
    <div className="container" style={{ paddingTop: '3rem', animation: 'fade-in-up 0.5s ease' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2.4rem', color: 'var(--gold-light)', fontFamily: 'var(--font-heading)', marginBottom: '0.8rem' }}>
          Royal Admin Command Dashboard
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Manage sweet kitchen stocks, update live customer delivery timelines, monitor revenue streams, and analyze festive demand projects.
        </p>
        <div className="decorative-divider">
          <svg className="divider-mandala" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0C51.5 15 53 17 65 17C77 17 75 15 75 25C75 35 77 37 89 37C101 37 99 35 91 43C83 51 83 49 89 57C95 65 97 63 85 63C73 63 75 65 75 75C75 85 77 83 65 83C53 83 55 85 47 91C39 97 41 99 37 91C33 83 35 83 25 83C15 83 17 85 17 75C17 65 15 63 5 63C-5 63 -3 65 5 57C13 49 13 51 5 43C-3 35 -5 37 7 37C19 37 17 35 17 25C17 15 15 17 27 17C39 17 37 15 50 0Z" />
          </svg>
        </div>
      </div>

      {/* Sub Navigation controls inside Admin Dashboard */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem', 
          marginBottom: '2.5rem',
          flexWrap: 'wrap'
        }}
      >
        {[
          { id: 'overview', label: 'Financial Overview', icon: BarChart2 },
          { id: 'orders', label: 'Order Status Manager', icon: ShoppingBag },
          { id: 'custom-requests', label: 'Custom Requests', icon: Sparkles },
          { id: 'inventory', label: 'Kitchen Inventory', icon: AlertTriangle },
          { id: 'customers', label: 'Customer Insights', icon: Users }
        ].map((tab) => {
          const SubIcon = tab.icon;
          const isSelected = adminSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminSubTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.4rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: '700',
                fontSize: '0.88rem',
                border: isSelected ? '1px solid var(--gold-accent)' : '1px solid rgba(212,175,55,0.15)',
                backgroundColor: isSelected ? 'var(--maroon-primary)' : 'rgba(33, 1, 5, 0.4)',
                color: isSelected ? 'var(--gold-light)' : 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <SubIcon size={16} />
              {tab.label}
              {tab.id === 'inventory' && lowStockCount > 0 && (
                <span style={{ backgroundColor: 'var(--saffron-primary)', color: 'white', fontSize: '0.65rem', padding: '0.1rem 0.35rem', borderRadius: '50%' }}>{lowStockCount}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Overview Analytics panel */}
      {adminSubTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Analytics Cards Grid */}
          <div className="grid-4">
            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(212, 175, 55, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-accent)' }}>
                <DollarSign size={24} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Royal Revenue</span>
                <h3 style={{ fontSize: '1.6rem', color: 'white', margin: 0 }}>₹{totalRevenue}</h3>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(249, 99, 21, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--saffron-primary)' }}>
                <ShoppingBag size={24} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Orders Placed</span>
                <h3 style={{ fontSize: '1.6rem', color: 'white', margin: 0 }}>{totalSalesCount}</h3>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(74, 117, 89, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#81c784' }}>
                <TrendingUp size={24} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Average Order Bill</span>
                <h3 style={{ fontSize: '1.6rem', color: 'white', margin: 0 }}>₹{averageOrderValue}</h3>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbbbbb' }}>
                <Users size={24} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Unique Patrons</span>
                <h3 style={{ fontSize: '1.6rem', color: 'white', margin: 0 }}>{uniqueCustomers}</h3>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem' }} className="grid-2">
            
            {/* SVG Sales Trend Chart */}
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--gold-light)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
                Weekly Sales Revenue Trend (Jammikunta Store)
              </h3>
              
              <div style={{ width: '100%', overflowX: 'auto' }}>
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', minWidth: '400px', height: 'auto', overflow: 'visible' }}>
                  {/* Grid Lines */}
                  <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
                  <line x1={padding} y1={chartHeight / 2} x2={chartWidth - padding} y2={chartHeight / 2} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
                  <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />

                  {/* Gradient fill area below trend line */}
                  <defs>
                    <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--gold-accent)" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="var(--gold-accent)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Fill Area path */}
                  <path 
                    d={`M ${padding},${chartHeight - padding} L ${pointsString} L ${chartWidth - padding},${chartHeight - padding} Z`} 
                    fill="url(#chart-glow)" 
                  />

                  {/* Trend Line */}
                  <polyline 
                    fill="none" 
                    stroke="var(--gold-accent)" 
                    strokeWidth="3.5" 
                    points={pointsString} 
                    style={{ strokeLinecap: 'round', strokeLinejoin: 'round', filter: 'drop-shadow(0 4px 8px rgba(212,175,55,0.3))' }}
                  />

                  {/* Chart Dots & labels */}
                  {salesHistory.map((d, i) => {
                    const x = padding + (i * (chartWidth - padding * 2) / (salesHistory.length - 1));
                    const y = chartHeight - padding - (d.value * (chartHeight - padding * 2) / maxVal);
                    return (
                      <g key={i}>
                        <circle cx={x} cy={y} r="4.5" fill="var(--gold-light)" stroke="var(--maroon-dark)" strokeWidth="1.5" />
                        <text x={x} y={chartHeight - 3} fill="var(--text-muted)" fontSize="9" textAnchor="middle">{d.day}</text>
                        <text x={x} y={y - 8} fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">₹{d.value / 1000}k</text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Festival sales projections */}
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--gold-light)', marginBottom: '1.2rem', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={18} style={{ color: 'var(--gold-accent)' }} />
                Festive Demand Predictor
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {festivalProjections.map((p, idx) => (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.8rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(33, 1, 5, 0.4)',
                      borderLeft: '3px solid var(--gold-accent)'
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '0.9rem', color: 'white', margin: 0 }}>{p.festival}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Focus: {p.demandCategory}</span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#81c784', display: 'block' }}>{p.multiplier} Volume</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Est. {p.projectedVolume}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Order Status Manager list */}
      {adminSubTab === 'orders' && (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', overflowX: 'auto' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--gold-light)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
            Active Orders Live Status Board
          </h3>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(212,175,55,0.2)', color: 'var(--gold-accent)', fontSize: '0.9rem' }}>
                <th style={{ padding: '1rem 0.5rem' }}>Order ID</th>
                <th style={{ padding: '1rem 0.5rem' }}>Customer</th>
                <th style={{ padding: '1rem 0.5rem' }}>Order Details</th>
                <th style={{ padding: '1rem 0.5rem' }}>Total Bill</th>
                <th style={{ padding: '1rem 0.5rem' }}>Current Timeline Status</th>
                <th style={{ padding: '1rem 0.5rem', textAlign: 'center' }}>Modify Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr 
                  key={order.id} 
                  style={{ 
                    borderBottom: '1px solid rgba(255,255,255,0.05)', 
                    fontSize: '0.88rem',
                    color: 'var(--charcoal)',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <td style={{ padding: '1rem 0.5rem', fontWeight: '700', color: 'white' }}>{order.id}</td>
                  <td style={{ padding: '1rem 0.5rem' }}>
                    <div style={{ fontWeight: '600' }}>{order.customerName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.phone}</div>
                  </td>
                  <td style={{ padding: '1rem 0.5rem' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {order.items.map((item, idx) => (
                        <div key={idx}>{item.qty}x {item.name}</div>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 0.5rem', fontWeight: '700', color: 'var(--gold-light)' }}>₹{order.total}</td>
                  <td style={{ padding: '1rem 0.5rem' }}>
                    <span 
                      className={`badge ${
                        order.status === 'Completed' ? 'badge-green' : 
                        order.status === 'Pending' ? 'badge-gray' : 'badge-gold'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 0.5rem', textAlign: 'center' }}>
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                      style={{
                        padding: '0.3rem 0.6rem',
                        fontSize: '0.8rem',
                        borderRadius: '4px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'rgba(33, 1, 5, 0.8)',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="Pending">Placed (Pending)</option>
                      <option value="Preparing">Kitchen (Preparing)</option>
                      <option value="Packing">Box Packing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Ready for Pickup">Ready for Pickup</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Custom Requests Status manager */}
      {adminSubTab === 'custom-requests' && (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', overflowX: 'auto' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--gold-light)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
            Custom Mithai Request Pipeline
          </h3>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(212,175,55,0.2)', color: 'var(--gold-accent)', fontSize: '0.9rem' }}>
                <th style={{ padding: '1rem 0.5rem' }}>Request ID</th>
                <th style={{ padding: '1rem 0.5rem' }}>Customer</th>
                <th style={{ padding: '1rem 0.5rem' }}>Sweet Details</th>
                <th style={{ padding: '1rem 0.5rem' }}>Required Date & Time</th>
                <th style={{ padding: '1rem 0.5rem' }}>Advance Paid</th>
                <th style={{ padding: '1rem 0.5rem' }}>Confirm Quote (₹)</th>
                <th style={{ padding: '1rem 0.5rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {customRequests.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No custom sweet requests received yet.
                  </td>
                </tr>
              ) : (
                customRequests.map((req) => (
                  <tr 
                    key={req.id} 
                    style={{ 
                      borderBottom: '1px solid rgba(255,255,255,0.05)', 
                      fontSize: '0.88rem',
                      color: 'var(--charcoal)'
                    }}
                  >
                    <td style={{ padding: '1rem 0.5rem', fontWeight: '700', color: 'white' }}>{req.id}</td>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <div style={{ fontWeight: '600' }}>{req.customerName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{req.phone}</div>
                    </td>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <div style={{ fontWeight: '600', color: 'var(--gold-light)' }}>{req.sweetName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty: {req.quantity}</div>
                      {req.instructions && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={req.instructions}>
                          "{req.instructions}"
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <div>{req.requiredDate}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{req.pickupTime}</div>
                    </td>
                    <td style={{ padding: '1rem 0.5rem', fontWeight: '700', color: 'var(--gold-light)' }}>
                      ₹{req.advanceAmount}
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>{req.paymentMethod}</div>
                    </td>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <input 
                        type="number"
                        placeholder="Set total price"
                        value={req.estimatedPrice || ''}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          onConfirmCustomRequestPrice(req.id, val);
                        }}
                        style={{
                          width: '100px',
                          padding: '0.3rem 0.5rem',
                          fontSize: '0.8rem',
                          borderRadius: '4px',
                          backgroundColor: 'rgba(33, 1, 5, 0.6)',
                          border: '1px solid var(--border-color)',
                          color: 'white'
                        }}
                      />
                    </td>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <select
                        value={req.status}
                        onChange={(e) => onUpdateCustomRequestStatus(req.id, e.target.value)}
                        style={{
                          padding: '0.3rem 0.6rem',
                          fontSize: '0.8rem',
                          borderRadius: '4px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'rgba(33, 1, 5, 0.8)',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="Request Received">Request Received</option>
                        <option value="Price Confirmed">Price Confirmed</option>
                        <option value="Advance Paid">Advance Paid</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Ready for Pickup">Ready for Pickup</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Kitchen Inventory tracking */}
      {adminSubTab === 'inventory' && (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--gold-light)', fontFamily: 'var(--font-heading)', margin: 0 }}>
              Mithai Raw Inventory Log
            </h3>
            {lowStockCount > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--saffron-primary)', fontSize: '0.85rem', fontWeight: 'bold' }}>
                <AlertTriangle size={16} />
                <span>{lowStockCount} Sweets need immediate kitchen restocking!</span>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
            {sweets.filter(s => !s.isFestivalSpecial).map((sweet) => {
              const isLow = sweet.stock < lowStockThreshold;
              const isSuccess = restockSuccess === sweet.id;

              return (
                <div 
                  key={sweet.id}
                  style={{
                    backgroundColor: 'rgba(33, 1, 5, 0.4)',
                    border: isLow ? '1.5px solid var(--maroon-light)' : '1px solid rgba(212,175,55,0.15)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: isLow ? '0 0 10px rgba(116, 10, 29, 0.2)' : 'none',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1rem', color: 'white', margin: 0 }}>{sweet.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sweet.category.toUpperCase()} category</span>
                    </div>

                    <span 
                      style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: '800', 
                        color: isLow ? 'var(--saffron-primary)' : '#81c784' 
                      }}
                    >
                      {sweet.stock} <span style={{ fontSize: '0.75rem', fontWeight: '500', color: 'var(--text-muted)' }}>units</span>
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.8rem', borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '0.8rem', marginTop: '0.4rem' }}>
                    <button
                      onClick={() => handleRestockClick(sweet.id)}
                      disabled={isSuccess}
                      className={isSuccess ? "btn-secondary" : "btn-outline"}
                      style={{ 
                        width: '100%', 
                        fontSize: '0.75rem', 
                        padding: '0.4rem 0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        cursor: 'pointer',
                        borderColor: isSuccess ? '#81c784' : 'var(--border-color)',
                        color: isSuccess ? '#81c784' : 'var(--text-muted)'
                      }}
                    >
                      {isSuccess ? (
                        <>
                          <CheckCircle size={12} />
                          Restocked!
                        </>
                      ) : (
                        <>
                          <RefreshCw size={12} />
                          Prepare Desi Ghee Batch (+50)
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Customer Insights dashboard */}
      {adminSubTab === 'customers' && (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--gold-light)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
            Jammikunta Member Profiles & Loyalty Club
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              { name: 'Ravi Kumar', phone: '9848012345', points: 284, tier: 'Silver', orders: 4, location: 'Ramalayam, Jammikunta' },
              { name: 'Sujatha Reddy', phone: '9440598765', points: 598, tier: 'Gold', orders: 8, location: 'Gandhi Nagar, Jammikunta' },
              { name: 'K. Srinivasa Rao', phone: '9866023451', points: 1240, tier: 'Platinum', orders: 15, location: 'Station Road, Jammikunta' },
              { name: 'P. Mahesh', phone: '9908123456', points: 95, tier: 'Bronze', orders: 1, location: 'Main Street, Jammikunta' }
            ].map((cust, idx) => {
              const tierColor = loyaltyTiers.find(t => t.name === cust.tier)?.color || '#fff';
              
              return (
                <div 
                  key={idx} 
                  style={{ 
                    backgroundColor: 'rgba(33, 1, 5, 0.4)', 
                    border: `1.5px solid ${tierColor}44`, 
                    borderRadius: 'var(--radius-sm)', 
                    padding: '1.2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '0.8rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ fontSize: '1.05rem', color: 'white', margin: 0 }}>{cust.name}</h4>
                      <span className="badge" style={{ backgroundColor: `${tierColor}15`, color: tierColor, border: `1px solid ${tierColor}33`, fontSize: '0.65rem' }}>{cust.tier}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Phone: {cust.phone}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Location: {cust.location}</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '0.6rem', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Accumulated Points:</span>
                    <span style={{ color: 'white', fontWeight: '700' }}>{cust.points} pts</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
