import React, { Suspense } from 'react';
import { Language, PageId } from '../../types';
import { Compass, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WalkthroughProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

const WalkthroughContent = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl space-y-6"
      >
        <Compass className="w-16 h-16 text-[#E59A1E] mx-auto animate-pulse" />
        <h2 className="text-4xl md:text-6xl font-display text-[#FAF8F5] font-bold">
          Virtual Experience Loading...
        </h2>
        <p className="text-lg text-slate-300 leading-relaxed">
          Preparing the 3D campus environment. Please wait while we assemble the virtual world.
        </p>

        {/* Branded Loading Bar */}
        <div className="w-full max-w-md mx-auto h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#F5B738] to-[#E59A1E]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export const WalkthroughView: React.FC<WalkthroughProps> = ({ lang, onNavigate }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0C1B2A] overflow-hidden">
      {/* Exit Control */}
      <button
        onClick={() => onNavigate('home')}
        className="absolute top-6 right-6 z-[110] flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Exit Walkthrough"
      >
        <X className="w-4 h-4" />
        <span className="text-sm font-medium">Exit Experience</span>
      </button>

      {/* Immersive Content Area */}
      <Suspense fallback={<WalkthroughContent />}>
        <WalkthroughContent />
      </Suspense>
    </div>
  );
};
