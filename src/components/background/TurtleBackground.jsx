import { useMemo } from 'react';
import './TurtleBackground.css';

export default function TurtleBackground() {
  // Generate 18 floating baby turtle elements with varied position, size, duration, and delay
  const turtles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, index) => {
      const size = Math.floor(Math.random() * 24) + 20; // 20px to 44px
      const left = Math.floor(Math.random() * 95); // 0% to 95%
      const duration = Math.floor(Math.random() * 18) + 16; // 16s to 34s
      const delay = (Math.random() * 12).toFixed(1); // 0s to 12s
      const rotation = Math.floor(Math.random() * 40) - 20; // -20deg to +20deg wobble
      const opacity = (Math.random() * 0.4 + 0.25).toFixed(2); // subtle opacity

      return {
        id: index,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          animationDuration: `${duration}s`,
          animationDelay: `-${delay}s`,
          opacity: opacity,
          transform: `rotate(${rotation}deg)`
        }
      };
    });
  }, []);

  return (
    <div className="turtle-bg-container" aria-hidden="true">
      <div className="water-overlay"></div>
      {turtles.map((t) => (
        <div key={t.id} className="floating-turtle" style={t.style}>
          <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            {/* Cute Turtle SVG Path */}
            <ellipse cx="50" cy="50" rx="28" ry="24" fill="#2d6a4f" />
            <path d="M 50 26 Q 50 14 50 10 Q 56 12 56 18 Z" fill="#40916c" /> {/* Head */}
            <circle cx="50" cy="18" r="8" fill="#52b788" /> {/* Head Circle */}
            <circle cx="47" cy="16" r="1.5" fill="#081c15" /> {/* Left eye */}
            <circle cx="53" cy="16" r="1.5" fill="#081c15" /> {/* Right eye */}
            {/* Flippers */}
            <path d="M 30 36 C 14 26 8 40 24 46" fill="#40916c" /> {/* Front Left Flipper */}
            <path d="M 70 36 C 86 26 92 40 76 46" fill="#40916c" /> {/* Front Right Flipper */}
            <path d="M 32 64 C 18 74 22 84 34 72" fill="#2d6a4f" /> {/* Rear Left Flipper */}
            <path d="M 68 64 C 82 74 78 84 66 72" fill="#2d6a4f" /> {/* Rear Right Flipper */}
            <polygon points="50,74 47,84 53,84" fill="#2d6a4f" /> {/* Tail */}
            {/* Shell Pattern Lines */}
            <ellipse cx="50" cy="50" rx="20" ry="16" fill="none" stroke="#74c69d" strokeWidth="2.5" strokeDasharray="6,3" />
            <circle cx="50" cy="50" r="7" fill="#1b4332" opacity="0.6" />
          </svg>
        </div>
      ))}
    </div>
  );
}
