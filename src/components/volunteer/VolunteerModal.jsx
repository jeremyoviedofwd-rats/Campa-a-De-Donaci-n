import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  HandshakeIcon,
  MapPinIcon,
  CalendarIcon,
  CheckIcon
} from '../common/Icons';
import './VolunteerModal.css';

export default function VolunteerModal({ campaign, isOpen, onClose }) {
  const { usuario, requireAuthAction } = useAuth();

  const [nombre, setNombre] = useState(usuario?.nombre || '');
  const [email, setEmail] = useState(usuario?.email || '');
  const [telefono, setTelefono] = useState('+506 8888-9999');
  const [fechaTurno, setFechaTurno] = useState('2026-09-12');
  const [confirmado, setConfirmado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre);
      setEmail(usuario.email);
    }
  }, [usuario]);

  if (!isOpen || !campaign) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check auth
    requireAuthAction(() => {
      setEnviando(true);
      setTimeout(() => {
        setEnviando(false);
        setConfirmado(true);
      }, 1000);
    }, 'Inicia sesión para completar tu inscripción como voluntario');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="volunteer-modal-card zoom-slide-effect" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>
          &times;
        </button>

        {/* Modal Header */}
        <div className="vol-modal-header">
          <div className="vol-header-icon">
            <HandshakeIcon size={32} color="#2d6a4f" />
          </div>
          <div>
            <span className="vol-modal-tag">Subpestaña de Inscripción Oficial</span>
            <h2>{campaign.titulo}</h2>
          </div>
        </div>

        {confirmado ? (
          <div className="vol-modal-success">
            <div className="success-icon-badge">
              <CheckIcon size={48} color="#166534" />
            </div>
            <h3>¡Inscripción Confirmada con Éxito!</h3>
            <p>
              Hola <strong>{nombre}</strong>, hemos reservado tu cupo para la campaña{' '}
              <em>{campaign.titulo}</em>. Te enviamos la guía de equipamiento e itinerario a{' '}
              <strong>{email}</strong>.
            </p>
            <button className="btn-close-success" onClick={onClose}>
              Cerrar Ventana
            </button>
          </div>
        ) : (
          <div className="vol-modal-body">
            {/* Left Side: Extended Details */}
            <div className="vol-details-column">
              <h3>📋 Detalles Extendidos de la Misión</h3>

              <div className="detail-row">
                <MapPinIcon size={18} color="#2d6a4f" />
                <div>
                  <strong>Punto de Encuentro:</strong>
                  <span>{campaign.ubicacion} (Base de la Estación Biológica)</span>
                </div>
              </div>

              <div className="detail-row">
                <CalendarIcon size={18} color="#2d6a4f" />
                <div>
                  <strong>Horario & Duración:</strong>
                  <span>{campaign.fecha}</span>
                </div>
              </div>

              <div className="detail-box">
                <h4>🛡️ ¿Qué Proporcionamos?</h4>
                <ul>
                  <li><CheckIcon size={14} color="#10b981" /> Chaleco distintivo de voluntario y linterna nocturna.</li>
                  <li><CheckIcon size={14} color="#10b981" /> Estación de hidratación constante y bocadillos.</li>
                  <li><CheckIcon size={14} color="#10b981" /> Certificado oficial de horas de voluntariado marino.</li>
                </ul>
              </div>

              <div className="detail-box warning-box">
                <h4>🎒 ¿Qué debes traer?</h4>
                <p>Calzado cerrado, reparente ecológico, ropa oscura para patrullas y actitud entusiasta.</p>
              </div>
            </div>

            {/* Right Side: Interactive Registration Form */}
            <div className="vol-form-column">
              <h3>✍️ Registra tus Datos</h3>

              <form onSubmit={handleSubmit} className="vol-modal-form">
                <div className="form-field">
                  <label>Nombre Completo</label>

                  <input
                    type="text"
                    required
                    placeholder="Ej. Sofía Castro"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Correo Electrónico</label>

                  <input
                    type="email"
                    required
                    placeholder="sofia@ejemplo.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Teléfono / WhatsApp</label>

                  <input
                    type="text"
                    required
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Selecciona la Fecha del Turno</label>

                  <input
                    type="date"
                    required
                    value={fechaTurno}
                    onChange={(e) => setFechaTurno(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn-confirm-vol-modal" disabled={enviando}>
                  {enviando ? 'Confirmando Reserva...' : <><HandshakeIcon size={18} /> Confirmar Mi Inscripción</>}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
