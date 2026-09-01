import { 
  TurtleIcon, 
  HomeIcon, 
  HeartIcon, 
  HandshakeIcon, 
  InstagramIcon, 
  FacebookIcon, 
  YoutubeIcon, 
  MapPinIcon, 
  MailIcon, 
  PhoneIcon, 
  WaveIcon 
} from '../common/Icons';
import './Footer.css';

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer-main">
      <div className="footer-container">
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <TurtleIcon size={32} color="#52b788" className="footer-logo" />
            <h3>Save the Turtles</h3>
          </div>
          <p>
            Organización internacional sin fines de lucro dedicada a la protección,
            rehabilitación y liberación de tortugas marinas en peligro de extinción.
          </p>
          <div className="footer-social-icons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <InstagramIcon size={16} /> Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FacebookIcon size={16} /> Facebook
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <YoutubeIcon size={16} /> YouTube
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Navegación</h4>
          <ul>
            <li>
              <button onClick={() => onNavigate('home')}>
                <HomeIcon size={14} /> Inicio
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('turtles')}>
                <TurtleIcon size={14} /> Adopta una Tortuga
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('donate')}>
                <HeartIcon size={14} /> Donaciones Multimoneda
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('volunteer')}>
                <HandshakeIcon size={14} /> Voluntariado de Campo
              </button>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Protección Marina</h4>
          <ul>
            <li><a href="#viveros">Viveros de Nidos</a></li>
            <li><a href="#clinica">Clínica Veterinaria</a></li>
            <li><a href="#patrullas">Patrullas Nocturnas</a></li>
            <li><a href="#educacion">Educación Costera</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Sede & Contacto</h4>
          <p className="contact-line">
            <MapPinIcon size={14} color="#74c69d" /> Playa Ostional, Guanacaste, Costa Rica
          </p>
          <p className="contact-line">
            <MailIcon size={14} color="#74c69d" /> ayuda@savetheturtles.org
          </p>
          <p className="contact-line">
            <PhoneIcon size={14} color="#74c69d" /> +506 2682-0000
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Save the Turtles Sanctuary. Todos los derechos reservados. <WaveIcon size={14} color="#74c69d" /></p>
      </div>
    </footer>
  );
}
