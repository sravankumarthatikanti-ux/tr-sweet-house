import React from 'react';

export default function SweetVisual({ id, size = 'medium' }) {
  // Dimensions based on size prop
  const getDimensions = () => {
    switch (size) {
      case 'small':
        return { width: '40px', height: '40px', fontSize: '0.8rem' };
      case 'large':
        return { width: '150px', height: '150px', fontSize: '2.5rem' };
      case 'medium':
      default:
        return { width: '80px', height: '80px', fontSize: '1.5rem' };
    }
  };

  const dims = getDimensions();

  // Container styling for 3D spotlight/plate effect
  const containerStyle = {
    width: dims.width,
    height: dims.height,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.45))',
    userSelect: 'none'
  };

  const renderSweet = () => {
    switch (id) {
      case 'kaju-katli':
        return (
          <div 
            style={{
              width: '80%',
              height: '80%',
              background: 'linear-gradient(135deg, #e0e0e0 0%, #ffffff 40%, #b3b3b3 70%, #dcdcdc 100%)',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              border: '1px solid rgba(255,255,255,0.6)',
              position: 'relative',
              boxShadow: 'inset -2px -2px 5px rgba(0,0,0,0.15), inset 2px 2px 5px rgba(255,255,255,0.8)'
            }}
          >
            {/* Edible silver foil texture overlay */}
            <div style={{
              position: 'absolute',
              top: '20%', left: '20%', right: '20%', bottom: '20%',
              border: '1px dashed rgba(255,255,255,0.5)',
              transform: 'rotate(15deg)',
              opacity: 0.7
            }} />
            {/* Small saffron strand */}
            <div style={{
              position: 'absolute',
              top: '45%', left: '48%',
              width: '15%', height: '2px',
              backgroundColor: '#e65c00',
              transform: 'rotate(-30deg) skewX(20deg)',
              borderRadius: '2px'
            }} />
          </div>
        );

      case 'motichoor-laddu':
        return (
          <div 
            style={{
              width: '75%',
              height: '75%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #ffb834 0%, #ff8c00 45%, #d35400 75%, #800000 100%)',
              position: 'relative',
              border: '1px solid rgba(255, 140, 0, 0.3)',
              overflow: 'hidden'
            }}
          >
            {/* Dotted texture simulating tiny bundi granules */}
            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.6 }}>
              <defs>
                <pattern id="motichoor-dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.2" fill="#ffd700" />
                  <circle cx="6" cy="4" r="1.5" fill="#ff4500" />
                  <circle cx="3" cy="6" r="0.8" fill="#ffffff" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#motichoor-dots)" />
            </svg>
            {/* Melon seeds */}
            <div style={{
              position: 'absolute', top: '30%', left: '30%',
              width: '20%', height: '10%',
              backgroundColor: '#fffbe6', borderRadius: '50%',
              transform: 'rotate(25deg)'
            }} />
            <div style={{
              position: 'absolute', top: '55%', left: '50%',
              width: '18%', height: '9%',
              backgroundColor: '#fffbe6', borderRadius: '50%',
              transform: 'rotate(-40deg)'
            }} />
            {/* Glaze Highlight */}
            <div style={{
              position: 'absolute', top: '10%', left: '20%', width: '40%', height: '20%',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, transparent 100%)',
              borderRadius: '50% 50% 0 0', transform: 'rotate(-15deg)'
            }} />
          </div>
        );

      case 'boondi-laddu':
        return (
          <div 
            style={{
              width: '76%',
              height: '76%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #ffe680 0%, #ffbf00 50%, #b38600 85%, #660000 100%)',
              position: 'relative',
              border: '1px solid rgba(255, 191, 0, 0.4)',
              overflow: 'hidden'
            }}
          >
            {/* Larger Boondi pearls */}
            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.75 }}>
              <defs>
                <pattern id="boondi-dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="3" cy="3" r="2.2" fill="#ffe066" />
                  <circle cx="8" cy="7" r="2.5" fill="#cc9900" />
                  <circle cx="4" cy="9" r="1.5" fill="#ff9900" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#boondi-dots)" />
            </svg>
            {/* Cashew piece */}
            <div style={{
              position: 'absolute', top: '25%', left: '40%',
              width: '25%', height: '15%',
              backgroundColor: '#fffbe6', borderRadius: '4px 8px 8px 4px',
              border: '1px solid #d4af37', transform: 'rotate(15deg)'
            }} />
            {/* Raisin */}
            <div style={{
              position: 'absolute', top: '60%', left: '30%',
              width: '18%', height: '14%',
              backgroundColor: '#4a2c00', borderRadius: '45%',
              transform: 'rotate(-30deg)'
            }} />
          </div>
        );

      case 'gulab-jamun':
        return (
          <div 
            style={{
              width: '74%',
              height: '74%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #a04030 0%, #5c1808 45%, #2a0400 80%, #100000 100%)',
              position: 'relative',
              border: '1px solid rgba(160, 64, 48, 0.3)',
              boxShadow: 'inset 2px 2px 5px rgba(255,255,255,0.2), 0 0 10px rgba(224, 90, 71, 0.15)'
            }}
          >
            {/* Sticky Syrup Sheen Overlay */}
            <div style={{
              position: 'absolute',
              top: '8%', left: '18%',
              width: '35%', height: '22%',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.05) 80%, transparent 100%)',
              borderRadius: '50% 50% 40% 40%',
              transform: 'rotate(-20deg)'
            }} />
            {/* Saffron threads on top */}
            <div style={{
              position: 'absolute', top: '40%', left: '42%',
              width: '20%', height: '1.5px',
              backgroundColor: '#ff3300', transform: 'rotate(45deg)'
            }} />
            {/* Pistachio dust particle */}
            <div style={{
              position: 'absolute', top: '32%', left: '55%',
              width: '6px', height: '4px',
              backgroundColor: '#7cfc00', borderRadius: '50%', transform: 'rotate(15deg)'
            }} />
          </div>
        );

      case 'rasgulla':
        return (
          <div 
            style={{
              width: '74%',
              height: '74%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #f7f7f7 50%, #e0e0e0 75%, #b5b5b5 100%)',
              position: 'relative',
              border: '1px solid rgba(220, 220, 220, 0.5)',
              boxShadow: 'inset -2px -2px 5px rgba(0,0,0,0.1), inset 3px 3px 6px rgba(255,255,255,0.9)'
            }}
          >
            {/* Spongy texture pattern */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              borderRadius: '50%',
              opacity: 0.15,
              backgroundImage: 'radial-gradient(#999 15%, transparent 20%)',
              backgroundSize: '6px 6px'
            }} />
            {/* Wet glaze shine */}
            <div style={{
              position: 'absolute',
              top: '8%', left: '18%',
              width: '35%', height: '22%',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, transparent 100%)',
              borderRadius: '50%',
              transform: 'rotate(-20deg)'
            }} />
          </div>
        );

      case 'rasmalai':
        return (
          <div 
            style={{
              width: '82%',
              height: '65%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 30%, #fffde6 0%, #fff9b3 40%, #f2d052 80%, #c99318 100%)',
              position: 'relative',
              border: '1.5px solid rgba(242, 208, 82, 0.5)',
              transform: 'rotate(-5deg)',
              boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.8), 0 4px 8px rgba(0,0,0,0.2)'
            }}
          >
            {/* Saffron milk cream coating */}
            <div style={{
              position: 'absolute', top: '10%', left: '15%',
              width: '70%', height: '80%',
              borderRadius: '50%',
              border: '1px dashed rgba(255, 255, 255, 0.4)',
              opacity: 0.5
            }} />
            {/* Pistachio flakes */}
            <div style={{ position: 'absolute', top: '25%', left: '35%', width: '10px', height: '6px', backgroundColor: '#4a7c1b', borderRadius: '50%', transform: 'rotate(25deg)' }} />
            <div style={{ position: 'absolute', top: '45%', left: '55%', width: '8px', height: '5px', backgroundColor: '#589025', borderRadius: '50%', transform: 'rotate(-35deg)' }} />
            <div style={{ position: 'absolute', top: '35%', left: '25%', width: '6px', height: '4px', backgroundColor: '#4a7c1b', borderRadius: '50%', transform: 'rotate(10deg)' }} />
            {/* Almond shreds */}
            <div style={{ position: 'absolute', top: '30%', left: '50%', width: '12px', height: '4px', backgroundColor: '#fffdf0', borderRadius: '2px', transform: 'rotate(60deg)' }} />
            {/* Saffron threads */}
            <div style={{ position: 'absolute', top: '22%', left: '42%', width: '12px', height: '1.5px', backgroundColor: '#e63900', transform: 'rotate(-10deg)' }} />
            <div style={{ position: 'absolute', top: '50%', left: '40%', width: '10px', height: '1.2px', backgroundColor: '#ff5500', transform: 'rotate(40deg)' }} />
          </div>
        );

      case 'peda':
        return (
          <div 
            style={{
              width: '75%',
              height: '75%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 40%, #ffebd2 0%, #edd1aa 45%, #cfa46e 80%, #8b6235 100%)',
              position: 'relative',
              border: '1px solid rgba(207, 164, 110, 0.4)',
              boxShadow: 'inset -2px -2px 5px rgba(0,0,0,0.12), inset 2px 2px 4px rgba(255,255,255,0.7)'
            }}
          >
            {/* Central thumb press indentation */}
            <div 
              style={{
                position: 'absolute',
                top: '25%', left: '25%', width: '50%', height: '50%',
                borderRadius: '50%',
                background: 'radial-gradient(circle at center, #cfa46e 0%, #b58d55 50%, #edd1aa 100%)',
                boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.25), 1px 1px 2px rgba(255,255,255,0.6)'
              }}
            >
              {/* Pistachio/Nut sitting in the center */}
              <div 
                style={{
                  position: 'absolute',
                  top: '30%', left: '30%', width: '40%', height: '40%',
                  borderRadius: '35% 55% 45% 45%',
                  background: 'radial-gradient(circle at center, #8cb339 0%, #4e7c0f 80%)',
                  transform: 'rotate(15deg)',
                  border: '0.5px solid #d4af37'
                }}
              />
            </div>
            {/* Saffron dot */}
            <div style={{ position: 'absolute', top: '22%', left: '30%', width: '4px', height: '4px', backgroundColor: '#ff3300', borderRadius: '50%' }} />
          </div>
        );

      case 'mysore-pak':
        return (
          <div 
            style={{
              width: '80%',
              height: '65%',
              background: 'linear-gradient(135deg, #ffd966 0%, #f1c232 45%, #bf9000 80%, #7f6000 100%)',
              border: '1px solid #bf9000',
              borderRadius: '6px',
              position: 'relative',
              transform: 'skewX(-6deg) rotate(5deg)',
              boxShadow: 'inset 1px 1px 3px rgba(255,255,255,0.7), 2px 5px 10px rgba(0,0,0,0.3)',
              overflow: 'hidden'
            }}
          >
            {/* Darker Ghee caramelized center patch */}
            <div 
              style={{
                position: 'absolute',
                top: '25%', left: '15%', right: '15%', bottom: '25%',
                background: 'linear-gradient(to right, #a67c00 0%, #735300 50%, #a67c00 100%)',
                opacity: 0.65,
                borderRadius: '4px',
                filter: 'blur(1px)'
              }}
            />
            {/* Porous honeycomb tiny holes texture */}
            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.35 }}>
              <defs>
                <pattern id="mysore-pores" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="3" r="0.8" fill="#594300" />
                  <circle cx="6" cy="2" r="1.1" fill="#403000" />
                  <circle cx="8" cy="7" r="0.7" fill="#ffe28a" />
                  <circle cx="3" cy="8" r="1.0" fill="#594300" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mysore-pores)" />
            </svg>
          </div>
        );

      case 'badam-halwa':
        return (
          <div 
            style={{
              width: '80%',
              height: '80%',
              position: 'relative'
            }}
          >
            {/* Gold leaf decorative bowl */}
            <div 
              style={{
                position: 'absolute', bottom: '5%', left: '5%', width: '90%', height: '45%',
                borderRadius: '0 0 50% 50%',
                background: 'linear-gradient(135deg, #ffd700 0%, #b8860b 60%, #ffd700 100%)',
                border: '1px solid #ffd700',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
              }}
            />
            {/* Mound of saffron halwa inside the bowl */}
            <div 
              style={{
                position: 'absolute', top: '15%', left: '12%', width: '76%', height: '50%',
                borderRadius: '50% 50% 10% 10%',
                background: 'radial-gradient(circle at 50% 20%, #ffbb33 0%, #ff8800 60%, #cc5200 90%)',
                boxShadow: 'inset 1px 1px 3px rgba(255,255,255,0.4)',
                borderBottom: '2px solid #993d00'
              }}
            >
              {/* Silver foil bits */}
              <div style={{ position: 'absolute', top: '25%', left: '30%', width: '8px', height: '6px', backgroundColor: '#e0e0e0', transform: 'rotate(15deg) skewX(10deg)' }} />
              <div style={{ position: 'absolute', top: '40%', left: '55%', width: '6px', height: '4px', backgroundColor: '#ffffff', transform: 'rotate(-25deg)' }} />
              {/* Almond shreds on halwa */}
              <div style={{ position: 'absolute', top: '20%', left: '45%', width: '12px', height: '4px', backgroundColor: '#fffae6', borderRadius: '45%', transform: 'rotate(45deg)' }} />
              <div style={{ position: 'absolute', top: '35%', left: '20%', width: '10px', height: '3.5px', backgroundColor: '#fffae6', borderRadius: '45%', transform: 'rotate(-15deg)' }} />
            </div>
          </div>
        );

      case 'soan-papdi':
        return (
          <div 
            style={{
              width: '75%',
              height: '70%',
              background: 'linear-gradient(135deg, #fffdf2 0%, #fdf5d1 50%, #edd8a3 85%, #bfa978 100%)',
              border: '1px solid #dcd1a9',
              borderRadius: '4px',
              position: 'relative',
              boxShadow: '0 4px 8px rgba(0,0,0,0.25)',
              transform: 'rotate(-3deg)'
            }}
          >
            {/* Fine thread fiber lines */}
            <div 
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                opacity: 0.25,
                background: 'repeating-linear-gradient(90deg, #bfa978, #bfa978 1px, transparent 1px, transparent 3px)'
              }}
            />
            <div 
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                opacity: 0.2,
                background: 'repeating-linear-gradient(0deg, #bfa978, #bfa978 1px, transparent 1px, transparent 4px)'
              }}
            />
            {/* Almond sliver on top */}
            <div style={{
              position: 'absolute', top: '25%', left: '30%',
              width: '35%', height: '12%',
              backgroundColor: '#fffbeb', borderRadius: '45%',
              transform: 'rotate(20deg)', border: '0.5px solid #dcd1a9'
            }} />
            {/* Pistachio fragment */}
            <div style={{
              position: 'absolute', top: '48%', left: '50%',
              width: '18%', height: '10%',
              backgroundColor: '#7a9f35', borderRadius: '40%',
              transform: 'rotate(-40deg)'
            }} />
          </div>
        );

      case 'kalakand':
        return (
          <div 
            style={{
              width: '74%',
              height: '74%',
              background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 45%, #ebebeb 80%, #d4d4d4 100%)',
              border: '1px solid #d4d4d4',
              borderRadius: '4px',
              position: 'relative',
              boxShadow: 'inset 1px 1px 3px rgba(255,255,255,0.8), 0 4px 8px rgba(0,0,0,0.2)',
              transform: 'rotate(2deg)'
            }}
          >
            {/* Grainy texture */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              opacity: 0.2,
              backgroundImage: 'radial-gradient(#888 15%, transparent 20%)',
              backgroundSize: '5px 5px'
            }} />
            {/* Pistachio powder sprinkles */}
            <div style={{ position: 'absolute', top: '20%', left: '40%', width: '4px', height: '4px', backgroundColor: '#5c8f1a', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', top: '35%', left: '25%', width: '3px', height: '3px', backgroundColor: '#4b7515', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', top: '40%', left: '55%', width: '5px', height: '3.5px', backgroundColor: '#5c8f1a', borderRadius: '50%', transform: 'rotate(15deg)' }} />
          </div>
        );

      case 'dry-fruit-laddu':
        return (
          <div 
            style={{
              width: '75%',
              height: '75%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #5a3a22 0%, #3e2513 50%, #291508 85%, #100501 100%)',
              position: 'relative',
              border: '1px solid #3e2513',
              overflow: 'hidden',
              boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.1), 0 4px 8px rgba(0,0,0,0.3)'
            }}
          >
            {/* Embedded nut chunks (Almonds, Cashews, Pistas) */}
            {/* Cashew chunk (cream) */}
            <div style={{ position: 'absolute', top: '20%', left: '30%', width: '18%', height: '14%', backgroundColor: '#fcfcf0', borderRadius: '40% 60% 30% 70%', transform: 'rotate(25deg)' }} />
            <div style={{ position: 'absolute', top: '55%', left: '22%', width: '14%', height: '12%', backgroundColor: '#fcfcf0', borderRadius: '50%', transform: 'rotate(-15deg)' }} />
            {/* Almond chunk (light tan) */}
            <div style={{ position: 'absolute', top: '38%', left: '55%', width: '22%', height: '12%', backgroundColor: '#edd5be', borderRadius: '45%', transform: 'rotate(60deg)' }} />
            {/* Pistachio chunk (green) */}
            <div style={{ position: 'absolute', top: '62%', left: '48%', width: '16%', height: '10%', backgroundColor: '#759e35', borderRadius: '35%', transform: 'rotate(-45deg)' }} />
            {/* Walnut chunk (darker brown) */}
            <div style={{ position: 'absolute', top: '28%', left: '50%', width: '12%', height: '12%', backgroundColor: '#8a5a36', borderRadius: '50%', transform: 'rotate(10deg)' }} />
          </div>
        );

      case 'kaju-roll':
        return (
          <div 
            style={{
              width: '80%',
              height: '50%',
              position: 'relative',
              transform: 'rotate(-25deg)',
              filter: 'drop-shadow(2px 5px 6px rgba(0,0,0,0.35))'
            }}
          >
            {/* Inner cylinder roll with diagonal cut look */}
            <div 
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '8px',
                background: 'linear-gradient(to bottom, #ffffff 0%, #e8e8e8 45%, #c8c8c8 75%, #a8a8a8 100%)',
                border: '1px solid #d4d4d4',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Green pistachio filling showing at the ends */}
              <div 
                style={{
                  position: 'absolute', top: 0, left: 0, width: '25%', height: '100%',
                  background: 'linear-gradient(to bottom, #98fb98 0%, #3cb371 60%, #1e824c 100%)',
                  borderRadius: '8px 0 0 8px'
                }}
              />
              {/* Silver leaf foil wrap */}
              <div 
                style={{
                  position: 'absolute', top: 0, left: '40%', width: '35%', height: '100%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(220,220,220,0.3) 100%)',
                  transform: 'skewX(-15deg)',
                  borderLeft: '1px solid rgba(255,255,255,0.8)',
                  borderRight: '1px solid rgba(255,255,255,0.8)'
                }}
              />
            </div>
          </div>
        );

      case 'anjeer-barfi':
        return (
          <div 
            style={{
              width: '74%',
              height: '74%',
              background: 'linear-gradient(135deg, #704214 0%, #522f0c 45%, #301700 80%, #150a00 100%)',
              border: '1px solid #522f0c',
              borderRadius: '5px',
              position: 'relative',
              boxShadow: 'inset 1px 1px 3px rgba(255,255,255,0.15), 0 4px 8px rgba(0,0,0,0.3)',
              transform: 'rotate(-5deg)',
              overflow: 'hidden'
            }}
          >
            {/* Tiny crunchy fig seeds texture */}
            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.45 }}>
              <defs>
                <pattern id="fig-seeds" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="0.7" fill="#ffd700" />
                  <circle cx="4.5" cy="3.5" r="0.9" fill="#e27a3f" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#fig-seeds)" />
            </svg>
            {/* Cashew chunks pressed in */}
            <div style={{ position: 'absolute', top: '15%', left: '20%', width: '22%', height: '14%', backgroundColor: '#fffbe6', borderRadius: '35%', transform: 'rotate(35deg)' }} />
            <div style={{ position: 'absolute', top: '55%', left: '50%', width: '18%', height: '12%', backgroundColor: '#fffbe6', borderRadius: '40%', transform: 'rotate(-15deg)' }} />
            <div style={{ position: 'absolute', top: '45%', left: '15%', width: '15%', height: '10%', backgroundColor: '#fffbe6', borderRadius: '50%', transform: 'rotate(80deg)' }} />
            {/* Almond sliver */}
            <div style={{ position: 'absolute', top: '25%', left: '55%', width: '25%', height: '9%', backgroundColor: '#f5edd2', borderRadius: '50%', transform: 'rotate(-45deg)' }} />
          </div>
        );

      case 'milk-cake':
        return (
          <div 
            style={{
              width: '80%',
              height: '65%',
              background: 'linear-gradient(to right, #ecc590 0%, #ecd1aa 25%, #ecc590 35%, #ecc590 65%, #ecd1aa 75%, #ecc590 100%)',
              border: '1.5px solid #cfa46e',
              borderRadius: '4px',
              position: 'relative',
              boxShadow: '0 4px 8px rgba(0,0,0,0.25)',
              transform: 'skewX(-4deg) rotate(3deg)',
              overflow: 'hidden'
            }}
          >
            {/* Dark Caramel core stripe */}
            <div 
              style={{
                position: 'absolute', top: 0, bottom: 0, left: '35%', right: '35%',
                background: 'linear-gradient(to right, #8a4819 0%, #612f0c 50%, #8a4819 100%)',
                boxShadow: '0 0 5px rgba(0,0,0,0.3)'
              }}
            />
            {/* Grainy crumbly texture overlay */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              opacity: 0.15,
              backgroundImage: 'radial-gradient(#555 10%, transparent 15%)',
              backgroundSize: '4px 4px'
            }} />
          </div>
        );

      case 'besan-laddu':
        return (
          <div 
            style={{
              width: '74%',
              height: '74%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #ffe680 0%, #ffd034 50%, #cca010 85%, #6e5000 100%)',
              position: 'relative',
              border: '1px solid rgba(204, 160, 16, 0.4)',
              boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.7), 0 4px 8px rgba(0,0,0,0.25)'
            }}
          >
            {/* Semi-smooth fine texture */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              borderRadius: '50%',
              opacity: 0.08,
              backgroundImage: 'radial-gradient(#222 15%, transparent 20%)',
              backgroundSize: '5px 5px'
            }} />
            {/* Almond sliver lying on top */}
            <div style={{
              position: 'absolute', top: '20%', left: '35%',
              width: '32%', height: '14%',
              backgroundColor: '#fffaeb', borderRadius: '50% 50% 40% 40%',
              transform: 'rotate(-30deg)',
              border: '0.5px solid #cca010'
            }} />
            {/* Pistachio fragment */}
            <div style={{
              position: 'absolute', top: '40%', left: '50%',
              width: '12%', height: '10%',
              backgroundColor: '#6b8e23', borderRadius: '45%',
              transform: 'rotate(45deg)'
            }} />
          </div>
        );

      // Festival specials default visualizer
      case 'diwali-gift-box':
      case 'sankranti-sweet-box':
      case 'wedding-sweet-collection':
      case 'corporate-gift-collection':
        const getBoxColors = () => {
          if (id === 'diwali-gift-box') return { bg: '#800000', border: '#ffd700', box: '#ff8c00' };
          if (id === 'sankranti-sweet-box') return { bg: '#d35400', border: '#f1c232', box: '#ff4500' };
          if (id === 'wedding-sweet-collection') return { bg: '#a62c2b', border: '#ffd700', box: '#d4af37' };
          return { bg: '#102a43', border: '#bcccdc', box: '#486581' }; // Corporate
        };
        const boxColors = getBoxColors();
        return (
          <div 
            style={{
              width: '85%',
              height: '85%',
              backgroundColor: boxColors.bg,
              border: `3px solid ${boxColors.border}`,
              borderRadius: '12px',
              position: 'relative',
              boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            {/* Royal Gold Ribbon */}
            <div style={{
              position: 'absolute', top: 0, bottom: 0, left: '42%', right: '42%',
              background: 'linear-gradient(to right, #ffd700 0%, #b8860b 50%, #ffd700 100%)',
              boxShadow: '0 0 8px rgba(0,0,0,0.3)'
            }} />
            <div style={{
              position: 'absolute', left: 0, right: 0, top: '42%', bottom: '42%',
              background: 'linear-gradient(to bottom, #ffd700 0%, #b8860b 50%, #ffd700 100%)',
              boxShadow: '0 0 8px rgba(0,0,0,0.3)'
            }} />
            {/* Center Royal Seal Gold Mandala */}
            <div style={{
              width: '32px', height: '32px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #ffd700 0%, #cc9900 80%)',
              border: '2px double #800000',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
            }}>
              <span style={{ fontSize: '0.65rem', color: '#800000', fontWeight: '900' }}>TR</span>
            </div>
            {/* Ribbon Bow ties */}
            <div style={{
              position: 'absolute', top: '28%', left: '32%', width: '18px', height: '12px',
              borderRadius: '50% 50% 0 50%', backgroundColor: '#d4af37',
              transform: 'rotate(-40deg)', zIndex: 1
            }} />
            <div style={{
              position: 'absolute', top: '28%', right: '32%', width: '18px', height: '12px',
              borderRadius: '50% 50% 50% 0', backgroundColor: '#d4af37',
              transform: 'rotate(40deg)', zIndex: 1
            }} />
          </div>
        );

      default:
        // Fallback plate containing a generic sweet
        return (
          <div 
            style={{
              width: '70%',
              height: '70%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #ffcc00 0%, #ff9900 70%, #993300 100%)',
              border: '1px solid #ff9900',
              boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.5), 0 4px 8px rgba(0,0,0,0.2)'
            }}
          />
        );
    }
  };

  return (
    <div className="sweet-visual-container" style={containerStyle}>
      {/* Glossy Plate Background behind the sweet */}
      <div 
        style={{
          position: 'absolute',
          width: '94%',
          height: '94%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 60%, rgba(227, 176, 75, 0.1) 90%, rgba(227, 176, 75, 0.25) 100%)',
          border: '1px solid rgba(227, 176, 75, 0.3)',
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)',
          zIndex: 0
        }}
      />
      
      {/* Floating Sparkle glow behind sweet */}
      <div 
        style={{
          position: 'absolute',
          width: '70%',
          height: '70%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(227, 176, 75, 0.15) 0%, transparent 70%)',
          zIndex: 0,
          filter: 'blur(4px)'
        }}
      />

      {/* Render the Sweet itself */}
      <div 
        style={{ 
          zIndex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          width: '100%', 
          height: '100%',
          animation: 'sweet-float 5s ease-in-out infinite'
        }}
      >
        {renderSweet()}
      </div>
    </div>
  );
}
