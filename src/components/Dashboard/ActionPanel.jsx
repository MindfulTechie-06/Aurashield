import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Megaphone, CheckCircle, Radio, AlertTriangle } from 'lucide-react';

const ActionButton = ({ label, icon: Icon, color, onClick, disabled }) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseStyles = "w-full p-4 rounded-xl flex items-center justify-between border transition-all duration-300 relative overflow-hidden group backdrop-blur-md";
  
  const colorMap = {
    critical: "border-critical/30 hover:border-critical/60 bg-critical/10 text-critical shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]",
    warning: "border-warning/30 hover:border-warning/60 bg-warning/10 text-warning shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)]",
    safe: "border-safe/30 hover:border-safe/60 bg-safe/10 text-safe shadow-[0_0_15px_rgba(34,197,94,0.1)] hover:shadow-[0_0_25px_rgba(34,197,94,0.4)]",
    disabled: "border-white/5 bg-white/5 text-white/30 cursor-not-allowed",
  };

  const activeColor = disabled ? 'disabled' : color;

  const handleClick = (e) => {
    if (disabled) return;
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 300);
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, x: 4 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${colorMap[activeColor]}`}
    >
      {/* Ripple Effect */}
      {isPressed && (
        <span className="absolute inset-0 bg-white/20 animate-[ripple_0.6s_ease-out] rounded-xl pointer-events-none" />
      )}
      
      {/* Neon Glow Edge */}
      {!disabled && (
        <span className="absolute left-0 top-0 bottom-0 w-1 bg-current opacity-50 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_currentColor]" />
      )}
      
      <div className="flex items-center space-x-3 ml-2">
        <Icon className={`w-5 h-5 ${disabled ? 'opacity-50' : ''}`} />
        <span className={`font-bold tracking-wide ${disabled ? 'opacity-50' : ''}`}>{label}</span>
      </div>
      {!disabled && <Radio className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />}
    </motion.button>
  );
};

const ActionPanel = ({ selectedAlert }) => {
  return (
    <div className="flex flex-col h-full glass-panel rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <div className="p-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <h2 className="text-lg font-bold tracking-wide text-white/90">Action Protocol</h2>
      </div>
      
      {/* Dynamic Status Area */}
      <div className="p-6 border-b border-white/5 bg-black/20 min-h-[140px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {selectedAlert ? (
            <motion.div
              key="selected"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2"
            >
              <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Selected Incident</div>
              <div className="font-bold text-lg text-white flex items-center space-x-2">
                <AlertTriangle className={`w-5 h-5 ${selectedAlert.type === 'critical' ? 'text-critical' : 'text-warning'}`} />
                <span>{selectedAlert.category} - {selectedAlert.room}</span>
              </div>
              <p className="text-sm text-white/60 line-clamp-2">{selectedAlert.message}</p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-white/40"
            >
              <Shield className="w-8 h-8 mx-auto mb-2 opacity-20" />
              <p className="text-sm font-medium tracking-wide">No active alert selected</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-start">
        <ActionButton 
          label="Dispatch Team" 
          icon={Shield} 
          color="safe" 
          disabled={!selectedAlert}
        />
        <ActionButton 
          label="Trigger Evacuation" 
          icon={Megaphone} 
          color="critical" 
          disabled={!selectedAlert}
        />
        <ActionButton 
          label="Mark Resolved" 
          icon={CheckCircle} 
          color="warning" 
          disabled={!selectedAlert}
        />
      </div>

      <div className="p-4 bg-black/40 border-t border-white/10 text-[10px] uppercase tracking-widest text-white/30 text-center font-bold">
        Standard Operating Procedures
      </div>
    </div>
  );
};

export default ActionPanel;
