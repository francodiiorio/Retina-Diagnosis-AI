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
    const [isRegistering, setIsRegistering] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Iniciar sesión con:', email, password);
        navigate('/Perfil')
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        console.log('Registrarse con:', email, password);
    };

    const cambiarEstado = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <div className={styles.container}>
            <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <img src={logoBlack} alt="Logo en modo oscuro" className={styles.logoLogin} />
            </div>
            <div className={styles.text}>{isRegistering ? ' Crear Cuenta ' : 'Iniciar Sesión'}</div>
            <form onSubmit={isRegistering ? handleRegister : handleLogin}>
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
                {isRegistering && (
                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                        <div className={styles.inputContainer}>
                            <img src={passIcon} alt="Icono de contraseña" className={styles.icon} />
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                )}
                <div className={styles.buttonContainer}>
                    {!isRegistering ? (
                        <>
                            <button type="submit" onClick={handleLogin}>Iniciar Sesión</button>
                            <button type="button" onClick={cambiarEstado}>Registrarse</button>
                        </>
                    ) : (
                        <>
                            <button type="submit" onClick={handleRegister}>Registrarse</button>
                            <button type="button" onClick={cambiarEstado}>Tengo una cuenta</button>
                        </>
                    )}
                </div>
            </form>
            <div className={styles.OlvidePass} > <span className={styles.OlvidePassPan} >olvide mi contraseña</span></div>
        </div>
    );
}

export default LoginScreen;
