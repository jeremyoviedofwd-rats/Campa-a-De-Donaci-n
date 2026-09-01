import { useState } from 'react';
import { 
  InstagramIcon, 
  FacebookIcon, 
  TiktokIcon, 
  WhatsappIcon, 
  YoutubeIcon, 
  ShareIcon 
} from '../common/Icons';
import './SocialFloatingBar.css';

export default function SocialFloatingBar() {
  const [copiado, setCopiado] = useState(false);

  const redes = [
    { nombre: 'Instagram', Icon: InstagramIcon, url: 'https://instagram.com', color: '#E1306C' },
    { nombre: 'Facebook', Icon: FacebookIcon, url: 'https://facebook.com', color: '#1877F2' },
    { nombre: 'TikTok', Icon: TiktokIcon, url: 'https://tiktok.com', color: '#000000' },
    { nombre: 'WhatsApp', Icon: WhatsappIcon, url: 'https://whatsapp.com', color: '#25D366' },
    { nombre: 'YouTube', Icon: YoutubeIcon, url: 'https://youtube.com', color: '#FF0000' }
  ];

  const compartirCausa = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    } else {
      alert('¡Enlace copiado! Comparte en tus redes: ' + window.location.href);
    }
  };

  return (
    <aside className="social-floating-bar" aria-label="Redes Sociales">
      <div className="social-badge">Únete</div>
      <div className="social-links-list">
        {redes.map((red) => {
          const IconComponent = red.Icon;
          return (
            <a
              key={red.nombre}
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-item"
              title={`Síguenos en ${red.nombre}`}
              style={{ '--hover-color': red.color }}
            >
              <IconComponent size={20} className="social-icon" />
              <span className="social-tooltip">{red.nombre}</span>
            </a>
          );
        })}

        <button
          className="social-item share-button"
          onClick={compartirCausa}
          title="Compartir causa"
        >
          <ShareIcon size={20} className="social-icon" />
          <span className="social-tooltip">
            {copiado ? '¡Copiado!' : 'Compartir'}
          </span>
        </button>
      </div>
    </aside>
  );
}
