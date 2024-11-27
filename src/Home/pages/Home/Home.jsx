import React, { useContext } from "react";
import Card from "../../../shared/components/UIElements/Card";
import { AuthContext } from "../../../Shared/context/auth-context";

import styles from "./Home.module.css";
import { Link } from "react-router-dom";

function Home() {
  const auth = useContext(AuthContext);
  console.log(auth);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>¡Bienvenido a BRISA, {auth.username}!</h1>
      <h2>
        Explora las funcionalidades y aprende mas sobre cómo BRISA puede
        ayudarte
      </h2>
      <div className={styles.cardContainer}>
        
        <Link to="/configuracion" className={styles.unstyledLink}>
          <Card className={styles.card}>
            <p className={styles.cardTitle}>Tu información</p>
            <p>Nombre: {auth.username}</p>
            <p>Correo: {auth.email}</p>
          </Card>
        </Link>

        <Link to="/diagnosis" className={styles.unstyledLink}>
          <Card className={styles.card}>
            <p className={styles.cardTitle}>Sobre tus estudios</p>
            <p>
              Agrega tus estudios oculares para que BRISA pueda analizarlos y
              brindarte información detallada sobre tu salud ocular
            </p>
          </Card>
        </Link>
        <Link to="/configuracion" className={styles.unstyledLink}>
          <Card className={styles.card}>
            <p className={styles.cardTitle}>Descubre más sobre BRISA</p>
            <p>
              BRISA es una aplicación diseñada para mejorar el diagnóstico de la
              salud ocular. Conoce más sobre cómo nuestra tecnología avanzada
              puede ayudarte a prevenir enfermedades oculares
            </p>
          </Card>
        </Link>

        <Link to="/configuracion" className={styles.unstyledLink}>
          <Card className={styles.card}>
            <p className={styles.cardTitle}>Información de la App</p>
            <p>
              En esta seccion podrás leer sobre nuestra política de privacidad,
              Términos y condiciones, la versión actual de la aplicación y
              consultar las preguntas frecuentes. Conoce cómo protegemos tus
              datos y te ofrecemos un servicio seguro
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
}

export default Home;
