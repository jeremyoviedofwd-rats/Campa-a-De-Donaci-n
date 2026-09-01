import { createContext, useContext, useState } from 'react';

const DonationContext = createContext();

export const monedas = {
  USD: { simbolo: '$', cambio: 1, label: 'USD ($)' },
  EUR: { simbolo: '€', cambio: 0.92, label: 'EUR (€)' },
  CRC: { simbolo: '₡', cambio: 520, label: 'CRC (₡)' },
  MXN: { simbolo: '$', cambio: 18.5, label: 'MXN ($)' },
  COP: { simbolo: '$', cambio: 3950, label: 'COP ($)' }
};

const inicialDonaciones = [
  {
    id: 'don-001',
    donante: 'Elena Rostova',
    montoUSD: 50,
    moneda: 'USD',
    montoLocal: 50,
    fecha: '2026-08-28',
    mensaje: '¡Para que Luna y sus crías naden seguras!',
    tortugaAdoptada: 'Luna',
    certificadoId: 'CERT-TURTLE-8892'
  },
  {
    id: 'don-002',
    donante: 'Mateo Fernández',
    montoUSD: 100,
    moneda: 'USD',
    montoLocal: 100,
    fecha: '2026-08-30',
    mensaje: 'Gran trabajo del equipo de patrullas nocturnas.',
    tortugaAdoptada: 'Sammy',
    certificadoId: 'CERT-TURTLE-9901'
  }
];

export function DonationProvider({ children }) {
  const [donaciones, setDonaciones] = useState(inicialDonaciones);
  const [monedaActual, setMonedaActual] = useState('USD');
  const [certificadoActivo, setCertificadoActivo] = useState(null);

  const registrarDonacion = (nuevaDonacion) => {
    const rate = monedas[nuevaDonacion.moneda]?.cambio || 1;
    const montoUSD = Math.round((nuevaDonacion.monto / rate) * 100) / 100;
    
    const donacionCompleta = {
      id: `don-${Date.now()}`,
      donante: nuevaDonacion.nombre,
      email: nuevaDonacion.email,
      montoUSD: montoUSD,
      moneda: nuevaDonacion.moneda,
      montoLocal: nuevaDonacion.monto,
      frecuencia: nuevaDonacion.frecuencia || 'unica',
      fecha: new Date().toISOString().split('T')[0],
      mensaje: nuevaDonacion.mensaje || '¡Protegiendo a los océanos!',
      tortugaAdoptada: nuevaDonacion.tortugaAdoptada || 'Varias Tortuguitas',
      certificadoId: `CERT-TURTLE-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setDonaciones((prev) => [donacionCompleta, ...prev]);
    setCertificadoActivo(donacionCompleta);
    return donacionCompleta;
  };

  const totalRecaudadoUSD = donaciones.reduce((acc, d) => acc + d.montoUSD, 12450);

  return (
    <DonationContext.Provider
      value={{
        donaciones,
        registrarDonacion,
        monedaActual,
        setMonedaActual,
        monedas,
        totalRecaudadoUSD,
        certificadoActivo,
        setCertificadoActivo
      }}
    >
      {children}
    </DonationContext.Provider>
  );
}

export const useDonation = () => useContext(DonationContext);
