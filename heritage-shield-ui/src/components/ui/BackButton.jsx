import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

/**
 * 🔙 Universal Back Button Component
 * Renders an accessible, theme-aware back button connected to the Navigation Stack.
 * Automatically hidden/disabled when on root landing page or when history stack is empty.
 */
export default function BackButton({ 
  className = '', 
  label = 'Back', 
  onClick, 
  forceShow = false, 
  variant = 'default' 
}) {
  const { goBack, canGoBack } = useNavigation();

  if (!canGoBack && !forceShow) {
    return null;
  }

  const handleBack = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    } else {
      goBack();
    }
  };

  const baseStyles = "inline-flex items-center gap-2 font-mono text-xs font-bold transition-all duration-200 cursor-pointer rounded-xl select-none active:scale-95";
  
  let variantStyles = "bg-white hover:bg-[#FAF5ED] border border-[#DACDB8] hover:border-[#BA532B] text-[#24160E] hover:text-[#BA532B] px-3.5 py-2 shadow-sm hover:shadow";
  
  if (variant === 'terracotta') {
    variantStyles = "bg-[#BA532B] hover:bg-[#A84520] text-white border border-[#C29244]/50 px-4 py-2 shadow-md";
  } else if (variant === 'ghost') {
    variantStyles = "bg-transparent text-[#7A5B49] hover:text-[#BA532B] hover:bg-[#FAF5ED] px-2.5 py-1.5 border border-transparent";
  } else if (variant === 'dark') {
    variantStyles = "bg-[#1E120B] hover:bg-[#2A190F] border border-[#3D2416] hover:border-[#BA532B] text-[#FAF5ED] hover:text-[#BA532B] px-3.5 py-2 shadow-sm";
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`${baseStyles} ${variantStyles} ${className}`}
      title="Go Back to Previous Page"
      aria-label="Go back to previous page"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      <span>{label}</span>
    </button>
  );
}
