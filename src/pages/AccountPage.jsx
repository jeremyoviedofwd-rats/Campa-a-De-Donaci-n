import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDonation } from '../context/DonationContext';
import { 
  LockIcon, 
  KeyIcon, 
  ShieldIcon, 
  BeachIcon, 
  MedalIcon, 
  RefreshIcon, 
  TrophyIcon, 
  HeartIcon, 
  ScrollIcon, 
  CalendarIcon, 
  MapPinIcon, 
  CheckIcon, 
  TurtleIcon,
  UserIcon,
  ClipboardIcon
} from '../components/common/Icons';
import './AccountPage.css';

export default function AccountPage({ onNavigate }) {
  const { usuario, setIsLoginModalOpen, cambiarRolDirecto, logout } = useAuth();
  const { donaciones, setCertificadoActivo } = useDonation();

  // Admin state for adding new nest
  const [nuevoNidoPlaya, setNuevoNidoPlaya] = useState('');
  const [nuevoNidoHuevos, setNuevoNidoHuevos] = useState(90);
  const [nidoRegistrado, setNidoRegistrado] = useState(false);

  const handleRegisterNest = (e) => {
    e.preventDefault();
    if (nuevoNidoPlaya) {
      setNidoRegistrado(true);
      setTimeout(() => setNidoRegistrado(false), 4000);
      setNuevoNidoPlaya('');
    }
  };

  if (!usuario) {
    return (
      <div className="account-page empty-account">
        <div className="empty-account-card">
          <LockIcon size={48} color="#2d6a4f" className="empty-icon" />
          <h2>Inicia Sesión en Save the Turtles</h2>
          <p>Accede a tus certificados de adopción, turnos de voluntariado o panel de control.</p>

          <div className="empty-actions">
            <button className="btn-open-login" onClick={() => setIsLoginModalOpen(true)}>
              <KeyIcon size={18} /> Iniciar Sesión / Registro
            </button>

            <div className="quick-roles-preview">
              <span>O explora un rol de demostración:</span>
              <div className="preview-btns">
                <button onClick={() => cambiarRolDirecto('donante')}>Donante</button>
                <button onClick={() => cambiarRolDirecto('voluntario')}>Voluntario</button>
                <button onClick={() => cambiarRolDirecto('admin')}>Administrador</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      {/* Account Header */}
      <div className="account-profile-bar">
        <div className="profile-main-info">
          <img src={usuario.avatar} alt={usuario.nombre} className="account-big-avatar" />
          <div className="profile-text">
            <h1>{usuario.nombre}</h1>
            <span className="account-email">{usuario.email}</span>
            <div className="account-role-tag">
              Rol Activo:{' '}
              <strong>
                {usuario.rol === 'admin' ? (
                  <><ShieldIcon size={14} /> Administrador / Guardaparques</>
                ) : usuario.rol === 'voluntario' ? (
                  <><BeachIcon size={14} /> Voluntario de Campo</>
                ) : (
                  <><MedalIcon size={14} /> Donante & Socio Protector</>
                )}
              </strong>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn-switch-role-bar" onClick={() => setIsLoginModalOpen(true)}>
            <RefreshIcon size={16} /> Cambiar de Rol
          </button>
          <button className="btn-logout" onClick={logout}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* RENDER DASHBOARD BASED ON USER ROLE */}

      {/* ROLE 1: DONOR */}
      {usuario.rol === 'donante' && (
        <div className="dashboard-section donor-dashboard">
          <div className="dashboard-grid-2">
            {/* Badges & Stats */}
            <div className="dash-card">
              <h3><TrophyIcon size={22} color="#2d6a4f" /> Tu Impacto de Conservación</h3>
              <div className="badge-display">
                <MedalIcon size={36} color="#d97706" className="badge-icon" />
                <div className="badge-text">
                  <strong>{usuario.nivelBadge || 'Protectora Dorada'}</strong>
                  <small>Has patrocinado la conservación marina activa</small>
                </div>
              </div>

              <div className="user-stats-list">
                <div className="user-stat-row">
                  <span>Donación Total Registrada:</span>
                  <strong>${usuario.donacionesTotales || 175} USD</strong>
                </div>
                <div className="user-stat-row">
                  <span>Tortugas Apadrinadas:</span>
                  <strong>{usuario.tortugasAdoptadas?.join(', ') || 'Luna, Coco'}</strong>
                </div>
              </div>

              <button className="btn-donate-more" onClick={() => onNavigate('donate')}>
                <HeartIcon size={18} /> Hacer Nueva Donación
              </button>
            </div>

            {/* Certificates List */}
            <div className="dash-card">
              <h3><ScrollIcon size={22} color="#2d6a4f" /> Tus Certificados Digitales</h3>
              <div className="certificates-list">
                {donaciones.map((d) => (
                  <div key={d.id} className="cert-item-row">
                    <div className="cert-item-info">
                      <strong>{d.certificadoId}</strong>
                      <small>
                        {d.fecha} • {d.moneda} {d.montoLocal}
                      </small>
                    </div>
                    <button
                      className="btn-view-cert"
                      onClick={() => setCertificadoActivo(d)}
                    >
                      Ver Certificado
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ROLE 2: VOLUNTEER */}
      {usuario.rol === 'voluntario' && (
        <div className="dashboard-section volunteer-dashboard">
          <div className="dashboard-grid-2">
            {/* Shifts */}
            <div className="dash-card">
              <h3><CalendarIcon size={22} color="#2d6a4f" /> Tus Próximos Turnos de Patrulla</h3>
              <div className="shift-card">
                <div className="shift-time">Viernes 4 de Septiembre • 22:00 - 04:00</div>
                <strong className="shift-beach">
                  <MapPinIcon size={16} /> {usuario.playaAsignada || 'Playa Ostional'}
                </strong>
                <p>Misión: Conteo de desoves y reubicación de huevos en vivero nocturno.</p>
                <span className="shift-status">
                  <CheckIcon size={14} color="#15803d" /> Confirmado
                </span>
              </div>

              <div className="user-stats-list">
                <div className="user-stat-row">
                  <span>Horas de Voluntariado Acumuladas:</span>
                  <strong>{usuario.horasVoluntariado || 48} horas</strong>
                </div>
                <div className="user-stat-row">
                  <span>Turnos Completados:</span>
                  <strong>{usuario.turnosCompletados || 12} patrullas</strong>
                </div>
              </div>
            </div>

            {/* Field Notes */}
            <div className="dash-card">
              <h3><ClipboardIcon size={22} color="#2d6a4f" /> Bitácora de Campo</h3>
              <p className="field-notes-text">
                "En el último patrullaje registramos 14 hembras de tortuga Lora desovando en el sector norte. 
                Protegimos 2 nidos en riesgo por la marea alta."
              </p>
              <button className="btn-add-note" onClick={() => alert('¡Notas de campo guardadas en el sistema!')}>
                + Agregar Registro de Patrulla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ROLE 3: ADMIN */}
      {usuario.rol === 'admin' && (
        <div className="dashboard-section admin-dashboard">
          <div className="admin-stats-bar">
            <div className="admin-stat-box">
              <span>Nidos Bajo Supervisión</span>
              <strong>340</strong>
            </div>
            <div className="admin-stat-box">
              <span>Crías Eclosionadas Hoy</span>
              <strong>1,120</strong>
            </div>
            <div className="admin-stat-box">
              <span>Voluntarios Registrados</span>
              <strong>640</strong>
            </div>
          </div>

          <div className="dashboard-grid-2">
            {/* Register New Nest */}
            <div className="dash-card">
              <h3><ShieldIcon size={22} color="#2d6a4f" /> Registrar Nuevo Nido en Vivero</h3>
              {nidoRegistrado ? (
                <div className="nido-success">
                  <CheckIcon size={18} color="#166534" /> Nido registrado con éxito en el mapa de monitoreo.
                </div>
              ) : (
                <form onSubmit={handleRegisterNest} className="admin-nest-form">
                  <div className="form-group">
                    <label>Ubicación / Playa</label>

                    <input
                      type="text"
                      required
                      placeholder="Ej. Playa Pacuare Sector B"
                      value={nuevoNidoPlaya}
                      onChange={(e) => setNuevoNidoPlaya(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Cantidad de Huevos Resguardados</label>
                    <input
                      type="number"
                      required
                      value={nuevoNidoHuevos}
                      onChange={(e) => setNuevoNidoHuevos(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn-admin-submit">
                    <TurtleIcon size={18} /> Registrar Nido en Sistema
                  </button>
                </form>
              )}
            </div>

            {/* Volunteer Management Table */}
            <div className="dash-card">
              <h3><UserIcon size={22} color="#2d6a4f" /> Solicitudes de Voluntarios Pendientes</h3>
              <div className="volunteer-admin-list">
                <div className="vol-req-row">
                  <div>
                    <strong>Sofía Castro</strong>
                    <small>Limpieza Playa Pacuare</small>
                  </div>
                  <button onClick={() => alert('¡Voluntario/a aprobado/a!')}>Aprobar</button>
                </div>
                <div className="vol-req-row">
                  <div>
                    <strong>Diego Morales</strong>
                    <small>Patrulla Nocturna Ostional</small>
                  </div>
                  <button onClick={() => alert('¡Voluntario/a aprobado/a!')}>Aprobar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
