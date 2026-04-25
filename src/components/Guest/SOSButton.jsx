import React from 'react';
import { motion } from 'framer-motion';

const SOSButton = ({ label, icon: Icon, color, isSelected, onClick }) => {
  const colorMap = {
    critical: 'text-critical shadow-glow-red border-critical/80 bg-critical/10 ring-1 ring-critical/50',
    warning: 'text-warning shadow-glow-yellow border-warning/80 bg-warning/10 ring-1 ring-warning/50',
    safe: 'text-safe shadow-glow-green border-safe/80 bg-safe/10 ring-1 ring-safe/50',
  };

  const defaultStyle = 'text-white/60 border-white/10 hover:border-white/30 hover:bg-white/5';
  const selectedStyle = colorMap[color];

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.94, y: 0 }} // bounce effect
      onClick={onClick}
      className={`relative w-full p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 flex items-center space-x-6 overflow-hidden ${isSelected ? selectedStyle : defaultStyle}`}
    >
      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
      
      {/* Active glow ring */}
      {isSelected && (
        <span className="absolute inset-0 rounded-2xl animate-pulse shadow-[inset_0_0_20px_currentColor] opacity-30 pointer-events-none" />
      )}

      <div className={`p-3 rounded-full transition-colors duration-300 ${isSelected ? 'bg-white/10 shadow-[0_0_15px_currentColor]' : 'bg-black/20'}`}>
        <Icon className="w-8 h-8" />
      </div>
      <span className={`text-xl font-bold tracking-wide transition-colors duration-300 ${isSelected ? 'text-white' : ''}`}>
        {label}
      </span>
    </motion.button>
  );
};

export default SOSButton;
