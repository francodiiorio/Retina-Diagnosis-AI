import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainNavigation from "./Shared/components/Navigation/MainNavigation/MainNavigation";
import { AuthContext } from "./Shared/context/auth-context";
import { useAuth } from "./Shared/hooks/auth-hook";
import { AppRoutes } from "./Shared/routes/AppRoutes";

function App() {
  const { token, login, logout, userId, username, email } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLogged: !!token,
        token: token,
        userId: userId,
        username: username,
        email: email,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <AppRoutes isLoggedIn={!!token} />
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
