import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Bienvenido.module.css';
import logoBlack from "/BrisaBlack.png";

function Bienvenido() {
  const navigate = useNavigate();

  const handleAvanzar = () => {
    navigate('/Login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={logoBlack} alt="Logo en modo oscuro" className={styles.logo} />
        <h1 className={styles.Bienvenido}>
          <span className={styles.white}> BR</span>
          <span className={styles.desColor}>I</span>
          <span className={styles.white}>S</span>
          <span className={styles.desColor}>A</span>
        </h1>
      </div>
      <h2 className={styles.Descripcion}>
        <span className={styles.desColor}>Objetivo del Proyecto </span>: Desarrollar una inteligencia artificial capaz de identificar patrones específicos
        a través de un análisis con IA, que utiliza imágenes de la retina para detectar enfermedades, afecciones o patologías en
        los vasos sanguíneos de la retina. El propósito es asistir a los profesionales de la salud en la detección temprana de anomalías,
        facilitando así el diagnóstico y mejorando la calidad del cuidado ocular.
      </h2>
      <h4 className={styles.Objetivo}>Para cumplir con nuestro objetivo, usaremos las imágenes obtenidas por los siguientes estudios oculares
      </h4>
      <h3 className={styles.titulosEstudios}>FONDO DE OJOS</h3>
      <h4 className={styles.DescFondo}>examen que permite al oftalmólogo observar el interior del ojo, incluyendo la retina, el nervio óptico, los vasos sanguíneos y otras estructuras
      </h4>
      <h3 className={styles.titulosEstudios}>FLUORESCEINOGRAMA (ANGIOGRAFÍA CON FLUORESCEÍNA)</h3>
      <h4 className={styles.DescFondo}>estudio que evalúa la circulación de la sangre en la retina. Se inyecta un colorante fluorescente para poder detectar bloqueos en los vasos sanguíneos, o anormalidades en la estructura de la retina.
      </h4>
      <button className={styles.avanzar} onClick={handleAvanzar}>Avanzar</button>
    </div>
  );
}

export default Bienvenido;
