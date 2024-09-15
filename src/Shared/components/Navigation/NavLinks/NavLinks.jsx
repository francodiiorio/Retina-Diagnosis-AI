import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import './NavLinks.css'
import { AuthContext } from "../../../context/auth-context";

const NavLinks = props => {
  const auth = useContext(AuthContext)
  return <ul className="nav-links">
    <li>
      <NavLink to="/products">Products</NavLink>
    </li>
    <li>
      <NavLink to="/" >Al Users</NavLink>
    </li>
    {auth.isLogged && (
      <li>
        <NavLink to="/u1/cart">Cart</NavLink>
      </li>
    )}
    {!auth.isLogged && (
      <li>
        <NavLink to="/auth">Authenticate</NavLink>
      </li>
    )}
  </ul>
};

export default NavLinks
