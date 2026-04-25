import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

// Helper to format dynamic time ago
const formatTimeAgo = (timestamp) => {
  if (!timestamp) return 'Just now';
  const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
  if (seconds < 60) return `${seconds} sec ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  return `${Math.floor(minutes / 60)} hr ago`;
};

const AlertCard = ({ alert, isSelected, onClick }) => {
  const getSeverityStyle = (type, selected) => {
    switch(type) {
      case 'critical': 
        return selected 
          ? 'bg-critical/30 border-critical shadow-[0_0_20px_rgba(239,68,68,0.4)] ring-1 ring-critical/50' 
          : 'bg-critical/10 border-critical/30 hover:border-critical/60';
      case 'warning': 
        return selected 
          ? 'bg-warning/30 border-warning shadow-[0_0_20px_rgba(234,179,8,0.4)] ring-1 ring-warning/50' 
          : 'bg-warning/10 border-warning/30 hover:border-warning/60';
      case 'safe': 
        return selected 
          ? 'bg-safe/30 border-safe shadow-[0_0_20px_rgba(34,197,94,0.4)] ring-1 ring-safe/50' 
          : 'bg-safe/10 border-safe/30 hover:border-safe/60';
      default: 
        return 'bg-white/5 border-white/20';
    }
  };

  const getBadgeStyle = (type) => {
    switch(type) {
      case 'critical': return 'bg-critical text-white shadow-[0_0_10px_rgba(239,68,68,0.8)]';
      case 'warning': return 'bg-warning text-black shadow-[0_0_10px_rgba(234,179,8,0.8)]';
      case 'safe': return 'bg-safe text-white shadow-[0_0_10px_rgba(34,197,94,0.8)]';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'critical': return <AlertTriangle className="w-3.5 h-3.5" />;
      case 'warning': return <Info className="w-3.5 h-3.5" />;
      case 'safe': return <CheckCircle2 className="w-3.5 h-3.5" />;
      default: return <Info className="w-3.5 h-3.5" />;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-4 rounded-xl border backdrop-blur-md cursor-pointer transition-all duration-300 relative overflow-hidden group
        ${getSeverityStyle(alert.type, isSelected)}
      `}
    >
      {/* Selection Glow */}
      {isSelected && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
      )}

      <div className="flex justify-between items-start mb-3">
        <div className={`flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${getBadgeStyle(alert.type)}`}>
          {getIcon(alert.type)}
          <span>{alert.type}</span>
        </div>
        <div className="flex items-center space-x-1 text-white/50 text-xs font-medium bg-black/20 px-2 py-1 rounded-md">
          <Clock className="w-3 h-3" />
          <span>{formatTimeAgo(alert.timestamp)}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 mb-2">
        <MapPin className="w-4 h-4 text-white/70" />
        <span className="font-bold text-sm text-white tracking-wide">{alert.room}</span>
        <span className="text-white/40 text-xs px-1">|</span>
        <span className="text-white/80 text-sm">{alert.category}</span>
      </div>
      
      <p className="text-white/60 text-xs leading-relaxed mt-2 group-hover:text-white/80 transition-colors">
        {alert.message}
      </p>
    </motion.div>
  );
};

export default AlertCard;
