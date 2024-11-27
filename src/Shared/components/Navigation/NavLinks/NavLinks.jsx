import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import './NavLinks.css'
import { AuthContext } from "../../../context/auth-context";

const NavLinks = props => {
  const auth = useContext(AuthContext)
  return <ul className="nav-links">
    {auth.isLogged && (
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
    )}
    {auth.isLogged && (
      <li>
        <NavLink to="/diagnosis" >Estudios</NavLink>
      </li>
    )}
    {auth.isLogged && (
      <li>
        <NavLink to="/configuracion">Configuración</NavLink>
      </li>
    )}
    {!auth.isLogged && (
      <li>
        <NavLink to="/auth">Authenticate</NavLink>
      </li>
    )}
    {auth.isLogged && (
      <li>
        <button onClick={auth.logout}>Logout</button>
      </li>
    )}
  </ul>
};

export default NavLinks
