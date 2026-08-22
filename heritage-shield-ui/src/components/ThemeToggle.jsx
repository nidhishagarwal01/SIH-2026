import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '', size = 'md' }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl border transition-all duration-300 shadow-md ${
        isDark
          ? 'bg-[#14171E] hover:bg-[#1E232E] border-[#252C3A] text-amber-300 hover:text-amber-200 shadow-black/40'
          : 'bg-[#FFFFFF] hover:bg-[#F1F3F5] border-[#CBD5E1] text-[#B45309] hover:text-[#92400E] shadow-slate-300/60'
      } ${className}`}
      title={isDark ? 'Switch to Light Parchment Theme' : 'Switch to Dark Obsidian Theme'}
      aria-label="Toggle dark/light theme"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex items-center justify-center gap-1.5 font-mono text-xs font-bold"
      >
        {isDark ? (
          <>
            <Sun className="w-4 h-4 text-[#DFB76C]" />
            <span className="hidden sm:inline text-[11px] text-[#DFB76C]">Light</span>
          </>
        ) : (
          <>
            <Moon className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline text-[11px] text-indigo-700">Dark</span>
          </>
        )}
      </motion.div>
    </motion.button>
  );
}
