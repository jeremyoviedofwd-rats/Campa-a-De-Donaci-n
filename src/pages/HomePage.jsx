import { useState } from 'react';
import { useDonation } from '../context/DonationContext';
import { 
  TurtleIcon, 
  HeartIcon, 
  EggIcon, 
  WaveIcon, 
  ShieldIcon, 
  DollarIcon, 
  HandshakeIcon, 
  MailIcon,
  CheckIcon 
} from '../components/common/Icons';
import './HomePage.css';

export default function HomePage({ onNavigate }) {
  const { totalRecaudadoUSD, monedaActual, monedas } = useDonation();
  const rate = monedas[monedaActual]?.cambio || 1;
  const symbol = monedas[monedaActual]?.simbolo || '$';
  const totalLocal = Math.round(totalRecaudadoUSD * rate).toLocaleString();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [suscripto, setSuscripto] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSuscripto(true);
      setNewsletterEmail('');
      setTimeout(() => setSuscripto(false), 4000);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="home-hero">
        <div className="home-hero-overlay"></div>
        <div className="home-hero-content">
          <span className="hero-badge">
            <TurtleIcon size={16} color="#74c69d" /> Santuario Internacional de Conservación
          </span>
          <h1>Cada tortuguita que llega al mar es una victoria para el planeta</h1>
          <p>
            Millones de tortugas marinas corren peligro por plástico, pesca masiva y destrucción de nidos.
            Con tu ayuda, patrullamos playas, protegemos desoves y rehabilitamos tortugas heridas.
          </p>

          <div className="hero-cta-buttons">
            <button className="btn-primary-hero" onClick={() => onNavigate('donate')}>
              <HeartIcon size={20} /> Donar Ahora ({symbol} {totalLocal} recaudados)
            </button>
            <button className="btn-secondary-hero" onClick={() => onNavigate('turtles')}>
              <TurtleIcon size={20} /> Adoptar una Tortuga Rescatada
            </button>
          </div>
        </div>
      </section>

      {/* Live Impact Counters */}
      <section className="impact-counter-section">
        <div className="impact-container">
          <div className="impact-card">
            <span className="impact-icon"><EggIcon size={36} color="#2d6a4f" /></span>
            <span className="impact-number">1,420+</span>
            <span className="impact-label">Nidos Protegidos</span>
          </div>

          <div className="impact-card">
            <span className="impact-icon"><WaveIcon size={36} color="#0284c7" /></span>
            <span className="impact-number">85,300+</span>
            <span className="impact-label">Crías Liberadas al Mar</span>
          </div>

          <div className="impact-card">
            <span className="impact-icon"><ShieldIcon size={36} color="#059669" /></span>
            <span className="impact-number">640+</span>
            <span className="impact-label">Voluntarios Activos</span>
          </div>

          <div className="impact-card highlight-card">
            <span className="impact-icon"><DollarIcon size={36} color="#74c69d" /></span>
            <span className="impact-number">{symbol} {totalLocal}</span>
            <span className="impact-label">Fondo de Conservación</span>
          </div>
        </div>
      </section>

      {/* Urgent Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <div className="mission-text">
            <h2>Nuestra Misión: Salvar a las Tortugas Marinas</h2>
            <p>
              Las tortugas marinas han habitado la Tierra por más de 100 millones de años.
              Hoy, 6 de las 7 especies marinas se encuentran en peligro crítico de extinción.
            </p>
            <ul className="mission-checklist">
              <li><CheckIcon size={18} color="#10b981" /> Patrullajes nocturnos de 12km en playas de anidación.</li>
              <li><CheckIcon size={18} color="#10b981" /> Viveros protegidos contra depredadores y cambio climático.</li>
              <li><CheckIcon size={18} color="#10b981" /> Centro veterinario para extracción de redes y plástico.</li>
              <li><CheckIcon size={18} color="#10b981" /> Educación y concientización comunitaria costera.</li>
            </ul>
            <button className="btn-mission" onClick={() => onNavigate('volunteer')}>
              <HandshakeIcon size={18} /> Únete como Voluntario de Campo
            </button>
          </div>
          <div className="mission-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
              alt="Tortuga marina nadando en arrecife"
              className="mission-img"
            />
            <div className="mission-img-badge">
              <ShieldIcon size={16} color="#52b788" />
              <span>100% Sin Fines de Lucro</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-box">
          <h2><MailIcon size={28} /> Recibe noticias y videos de las crías liberadas</h2>
          <p>Enviamos reportes semanales sobre eclosiones de nidos e historias de rescate.</p>

          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Ingresa tu correo electrónico..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button type="submit">Suscribirme</button>
          </form>

          {suscripto && (
            <div className="newsletter-success">
              ¡Gracias por suscribirte! Revisa tu bandeja de entrada muy pronto.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
