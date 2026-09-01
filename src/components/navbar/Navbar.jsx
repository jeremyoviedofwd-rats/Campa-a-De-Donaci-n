import { useAuth } from '../../context/AuthContext';
import { useDonation } from '../../context/DonationContext';
import { 
  TurtleIcon, 
  HomeIcon, 
  HeartIcon, 
  HandshakeIcon, 
  UserIcon, 
  GlobeIcon, 
  ShieldIcon, 
  BeachIcon, 
  MedalIcon, 
  RefreshIcon, 
  KeyIcon 
} from '../common/Icons';
import './Navbar.css';

export default function Navbar({ activeTab, setActiveTab }) {
  const { usuario, setIsLoginModalOpen } = useAuth();
  const { monedaActual, setMonedaActual, monedas } = useDonation();

  const navItems = [
    { id: 'home', label: 'Inicio', Icon: HomeIcon },
    { id: 'turtles', label: 'Nuestras Tortugas', Icon: TurtleIcon },
    { id: 'donate', label: 'Donar', Icon: HeartIcon, highlight: true },
    { id: 'volunteer', label: 'Voluntariado', Icon: HandshakeIcon },
    { id: 'account', label: 'Mi Cuenta', Icon: UserIcon }
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand */}
        <div className="navbar-brand" onClick={() => setActiveTab('home')}>
          <TurtleIcon size={32} className="brand-logo-icon" color="#52b788" />
          <div className="brand-text">
            <span className="brand-title">Save the Turtles</span>
            <span className="brand-tagline">Santuario & Conservación</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="navbar-nav">
          <ul className="nav-list">
            {navItems.map((item) => {
              const IconComp = item.Icon;
              return (
                <li key={item.id}>
                  <button
                    className={`nav-link-btn ${activeTab === item.id ? 'active' : ''} ${
                      item.highlight ? 'highlight-btn' : ''
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <IconComp size={18} className="nav-icon" />
                    <span className="nav-label">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions & User State */}
        <div className="navbar-actions">
          {/* Currency Selector */}
          <div className="currency-selector" title="Cambiar Divisa">
            <GlobeIcon size={16} color="#74c69d" />
            <select
              value={monedaActual}
              onChange={(e) => setMonedaActual(e.target.value)}
              className="currency-select"
            >
              {Object.keys(monedas).map((key) => (
                <option key={key} value={key}>
                  {monedas[key].label}
                </option>
              ))}
            </select>
          </div>

          {/* Role Quick Switcher / Profile */}
          {usuario ? (
            <div className="user-profile-badge">
              <img
                src={usuario.avatar}
                alt={usuario.nombre}
                className="user-avatar"
              />
              <div className="user-info-text">
                <span className="user-name">{usuario.nombre}</span>
                <span className={`user-role-pill role-${usuario.rol}`}>
                  {usuario.rol === 'admin' ? (
                    <><ShieldIcon size={12} /> Admin</>
                  ) : usuario.rol === 'voluntario' ? (
                    <><BeachIcon size={12} /> Voluntario</>
                  ) : (
                    <><MedalIcon size={12} /> Donante</>
                  )}
                </span>
              </div>
              <button
                className="switch-role-btn"
                title="Cambiar de Rol / Iniciar Sesión"
                onClick={() => setIsLoginModalOpen(true)}
              >
                <RefreshIcon size={16} />
              </button>
            </div>
          ) : (
            <button
              className="login-trigger-btn"
              onClick={() => setIsLoginModalOpen(true)}
            >
              <KeyIcon size={16} /> Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
