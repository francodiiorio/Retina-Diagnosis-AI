import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import Bienvenido from '../src/Bienvenida/Bienvenido';
import LoginScreen from '../src/Login/LoginScreen';
import Perfil from './Usuario/Perfil';
import MainNavigation from './Shared/components/Navigation/MainNavigation/MainNavigation.jsx'
import Auth from './auth/pages/Auth/Auth';
import { AuthContext } from './Shared/context/auth-context';


function App() {
  const [isLogged, setIsLogged] = useState(false);

  const login = useCallback(() => {
    setIsLogged(true)
  }, []);

  const logout = useCallback(() => {
    setIsLogged(false)
  }, []);


  return (
    <AuthContext.Provider value={{ isLogged: isLogged, login: login, logout: logout }}>
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<Bienvenido />} />
            <Route path="/auth" element={<LoginScreen />} />
            <Route path="/auth2" element={<Auth />} />
            <Route path="/diagnosis" element={<Perfil />} />
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
