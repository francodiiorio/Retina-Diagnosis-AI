import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import Home from './Home/pages/Home/Home.jsx';
import Perfil from './User/pages/Profile/Perfil.jsx';
import MainNavigation from './Shared/components/Navigation/MainNavigation/MainNavigation.jsx'
import Auth from './auth/pages/Auth/Auth';
import Studies from './Studies/pages/Studies.jsx';
import { AuthContext } from './Shared/context/auth-context';


function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false)

  const login = useCallback((uid, token) => {
    setToken(token)
    setIsLogged(true)
  }, []);

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
  }, []);

  let routes;

  if (token){
    routes = (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/diagnosis" element={<Studies />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider value={{ isLogged: !!token, token: token, userId: userId, login: login, logout: logout }}>
      <Router>
        <MainNavigation />
        <main>
            {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
