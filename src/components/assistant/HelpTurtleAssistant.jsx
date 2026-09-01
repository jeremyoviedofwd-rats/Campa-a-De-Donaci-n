import { useState, useEffect } from 'react';
import { TurtleIcon, HeartIcon } from '../common/Icons';
import './HelpTurtleAssistant.css';

export default function HelpTurtleAssistant({ onNavigate }) {
  const mensajesAyuda = [
    '¡Hola! Necesitamos tu ayuda para proteger a las crías en la playa',
    '¿Sabías que $15 salvan a 15 tortuguitas recién nacidas?',
    '¡Únete a las patrullas nocturnas de voluntariado!',
    '¡Haz clic en mí para hacer una donación o ser voluntario!'
  ];

  const [msgIndex, setMsgIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  // Cycle messages every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % mensajesAyuda.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleClickTurtle = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1000);
    onNavigate('donate');
  };

  if (isClosed) return null;

  return (
    <div className="help-turtle-assistant-wrapper">
      {/* Speech Bubble */}
      <div className="speech-bubble" onClick={handleClickTurtle}>
        <span className="bubble-text">{mensajesAyuda[msgIndex]}</span>
        <button
          className="close-bubble-btn"
          onClick={(e) => {
            e.stopPropagation();
            setIsClosed(true);
          }}
          title="Cerrar asistente"
        >
          &times;
        </button>
      </div>

      {/* Animated Walking/Swimming Turtle */}
      <div
        className={`wandering-turtle-avatar ${isSpinning ? 'spinning' : ''}`}
        onClick={handleClickTurtle}
        title="¡Haz clic para ayudar a las tortuguitas!"
      >
        <div className="turtle-svg-wrapper">
          <svg viewBox="0 0 100 100" width="56" height="56">
            <ellipse cx="50" cy="50" rx="30" ry="24" fill="#2d6a4f" />
            <path d="M 50 26 Q 50 12 50 8 Q 58 10 58 18 Z" fill="#52b788" />
            <circle cx="50" cy="14" r="9" fill="#74c69d" />
            <circle cx="46" cy="12" r="2" fill="#081c15" />
            <circle cx="54" cy="12" r="2" fill="#081c15" />
            {/* Animated Flippers */}
            <path className="flipper-front-left" d="M 28 36 C 10 24 4 42 22 48" fill="#40916c" />
            <path className="flipper-front-right" d="M 72 36 C 90 24 96 42 78 48" fill="#40916c" />
            <path className="flipper-rear-left" d="M 30 66 C 14 78 20 88 34 76" fill="#2d6a4f" />
            <path className="flipper-rear-right" d="M 70 66 C 86 78 80 88 66 76" fill="#2d6a4f" />
            <ellipse cx="50" cy="50" rx="20" ry="15" fill="none" stroke="#d8f3dc" strokeWidth="3" strokeDasharray="6,3" />
          </svg>
        </div>
        <div className="help-badge-pill">
          <HeartIcon size={12} color="#ffffff" /> ¡Ayúdame!
        </div>
      </div>
    </div>
  );
}
