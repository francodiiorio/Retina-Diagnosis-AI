import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../Home/pages/Home/Home";
import Studies from "../../Studies/pages/Studies";
import Config from "../../User/pages/Config/Config";
import Auth from "../../User/pages/auth/pages/Auth/Auth";

export const AppRoutes = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diagnosis" element={<Studies />} />
        <Route path="/configuracion" element={<Config />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};
