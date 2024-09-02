import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';
import logoBlack from './imagenes/BrisaBlack.png';


function LoginScreen() {
    const navigate = useNavigate();

    const handleRegistrar = () => {
        navigate('/Register');
    };
    return (
        <div className='container'>
            <div>
                <img src={logoBlack} alt="Logo en modo oscuro" className="logoLogin" />
            </div>
            <h1>Esto es el login</h1>

            <button>Iniciar sesion</button>
            <button onClick={handleRegistrar}>Registrarse</button>
        </div>
    );
}
export default LoginScreen;
