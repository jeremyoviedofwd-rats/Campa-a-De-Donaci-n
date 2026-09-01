import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  TurtleIcon, 
  KeyIcon, 
  ShieldIcon, 
  BeachIcon, 
  MedalIcon,
  LockIcon
} from '../common/Icons';
import './LoginModal.css';

export default function LoginModal() {
  const { 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    loginWithCredentials, 
    demoUsersList, 
    cambiarUsuarioDemo, 
    usuario,
    loginPromptMessage 
  } = useAuth();

  const [emailInput, setEmailInput] = useState('elena@donantes.org');
  const [passwordInput, setPasswordInput] = useState('1234');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const res = loginWithCredentials(emailInput, passwordInput);
    if (!res.success) {
      setErrorMessage(res.error);
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsLoginModalOpen(false)}>
      <div className="login-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={() => setIsLoginModalOpen(false)}>
          &times;
        </button>

        <div className="login-header">
          <div className="login-logo-circle">
            <TurtleIcon size={40} color="#2d6a4f" />
          </div>
          <h2>Acceso a Save the Turtles</h2>
          <p>Inicia sesión con tu correo y contraseña (Contraseña por defecto: <strong>1234</strong>)</p>
        </div>

        {loginPromptMessage && (
          <div className="login-action-notice">
            <LockIcon size={18} color="#b45309" />
            <span>{loginPromptMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="login-error-alert">
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              required
              placeholder="tu.email@ejemplo.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Contraseña (Demo: 1234)</label>
            <input
              type="password"
              required
              placeholder="••••"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </div>

          <button type="submit" className="login-submit-btn">
            <KeyIcon size={18} /> Iniciar Sesión
          </button>
        </form>

        <div className="demo-roles-divider">
          <span>O selecciona un usuario para acceso directo con 1 clic:</span>
        </div>

        <div className="demo-users-scroll-grid">
          {demoUsersList.map((u) => (
            <div
              key={u.id}
              className={`demo-user-card-item ${usuario?.email === u.email ? 'active' : ''}`}
              onClick={() => cambiarUsuarioDemo(u)}
            >
              <img src={u.avatar} alt={u.nombre} className="demo-user-img" />
              <div className="demo-user-details">
                <strong>{u.nombre}</strong>
                <small>{u.email} (Pass: 1234)</small>
                <span className={`user-role-pill role-${u.rol}`}>
                  {u.rol === 'admin' ? (
                    <><ShieldIcon size={10} /> Admin</>
                  ) : u.rol === 'voluntario' ? (
                    <><BeachIcon size={10} /> Voluntario</>
                  ) : (
                    <><MedalIcon size={10} /> Donante</>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
