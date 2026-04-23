export const LogoRiego = ({ className = "w-10 h-10" }) => (
  <svg 
    viewBox="0 0 200 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className} // Aquí puedes pasar clases de Tailwind como "w-20 h-20"
  >

  <defs>
    <filter id="hardShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="4" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <g filter="url(#hardShadow)">
    <circle cx="100" cy="100" r="85" stroke="#94A3B8" stroke-width="10"/>
    
    {/* <circle cx="100" cy="100" r="85" stroke="#0EFF0A" stroke-width="2" opacity="0.8"/> */}

    <g>
      <path d="M100 35 L112 85 L88 85 Z" fill="#06B6D4" />
      
      <path d="M45 145 L85 115 L75 102 Z" fill="#64748B" />
      <path d="M155 145 L125 102 L115 115 Z" fill="#64748B" />
    </g>

    <path d="M100 85 L115 100 L100 115 L85 100 Z" fill="#06B6D4" />

    <circle cx="100" cy="100" r="58" stroke="#0EFF0A" stroke-width="2" stroke-dasharray="6 4" opacity="0.9"/>
  </g>


  </svg>
);