import React from 'react';

export interface LogoProps {
  variant?: 'default' | 'header' | 'badge' | 'icon-only' | 'stacked';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  customSize?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  customSize,
  className = '',
}) => {
  const sizeMap = {
    xs: 32,
    sm: 40,
    md: 48,
    lg: 88,
    xl: 176,
  };

  const pixelSize = customSize || sizeMap[size] || 48;

  return (
    <div
      className={`relative shrink-0 select-none inline-flex items-center justify-center ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
      aria-label="Jain Genius — The Change Makers Logo"
    >
      <svg
        viewBox="0 0 300 300"
        width={pixelSize}
        height={pixelSize}
        className="w-full h-full object-contain rounded-full shadow-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path id="logoTopArc" d="M 42,150 A 108,108 0 0,1 258,150" fill="none" />
        </defs>

        {/* Circular Dark Navy/Slate Background Disk */}
        <circle cx="150" cy="150" r="146" fill="#101721" />

        {/* Top Curved Text: . JAIN GENIUS . */}
        {/* Left & Right Dots: Gold (#C99A2E) | Text: Cream (#FBF5E8) */}
        <text
          fontFamily="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontSize="14.5"
          fontWeight="800"
          letterSpacing="0.22em"
        >
          <textPath href="#logoTopArc" startOffset="50%" textAnchor="middle">
            <tspan fill="#C99A2E">• </tspan>
            <tspan fill="#FBF5E8">JAIN GENIUS</tspan>
            <tspan fill="#C99A2E"> •</tspan>
          </textPath>
        </text>

        {/* Centered 4-Pointed Sparkle Star (Gold #C99A2E) */}
        <path
          d="M 150,67 Q 150,76 158,76 Q 150,76 150,85 Q 150,76 142,76 Q 150,76 150,67 Z"
          fill="#C99A2E"
        />

        {/* Emblem: Figure and Interlocking Crescents */}
        <g id="figure-emblem">
          {/* Bottom & Left Crescent Orbit (Cream #FBF5E8) */}
          <path
            d="M 166,188 C 145,198 116,192 101,176 C 85,158 87,131 99,112 C 103,106 109,102 114,99 C 111,104 104,115 104,128 C 103,148 119,173 145,178 C 153,180 160,183 166,188 Z"
            fill="#FBF5E8"
          />

          {/* Right Crescent Orbit (Gold #C99A2E) */}
          <path
            d="M 175,99 C 187,108 202,125 204,144 C 206,163 194,181 178,187 C 186,183 197,172 196,155 C 196,138 184,118 175,99 Z"
            fill="#C99A2E"
          />

          {/* Head (Cream #FBF5E8 Solid Circle) */}
          <circle cx="150" cy="98" r="9.5" fill="#FBF5E8" />

          {/* Left Arm & Inner Arc (Gold #C99A2E) */}
          <path
            d="M 148,114 C 145,108 136,98 123,89 C 130,98 137,110 144,125 C 146,129 147,133 147,138 C 148,146 153,162 166,187 C 168,191 169,193 170,192 C 168,185 160,165 154,149 C 151,141 149,134 148,128 C 146,122 147,117 148,114 Z"
            fill="#C99A2E"
          />

          {/* Torso, Right Arm & Left Leg (Cream #FBF5E8) */}
          <path
            d="M 184,81 C 172,94 158,111 149,122 C 143,129 137,139 131,152 C 124,166 118,182 113,195 C 117,185 125,167 136,150 C 143,139 152,126 160,116 C 168,106 177,93 184,81 Z"
            fill="#FBF5E8"
          />
        </g>

        {/* Typography: JAIN-G (JAIN- is Cream #FBF5E8, G is Gold #C99A2E) */}
        <text
          x="150"
          y="230"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="800"
          fontSize="35"
          letterSpacing="0.05em"
        >
          <tspan fill="#FBF5E8">JAIN-</tspan><tspan fill="#C99A2E">G</tspan>
        </text>

        {/* Bottom Tagline: — THE CHANGE MAKERS — */}
        {/* Left/Right Dashes: Gold (#C99A2E) | Text: Cream (#FBF5E8) */}
        <g id="brand-tagline">
          <line x1="68" y1="246" x2="80" y2="246" stroke="#C99A2E" strokeWidth="2.5" strokeLinecap="round" />
          <text
            x="150"
            y="249.5"
            textAnchor="middle"
            fill="#FBF5E8"
            fontFamily="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontSize="9.5"
            fontWeight="700"
            letterSpacing="0.2em"
          >
            THE CHANGE MAKERS
          </text>
          <line x1="220" y1="246" x2="232" y2="246" stroke="#C99A2E" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};
