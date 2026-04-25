import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AlertCard from './AlertCard';

const AlertSkeleton = () => (
  <div className="p-4 rounded-xl border border-white/5 bg-white/5 animate-pulse">
    <div className="flex justify-between items-start mb-3">
      <div className="h-4 w-24 bg-white/10 rounded" />
      <div className="h-3 w-16 bg-white/10 rounded" />
    </div>
    <div className="h-3 w-32 bg-white/10 rounded mb-3" />
    <div className="h-3 w-full bg-white/10 rounded mb-1" />
    <div className="h-3 w-4/5 bg-white/10 rounded" />
  </div>
);

const AlertFeed = ({ alerts, selectedAlertId, onSelectAlert }) => {
  const [loading, setLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-full glass-panel rounded-2xl overflow-hidden border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <div className="p-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <h2 className="text-lg font-bold tracking-wide flex items-center justify-between text-white/90">
          Live Alert Feed
          {!loading && (
            <motion.span 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }}
              className="text-[10px] uppercase bg-critical text-white px-2 py-1 rounded-full font-bold shadow-[0_0_10px_rgba(239,68,68,0.5)]"
            >
              {alerts.length} Active
            </motion.span>
          )}
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 relative">
        {loading ? (
          <>
            <AlertSkeleton />
            <AlertSkeleton />
            <AlertSkeleton />
          </>
        ) : (
          <AnimatePresence>
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
              >
                <AlertCard 
                  alert={alert} 
                  isSelected={selectedAlertId === alert.id}
                  onClick={() => onSelectAlert(alert.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
      
      {/* Scroll Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0B0F19] to-transparent pointer-events-none opacity-80" />
    </div>
  );
};

export default AlertFeed;
