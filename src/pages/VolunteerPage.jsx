import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import VolunteerModal from '../components/volunteer/VolunteerModal';
import { 
  HandshakeIcon, 
  MoonIcon, 
  BroomIcon, 
  HatchlingIcon, 
  FlameIcon, 
  MapPinIcon, 
  CalendarIcon, 
  CheckIcon 
} from '../components/common/Icons';
import './VolunteerPage.css';

export default function VolunteerPage() {
  const { requireAuthAction } = useAuth();
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const campanas = [
    {
      id: 'c-1',
      titulo: 'Patrullaje Nocturno de Desove',
      ubicacion: 'Playa Ostional, Guanacaste',
      fecha: 'Todos los Viernes y Sábados | 8:00 PM - 2:00 AM',
      cupos: 4,
      IconComp: MoonIcon,
      descripcion: 'Acompaña a biólogos marinos a marcar nidos y resguardar a las hembras reproductoras de tortuga Lora.'
    },
    {
      id: 'c-2',
      titulo: 'Limpieza Masiva de Plástico Marino',
      ubicacion: 'Playa Pacuare, Limón',
      fecha: 'Sábado 12 de Septiembre | 7:00 AM - 12:00 PM',
      cupos: 12,
      IconComp: BroomIcon,
      descripcion: 'Remoción de redes fantasma y microplásticos en las zonas de mayor eclosión de crías de tortuga Laúd.'
    },
    {
      id: 'c-3',
      titulo: 'Taller de Liberación de Crías',
      ubicacion: 'Santuario Marino Tortuguero',
      fecha: 'Domingo 20 de Septiembre | 4:30 PM - 7:00 PM',
      cupos: 8,
      IconComp: HatchlingIcon,
      descripcion: 'Supervisión del camino de las crías recién nacidas hacia las olas del mar de forma segura.'
    }
  ];

  const handleOpenCampaignModal = (camp) => {
    requireAuthAction(() => {
      setSelectedCampaign(camp);
      setIsModalOpen(true);
    }, `Inicia sesión para inscribirte en la campaña "${camp.titulo}"`);
  };

  return (
    <div className="volunteer-page">
      <div className="volunteer-header">
        <span className="section-badge">
          <HandshakeIcon size={16} /> Trabajo de Campo
        </span>
        <h1>Únete como Voluntario de Conservación</h1>
        <p>
          Las patrullas comunitarias en playa salvan miles de vidas cada temporada.
          Participa en limpiezas de costa, resguardo de nidos y liberación de recién nacidas.
        </p>
      </div>

      {/* Campaigns List */}
      <div className="campaigns-grid">
        {campanas.map((c) => {
          const CampaignIcon = c.IconComp;
          return (
            <div key={c.id} className="campaign-card">
              <div className="campaign-icon">
                <CampaignIcon size={32} color="#2d6a4f" />
              </div>
              <div className="campaign-body">
                <h3>{c.titulo}</h3>
                <span className="campaign-loc">
                  <MapPinIcon size={14} /> {c.ubicacion}
                </span>
                <span className="campaign-date">
                  <CalendarIcon size={14} /> {c.fecha}
                </span>
                <p>{c.descripcion}</p>
                <div className="campaign-footer">
                  <span className="cupos-tag">
                    <FlameIcon size={12} color="#b45309" /> {c.cupos} cupos disponibles
                  </span>
                  <button
                    className="btn-select-camp"
                    onClick={() => handleOpenCampaignModal(c)}
                  >
                    <HandshakeIcon size={16} /> Inscribirme & Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Volunteer Interactive Subtab / Modal */}
      <VolunteerModal
        campaign={selectedCampaign}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
