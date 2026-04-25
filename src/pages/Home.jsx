import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck } from 'lucide-react';

const RoleCard = ({ title, description, icon: Icon, onClick, delay }) => (
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="w-full sm:w-80 p-8 glass-panel rounded-3xl flex flex-col items-center text-center group transition-all duration-300 hover:shadow-neon hover:border-white/30 hover:bg-white/10"
  >
    <div className="w-20 h-20 rounded-full bg-black/40 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
      <Icon className="w-10 h-10 text-white/80 group-hover:text-white transition-colors" />
    </div>
    <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
    <p className="text-white/50 text-sm leading-relaxed">{description}</p>
  </motion.button>
);

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center mb-16 z-10"
      >
        <div className="inline-block p-3 bg-white/5 rounded-2xl border border-white/10 shadow-lg mb-6">
          <ShieldCheck className="w-12 h-12 text-white/80" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-4">
          AURA<span className="font-light">SHIELD</span>
        </h1>
        <p className="text-white/40 tracking-[0.2em] uppercase text-sm font-medium">Select your role to proceed</p>
      </motion.div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 z-10 w-full max-w-4xl">
        <RoleCard 
          title="Guest Portal"
          description="Access your room's safety dashboard and emergency protocols."
          icon={User}
          onClick={() => navigate('/guest')}
          delay={0.2}
        />
        <RoleCard 
          title="Staff Control"
          description="Enter the mission control center for live facility monitoring."
          icon={ShieldCheck}
          onClick={() => navigate('/staff')}
          delay={0.4}
        />
      </div>
    </div>
  );
};

export default Home;
