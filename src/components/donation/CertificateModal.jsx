import { useDonation } from '../../context/DonationContext';
import { TurtleIcon, ShieldIcon, PrinterIcon } from '../common/Icons';
import './CertificateModal.css';

export default function CertificateModal() {
  const { certificadoActivo, setCertificadoActivo } = useDonation();

  if (!certificadoActivo) return null;

  return (
    <div className="modal-backdrop" onClick={() => setCertificadoActivo(null)}>
      <div className="certificate-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={() => setCertificadoActivo(null)}>
          &times;
        </button>

        <div className="certificate-border">
          <div className="certificate-inner">
            <div className="certificate-badge-top">
              <TurtleIcon size={48} color="#2d6a4f" />
            </div>
            <h1 className="cert-title">CERTIFICADO DE ADOPCIÓN Y PROTECCIÓN</h1>
            <p className="cert-subtitle">OTORGADO OFICIALMENTE A:</p>
            <h2 className="cert-donor-name">{certificadoActivo.donante}</h2>

            <p className="cert-text">
              En reconocimiento a su generosa donación de{' '}
              <strong>
                {certificadoActivo.moneda} {certificadoActivo.montoLocal}
              </strong>{' '}
              para la protección de nidos y la conservación de la especie{' '}
              <em>{certificadoActivo.tortugaAdoptada}</em> en nuestros santuarios marinos.
            </p>

            <div className="cert-meta-grid">
              <div className="cert-meta-item">
                <span className="cert-meta-label">ID de Registro:</span>
                <span className="cert-meta-val">{certificadoActivo.certificadoId}</span>
              </div>
              <div className="cert-meta-item">
                <span className="cert-meta-label">Fecha de Emisión:</span>
                <span className="cert-meta-val">{certificadoActivo.fecha}</span>
              </div>
            </div>

            <div className="cert-signatures">
              <div className="signature">
                <span className="sig-line">Dra. Marina Silva</span>
                <small>Directora de Conservación</small>
              </div>
              <div className="sig-seal">
                <ShieldIcon size={14} color="#b45309" />
                <span>SELLO DE PROTECCIÓN</span>
              </div>
              <div className="signature">
                <span className="sig-line">Save the Turtles</span>
                <small>Santuario Internacional</small>
              </div>
            </div>
          </div>
        </div>

        <div className="cert-actions">
          <button className="cert-print-btn" onClick={() => window.print()}>
            <PrinterIcon size={18} /> Imprimir / Guardar Certificado PDF
          </button>
          <button className="cert-close-btn" onClick={() => setCertificadoActivo(null)}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
