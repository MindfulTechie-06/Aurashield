import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, LogOut, Navigation, AlertTriangle, CheckCircle2 } from 'lucide-react';

const GuestDashboard = ({ alerts }) => {
  const navigate = useNavigate();

  // Check if there's any active critical or warning alert for the hotel
  const activeCritical = alerts.some(a => a.type === 'critical');
  const activeWarning = alerts.some(a => a.type === 'warning');
  
  let hotelStatus = 'safe';
  let statusText = 'Hotel Status: Normal. Have a pleasant stay.';
  let StatusIcon = CheckCircle2;

  if (activeCritical) {
    hotelStatus = 'critical';
    statusText = 'EMERGENCY PROTOCOL ACTIVE. PLEASE STAND BY FOR INSTRUCTIONS.';
    StatusIcon = ShieldAlert;
  } else if (activeWarning) {
    hotelStatus = 'warning';
    statusText = 'Security incident reported nearby. Remain alert.';
    StatusIcon = AlertTriangle;
  }

  const statusColorMap = {
    safe: 'bg-safe/20 text-safe border-safe/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]',
    warning: 'bg-warning/20 text-warning border-warning/50 shadow-[0_0_20px_rgba(234,179,8,0.3)]',
    critical: 'bg-critical/20 text-critical border-critical/50 shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse',
  };

  return (
    <div className="min-h-screen bg-background text-white p-6 relative overflow-hidden flex flex-col items-center">
      {/* Background ambient glow based on status */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-20 mix-blend-screen
        ${hotelStatus === 'critical' ? 'bg-critical' : (hotelStatus === 'warning' ? 'bg-warning' : 'bg-safe')}`} 
      />

      {/* Header */}
      <header className="w-full max-w-md flex items-center justify-between z-10 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
            AURA<span className="font-light">SHIELD</span>
          </h1>
          <p className="text-xs text-white/50 uppercase tracking-[0.2em]">Room 302</p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10"
        >
          <LogOut className="w-5 h-5 text-white/70" />
        </button>
      </header>

      <div className="w-full max-w-md space-y-6 z-10 flex-1 flex flex-col">
        
        {/* Status Banner */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`p-4 rounded-2xl border backdrop-blur-md flex items-center space-x-4 ${statusColorMap[hotelStatus]}`}
        >
          <div className="p-2 rounded-full bg-white/10">
            <StatusIcon className="w-8 h-8" />
          </div>
          <div>
            <p className="font-bold tracking-wider uppercase text-sm">{hotelStatus === 'safe' ? 'All Clear' : 'Alert'}</p>
            <p className="text-xs font-medium opacity-80">{statusText}</p>
          </div>
        </motion.div>

        {/* Evacuation Map Snippet */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 glass-panel rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute top-4 left-4 flex items-center space-x-2 text-white/50 text-sm font-bold uppercase tracking-widest z-10">
            <Navigation className="w-4 h-4" />
            <span>Evacuation Route</span>
          </div>

          {/* Abstract Map */}
          <div className="relative w-full aspect-square border border-white/10 rounded-2xl bg-black/40 mt-6 shadow-inner overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            {/* Rooms */}
            <div className="absolute top-1/4 left-1/4 w-[20%] h-[20%] border border-white/20 bg-white/10 rounded flex items-center justify-center text-[10px] text-white/50">301</div>
            <div className="absolute top-1/4 right-1/4 w-[20%] h-[20%] border border-safe/50 bg-safe/20 rounded flex items-center justify-center text-[10px] text-white font-bold shadow-[0_0_15px_rgba(34,197,94,0.3)]">302</div>
            <div className="absolute bottom-1/4 left-1/4 w-[20%] h-[20%] border border-white/20 bg-white/10 rounded flex items-center justify-center text-[10px] text-white/50">303</div>
            
            {/* Exit Route */}
            <div className="absolute top-[35%] right-[10%] w-[15%] h-[40%] border-r-2 border-dashed border-safe opacity-50" />
            <div className="absolute bottom-[25%] right-[10%] w-[40%] h-[2px] border-b-2 border-dashed border-safe opacity-50" />
            
            {/* Exit marker */}
            <div className="absolute bottom-[20%] left-[45%] w-8 h-8 bg-safe/20 border border-safe text-safe rounded flex items-center justify-center text-[8px] font-bold shadow-[0_0_10px_rgba(34,197,94,0.5)]">EXIT</div>
          </div>
        </motion.div>

        {/* Emergency SOS Shortcut */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/guest/sos')}
          className="w-full p-6 glass-panel rounded-2xl flex items-center justify-between group hover:border-critical/50 hover:bg-critical/10 transition-colors"
        >
          <div>
            <h2 className="text-xl font-bold text-white group-hover:text-critical transition-colors tracking-wide">Emergency SOS</h2>
            <p className="text-white/50 text-sm">Report a fire, medical, or security incident.</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-critical/20 flex items-center justify-center group-hover:bg-critical/30 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all">
            <ShieldAlert className="w-6 h-6 text-critical" />
          </div>
        </motion.button>
        
      </div>
    </div>
  );
};

export default GuestDashboard;
