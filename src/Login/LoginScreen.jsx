import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Login/Login.module.css';

import logoBlack from "/BrisaBlack.png";
import emailIcon from "/EmailIcon.png"
import passIcon from '/PassIcon.png'


function LoginScreen() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Iniciar sesión con:', email, password);
    };

    const handleRegistrar = () => {
        navigate('/Register');
    };


    return (
        <div className={styles.container}>
            <div>
                <img src={logoBlack} alt="Logo en modo oscuro" className={styles.logoLogin} />
            </div>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <div className={styles.inputContainer}>
                        <img src={emailIcon} alt="Icono de email" className={styles.icon} />
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Contraseña:</label>
                    <div className={styles.inputContainer}>
                        <img src={passIcon} alt="Icono de contraseña" className={styles.icon} />
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit">Iniciar Sesión</button>
                    <button type="button" onClick={handleRegistrar}>Registrarse</button>
                </div>
            </form>
            <div className={styles.OlvidePass} > <span className={styles.OlvidePassPan} >olvide mi contraseña</span></div>
        </div>
    );
}

export default LoginScreen;
