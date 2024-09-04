import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    return (
        <nav className="navbar">
            <Link to="/">
                <img src="/BrisaNavBar.png" alt="Logo" className="logoBrisa" />
            </Link>
            <Link to="/Perfil">
                <img src="/UserIcon.png" alt="Logo" className="logoUsuario" />
            </Link>
        </nav>
    );
}

export default NavBar;
