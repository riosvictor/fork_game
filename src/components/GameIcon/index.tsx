import React from 'react';

interface GameIconProps {
  size?: number;
  className?: string;
}

const GameIcon: React.FC<GameIconProps> = ({ size = 64, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle */}
      <circle cx="32" cy="32" r="30" fill="url(#gradient)" stroke="url(#borderGradient)" strokeWidth="2"/>
      
      {/* Gallows (Forca) */}
      <g stroke="#4F46E5" strokeWidth="2" fill="none">
        {/* Base */}
        <line x1="12" y1="52" x2="22" y2="52" strokeLinecap="round"/>
        {/* Vertical pole */}
        <line x1="17" y1="52" x2="17" y2="16" strokeLinecap="round"/>
        {/* Horizontal beam */}
        <line x1="17" y1="16" x2="35" y2="16" strokeLinecap="round"/>
        {/* Noose rope */}
        <line x1="35" y1="16" x2="35" y2="24" strokeLinecap="round"/>
      </g>
      
      {/* Letter blocks */}
      <g>
        {/* First letter block */}
        <rect x="40" y="22" width="8" height="8" rx="2" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="1"/>
        <text x="44" y="28" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="6" fontWeight="bold" fill="white">A</text>
        
        {/* Second letter block */}
        <rect x="40" y="32" width="8" height="8" rx="2" fill="#06B6D4" stroke="#0891B2" strokeWidth="1"/>
        <text x="44" y="38" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="6" fontWeight="bold" fill="white">B</text>
        
        {/* Third letter block */}
        <rect x="50" y="22" width="8" height="8" rx="2" fill="#10B981" stroke="#059669" strokeWidth="1"/>
        <text x="54" y="28" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="6" fontWeight="bold" fill="white">C</text>
        
        {/* Hidden letter (underscore) */}
        <rect x="50" y="32" width="8" height="8" rx="2" fill="#6B7280" stroke="#4B5563" strokeWidth="1"/>
        <line x1="52" y1="38" x2="56" y2="38" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
      
      {/* Game controller elements */}
      <g>
        {/* Small game pad icon */}
        <circle cx="25" cy="42" r="3" fill="#F59E0B" stroke="#D97706" strokeWidth="1"/>
        <rect x="22" y="40" width="6" height="4" rx="2" fill="#F59E0B"/>
        <circle cx="24" cy="41.5" r="0.5" fill="white"/>
        <circle cx="26" cy="41.5" r="0.5" fill="white"/>
      </g>
      
      {/* Sparkle effects */}
      <g fill="#FCD34D">
        <polygon points="48,12 48.5,13.5 50,14 48.5,14.5 48,16 47.5,14.5 46,14 47.5,13.5" opacity="0.8"/>
        <polygon points="14,28 14.3,29 15,29.3 14.3,29.6 14,30.5 13.7,29.6 13,29.3 13.7,29 14,28" opacity="0.6"/>
        <polygon points="52,46 52.4,47.2 53.5,47.6 52.4,48 52,49.2 51.6,48 50.5,47.6 51.6,47.2 52,46" opacity="0.7"/>
      </g>
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#667EEA",stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#764BA2",stopOpacity:1}} />
        </linearGradient>
        <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#4F46E5",stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#7C3AED",stopOpacity:1}} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default GameIcon;
