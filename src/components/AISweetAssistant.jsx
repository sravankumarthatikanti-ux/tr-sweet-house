import React, { useState, useRef, useEffect } from 'react';
import { Send, User, MessageSquare, Bot, Sparkles, HelpCircle } from 'lucide-react';

export default function AISweetAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Namaste! Welcome to TR Sweet House virtual advisor. I can guide you to select the perfect handcrafted sweets for weddings, find sugar-free treats like Anjeer Barfi, or discuss shelf-lives and ingredients. What royal mithai cravings can I assist you with today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

  const cannedQuestions = [
    { text: 'Which sweets last the longest?', query: 'shelf life' },
    { text: 'Are there sugar-free options?', query: 'sugar free' },
    { text: 'Recommend sweets for Sankranti!', query: 'sankranti' },
    { text: 'Which are pure ghee preparations?', query: 'ghee sweets' }
  ];

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const processResponse = (userInput) => {
    const input = userInput.toLowerCase();
    let reply = "";

    if (input.includes('shelf') || input.includes('long') || input.includes('last') || input.includes('expire') || input.includes('spoil')) {
      reply = "Our longest-lasting sweets are **Flaky Royal Soan Papdi** (30 days), **Premium Dry Fruit Laddu** (25 days), **Desi Ghee Besan Laddu** (25 days), and **Special Royal Mysore Pak** (20 days) if stored in airtight containers. Milk sweets like **Royal Kesar Rasmalai** or **Kalakand** should be kept refrigerated and eaten within 3-6 days.";
    } else if (input.includes('sugar') || input.includes('diabetic') || input.includes('stevia') || input.includes('free') || input.includes('sugarless') || input.includes('anjeer')) {
      reply = "We offer excellent natural sugar-free options sweetened with rich, premium dates and figs:\n1. **Premium Dry Fruit Laddu** (packed with almonds, cashews, walnuts, and dates)\n2. **Royal Anjeer Barfi** (crafted from Turkish figs and premium nuts, with no added sugar!).";
    } else if (input.includes('sankranti') || input.includes('traditional') || input.includes('festival') || input.includes('diwali') || input.includes('wedding') || input.includes('box')) {
      reply = "For celebrations, we recommend our specialized collections:\n- **Royal Diwali Gift Box** (₹1200): Assortment of Kaju Katli, Kaju Rolls, Dry Fruit and Besan Laddus.\n- **Sankranti Sweet Box** (₹950): Classic Boondi Laddu, Mysore Pak, Peda, and Kalakand.\n- **Royal Wedding Sweet Platter** (₹2500): Luxury platter with Kaju Katli, Kesar Pedas, and Badam Halwa pots.";
    } else if (input.includes('ghee') || input.includes('butter') || input.includes('rich') || input.includes('mysore') || input.includes('laddu')) {
      reply = "We prepared several sweets in 100% pure desi ghee: **Special Royal Mysore Pak**, **Pure Ghee Motichoor Laddu**, **Desi Ghee Boondi Laddu**, **Desi Ghee Besan Laddu**, and **Desi Ghee Badam Halwa**. You will love their rich, mouth-melting texture!";
    } else if (input.includes('allergy') || input.includes('nut') || input.includes('cashew') || input.includes('almond') || input.includes('pista') || input.includes('gluten')) {
      reply = "Allergen Alerts:\n- **Gluten-Free:** Almost all our sweets are gluten-free, except **Saffron Gulab Jamun** and **Soan Papdi** (which contain refined wheat flour).\n- **Contains Nuts:** Kaju Katli, Kaju Pista Roll, Anjeer Barfi, Dry Fruit Laddu, and Badam Halwa contain cashew/almond/pistachios.\n- **Nut-Free Option:** Pure Ghee Motichoor Laddu, Mysore Pak, and Rasgulla contain no direct nuts, but are prepared in a kitchen handling nuts.";
    } else if (input.includes('jammikunta') || input.includes('location') || input.includes('where') || input.includes('address') || input.includes('contact') || input.includes('phone')) {
      reply = "TR Sweet House is located at **TR Sweet House, Main Road, Jammikunta, Telangana - 505122** (Near Google Maps location: 18.2801769, 79.4720791). We offer local home delivery in Jammikunta, as well as online store pickup. Our helpline is +91 99999 99999.";
    } else {
      reply = "I'd love to assist you with our Indian sweets catalog! Try asking about 'shelf life', 'sugar free options', 'pure ghee specials', or 'festival collections'.";
    }

    return reply;
  };

  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      const botReplyText = processResponse(textToSend);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 500);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '800px', animation: 'fade-in-up 0.5s ease' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--gold-light)', fontFamily: 'var(--font-heading)', marginBottom: '0.8rem' }}>
          Virtual Mithai Advisor
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Ask our AI assistant about sweet recipes, allergen alerts, shelf lives, or custom occasion gifting recommendations.
        </p>
      </div>

      {/* Main Chat Container styled in glassmorphism */}
      <div 
        className="glass-panel" 
        style={{ 
          borderRadius: 'var(--radius-md)', 
          overflow: 'hidden', 
          display: 'flex', 
          flexDirection: 'column', 
          height: '520px',
          border: '1.5px solid var(--gold-accent)',
          boxShadow: 'var(--shadow-lg), 0 0 25px rgba(212,175,55,0.1)'
        }}
      >
        
        {/* Chat Header */}
        <div style={{ backgroundColor: 'rgba(33, 1, 5, 0.85)', color: 'white', padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--gold-accent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--gold-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={20} style={{ color: 'var(--maroon-dark)' }} />
              </div>
              <span style={{ position: 'absolute', bottom: '0', right: '0', width: '10px', height: '10px', backgroundColor: '#4caf50', borderRadius: '50%', border: '2px solid var(--maroon-dark)' }} />
            </div>
            <div>
              <h4 style={{ margin: 0, color: 'var(--gold-light)', fontSize: '1rem', fontFamily: 'var(--font-heading)' }}>TR Mithai Advisor</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Online | Sweet Expert</span>
            </div>
          </div>
          <Sparkles size={18} style={{ color: 'var(--gold-accent)' }} />
        </div>

        {/* Message Scrolling Board */}
        <div 
          style={{ 
            flex: 1, 
            padding: '1.5rem', 
            overflowY: 'auto', 
            backgroundColor: 'rgba(22, 1, 4, 0.4)', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.2rem' 
          }}
        >
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';
            return (
              <div 
                key={msg.id}
                style={{ 
                  display: 'flex', 
                  justifyContent: isBot ? 'flex-start' : 'flex-end',
                  alignItems: 'flex-start',
                  gap: '0.8rem' 
                }}
              >
                {isBot && (
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--maroon-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-light)', flexShrink: 0, border: '1px solid var(--gold-accent)' }}>
                    <Bot size={15} />
                  </div>
                )}
                
                <div 
                  style={{ 
                    maxWidth: '75%', 
                    padding: '0.85rem 1.2rem', 
                    borderRadius: isBot ? '0 16px 16px 16px' : '16px 0 16px 16px',
                    backgroundColor: isBot ? 'rgba(33, 1, 5, 0.7)' : 'var(--maroon-primary)',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    border: isBot ? '1px solid rgba(212, 175, 55, 0.2)' : '1px solid rgba(255,255,255,0.1)',
                    whiteSpace: 'pre-line',
                    fontSize: '0.92rem',
                    lineHeight: '1.4'
                  }}
                >
                  {msg.text}
                  <span 
                    style={{ 
                      display: 'block', 
                      fontSize: '0.7rem', 
                      textAlign: 'right', 
                      marginTop: '0.4rem', 
                      opacity: 0.6,
                      color: 'var(--text-muted)'
                    }}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {!isBot && (
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--gold-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--maroon-dark)', flexShrink: 0, fontWeight: 'bold' }}>
                    <User size={15} />
                  </div>
                )}
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        <div style={{ padding: '0.8rem 1.5rem', backgroundColor: 'rgba(22, 1, 4, 0.9)', borderTop: '1px solid rgba(212,175,55,0.15)', display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {cannedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(q.text)}
              style={{
                fontSize: '0.78rem',
                backgroundColor: 'rgba(33, 1, 5, 0.6)',
                color: 'var(--gold-light)',
                border: '1px solid rgba(212,175,55,0.2)',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {q.text}
            </button>
          ))}
        </div>

        {/* Input Textbox form */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputText);
          }}
          style={{ 
            display: 'flex', 
            padding: '1rem 1.5rem', 
            backgroundColor: 'rgba(22, 1, 4, 0.95)', 
            borderTop: '1px solid rgba(212,175,55,0.15)',
            gap: '0.8rem' 
          }}
        >
          <input 
            type="text"
            placeholder="Type your allergy, festival, or recipe questions here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ 
              flex: 1, 
              padding: '0.65rem 1rem', 
              fontSize: '0.9rem',
              backgroundColor: 'rgba(33, 1, 5, 0.4)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: 'var(--radius-sm)',
              color: 'white'
            }}
          />
          
          <button 
            type="submit" 
            className="btn-primary"
            style={{ padding: '0.65rem 1.4rem', cursor: 'pointer' }}
            aria-label="Send"
          >
            <Send size={15} />
          </button>
        </form>

      </div>
    </div>
  );
}
