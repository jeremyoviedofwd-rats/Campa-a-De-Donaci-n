import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { DonationProvider } from './context/DonationContext';
import TurtleBackground from './components/background/TurtleBackground';
import SocialFloatingBar from './components/social/SocialFloatingBar';
import HelpTurtleAssistant from './components/assistant/HelpTurtleAssistant';
import Navbar from './components/navbar/Navbar';

import LoginModal from './components/auth/LoginModal';
import CertificateModal from './components/donation/CertificateModal';

import HomePage from './pages/HomePage';
import TurtlesPage from './pages/TurtlesPage';
import DonationPage from './pages/DonationPage';
import VolunteerPage from './pages/VolunteerPage';
import AccountPage from './pages/AccountPage';

import './App.css';
import Footer from './components/footer/footer';

function MainApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [prefilledTurtle, setPrefilledTurtle] = useState('');

  const handleSelectAdoptTurtle = (nombreTurtle) => {
    setPrefilledTurtle(nombreTurtle);
    setActiveTab('donate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-main-layout">
      {/* Floating Animated Turtles Background */}
      <TurtleBackground />

      {/* Floating Social Media & Share Bar */}
      <SocialFloatingBar />

      {/* Animated Wandering Turtle Assistant Mascot */}
      <HelpTurtleAssistant onNavigate={setActiveTab} />

      {/* Top Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Subpage Content */}
      <main className="app-content-area">
        {activeTab === 'home' && <HomePage onNavigate={setActiveTab} />}
        {activeTab === 'turtles' && (
          <TurtlesPage onSelectAdopt={handleSelectAdoptTurtle} />
        )}
        {activeTab === 'donate' && (
          <DonationPage prefilledTurtle={prefilledTurtle} />
        )}
        {activeTab === 'volunteer' && <VolunteerPage />}
        {activeTab === 'account' && <AccountPage onNavigate={setActiveTab} />}
      </main>

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />

      {/* Modals */}
      <LoginModal />
      <CertificateModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DonationProvider>
        <MainApp />
      </DonationProvider>
    </AuthProvider>
  );
}
