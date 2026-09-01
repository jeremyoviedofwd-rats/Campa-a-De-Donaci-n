import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  TurtleIcon, 
  HospitalIcon, 
  SatelliteIcon, 
  HatchlingIcon, 
  PillIcon, 
  HeartIcon, 
  MapPinIcon 
} from '../components/common/Icons';
import './TurtlesPage.css';

export const tortugasRescatadas = [
  {
    id: 't-01',
    nombre: 'Luna',
    especie: 'Tortuga Carey (Eretmochelys imbricata)',
    estadoLabel: 'En Rehabilitación',
    IconStatus: HospitalIcon,
    edad: '14 años',
    ubicacion: 'Playa Ostional, Costa Rica',
    imagen: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=600&q=80',
    descripcion: 'Luna fue rescatada tras enredarse en una red fantasma. Ya ha curado su aleta derecha y pronto volverá al océano.',
    patrocinadores: 14,
    metaUSD: 150,
    recaudadoUSD: 110
  },
  {
    id: 't-02',
    nombre: 'Sammy',
    especie: 'Tortuga Laúd (Dermochelys coriacea)',
    estadoLabel: 'Liberado con Emisor Satelital',
    IconStatus: SatelliteIcon,
    edad: '22 años',
    ubicacion: 'Océano Pacífico Pacuare',
    imagen: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    descripcion: 'Laúd gigante de 320kg. Seguimos su ruta migratoria diaria hacia las Islas Galápagos.',
    patrocinadores: 28,
    metaUSD: 300,
    recaudadoUSD: 280
  },
  {
    id: 't-03',
    nombre: 'Coco',
    especie: 'Tortuga Verde (Chelonia mydas)',
    estadoLabel: 'Vivero de Crías',
    IconStatus: HatchlingIcon,
    edad: '3 semanas',
    ubicacion: 'Santuario Tortuguero Guanacaste',
    imagen: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=600&q=80',
    descripcion: 'Cría eclosionada en nuestro vivero protegido contra depredadores y perros. Lista para nadar alta mar.',
    patrocinadores: 8,
    metaUSD: 80,
    recaudadoUSD: 75
  },
  {
    id: 't-04',
    nombre: 'Benny',
    especie: 'Tortuga Caguama (Caretta caretta)',
    estadoLabel: 'Tratamiento por Plástico',
    IconStatus: PillIcon,
    edad: '8 años',
    ubicacion: 'Clínica Veterinaria Central',
    imagen: 'https://images.unsplash.com/photo-1591025207163-942350e47db2?auto=format&fit=crop&w=600&q=80',
    descripcion: 'Ingirió bolsas de plástico confundidas con medusas. Se recupera favorablemente gracias a donaciones.',
    patrocinadores: 19,
    metaUSD: 200,
    recaudadoUSD: 160
  }
];

export default function TurtlesPage({ onSelectAdopt }) {
  const { requireAuthAction } = useAuth();
  const [filtro, setFiltro] = useState('todos');

  const tortugasFiltradas = tortugasRescatadas.filter((t) => {
    if (filtro === 'rehabilitacion') return t.estadoLabel.includes('Rehabilitación') || t.estadoLabel.includes('Tratamiento');
    if (filtro === 'liberados') return t.estadoLabel.includes('Liberado');
    if (filtro === 'crias') return t.estadoLabel.includes('Crías');
    return true;
  });

  const handleAdoptClick = (turtleName) => {
    requireAuthAction(() => {
      onSelectAdopt(turtleName);
    }, `Inicia sesión para adoptar a ${turtleName} y recibir tu certificado`);
  };

  return (
    <div className="turtles-page">
      <div className="turtles-header">
        <span className="section-badge">
          <TurtleIcon size={16} /> Adopción Simbólica
        </span>
        <h1>Conoce a nuestras tortugas rescatadas</h1>
        <p>
          Al adoptar simbólicamente una tortuga, financias sus cuidados médicos, alimentación
          y el rastreo satelital para proteger sus playas de anidación.
        </p>

        {/* Filters */}
        <div className="turtles-filters">
          <button className={filtro === 'todos' ? 'active' : ''} onClick={() => setFiltro('todos')}>
            <TurtleIcon size={16} /> Todas
          </button>
          <button className={filtro === 'rehabilitacion' ? 'active' : ''} onClick={() => setFiltro('rehabilitacion')}>
            <HospitalIcon size={16} /> En Hospital
          </button>
          <button className={filtro === 'liberados' ? 'active' : ''} onClick={() => setFiltro('liberados')}>
            <SatelliteIcon size={16} /> Con Rastreador Satelital
          </button>
          <button className={filtro === 'crias' ? 'active' : ''} onClick={() => setFiltro('crias')}>
            <HatchlingIcon size={16} /> Nidos y Crías
          </button>
        </div>
      </div>

      {/* Grid of Turtles */}
      <div className="turtles-grid">
        {tortugasFiltradas.map((t) => {
          const porcentaje = Math.min(100, Math.round((t.recaudadoUSD / t.metaUSD) * 100));
          const StatusIcon = t.IconStatus;

          return (
            <div key={t.id} className="turtle-card">
              <div className="turtle-card-img-wrapper">
                <img src={t.imagen} alt={t.nombre} className="turtle-card-img" />
                <span className="turtle-status-badge">
                  <StatusIcon size={14} /> {t.estadoLabel}
                </span>
              </div>

              <div className="turtle-card-body">
                <div className="turtle-header">
                  <h2>{t.nombre}</h2>
                  <span className="turtle-age">{t.edad}</span>
                </div>
                <span className="turtle-species">{t.especie}</span>
                <p className="turtle-desc">{t.descripcion}</p>

                <div className="turtle-location">
                  <MapPinIcon size={16} color="#64748b" />
                  <span>{t.ubicacion}</span>
                </div>

                {/* Progress bar */}
                <div className="funding-progress">
                  <div className="progress-labels">
                    <span>Financiamiento de Cuidados:</span>
                    <strong>{porcentaje}%</strong>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${porcentaje}%` }}></div>
                  </div>
                </div>

                <div className="turtle-card-actions">
                  <button className="btn-adopt-turtle" onClick={() => handleAdoptClick(t.nombre)}>
                    <HeartIcon size={18} /> Adoptar a {t.nombre}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
