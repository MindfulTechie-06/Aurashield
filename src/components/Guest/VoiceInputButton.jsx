import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';

const VoiceInputButton = () => {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsRecording(!isRecording)}
      className={`relative p-3 rounded-full flex items-center justify-center transition-colors duration-300 ${
        isRecording 
          ? 'bg-critical/20 text-critical shadow-glow-red border border-critical/50' 
          : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white border border-transparent'
      }`}
    >
      <Mic className="w-5 h-5 relative z-10" />
      {isRecording && (
        <>
          <span className="absolute inset-0 rounded-full border-2 border-critical animate-ping opacity-75" />
          <span className="absolute inset-0 rounded-full border border-critical animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50" />
        </>
      )}
    </motion.button>
  );
};

export default VoiceInputButton;
