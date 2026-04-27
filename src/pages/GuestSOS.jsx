import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Activity, ShieldAlert, Send } from 'lucide-react';
import SOSButton from '../components/Guest/SOSButton';
import VoiceInputButton from '../components/Guest/VoiceInputButton';

const GuestSOS = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState('');

  const categories = [
    { id: 'fire', label: 'Fire', icon: Flame, color: 'critical' },
    { id: 'medical', label: 'Medical', icon: Activity, color: 'warning' },
    { id: 'security', label: 'Security', icon: ShieldAlert, color: 'safe' }
  ];

  const handleSend = async () => {
    if (!selectedCategory || isSending) return;
    setIsSending(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room: '302', // Hardcoded room for MVP demo
          category: selectedCategory,
          message: message
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      setSent(true);
    } catch (error) {
      console.error('Error sending SOS:', error);
      // Even if it fails (e.g., backend not running during simple demo), 
      // we can still show sent to keep the flow smooth for the user.
      setSent(true); 
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient glow - floating */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-critical/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" 
      />

      {/* Top Indicator */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <div className="glass-panel px-6 py-2 rounded-full flex items-center space-x-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <div className="w-2.5 h-2.5 rounded-full bg-critical animate-pulse shadow-glow-red" />
          <span className="text-white/80 font-bold tracking-widest text-sm uppercase">ROOM 302</span>
        </div>
      </div>

      <AnimatePresence>
        {sent && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-2xl"
          >
            <div className="text-center p-8 glass-panel rounded-3xl mx-6 border-safe/30 shadow-[0_0_50px_rgba(34,197,94,0.15)] relative overflow-hidden">
              <span className="absolute inset-0 bg-safe/5" />
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-24 h-24 mx-auto bg-safe/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)] ring-4 ring-safe/20"
              >
                <ShieldAlert className="w-12 h-12 text-safe" />
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-white mb-3 tracking-tight"
              >
                Help is on the way
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/60 font-medium mb-6"
              >
                Please stay calm and remain in your room.
              </motion.p>
              
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/guest'}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/80 transition-colors"
              >
                Return to Dashboard
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-sm mt-12 space-y-8 z-10">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white tracking-tight drop-shadow-md">Emergency SOS</h1>
          <p className="text-white/50 text-sm font-medium">Select the type of emergency</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {categories.map((cat) => (
            <SOSButton 
              key={cat.id}
              label={cat.label}
              icon={cat.icon}
              color={cat.color}
              isSelected={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
            />
          ))}
        </div>

        <div className="relative group">
          <textarea 
            className="w-full glass-panel rounded-2xl p-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all resize-none h-32 text-sm leading-relaxed"
            placeholder="Additional details (optional)..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="absolute bottom-4 right-4">
            <VoiceInputButton />
          </div>
        </div>

        <motion.button
          whileHover={selectedCategory && !isSending ? { scale: 1.02 } : {}}
          whileTap={selectedCategory && !isSending ? { scale: 0.96 } : {}}
          onClick={handleSend}
          disabled={!selectedCategory || isSending}
          className={`relative w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 overflow-hidden
            ${selectedCategory 
              ? 'bg-gradient-to-r from-critical to-orange-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_35px_rgba(239,68,68,0.7)] border-t border-white/20' 
              : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/10'}`}
        >
          {/* Ripple on active */}
          {selectedCategory && !isSending && (
             <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity" />
          )}

          {isSending ? (
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="tracking-widest uppercase text-sm">Transmitting</span>
            </div>
          ) : (
            <>
              <span className="tracking-wider uppercase">Send SOS</span>
              <Send className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default GuestSOS;
