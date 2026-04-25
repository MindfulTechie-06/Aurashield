import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Target, ShieldAlert, CheckCircle2 } from 'lucide-react';

const FacilityMap = ({ alerts, selectedAlertId }) => {
  const containerRef = useRef(null);
  
  // Parallax effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [8, -8]);
  const rotateY = useTransform(x, [-300, 300], [-8, 8]);

  const handleMouseMove = (event) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full relative overflow-hidden flex items-center justify-center perspective-[1200px] glass-panel rounded-2xl p-2"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(11,15,25,0.9)_100%)] z-10 pointer-events-none" />
      
      <motion.div 
        style={{ rotateX, rotateY }}
        className="w-full h-full p-8 flex items-center justify-center transform-gpu preserve-3d transition-transform duration-100 ease-out"
      >
        {/* Abstract Floor Plan */}
        <div className="relative w-full max-w-3xl aspect-[4/3] border border-white/10 rounded-2xl bg-[#0a0f18]/80 backdrop-blur-xl flex items-center justify-center shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden">
          
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60" />
          
          {/* Floor Plan Elements */}
          <div className="absolute top-[20%] left-[20%] w-[20%] h-[20%] border border-white/20 bg-white/5 rounded-lg shadow-inner" />
          <div className="absolute top-[20%] right-[20%] w-[30%] h-[25%] border border-white/20 bg-white/5 rounded-lg shadow-inner" />
          <div className="absolute bottom-[20%] left-[30%] w-[40%] h-[20%] border border-white/20 bg-white/5 rounded-lg shadow-inner" />
          <div className="absolute bottom-[40%] right-[30%] w-[15%] h-[35%] border border-white/20 bg-white/5 rounded-lg shadow-inner" />
          
          {/* Map Alerts */}
          {alerts.map(alert => {
            const isSelected = alert.id === selectedAlertId;
            const isCritical = alert.type === 'critical';
            
            // Generate color based on type
            const colorClass = isCritical ? 'text-critical bg-critical' : (alert.type === 'warning' ? 'text-warning bg-warning' : 'text-safe bg-safe');
            const shadowClass = isCritical ? 'shadow-[0_0_30px_rgba(239,68,68,0.8)]' : (alert.type === 'warning' ? 'shadow-[0_0_30px_rgba(234,179,8,0.8)]' : 'shadow-[0_0_30px_rgba(34,197,94,0.8)]');
            
            return (
              <motion.div 
                key={alert.id}
                className={`absolute z-20 ${isSelected ? 'z-30' : ''}`}
                style={alert.coordinates}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: isSelected ? 1.2 : 1, 
                  opacity: isSelected ? 1 : 0.6 
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative flex items-center justify-center">
                  {/* Glow under point */}
                  {isSelected && (
                    <div className={`absolute w-32 h-32 rounded-full blur-[40px] opacity-40 ${colorClass.split(' ')[1]}`} />
                  )}

                  {/* Pulsing rings for critical/selected */}
                  {(isCritical || isSelected) && (
                    <span className={`absolute w-12 h-12 rounded-full opacity-40 animate-ping ${colorClass.split(' ')[1]}`} />
                  )}
                  
                  {/* Core marker */}
                  <div className={`w-4 h-4 rounded-full ${colorClass.split(' ')[1]} ${isSelected ? shadowClass : ''} z-10 border-2 border-white/50`} />
                  
                  {isSelected && (
                    <Target className={`absolute w-16 h-16 ${colorClass.split(' ')[0]} opacity-30 z-0 animate-[spin_10s_linear_infinite]`} />
                  )}
                </div>
                
                {/* Tooltip for selected */}
                {isSelected && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 glass-panel px-3 py-1.5 rounded-lg whitespace-nowrap z-40 border border-white/20"
                  >
                    <div className="text-xs font-bold text-white flex items-center space-x-2">
                      {isCritical ? <ShieldAlert className="w-3 h-3 text-critical" /> : <CheckCircle2 className="w-3 h-3 text-safe" />}
                      <span>{alert.room}</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Floating Particles Overlay (Optional touch) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] mix-blend-screen" />
    </div>
  );
};

export default FacilityMap;
