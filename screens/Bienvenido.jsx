import React from 'react';
import './css/Bienvenido.css';
import logoBlack from './imagenes/BrisaBlack.png';
import { useNavigate } from 'react-router-dom';


function Bienvenido() {

  const navigate = useNavigate();

  const handleAvanzar = () => {
    navigate('/Login');
  };

  return (
    <div className='container'>
      <div>
        <img src={logoBlack} alt="Logo en modo oscuro" className="logo" />
      </div>
      <h1 className="Bienvenido">
        <span className="white"> BR</span>
        <span className="desColor">I</span>
        <span className="white">S</span>
        <span className="desColor">A</span>
      </h1>
      <h3 className="Descripcion">
        <span className='desColor'>Objetivo del Proyecto </span>: Desarrollar una inteligencia artificial capaz de identificar patrones específicos
        a travez de una analisis con IA, que utiliza imagenes de la retina para detectar enfermedades, afecciones o patologías en
        los vasos sanguíneos de la retina.  El propósito es asistir a los profesionales de la salud en la detección temprana de anomalías,
        facilitando así el diagnóstico y mejorando la calidad del cuidado ocular.
      </h3>
      <h4 className='Objetivo'>Para cumplir con nuestro objetivo, usaremos las imágenes obtenidas por los siguientes estudios oculares
      </h4>
      <h3 className='titulosEstudios'>FONDO DE OJOS</h3>
      <h4 className='DescFondo'>examen que permite al oftalmólogo observar el interior del ojo, incluyendo la retina, el nervio óptico, los vasos sanguíneos y otras estructuras
      </h4>
      <h3 className='titulosEstudios'>FLUORESCEINOGRAMA (ANGIOGRAFÍA CON FLUORESCEÍNA)      </h3>
      <h4 className='DescFondo'>estudio que evalúa la circulación de la sangre en la retina. Se inyecta un colorante fluorescente para poder detectar bloqueos en los vasos sanguíneos, o anormalidades en la estructura de la retina.
      </h4>
      <button className='avanzar' onClick={handleAvanzar}>Avanzar</button>
    </div>
  );
}

export default Bienvenido;
