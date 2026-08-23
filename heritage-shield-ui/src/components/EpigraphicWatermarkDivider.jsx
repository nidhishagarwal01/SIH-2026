import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🏺 Ancient Brahmi & Sanskrit Epigraphic Stone Inscription Watermark Strip
 * Floating faint ancient inscriptions that drift horizontally across the canvas between sections.
 */
export default function EpigraphicWatermarkDivider({ reverse = false, speed = 48, className = "" }) {
  const inscriptions = [
    "॥ धर्मो रक्षति रक्षितः ॥",
    "𑀥𑀁𑀫𑁄 𑀭𑀓𑁆𑀔𑀢𑀺 𑀭𑀓𑁆𑀔𑀺𑀢𑁄",
    "॥ सत्यमेव जयते नानृतम् ॥",
    "॥ वासुधैव कुटुम्बकम् ॥",
    "𑀲𑀢𑁆𑀬𑀫𑁂𑀯 𑀚𑀬𑀢𑁂",
    "॥ योगः कर्मसु कौशलम् ॥",
    "॥ अहिंसा परमो धर्मः ॥"
  ];

  return (
    <div className={`relative w-full overflow-hidden py-3.5 pointer-events-none select-none opacity-[0.065] border-y border-[#DACDB8]/50 ${className}`}>
      <motion.div 
        animate={{ x: reverse ? [-1000, 0] : [0, -1000] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-12 text-2xl sm:text-4xl font-serif text-[#24160E] tracking-[0.32em] uppercase font-bold"
      >
        {inscriptions.concat(inscriptions).map((text, idx) => (
          <span key={idx}>{text}</span>
        ))}
      </motion.div>
    </div>
  );
}
