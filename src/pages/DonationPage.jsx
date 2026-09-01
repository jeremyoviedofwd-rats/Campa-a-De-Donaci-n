import { useState, useEffect } from 'react';
import { useDonation } from '../context/DonationContext';
import { useAuth } from '../context/AuthContext';
import { 
  HeartIcon, 
  SproutIcon, 
  TurtleIcon, 
  HospitalIcon, 
  SatelliteIcon, 
  LockIcon, 
  ShieldIcon, 
  GlobeIcon, 
  StarIcon, 
  CreditCardIcon, 
  PaypalIcon, 
  MobilePayIcon, 
  SparklesIcon, 
  CheckIcon 
} from '../components/common/Icons';
import './DonationPage.css';

export default function DonationPage({ prefilledTurtle }) {
  const { registrarDonacion, monedaActual, setMonedaActual, monedas } = useDonation();
  const { usuario, requireAuthAction } = useAuth();

  const [montoPreset, setMontoPreset] = useState(50);
  const [customMonto, setCustomMonto] = useState('');
  const [frecuencia, setFrecuencia] = useState('unica');
  const [nombre, setNombre] = useState(usuario?.nombre || '');
  const [email, setEmail] = useState(usuario?.email || '');
  const [mensaje, setMensaje] = useState('');
  const [tortugaAdoptada, setTortugaAdoptada] = useState(prefilledTurtle || 'Luna');
  const [metodoPago, setMetodoPago] = useState('tarjeta');
  const [procesando, setProcesando] = useState(false);
  const [completado, setCompletado] = useState(false);

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre);
      setEmail(usuario.email);
    }
  }, [usuario]);

  useEffect(() => {
    if (prefilledTurtle) {
      setTortugaAdoptada(prefilledTurtle);
    }
  }, [prefilledTurtle]);

  const rate = monedas[monedaActual]?.cambio || 1;
  const symbol = monedas[monedaActual]?.simbolo || '$';

  const montosBaseUSD = [15, 30, 50, 100, 250];

  const montoFinalLocal = customMonto ? parseFloat(customMonto) : Math.round(montoPreset * rate);
  const montoUSDCalculado = customMonto ? Math.round((parseFloat(customMonto) / rate) * 100) / 100 : montoPreset;

  const handleDonar = (e) => {
    e.preventDefault();
    if (!nombre || !email || montoFinalLocal <= 0) return;

    requireAuthAction(() => {
      setProcesando(true);
      setTimeout(() => {
        registrarDonacion({
          nombre,
          email,
          monto: montoFinalLocal,
          moneda: monedaActual,
          frecuencia,
          mensaje,
          tortugaAdoptada
        });
        setProcesando(false);
        setCompletado(true);
      }, 1200);
    }, 'Inicia sesión para vincular tu donación y certificado a tu cuenta.');
  };

  return (
    <div className="donation-page">
      <div className="donation-container">
        {/* Left Side: Impact & Info */}
        <div className="donation-info-side">
          <span className="donation-badge">
            <HeartIcon size={16} color="#1b4332" /> Haz la Diferencia
          </span>
          <h1>Donar para las Tortugas Marinas</h1>
          <p>
            Tu donación financia patrullajes de playa, alimentos, medicinas y transmisores
            satelitales para tortugas en peligro de extinción.
          </p>

          {/* Impact preview */}
          <div className="impact-breakdown-card">
            <h3>
              <SproutIcon size={20} color="#1b4332" /> Tu impacto estimado con {symbol} {montoFinalLocal || 0}:
            </h3>
            <ul>
              {montoUSDCalculado >= 100 ? (
                <>
                  <li><TurtleIcon size={16} color="#2d6a4f" /> Apadrinas la nutrición completa de una tortuga durante 6 meses.</li>
                  <li><SatelliteIcon size={16} color="#2d6a4f" /> Financias el transmisor satelital para seguimiento en océano abierto.</li>
                  <li><ShieldIcon size={16} color="#2d6a4f" /> Recibes Certificado Oficial de Protector Dorado.</li>
                </>
              ) : montoUSDCalculado >= 50 ? (
                <>
                  <li><TurtleIcon size={16} color="#2d6a4f" /> Proteges 2 nidos completos (~200 huevos) contra depredadores.</li>
                  <li><HospitalIcon size={16} color="#2d6a4f" /> Suministras medicinas y antibióticos veterinarios para tortugas heridas.</li>
                  <li><ShieldIcon size={16} color="#2d6a4f" /> Recibes Certificado Oficial de Adopción Digital.</li>
                </>
              ) : (
                <>
                  <li><ShieldIcon size={16} color="#2d6a4f" /> Compras equipamiento para patrulleros de playa nocturnos.</li>
                  <li><TurtleIcon size={16} color="#2d6a4f" /> Salvas a 15 crías recién eclosionadas al llegar al agua.</li>
                  <li><CheckIcon size={16} color="#2d6a4f" /> Recibes Certificado Digital de Donación.</li>
                </>
              )}
            </ul>
          </div>

          <div className="trust-badges">
            <span><LockIcon size={16} /> Pago 100% Seguro SSL</span>
            <span><ShieldIcon size={16} /> Certificado de Conservación Oficial</span>
          </div>
        </div>

        {/* Right Side: Donation Form */}
        <div className="donation-form-side">
          {completado ? (
            <div className="donation-success-box">
              <div className="success-icon">
                <SparklesIcon size={56} color="#10b981" />
              </div>
              <h2>¡Muchas gracias por tu donación!</h2>
              <p>
                Hemos registrado tu aporte de{' '}
                <strong>
                  {symbol} {montoFinalLocal} {monedaActual}
                </strong>
                . Se ha generado tu Certificado Oficial de Conservación.
              </p>
              <button
                className="btn-again-donate"
                onClick={() => setCompletado(false)}
              >
                Hacer otra donación
              </button>
            </div>
          ) : (
            <form onSubmit={handleDonar} className="donation-wizard">
              {/* Step 1: Currency & Frequency */}
              <div className="wizard-step">
                <label className="step-label">1. Selecciona la Divisa y Frecuencia</label>
                <div className="currency-and-freq">
                  <div className="select-wrapper">
                    <GlobeIcon size={18} color="#2d6a4f" />
                    <select
                      value={monedaActual}
                      onChange={(e) => setMonedaActual(e.target.value)}
                    >
                      {Object.keys(monedas).map((k) => (
                        <option key={k} value={k}>
                          {monedas[k].label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="freq-buttons">
                    <button
                      type="button"
                      className={frecuencia === 'unica' ? 'active' : ''}
                      onClick={() => setFrecuencia('unica')}
                    >
                      Única vez
                    </button>
                    <button
                      type="button"
                      className={frecuencia === 'mensual' ? 'active' : ''}
                      onClick={() => setFrecuencia('mensual')}
                    >
                      <StarIcon size={14} color="#d97706" /> Mensual (Socio)
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 2: Select Amount */}
              <div className="wizard-step">
                <label className="step-label">2. Elige el Monto a Donar ({monedaActual})</label>
                <div className="preset-grid">
                  {montosBaseUSD.map((usd) => {
                    const localVal = Math.round(usd * rate);
                    const isSelected = !customMonto && montoPreset === usd;

                    return (
                      <button
                        key={usd}
                        type="button"
                        className={`preset-btn ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setMontoPreset(usd);
                          setCustomMonto('');
                        }}
                      >
                        <span className="preset-val">
                          {symbol} {localVal}
                        </span>
                        <small className="usd-equivalent">~${usd} USD</small>
                      </button>
                    );
                  })}
                </div>

                <div className="custom-monto-input">
                  <span>Monto personalizado:</span>
                  <div className="input-with-symbol">
                    <span>{symbol}</span>
                    <input
                      type="number"
                      min="1"
                      placeholder="Otro monto..."
                      value={customMonto}
                      onChange={(e) => setCustomMonto(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Donor Details */}
              <div className="wizard-step">
                <label className="step-label">3. Datos del Donante</label>
                <div className="inputs-row">
                  <div className="field-group">
                    <label>Tu Nombre Completo</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. María Rodríguez"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>

                  <div className="field-group">
                    <label>Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      placeholder="maria@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label>Apadrinar Tortuga Específica (Opcional)</label>
                  <select
                    value={tortugaAdoptada}
                    onChange={(e) => setTortugaAdoptada(e.target.value)}
                  >
                    <option value="Luna">Luna (Tortuga Carey - Hospital)</option>
                    <option value="Sammy">Sammy (Tortuga Laúd - Satélite)</option>
                    <option value="Coco">Coco (Tortuga Verde - Cría)</option>
                    <option value="Benny">Benny (Tortuga Caguama - Recuperación)</option>
                    <option value="Todas las tortuguitas">Fondo General de Nidos</option>
                  </select>
                </div>

                <div className="field-group">
                  <label>Mensaje de Apoyo o Dedicatoria</label>
                  <input
                    type="text"
                    placeholder="Ej. ¡Con todo mi amor para el mar!"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                  />
                </div>
              </div>

              {/* Step 4: Payment Method */}
              <div className="wizard-step">
                <label className="step-label">4. Método de Pago Simulado</label>
                <div className="payment-methods-grid">
                  <label
                    className={`payment-option ${metodoPago === 'tarjeta' ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="tarjeta"
                      checked={metodoPago === 'tarjeta'}
                      onChange={() => setMetodoPago('tarjeta')}
                    />
                    <CreditCardIcon size={18} />
                    <span>Tarjeta de Crédito/Débito</span>
                  </label>

                  <label
                    className={`payment-option ${metodoPago === 'paypal' ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={metodoPago === 'paypal'}
                      onChange={() => setMetodoPago('paypal')}
                    />
                    <PaypalIcon size={18} />
                    <span>PayPal</span>
                  </label>

                  <label
                    className={`payment-option ${metodoPago === 'sinpe' ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="sinpe"
                      checked={metodoPago === 'sinpe'}
                      onChange={() => setMetodoPago('sinpe')}
                    />
                    <MobilePayIcon size={18} />
                    <span>SINPE / Transferencia Local</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="btn-submit-donation" disabled={procesando}>
                {procesando ? (
                  'Procesando Donación y Certificado... ⏳'
                ) : (
                  <>
                    <HeartIcon size={20} /> Completar Donación de {symbol} {montoFinalLocal} {monedaActual}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
