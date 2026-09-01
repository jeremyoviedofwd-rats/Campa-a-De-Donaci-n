import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const demoUsersList = [
  {
    id: 'usr-101',
    nombre: 'Elena Rostova',
    email: 'elena@donantes.org',
    password: '1234',
    rol: 'donante',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    donacionesTotales: 175,
    tortugasAdoptadas: ['Luna', 'Coco'],
    nivelBadge: 'Protectora Dorada'
  },
  {
    id: 'usr-102',
    nombre: 'Mateo Fernández',
    email: 'mateo@donantes.org',
    password: '1234',
    rol: 'donante',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    donacionesTotales: 320,
    tortugasAdoptadas: ['Sammy'],
    nivelBadge: 'Socio Platino'
  },
  {
    id: 'usr-201',
    nombre: 'Carlos Mendoza',
    email: 'carlos@voluntarios.org',
    password: '1234',
    rol: 'voluntario',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    horasVoluntariado: 48,
    playaAsignada: 'Playa Ostional, Costa Rica',
    turnosCompletados: 12
  },
  {
    id: 'usr-202',
    nombre: 'Sofía Castro',
    email: 'sofia@voluntarios.org',
    password: '1234',
    rol: 'voluntario',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    horasVoluntariado: 36,
    playaAsignada: 'Playa Pacuare, Costa Rica',
    turnosCompletados: 9
  },
  {
    id: 'usr-301',
    nombre: 'Dra. Marina Silva',
    email: 'marina@savetheturtles.org',
    password: '1234',
    rol: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    cargo: 'Directora de Conservación Marina',
    nidosSupervisados: 340
  },
  {
    id: 'usr-302',
    nombre: 'Diego Morales',
    email: 'diego@savetheturtles.org',
    password: '1234',
    rol: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    cargo: 'Guardaparques Jefe de Patrullas',
    nidosSupervisados: 215
  }
];

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(demoUsersList[0]); // Logged in as Elena by default
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginPromptMessage, setLoginPromptMessage] = useState('');
  const [pendingAction, setPendingAction] = useState(null);

  const cambiarUsuarioDemo = (usr) => {
    setUsuario(usr);
    setIsLoginModalOpen(false);
    setLoginPromptMessage('');
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const loginWithCredentials = (email, password) => {
    const found = demoUsersList.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (found) {
      if (found.password === password || password === '1234') {
        setUsuario(found);
        setIsLoginModalOpen(false);
        setLoginPromptMessage('');
        if (pendingAction) {
          pendingAction();
          setPendingAction(null);
        }
        return { success: true };
      } else {
        return { success: false, error: 'Contraseña incorrecta. Prueba con 1234' };
      }
    } else {
      // Create new user session
      const newUser = {
        id: `usr-${Date.now()}`,
        nombre: email.split('@')[0],
        email: email,
        password: password || '1234',
        rol: 'donante',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      };
      setUsuario(newUser);
      setIsLoginModalOpen(false);
      setLoginPromptMessage('');
      if (pendingAction) {
        pendingAction();
        setPendingAction(null);
      }
      return { success: true };
    }
  };

  const requireAuthAction = (actionCallback, customPrompt = '') => {
    if (usuario) {
      actionCallback();
    } else {
      setLoginPromptMessage(customPrompt || 'Debes iniciar sesión para realizar esta acción.');
      setPendingAction(() => actionCallback);
      setIsLoginModalOpen(true);
    }
  };

  const logout = () => {
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        demoUsersList,
        cambiarUsuarioDemo,
        loginWithCredentials,
        logout,
        isLoginModalOpen,
        setIsLoginModalOpen,
        requireAuthAction,
        loginPromptMessage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
